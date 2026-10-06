# Evently

**A full-stack event discovery and seat-reservation platform engineered around one hard problem: never selling the same seat twice.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-PaymentIntents-635BFF?logo=stripe&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

Evently lets attendees browse live events, reserve specific seats on an interactive seat map, apply promo codes, pay securely via Stripe, and receive digital tickets with QR verification. Organizers get a real-time portal to publish events, manage attendee rosters, track ticket occupancy, and issue platform discounts.

The core engineering focus is **correctness under contention**: when multiple users compete for the exact same seats simultaneously, the database arbitrates the race atomically—guaranteeing zero double-bookings with automatic 10-minute hold TTL expiration.

---

## System Architecture

### Booking Flow

```mermaid
sequenceDiagram
    autonumber
    participant C as Client (React)
    participant A as API (Express)
    participant D as PostgreSQL
    participant S as Stripe

    C->>A: POST /api/seats/hold (seatIds)
    A->>D: Atomic conditional UPDATE (available, expired, or own hold)
    alt rows updated != seats requested
        A-->>C: 409 Conflict (transaction rolled back)
    else all seats locked
        A-->>C: 200 OK (held for 10 min TTL)
    end

    opt Promo code
        C->>A: POST /api/coupons/validate (code)
        A->>D: Check active status & remaining quota
        A-->>C: 200 OK (discount rate)
    end

    C->>A: POST /api/orders/create-payment-intent (seatIds, couponCode)
    A->>D: Verify holds & compute server-authoritative total
    A->>S: Create/update PaymentIntent with metadata (userId, seatIds)
    A-->>C: clientSecret, paymentIntentId, discounted amount

    C->>S: confirmPayment via Stripe Payment Element
    C->>A: POST /api/orders (seatIds, idempotencyKey, paymentIntentId, couponCode)
    A->>S: Verify PaymentIntent (succeeded status, exact amount & metadata match)
    A->>D: Transaction: Create Order + mark seats booked + increment coupon used
    A-->>C: 200 OK (confirmed order)
```

### Seat State Machine

```mermaid
stateDiagram-v2
    [*] --> available
    available --> held: Atomic Conditional UPDATE
    held --> available: Release / 10-min TTL Expiry / Sweeper
    held --> held: Re-hold by Same User (TTL Refreshed)
    held --> booked: Verified Payment & Order Transaction
    booked --> [*]
```

---

## Concurrency & Data Integrity

Naive reservation systems read a seat's status, validate in application memory, and issue a separate write. Under high concurrency, two requests can both read `available` and both execute writes, producing double bookings.

Evently collapses validation and reservation into a **single atomic conditional `UPDATE`**:

```javascript
const result = await tx.seat.updateMany({
  where: {
    id: { in: seatIds },
    event: { status: "Live" },
    OR: [
      { status: "available" },
      {
        status: "held",
        OR: [
          { expiresAt: { lt: new Date() } }, // Reclaim expired hold
          { userId: req.user.id },            // Refresh caller's own hold
        ],
      },
    ],
  },
  data: { status: "held", userId: req.user.id, expiresAt: expireTime },
});

// All-or-nothing: if any seat was claimed by another transaction, abort
if (result.count !== seatIds.length) throw new Error("SEATS_UNAVAILABLE");
```

- **Database-Level Arbitration:** Under PostgreSQL `READ COMMITTED` isolation, concurrent `UPDATE` queries on the same row serialize on row-level locks. The losing transaction re-evaluates the `WHERE` clause against the newly committed state, matches 0 rows, and gets rejected with `409 Conflict`.
- **Self-Healing Expiry (Lazy TTL + Sweeper):** Expired holds are reclaimed directly within the reservation query itself, removing any dependency on external cron workers for correctness. A lightweight background sweeper runs every 60 seconds purely to keep the seat map display fresh for visual browsers.
- **Idempotent Order Finalization:** Orders enforce a database `UNIQUE` constraint on `idempotencyKey`. Network retries safely return the existing order without duplicate charges or double bookings.
- **Server-Authoritative Pricing:** Totals and discounts are computed strictly on the backend (`max(0, price × seats − discount + ₹19)`). Stripe payment amounts are validated in paise before confirming any booking.

---

## Data Model

```mermaid
erDiagram
    USER ||--o{ EVENT : organizes
    USER ||--o{ ORDER : places
    USER ||--o{ SEAT : holds
    USER ||--o{ COUPON : manages
    EVENT ||--o{ SEAT : contains
    ORDER ||--o{ SEAT : includes

    USER {
        string id PK
        string email UK
        string password "bcrypt hash"
        string role "user | organizer | admin"
    }
    EVENT {
        string id PK
        string title
        int price "INR, per seat"
        int capacity
        string status "Live | Draft | Past"
        string createdBy FK
    }
    SEAT {
        string id PK
        string row
        int col
        string status "available | held | booked"
        datetime expiresAt
        string eventId FK
        string userId FK
        string orderId FK
    }
    ORDER {
        string id PK
        int totalPaid
        string idempotencyKey UK
        string status
        string userId FK
    }
    COUPON {
        string id PK
        string code UK
        string type "percentage | flat"
        int discount
        int maxUses
        int used
        boolean active
        string createdBy FK
    }
```

Seats enforce a composite unique index on `(eventId, row, col)`. Grids are auto-generated at event creation (rows A–J with customizable capacity).

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, React Router, Tailwind CSS, Framer Motion, Stripe Elements, Lucide Icons |
| **Backend** | Node.js (ES Modules), Express 5, Prisma 7 with `@prisma/adapter-pg` driver adapter |
| **Database** | PostgreSQL (Neon serverless pooler) |
| **Integrations** | Stripe (Payments), Cloudinary (Image upload & transforms), QRServer (Digital tickets) |
| **DevOps** | Docker, Docker Compose |

---

## Getting Started

### 1. Clone & Configure

```bash
git clone https://github.com/ShubhamShuklaX/Evently.git
cd Evently

cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, and `CLOUDINARY_URL` in `server/.env`.

### 2. Run with Docker Compose

```bash
docker compose up --build
```

In a new terminal, sync the database schema:

```bash
docker compose exec server npx prisma db push
docker compose exec server npx prisma db seed # Seeds demo events and admin/organizer accounts
```

* Frontend: `http://localhost:5173`
* Backend API: `http://localhost:5000`

*(Alternatively, run locally with `npm install` and `npm run dev` in both `/server` and `/client` directories).*

### 3. Demo Accounts & Payments

* **Organizer / Admin:** `organizer@evently.com` / `admin@evently.com` (passwords configured in `server/.env`).
* **Test Payments:** Use Stripe test card `4242 4242 4242 4242` with any future date and 3-digit CVC.

---

## Testing Concurrency

A dedicated race-condition test executes parallel competing reservations for the same seat to prove zero double-booking under load:

```bash
cd server
npm test
```

```
  User A HTTP Response: 200 -> {"message":"Successfully held seats","count":1}
  User B HTTP Response: 409 -> {"error":"One or more seats are no longer available"}

   - Successful Reservations (200 OK): 1
   - Rejected Conflicts (409 Conflict): 1

✅ SUCCESS: Zero double-booking detected!
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key used for signing JWTs |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `CLOUDINARY_URL` | Cloudinary credentials (`cloudinary://key:secret@cloud_name`) |
| `CLIENT_URL` | Allowed CORS origin (default `http://localhost:5173`) |
| `PORT` | HTTP port (default `5000`) |

### Client (`client/.env`)

| Variable | Description |
| :--- | :--- |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_...`) |
| `VITE_API_URL` | Backend URL (default `http://localhost:5000`) |

---

## License

Released under the [MIT License](LICENSE).

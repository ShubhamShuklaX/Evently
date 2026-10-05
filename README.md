# Evently 🎟️

> A high-contention, full-stack event discovery and ticket reservation platform built with **React 19**, **Express**, **PostgreSQL**, **Prisma**, and **Stripe**. Designed specifically to solve seat reservation concurrency and double-booking race conditions.

---

## 🌟 Key Highlights & Engineering Achievements

- **Race-Condition-Safe Seat Allocation:** Prevents double-booking during high-traffic ticket drops using atomic PostgreSQL conditional updates and Prisma transactions (`prisma.$transaction`).
- **Cryptographic Payment Integrity & Idempotency:** Full Stripe Elements payment gateway verifying authoritative server-side totals, idempotency keys (`crypto.randomUUID()`), and cryptographic PaymentIntent statuses before order fulfillment.
- **Timed Seat Hold Engine:** 10-minute temporary seat locks with client countdown synchronization and automated background worker cleanup.
- **Dynamic QR Digital Passports:** Instant digital ticket generation with seat-specific unique QR codes (`TKT-{row}-{col}`).
- **Organizer Operations & Door Check-In:** Complete event lifecycle management (Cloudinary image pipeline, CRUD, attendee check-in roster, and financial analytics).
- **Automated Concurrency Test Suite:** Reproducible test (`npm test`) firing parallel competing requests at the exact same millisecond to prove zero double-booking.

---

## 🏗️ Architecture & Booking Workflow

```
[ User Browser ]
       │  1. Select seats
       ▼
[ POST /api/seats/hold ] ──► [ Prisma Transaction ]
       │                     └─► Atomic conditional UPDATE:
       │                         WHERE status = 'available'
       │                         SET status = 'held', expiresAt = now() + 10m
       ▼
[ POST /api/orders/create-payment-intent ]
       │  2. Validates seat ownership
       │  3. Creates Stripe PaymentIntent
       ▼
[ Stripe Elements (<PaymentElement />) ]
       │  4. User enters test card (PCI-compliant; no card data touches server)
       ▼
[ POST /api/orders ] (Idempotency Key + PaymentIntent ID)
       │  5. Server verifies PaymentIntent status === 'succeeded' with Stripe API
       │  6. Atomic DB Transaction: Order.create() + Seat.updateMany(status = 'booked')
       ▼
[ Digital Ticket Page ] ──► Instant QR code generated per seat
```

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide Icons, React Hook Form, Stripe Elements |
| **Backend** | Node.js (ES Modules), Express 5, Prisma 7 ORM, `@prisma/adapter-pg` |
| **Database** | PostgreSQL (Neon serverless cloud pooler) |
| **Integrations** | Stripe API (Payments), Cloudinary (Image optimization), QRServer API |
| **Security** | JWT Authentication, bcrypt password hashing, Express Rate Limiter, CORS |

---

## ⚡ Concurrency & Double-Booking Protection

In high-demand ticket sales, thousands of users compete for the same seats simultaneously. Evently avoids naive read-then-write anti-patterns by executing an atomic conditional update:

```javascript
// Atomically locks seats only if currently available or expired
const result = await tx.seat.updateMany({
  where: {
    id: { in: seatIds },
    event: { status: "Live" },
    OR: [
      { status: "available" },
      {
        status: "held",
        OR: [
          { expiresAt: { lt: new Date() } },
          { userId: req.user.id },
        ],
      },
    ],
  },
  data: { expiresAt: expireTime, userId: req.user.id, status: "held" },
});

// If another user locked any seat a millisecond earlier, rollback and conflict
if (result.count !== seatIds.length) {
  throw new Error("SEATS_UNAVAILABLE");
}
```

### Prove It: Run the Automated Concurrency Test

Run the test suite to simulate competing users hitting the same seat concurrently:

```bash
cd server
npm test
```

**Expected Output:**
```
========================================================
  EVENTLY — HIGH-CONTENTION SEAT CONCURRENCY TEST
========================================================
⚡ Firing 2 simultaneous hold requests for the EXACT same seat...
⏱ Completed in: ~3000ms

  User A HTTP Response: 200 -> {"message":"Successfully held seats","count":1}
  User B HTTP Response: 409 -> {"error":"One or more seats are no longer available"}

📊 Results Analysis:
   - Successful Reservations (200 OK): 1
   - Rejected Conflicts (409 Conflict): 1

✅ SUCCESS: Zero double-booking detected!
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/ShubhamShuklaX/Evently.git
cd Evently
```

### 2. Configure Environment Variables
Copy the example environment files:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```
Fill in your database URL (`DATABASE_URL`), `JWT_SECRET`, `CLOUDINARY_URL`, and Stripe test keys.

### 3. Setup Backend
```bash
cd server
npm install
npx prisma generate
npm run dev
```
Backend starts on `http://localhost:5000`.

### 4. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```
Frontend starts on `http://localhost:5173`.

---

## 👥 Role-Based Demo Accounts

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Organizer / Admin** | `admin@evently.com` | `admin@123` | Create events, view attendee rosters, manage metrics |
| **Standard User** | Any registered email | Custom | Browse events, select seats, book with test cards |

---

## 📜 License
MIT

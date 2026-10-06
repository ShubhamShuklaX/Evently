# Evently — Pre-Deployment Fix Checklist

> Use this checklist before deploying Evently to Vercel + Render + Neon.
>
> **Goal:** Fix the remaining production/deployment issues without changing the working local Docker setup.

---

## 🔴 Must Fix Before Deployment

### 1. Fix the CORS configuration

**File:** `server/server.js`

The current CORS callback effectively allows **every origin** because it ends with:

```js
return callback(null, true);
```

That makes the origin checks above it meaningless.

Replace the CORS logic with a real allow-list:

```js
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((s) => s.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
```

After deployment, set Render's:

```text
CLIENT_URL=https://YOUR-FRONTEND.vercel.app
```

If you intentionally want multiple frontend URLs, separate them with commas.

**Do not leave the current unconditional `callback(null, true)` in production.**

---

### 2. Fix the production database schema/migration strategy

This is the biggest deployment issue.

The repository's checked-in Prisma migrations are currently incomplete relative to the actual schema. They do not reliably represent all of the application's current tables/columns.

Because of that, **do not blindly use**:

```bash
npx prisma migrate deploy
```

until the migration history has been corrected.

#### For the current project

Before deploying the backend, initialize/update the production Neon database with:

```bash
npx prisma db push
```

Run it against the **production `DATABASE_URL`**.

You can do this manually once from the `server` directory.

#### Better long-term fix

Once the schema is stable:

1. Make sure the Prisma schema and database are correct.
2. Generate a complete migration history.
3. Commit the migrations.
4. Switch production deployment to:

```bash
npx prisma migrate deploy
```

**Do not delete or rewrite migration history casually if the database already contains production data.**

---

### 3. Add production seed credentials if the database needs seeding

**File:** `server/.env.example`

The project has:

```text
ADMIN_PASSWORD
ORGANIZER_PASSWORD
```

The seed script uses these values, but `render.yaml` currently does not declare them.

If you want to run the production seed, add these variables in Render:

```text
ADMIN_PASSWORD=<strong-production-password>
ORGANIZER_PASSWORD=<strong-production-password>
```

Do **not** commit the actual passwords.

If the production database is seeded manually, make sure these credentials are configured before running:

```bash
npx prisma db seed
```

---

## 🟠 Strongly Recommended Before Deployment

### 4. Use `npm ci` instead of `npm install` in Render

**File:** `render.yaml`

Current:

```yaml
buildCommand: npm install && npx prisma generate
```

Prefer:

```yaml
buildCommand: npm ci && npx prisma generate
```

The repository already has a lockfile, so `npm ci` gives a more deterministic production install.

---

### 5. Verify the Vercel SPA fallback

**File:** `client/vercel.json`

Current:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This is intended to prevent React Router routes from returning 404s on refresh.

It is acceptable, but you should test routes such as:

```text
/events
/events/<event-id>
/login
/register
```

by directly opening/refreshing them on the deployed Vercel URL.

If Vercel routing behaves unexpectedly, use:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### 6. Remove/ignore the unnecessary Netlify redirect config for Vercel

**File:** `client/public/_redirects`

Current:

```text
/*    /index.html   200
```

This is a Netlify-style redirect file.

It is not required for Vercel because `client/vercel.json` handles the SPA fallback.

You can remove it if Evently is definitely being deployed only to Vercel.

This is **not a deployment blocker**.

---

### 7. Verify production environment variables

#### Render — backend

Set:

```text
NODE_ENV=production
DATABASE_URL=<production Neon connection string>
JWT_SECRET=<strong-random-secret>
STRIPE_SECRET_KEY=<Stripe secret key>
CLOUDINARY_URL=<Cloudinary connection string>
CLIENT_URL=https://YOUR-FRONTEND.vercel.app
```

If seeding:

```text
ADMIN_PASSWORD=<strong-password>
ORGANIZER_PASSWORD=<strong-password>
```

Do not commit any of these values.

#### Vercel — frontend

Set:

```text
VITE_API_URL=https://YOUR-APP.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=<Stripe publishable key>
```

Only variables beginning with `VITE_` should be exposed to the frontend.

**Never put:**

```text
STRIPE_SECRET_KEY
DATABASE_URL
JWT_SECRET
CLOUDINARY_URL
```

in Vercel.

---

## 🟡 Deployment Verification

### 8. Verify the backend health endpoint

After Render deploys, open:

```text
https://YOUR-APP.onrender.com/api/health
```

Expected response should indicate:

```json
{
  "status": "ok",
  "database": "connected"
}
```

The endpoint also reports database latency and a timestamp.

If it returns `503`, fix the Neon/Prisma connection before deploying the frontend.

---

### 9. Verify the frontend API URL

After setting:

```text
VITE_API_URL=https://YOUR-APP.onrender.com
```

rebuild/redeploy the Vercel frontend.

Check that:

- Events load
- Event details load
- Login/register work
- Seat data loads
- Booking requests reach Render
- No requests are still going to `localhost:5000`

---

### 10. Test the complete booking flow in production

Test at least:

- Register
- Login
- Browse events
- Open event details
- Select seats
- Create an order
- Apply coupon
- Stripe payment
- Payment verification
- Order confirmation
- Ticket/QR generation
- View booking/order
- Logout/login again

Also test failure cases:

- Invalid coupon
- Expired coupon
- Already-booked seat
- Two users attempting the same seat
- Payment failure
- Refresh during checkout
- Repeating the same booking/payment request

---

### 11. Test concurrency after deployment

Evently's main resume-worthy feature is concurrency-safe booking.

Run your concurrency test against the production API/database only after the normal booking flow works.

Verify:

> One seat + multiple simultaneous booking attempts = exactly one successful reservation.

Also verify that losing requests do not leave the seat incorrectly marked as booked.

---

### 12. Verify the 10-minute seat hold/release behavior

The server has a cleanup process that releases expired held seats.

Test:

1. Select a seat.
2. Confirm it becomes `held`.
3. Do not complete payment.
4. Wait for the hold to expire.
5. Confirm the seat becomes available again.

Also verify that the cleanup process does not accidentally release legitimately booked seats.

---

## 🟢 Docker

### 13. Keep Docker for local development

The production deployment currently uses:

```yaml
runtime: node
```

in `render.yaml`.

Therefore, Render is deploying the backend as a **native Node service**, not using `server/Dockerfile`.

That is fine.

The Dockerfile should still work for local/container deployment:

```dockerfile
CMD [ "npm", "start" ]
```

Do not remove Docker just because Render is using native Node.

---

## 🔍 Final Repository Checks

Before pushing the deployment commit, verify:

- [ ] No `.env` files are committed
- [ ] No Stripe secret keys are committed
- [ ] No Cloudinary secrets are committed
- [ ] No database passwords are committed
- [ ] No JWT secret is committed
- [ ] No hardcoded `localhost:5000` production API URL remains
- [ ] No hardcoded production frontend URL is required in source code
- [ ] `npm start` works inside `server`
- [ ] `npm run build` works inside `client`
- [ ] Prisma client generates successfully
- [ ] Production CORS is restricted
- [ ] Production database schema exists
- [ ] Render health check passes
- [ ] Vercel SPA routes work on refresh

---

# 🚀 Recommended Deployment Order

Do these in this order:

### Step 1 — Fix code

- [ ] Fix CORS
- [ ] Change Render build to `npm ci`
- [ ] Decide whether to remove `_redirects`
- [ ] Commit and push

### Step 2 — Create/configure Neon

- [ ] Create production PostgreSQL database
- [ ] Get production `DATABASE_URL`
- [ ] Apply the current Prisma schema with `npx prisma db push`
- [ ] Seed production data if required

### Step 3 — Deploy Render

- [ ] Connect GitHub repository
- [ ] Use `render.yaml` / `server` as root
- [ ] Configure environment variables
- [ ] Deploy
- [ ] Check `/api/health`

### Step 4 — Deploy Vercel

- [ ] Connect GitHub repository
- [ ] Root directory: `client`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add `VITE_API_URL`
- [ ] Add `VITE_STRIPE_PUBLISHABLE_KEY`
- [ ] Deploy

### Step 5 — Connect frontend ↔ backend

- [ ] Copy the Vercel frontend URL
- [ ] Set it as Render `CLIENT_URL`
- [ ] Redeploy Render
- [ ] Test API requests from Vercel

### Step 6 — Production testing

- [ ] Auth
- [ ] Events
- [ ] Seats
- [ ] Coupons
- [ ] Stripe
- [ ] Orders
- [ ] QR/tickets
- [ ] Concurrency
- [ ] Seat expiration
- [ ] Error handling

---

# ✅ Deployment Readiness

| Area | Status |
|---|---|
| React/Vite frontend | ✅ Ready |
| Vercel configuration | ✅ Ready |
| SPA routing | ✅ Configured |
| Express backend | ✅ Ready |
| Production `npm start` | ✅ Ready |
| Render configuration | ✅ Ready |
| Health endpoint | ✅ Ready |
| Neon compatibility | ✅ Ready |
| Stripe integration | ✅ Ready |
| Cloudinary integration | ✅ Ready |
| Docker local setup | ✅ Ready |
| CORS | 🔴 Fix required |
| Prisma production migrations | 🔴 Fix/handle before deployment |
| Production seed credentials | 🟠 Configure if seeding |
| Production env vars | 🟠 Configure |
| End-to-end production testing | 🟠 Required |

---

## Minimum fixes before clicking Deploy

If you want the shortest possible list, **do these first**:

1. **Fix CORS in `server/server.js`.**
2. **Handle the incomplete Prisma migrations** — use `db push` for the current project or properly create migrations.
3. **Configure all Render secrets/env vars.**
4. **Configure Vercel `VITE_API_URL` and Stripe publishable key.**
5. **Deploy Render and verify `/api/health`.**
6. **Deploy Vercel.**
7. **Run a complete production booking test.**
8. **Run the concurrency test against production.**

After these pass, Evently is ready for a real deployment.

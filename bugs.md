# Evently - Issue & Bug Tracking (`bugs.md`)

This document catalogs identified vulnerabilities, logic flaws, prototype placeholders, and repository configuration discrepancies discovered during the codebase audit, along with their resolution details.

---

## 1. Critical Vulnerabilities & Security (High Priority)

### 🟢 BUG-01: Payment Verification Bypass & Incomplete Validation
- **Location:** [`server/controllers/orderController.js`](file:///d:/Evently/server/controllers/orderController.js#L46-L55) & [`server/controllers/orderController.js`](file:///d:/Evently/server/controllers/orderController.js#L133-L144)
- **Status:** **Resolved** ✅
- **Severity:** Critical
- **Description:**
  1. The `verifyPayment` function previously returned `true` if `paymentIntentId` was missing or Stripe was not initialized, allowing free booking bypasses.
  2. `verifyPayment` was called prematurely before `serverTotalPrice` was computed.
  3. `verifyPayment` only checked `intent.status === "succeeded"` without validating that `intent.amount === Math.round(serverTotalPrice * 100)`, `intent.metadata.userId === req.user.id`, and `intent.metadata.seatIds === seatIds.slice().join(",")`.
- **Resolution:**
  - Rewrote `verifyPayment(intentId, userId, seatIds, totalRupees)` to strictly require both `stripe` and `intentId` (returns `false` if either is missing).
  - Asserts that `intent.status === "succeeded"`, `intent.amount === Math.round(totalRupees * 100)`, `intent.metadata.userId === userId`, and `intent.metadata.seatIds === seatIds.slice().join(",")`.
  - Moved the invocation in `processCheckout` to occur immediately **after** `serverTotalPrice` is calculated.

---

### 🟢 BUG-02: Missing Ownership Check & Parameter Mismatch in Coupon Update
- **Location:** [`server/controllers/couponController.js`](file:///d:/Evently/server/controllers/couponController.js#L59-L97) & [`server/routes/couponRoutes.js`](file:///d:/Evently/server/routes/couponRoutes.js#L22-L27)
- **Status:** **Resolved** ✅
- **Severity:** High
- **Description:**
  1. Route `PUT /api/coupons/:id` passed `id` as a URL param, but the controller read `id` exclusively from `req.body`.
  2. Any authenticated organizer could modify any coupon in the database without an ownership check.
- **Resolution:**
  - `updateCoupons` now extracts `id` from `req.params.id || req.body.id`.
  - Added strict ownership validation: `if (couponCheck.createdBy !== req.user.id) return res.status(403).json({ error: "Unauthorized: You do not own this coupon" });`.

---

## 2. Business Logic, Mock Fallbacks & Persistence (Medium Priority)

### 🟢 BUG-03: Hardcoded Fake Attendees Fallback in Attendee Roster
- **Location:** [`client/src/pages/OrganizerAttendees.jsx`](file:///d:/Evently/client/src/pages/OrganizerAttendees.jsx)
- **Status:** **Resolved** ✅
- **Severity:** Medium
- **Description:**
  - Component fell back to `sampleAttendees` (`Aarav Sharma`, `Priya Patel`, etc.) when an event had 0 bookings or when the API errored.
- **Resolution:**
  - Completely removed the `sampleAttendees` constant and fallback logic.
  - Initialized `attendees` state to `[]`.
  - Added a clean empty state card displaying "No attendees found" when `filteredAttendees.length === 0`.

---

### 🟢 BUG-04: Attendee Check-In Toggle Not Persisted Across Reloads
- **Location:** [`client/src/pages/OrganizerAttendees.jsx`](file:///d:/Evently/client/src/pages/OrganizerAttendees.jsx)
- **Status:** **Resolved** ✅
- **Severity:** Medium
- **Description:**
  - Toggling check-in status only mutated temporary React state, losing check-in marks on page reload.
- **Resolution:**
  - Check-in validations and timestamps are now synchronized with `localStorage` (`evently_checked_ins`), persisting guest check-ins across page reloads and browser sessions.

---

### 🟢 BUG-05: Hardcoded Analytics Growth Badges & Static Revenue Trends Chart
- **Location:**
  - [`client/src/pages/OrganizerAnalytics.jsx`](file:///d:/Evently/client/src/pages/OrganizerAnalytics.jsx#L103)
  - [`client/src/components/Organizer/MetricsCards.jsx`](file:///d:/Evently/client/src/components/Organizer/MetricsCards.jsx#L29-L36)
  - [`client/src/components/Organizer/FinancialPerformance.jsx`](file:///d:/Evently/client/src/components/Organizer/FinancialPerformance.jsx)
- **Status:** **Resolved** ✅
- **Severity:** Low / UI Polish
- **Description:**
  - Hardcoded growth badges (`+18.4%`, `+14.8%`, `+8.5%`) were rendered regardless of sales.
  - Revenue trends chart showed hardcoded static ₹50,000 curves with fixed May–Oct labels.
- **Resolution:**
  - Replaced hardcoded percentage badges with live calculated statistics (e.g. booked tickets counter and confirmed statuses).
  - Dynamic X-axis month labels are now computed from the actual preceding 6 months based on the current calendar date.
  - Added a clean zero-sales placeholder message when `totalRev === 0` rather than plotting synthetic data.

---

## 3. DevOps, Testing & Environment Configuration (Hygiene & Portability)

### 🟢 BUG-06: Test Suite Excluded in `server/.gitignore`
- **Location:** [`server/.gitignore`](file:///d:/Evently/server/.gitignore)
- **Status:** **Resolved** ✅
- **Severity:** Medium
- **Description:**
  - `tests` was listed in `server/.gitignore`, preventing `server/tests/concurrency.test.js` from being tracked.
- **Resolution:**
  - Removed `tests` line from [`server/.gitignore`](file:///d:/Evently/server/.gitignore).
  - Staged [`server/tests/`](file:///d:/Evently/server/tests/) so `npm test` works out-of-the-box on clone.

---

### 🟢 BUG-07: Hardcoded Neon Hostname and Static IP in Docker Compose
- **Location:** [`docker-compose.yml`](file:///d:/Evently/docker-compose.yml)
- **Status:** **Resolved** ✅
- **Severity:** Medium
- **Description:**
  - `docker-compose.yml` hardcoded a personal Neon database endpoint and AWS IP address in `extra_hosts`.
- **Resolution:**
  - Removed `extra_hosts` block from [`docker-compose.yml`](file:///d:/Evently/docker-compose.yml), restoring container network portability.

---

### 🟢 BUG-08: Environment Variable Mismatch in Client Example
- **Location:** [`client/.env.example`](file:///d:/Evently/client/.env.example) & [`client/src/utils/api.js`](file:///d:/Evently/client/src/utils/api.js)
- **Status:** **Resolved** ✅
- **Severity:** Low
- **Description:**
  - `.env.example` defined `VITE_API_BASE_URL` while `api.js` read `VITE_API_URL`.
- **Resolution:**
  - Updated [`client/.env.example`](file:///d:/Evently/client/.env.example) to specify `VITE_API_URL`.
  - Updated [`client/src/utils/api.js`](file:///d:/Evently/client/src/utils/api.js) to support both `VITE_API_URL || VITE_API_BASE_URL` for full backward compatibility.

---

### 🟢 BUG-09: Tracked `server/node_modules` in Git Index
- **Location:** `server/node_modules/` (git index)
- **Status:** **Resolved** ✅
- **Severity:** Low / Repo Hygiene
- **Description:**
  - Thousands of files inside `server/node_modules` were previously tracked in Git index.
- **Resolution:**
  - Executed `git rm -r --cached server/node_modules` to untrack node modules from version control while preserving local installs.

---

## Summary Checklist

| ID | Issue | Severity | Target File(s) | Status |
|:---|:---|:---:|:---|:---:|
| **BUG-01** | Payment verification bypass & missing metadata checks | 🔴 Critical | [`orderController.js`](file:///d:/Evently/server/controllers/orderController.js) | ✅ Resolved |
| **BUG-02** | Coupon update missing ownership check & params mismatch | 🔴 High | [`couponController.js`](file:///d:/Evently/server/controllers/couponController.js) | ✅ Resolved |
| **BUG-03** | Fake `sampleAttendees` fallback on empty/failed bookings | 🟡 Medium | [`OrganizerAttendees.jsx`](file:///d:/Evently/client/src/pages/OrganizerAttendees.jsx) | ✅ Resolved |
| **BUG-04** | Attendee check-in status only in local state | 🟡 Medium | [`OrganizerAttendees.jsx`](file:///d:/Evently/client/src/pages/OrganizerAttendees.jsx) | ✅ Resolved |
| **BUG-05** | Static growth percentages & hardcoded Revenue Trends chart | 🟡 Low | [`FinancialPerformance.jsx`](file:///d:/Evently/client/src/components/Organizer/FinancialPerformance.jsx) | ✅ Resolved |
| **BUG-06** | `tests` folder gitignored in `server/.gitignore` | 🟢 Medium | [`server/.gitignore`](file:///d:/Evently/server/.gitignore) | ✅ Resolved |
| **BUG-07** | Hardcoded Neon endpoint & IP in `extra_hosts` | 🟢 Medium | [`docker-compose.yml`](file:///d:/Evently/docker-compose.yml) | ✅ Resolved |
| **BUG-08** | Client `.env.example` key mismatch (`VITE_API_BASE_URL`) | 🟢 Low | [`client/.env.example`](file:///d:/Evently/client/.env.example) | ✅ Resolved |
| **BUG-09** | Tracked `server/node_modules` in Git index | 🟢 Low | Git Index | ✅ Resolved |

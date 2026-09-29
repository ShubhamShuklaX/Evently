# Evently --- Project Context & Learning Plan

## 1. Purpose of This File

This file is the persistent context for the **Evently** project.

If the assistant ever lacks context, is unsure about a previous project
decision, or cannot reliably remember how Evently is being built, **ask
the user to provide this Markdown file before guessing or continuing**.

Do not invent missing project context.

------------------------------------------------------------------------

# 2. Project Goal

Build **Evently**, a full-stack event-booking application designed
specifically as a learning project.

The main technical challenge is:

> **One seat, hundreds of simultaneous users, exactly one successful
> booking.**

The project should progress from beginner-level MERN concepts toward
intermediate full-stack/backend engineering concepts.

The goal is not merely to make a pretty CRUD application. The booking
system should eventually demonstrate real-world concepts such as:

-   Concurrency
-   Race conditions
-   Database transactions
-   Atomic operations
-   Idempotency
-   Temporary seat holds
-   Payment states
-   Authentication and authorization
-   Error handling
-   Testing
-   Load/concurrency testing
-   Production-oriented backend practices
-   Deployment

------------------------------------------------------------------------

# 3. User's Current Skill Level / Constraints

The user is learning while building.

## Language

-   **JavaScript only**
-   Do **not** switch the project to TypeScript.
-   The user currently does not understand TypeScript.

## JavaScript knowledge

The user knows basic JavaScript but is still learning:

-   Promises
-   Callbacks
-   async/await
-   Related asynchronous JavaScript concepts

These concepts must be taught when they become relevant.

Do not assume advanced JavaScript knowledge.

## React

The user is learning React fundamentals.

Current concepts encountered:

-   React + Vite
-   Components
-   `useState`
-   `useEffect`
-   `fetch`
-   Promises
-   `async/await`
-   Rendering API data
-   `.map()`
-   JSX
-   Basic error handling
-   CORS
-   Props are the next major concept to learn

## Learning style

The user explicitly wants to:

> **Learn while building the project.**

Do not dump a finished codebase.

Preferred teaching approach:

1.  Explain the concept.
2.  Show a small example when necessary.
3.  Give the user a manageable coding task.
4.  Let the user write the code.
5.  Review/debug their code.
6.  Explain why it works or why it fails.
7.  Move to the next concept only after the current concept is
    understood.

The project should gradually become more sophisticated.

------------------------------------------------------------------------

# 4. Project Structure

The user wants a separate frontend and backend.

Current intended structure:

``` text
Evently/
├── client/
│   └── React + Vite application
│
└── server/
    └── Node.js + Express application
```

Do not combine the frontend and backend into one folder/application.

------------------------------------------------------------------------

# 5. Current Backend

The backend uses:

-   Node.js
-   Express
-   CORS

Current basic server concept:

``` js
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
```

The backend currently runs on:

``` text
http://localhost:5000
```

------------------------------------------------------------------------

# 6. Current Events API

The user created an initial in-memory events array:

``` js
const events = [
  {
    id: 1,
    title: "Rock Concert",
    location: "Delhi",
    price: 999,
  },
  {
    id: 2,
    title: "Tech Conference",
    location: "Bangalore",
    price: 1499,
  },
];
```

Current API:

``` text
GET /api/events
```

Response:

``` json
{
  "events": [
    {
      "id": 1,
      "title": "Rock Concert",
      "location": "Delhi",
      "price": 999
    },
    {
      "id": 2,
      "title": "Tech Conference",
      "location": "Bangalore",
      "price": 1499
    }
  ]
}
```

Eventually this in-memory data should be replaced with MongoDB/Mongoose.

------------------------------------------------------------------------

# 7. Current Frontend

The user has successfully learned how to fetch the backend API from
React.

Current pattern:

``` jsx
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const result = await response.json();
        setData(result.events);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  return (
    <div>
      {data?.map((event) => {
        return (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <h2>{event.location}</h2>
            <h2>{event.price}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default App;
```

Important learning points already covered:

-   `useState` stores data that can change.
-   Changing state causes React to re-render.
-   `useEffect` is being used to perform the API request after
    rendering.
-   `fetch()` returns a Promise.
-   `await` waits for the Promise result inside an async function.
-   `.map()` creates a rendered item for each event.
-   When an arrow function uses `{}`, an explicit `return` is required.
-   When an arrow function uses `(...)`, JSX can be implicitly returned.
-   React list items should have a stable `key`, preferably a database
    ID.

------------------------------------------------------------------------

# 8. Async JavaScript Concepts Already Practiced

The user practiced basic Promises.

Example:

``` js
const promise = new Promise((resolve, reject) => {
  resolve("Booking Successful");
});

promise.then((result) => {
  console.log(result);
});
```

They also practiced delayed resolution:

``` js
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Booking Successful");
  }, 3000);
});
```

And:

``` js
async function test() {
  const result = await promise;
  console.log(result);
}

test();
```

They also practiced rejection:

``` js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Booking failed");
  }, 3000);
});
```

with:

``` js
async function test() {
  try {
    const result = await promise;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
```

Important teaching note:

The user initially made the mistake of putting `try/catch` around the
call to an async function rather than around the awaited operation
inside the async function. This should be reinforced when error handling
is taught again.

------------------------------------------------------------------------

# 9. CORS Lesson

The frontend runs on:

``` text
http://localhost:5173
```

The backend runs on:

``` text
http://localhost:5000
```

The user encountered a CORS error because these are different origins.

The backend was fixed using:

``` js
const cors = require("cors");

app.use(cors());
```

The user now understands that the browser can block frontend requests to
a different origin unless the backend permits them.

------------------------------------------------------------------------

# 10. Planned Learning Roadmap

The project should be built in stages.

## Phase 1 --- React Fundamentals

Teach:

-   Components
-   Props
-   Component composition
-   Event handlers
-   Forms
-   Controlled inputs
-   Conditional rendering
-   Loading states
-   Error states
-   React Router
-   Reusable components
-   Basic custom hooks

Build:

``` text
Home
  ↓
Event Discovery
  ↓
Event Details
```

Next immediate lesson:

> **React components + props**, starting with an `EventCard` component.

Expected structure:

``` text
client/
└── src/
    ├── components/
    │   └── EventCard.jsx
    └── App.jsx
```

------------------------------------------------------------------------

# 11. Phase 2 --- Proper Express Backend

Refactor the backend from a single file into:

``` text
server/
├── server.js
├── routes/
├── controllers/
├── models/
├── middleware/
└── utils/
```

Teach:

-   REST APIs
-   HTTP methods
-   GET/POST/PATCH/DELETE
-   Route parameters
-   Query parameters
-   Request body
-   Middleware
-   Controllers
-   Error handling
-   Environment variables
-   API organization

------------------------------------------------------------------------

# 12. Phase 3 --- MongoDB + Mongoose

Replace in-memory arrays with a real database.

Planned models:

``` text
User
Event
Venue
Seat
Booking
Payment
```

Teach:

-   MongoDB basics
-   Collections
-   Documents
-   Mongoose schemas
-   Models
-   References/relationships
-   Validation
-   Indexes
-   Queries
-   Updates
-   Atomic operations

------------------------------------------------------------------------

# 13. Phase 4 --- Authentication & Authorization

Build login/signup based on the Evently authentication design.

Teach:

-   Registration
-   Login
-   Password hashing
-   JWT
-   Authentication middleware
-   Protected routes
-   Authorization
-   Roles

Roles:

``` text
USER
├── Browse events
├── Book seats
└── View bookings

ORGANIZER
├── Create events
├── Manage events
└── View sales

ADMIN
├── Manage users
├── Manage events
└── Platform analytics
```

------------------------------------------------------------------------

# 14. Phase 5 --- Event System

Build:

-   Event listing
-   Event search
-   Event filters
-   Event details
-   Categories
-   Locations
-   Pricing
-   Event creation
-   Event editing

Use reusable React components.

------------------------------------------------------------------------

# 15. Phase 6 --- Seat System

This is the central feature.

The UI should support:

``` text
AVAILABLE
SELECTED
HELD
BOOKED
```

Example:

``` text
             STAGE

A   ○ ○ ○ ○ ○ ○ ○ ○
B   ○ ○ ● ○ ○ ○ ○ ○
C   ○ ○ ○ ○ X ○ ○ ○
```

Where:

``` text
○ AVAILABLE
● SELECTED
◉ HELD
X BOOKED
```

Teach:

-   Complex React state
-   Derived state
-   Component communication
-   Seat modeling
-   Database relationships
-   Seat APIs
-   Availability state

------------------------------------------------------------------------

# 16. Phase 7 --- Concurrency / Race Conditions

This is the project's most important backend lesson.

Scenario:

``` text
Seat A15
   │
   ├── User 1
   ├── User 2
   ├── User 3
   ├── User 4
   ├── ...
   └── User 100
```

All users try to book the same seat.

Required outcome:

``` text
100 requests
      ↓
Database
      ↓
Exactly ONE succeeds
      ↓
99 fail safely
```

Teaching strategy:

First deliberately build a naive implementation that can double-book.

Then simulate concurrent requests.

Then explain and fix the race condition.

Teach:

-   Race conditions
-   Concurrency
-   Atomic updates
-   Conditional updates
-   Database transactions
-   Isolation
-   Consistency
-   Locks where appropriate
-   Why checking availability and booking separately can be unsafe

The user should understand the problem before implementing the solution.

------------------------------------------------------------------------

# 17. Phase 8 --- Temporary Seat Holds

Implement:

``` text
User selects A15
      ↓
Server creates temporary hold
      ↓
A15 = HELD
      ↓
10-minute countdown
      ↓
Payment
      ↓
SUCCESS → BOOKED
```

If the timer expires:

``` text
HELD → AVAILABLE
```

Example data:

``` js
{
  seatId: "A15",
  status: "HELD",
  heldBy: userId,
  holdExpiresAt: Date
}
```

Teach:

-   Time-based state
-   Expiration
-   Server-side time validation
-   Client countdown vs server truth
-   Cleanup/expiration strategies

The frontend countdown is only for UX. The backend/database must remain
authoritative.

------------------------------------------------------------------------

# 18. Phase 9 --- Payments

Initially use a fake payment system.

States:

``` text
INITIATED
↓
PROCESSING
↓
SUCCESS
```

or:

``` text
INITIATED
↓
PROCESSING
↓
FAILED
```

Test:

-   Payment success
-   Payment failure
-   Payment timeout
-   Network failure
-   User refresh
-   User clicking Pay twice

Do not initially integrate real financial transactions. The goal is to
learn the architecture safely.

------------------------------------------------------------------------

# 19. Phase 10 --- Idempotency

Important scenario:

``` text
User clicks PAY
      ↓
Request sent
      ↓
Payment succeeds
      ↓
Network dies
      ↓
Frontend receives no response
      ↓
User clicks PAY again
```

Without idempotency:

``` text
Booking #1
Booking #2
```

With idempotency:

``` text
Request ID: abc123

First request:
abc123 → process → SUCCESS

Second request:
abc123 → already processed
        → return same result
```

Core principle:

> One logical request should produce one effect.

Teach:

-   Idempotency keys
-   Duplicate requests
-   Safe retries
-   Payment/booking consistency
-   Why frontend-only protection is insufficient

------------------------------------------------------------------------

# 20. Phase 11 --- Booking Confirmation & Tickets

Build:

-   Booking confirmation
-   Booking ID
-   Event information
-   Seat information
-   QR code/ticket representation
-   Booking history
-   Upcoming bookings
-   Past bookings
-   Cancelled bookings
-   Payment pending state
-   Failed state

Planned booking statuses:

``` text
Payment Pending
Confirmed
Cancelled
Failed
Expired
```

------------------------------------------------------------------------

# 21. Phase 12 --- Testing

Test the system instead of trusting the UI.

Especially:

``` text
100 users
     ↓
same seat
     ↓
simultaneous requests
```

Expected:

``` text
Successful bookings: 1
Failed bookings: 99
Double bookings: 0
```

Teach:

-   API testing
-   Integration testing
-   Edge cases
-   Concurrency testing
-   Load testing
-   Debugging
-   Assertions

------------------------------------------------------------------------

# 22. Phase 13 --- Production-Oriented Backend Skills

Add:

### Backend

-   Centralized error handling
-   Request validation
-   Logging
-   Rate limiting
-   Security headers
-   Pagination
-   Search/filtering
-   Database indexes
-   API versioning
-   Environment variables

### Frontend

-   Loading states
-   Error states
-   Empty states
-   Protected routes
-   Reusable components
-   Custom hooks
-   Form validation
-   Responsive design
-   Accessibility

------------------------------------------------------------------------

# 23. Phase 14 --- Deployment / DevOps Basics

Eventually deploy:

``` text
React/Vite
    ↓
Frontend hosting

Node/Express
    ↓
Backend hosting

MongoDB
    ↓
Cloud database
```

Also teach:

-   Git
-   GitHub
-   Environment variables
-   Production configuration
-   Docker basics
-   CI/CD basics

------------------------------------------------------------------------

# 24. Evently UI / Wireframe Reference

The user provided Visily-generated designs as the visual target.

Important screens represented in the designs include:

-   Landing/Home
-   Authentication
-   Event Discovery
-   Event Details
-   Seat Selection
-   Seat Selection Booking Conflict
-   Seat Hold / Checkout
-   Checkout
-   Payment Processing
-   Payment Processing States
-   Booking Confirmation
-   My Bookings
-   Organizer Dashboard
-   Admin Dashboard
-   Create Event Flow

The designs use a modern premium event-booking aesthetic with:

-   Light backgrounds
-   Purple/indigo primary accent
-   Event photography
-   Rounded cards
-   Clear typography
-   Strong primary CTAs
-   Responsive layouts
-   Clear booking status indicators

Use the designs as the **visual/product target**, but prioritize
learning and correctness over pixel-perfect implementation at the
beginning.

------------------------------------------------------------------------

# 25. Important UX/System States

The application should eventually support:

-   Loading
-   Empty results
-   API failure
-   Network error
-   Event sold out
-   Seat unavailable
-   Seat becoming unavailable during selection
-   Seat hold expired
-   Payment failure
-   Payment timeout
-   Booking success
-   Booking failure
-   Duplicate/retried booking request
-   Session expiration
-   Unauthorized access
-   404 event not found

Especially important:

``` text
Booking Conflict

Seat A15 was just booked by another user.
Please select another seat.
```

This state should be connected to the actual backend concurrency
behavior rather than being fake UI only.

------------------------------------------------------------------------

# 26. Planned Component Architecture

Eventually create reusable components such as:

``` text
Navbar
SearchBar
EventCard
EventGrid
FilterPanel
SeatMap
Seat
BookingSummary
CountdownTimer
PaymentForm
BookingCard
StatusBadge
Modal
Toast
DashboardCard
DataTable
Chart
```

Do not build all of them immediately.

Introduce each component when the project needs it and explain why it
should be a component.

------------------------------------------------------------------------

# 27. Important Booking Flow

The final core flow should be approximately:

``` text
Home
  ↓
Search
  ↓
Event Details
  ↓
Seat Selection
  ↓
Seat Hold
  ↓
Checkout
  ↓
Payment
  ↓
Booking Confirmation
  ↓
My Bookings
```

Backend flow eventually:

``` text
React
  ↓
Select A15
  ↓
POST /api/bookings/hold
  ↓
Express
  ↓
Validate user
  ↓
Validate event
  ↓
Database
  ↓
Atomically claim seat
  ↓
Create hold
  ↓
Return hold ID
  ↓
Checkout
  ↓
Payment
  ↓
Idempotency check
  ↓
Transaction
  ↓
BOOKED
  ↓
Generate ticket
```

------------------------------------------------------------------------

# 28. Teaching Rules for the Assistant

When helping with Evently:

## Do

-   Teach concepts before using them when they are unfamiliar.
-   Use JavaScript, not TypeScript.
-   Keep frontend and backend separate.
-   Build incrementally.
-   Ask the user to write manageable pieces of code.
-   Review the user's code.
-   Explain errors in simple language.
-   Connect new concepts to the Evently feature being built.
-   Prefer understanding over speed.
-   Gradually increase difficulty from beginner to intermediate.
-   Use the provided designs as the product/UI reference.
-   Explain why an architectural decision is being made.
-   Introduce advanced concepts only when the project naturally reaches
    them.

## Do not

-   Dump the entire project codebase.
-   Assume the user already understands advanced JavaScript.
-   Switch to TypeScript.
-   Skip explanations for Promises, async/await, callbacks,
    transactions, concurrency, or idempotency.
-   Pretend a UI-only solution solves a backend consistency problem.
-   Guess missing project decisions if context is uncertain.

------------------------------------------------------------------------

# 29. Current Progress

Completed / understood at a basic level:

``` text
✅ React + Vite setup
✅ Separate server folder
✅ Node + Express setup
✅ npm init -y concept
✅ Express server
✅ Express GET route
✅ JSON responses
✅ CORS
✅ React useState
✅ React useEffect
✅ fetch()
✅ Promise basics
✅ async/await basics
✅ try/catch with async operations
✅ Fetching backend data
✅ Rendering API data
✅ Array.map()
✅ JSX return inside map()
```

Current learning point:

``` text
➡️ React components + props
```

Immediate next implementation:

``` text
EventCard.jsx
```

Then:

``` text
EventList
↓
React Router
↓
Event Details
```

------------------------------------------------------------------------

# 30. Context Recovery Rule

**This rule is mandatory.**

If the assistant is ever unsure about:

-   What has already been built
-   What the user already understands
-   The intended architecture
-   The current learning stage
-   The Evently feature roadmap
-   The UI/wireframe requirements
-   The user's JavaScript/React skill level
-   Whether a project decision was already made

then:

> **Ask the user to provide this `EVENTLY_PROJECT_CONTEXT.md` file
> before proceeding.**

Do not guess.

Do not silently invent previous decisions.

Do not restart the project unnecessarily.

The user specifically wants this file to be the source of truth for
restoring Evently context.

------------------------------------------------------------------------

# 31. Definition of Success

By the end, the user should be able to explain and implement a
full-stack event booking system in JavaScript and confidently discuss:

-   How React communicates with an Express API
-   How REST APIs work
-   How MongoDB stores application data
-   How authentication works
-   How authorization works
-   How seats are modeled
-   Why race conditions happen
-   Why a naive "check then book" implementation is unsafe
-   How atomic database operations help
-   When and why database transactions are needed
-   How temporary seat holds work
-   Why the server must be authoritative for expiration
-   How payment states work
-   Why retries happen
-   What idempotency means
-   How to prevent duplicate booking effects
-   How to test concurrent booking attempts
-   How to structure a production-oriented Node/React application
-   How to deploy the application

The target is not just:

> "I made a MERN project."

The target is:

> **"I understand why this booking system is correct under concurrent
> requests, and I can explain the architecture behind it."**

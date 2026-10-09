# Evently Frontend Responsiveness Checklist

## Pages

- [x] `src/pages/Home.jsx` — Updated root container, spacing, and multi-section responsive wrapper.
- [x] `src/pages/DiscoverEvents.jsx` — Replaced side-by-side flex with `flex-col lg:flex-row`, safe margins, and fluid filter drawer integration.
- [x] `src/pages/EventDetails.jsx` — Replaced fixed columns with responsive grid `grid-cols-1 lg:grid-cols-[1fr_360px]` and sticky booking sidebar on large screens.
- [x] `src/pages/SeatSelection.jsx` — Removed `px-30` rigid padding, converted grid to `grid-cols-1 lg:grid-cols-[1fr_380px]`, fluid container.
- [x] `src/pages/Checkout.jsx` — Removed `px-30` in fulfillment state, updated form container with responsive padding and spacing.
- [x] `src/pages/BookingSuccess.jsx` — Fluid max-w-5xl container, responsive 1-to-2 column action buttons, adaptive ticket preview.
- [x] `src/pages/MyBookings.jsx` — Replaced rigid padding with `max-w-7xl` container and fluid padding across all device viewports.
- [x] `src/pages/CreateEvent.jsx` — Adaptive container padding, fluid stepper integration, and full-width mobile action buttons.
- [x] `src/pages/EditEvent.jsx` — Adaptive container padding and responsive layout for editing existing events.
- [x] `src/pages/OrganizerDashboard.jsx` — Fluid max-w-7xl container, flex-col lg:flex-row sidebar layout, responsive action buttons and tab bar.
- [x] `src/pages/OrganizerAttendees.jsx` — Flex-col lg:flex-row layout, fluid metric cards, and horizontal scroll isolation for attendee roster table.
- [x] `src/pages/OrganizerAnalytics.jsx` — Flex-col lg:flex-row layout, responsive stat cards (`1 -> 2 -> 4` cols), and mobile-friendly event performance list.
- [x] `src/pages/OrganizerDiscounts.jsx` — Flex-col lg:flex-row layout, responsive header and action buttons, table wrapped in contained horizontal scroll.
- [x] `src/pages/NotFound.jsx` — already responsive (fluid max-w-md container, scalable typography, responsive button stack).

## Layout & Navigation

- [x] `src/components/Header.jsx` — Fluid container with max-w-7xl, added mobile drawer navigation with hamburger toggle, responsive search input.
- [x] `src/components/Footer.jsx` — Responsive 1-to-4 column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`), flexible newsletter subscription form.
- [x] `src/components/Organizer/Sidebar.jsx` — Adapted to horizontal pill bar on mobile and vertical sidebar on desktop (`w-full lg:w-64`).

## Shared & Reusable Components

- [x] `src/components/EventCard.jsx` — Fluid card container, mobile-first stacked list layout, clamped text, responsive image heights.
- [x] `src/components/LoadingSpinner.jsx` — already responsive (fluid centered spinner with scalable typography).
- [x] `src/components/Pagination.jsx` — Responsive button sizes (`w-8 h-8 sm:w-9 sm:h-9`), wrap-safe pagination controls for small screens.
- [x] `src/components/Reveal.jsx` — Added `w-full` and custom `className` prop support to prevent child container shrink issues.
- [x] `src/components/ScrollToTop.jsx` — already responsive (pure logic component, returns null).
- [x] `src/context/ToastContext.jsx` — Responsive toast placement (`left-4 right-4 sm:left-auto sm:right-5`), fluid modal dialog padding.
- [x] `src/context/BookingContext.jsx` — already responsive (pure React context and state provider).

## Authentication

- [x] `src/components/Auth/Login.jsx` — Replaced `px-25 py-20` with fluid responsive padding, stacked layout on mobile/tablet, right hero shown on `lg:block`.

## Landing Page Components

- [x] `src/components/Landing/HeroSection.jsx` — Removed fixed widths `w-135` and heights `h-150`, fluid typography, overlapping responsive SearchBar.
- [x] `src/components/Landing/SearchBar.jsx` — Stacked vertical layout on mobile, horizontal pill on desktop with fluid input widths.
- [x] `src/components/Landing/CategoryBar.jsx` — Removed `px-30` rigid padding, smooth touch-scrollable category chip row with no-scrollbar.
- [x] `src/components/Landing/FeaturedEvents.jsx` — Fluid max-w-7xl container, responsive card scroll with smooth touch-drag.
- [x] `src/components/Landing/WhatsTrending.jsx` — Fluid container, flex-col header on small screens, adaptive card heights.
- [x] `src/components/Landing/MarkYourCalendars.jsx` — Responsive 1-to-2 column grid, adaptive card layouts and fluid typography.
- [x] `src/components/Landing/AppPromo.jsx` — Removed `px-40` fixed padding, stacked layout on mobile/tablet, fluid phone mockup image.

## Discover Events Components

- [x] `src/components/DiscoverEvent/FilterBar.jsx` — Added mobile collapsible filter drawer toggle with active count badge; full sidebar on desktop.
- [x] `src/components/DiscoverEvent/EventList.jsx` — `min-w-0` safety, responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- [x] `src/components/DiscoverEvent/RecommendedEvents.jsx` — Removed `px-30` rigid padding, responsive max-w-7xl container.

## Event Details Components

- [x] `src/components/EventDetail/EventHero.jsx` — Removed fixed `w-180` and `right-30/left-30`, fluid title and meta flex-wrap.
- [x] `src/components/EventDetail/EventInfoBar.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-3` with fluid padding.
- [x] `src/components/EventDetail/AboutEvent.jsx` — Responsive typography and prose width.
- [x] `src/components/EventDetail/GettingThere.jsx` — Fluid card padding (`p-5 sm:p-6`) and responsive map link.
- [x] `src/components/EventDetail/OrganizerCard.jsx` — Safe truncation and fluid card padding.
- [x] `src/components/EventDetail/BookingCard.jsx` — Fluid card padding (`p-5 sm:p-6`), sticky only on desktop viewports.

## Seat Selection Components

- [x] `src/components/SeatSelection/SeatSelectionBar.jsx` — Wrap-safe breadcrumb and timer controls, max-w-7xl container.
- [x] `src/components/SeatSelection/SeatEventInfo.jsx` — Fluid typography and responsive category badge.
- [x] `src/components/SeatSelection/SeatingInfo.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-2`.
- [x] `src/components/SeatSelection/SeatMap.jsx` — Contained horizontal scrolling inside map container with `touch-pan-x`, mobile gesture hint, responsive legend wrap.
- [x] `src/components/SeatSelection/SeatRow.jsx` — already responsive (contained within SeatMap scrollable arena).
- [x] `src/components/SeatSelection/Seat.jsx` — already responsive (fixed touch target dimensions with shrink-0).
- [x] `src/components/SeatSelection/BookingSummary.jsx` — Fluid padding, sticky only on `lg:` viewports.

## Checkout Components

- [x] `src/components/Checkout/CheckoutBar.jsx` — Removed `px-30`, max-w-7xl container, responsive breadcrumbs and timer badge.
- [x] `src/components/Checkout/CheckoutStepBar.jsx` — Fluid container, shrink-safe steps, hidden step names on tiny mobile.
- [x] `src/components/Checkout/CheckoutEventCard.jsx` — Stacks image and details on mobile screens, fluid image thumbnail.
- [x] `src/components/Checkout/ContactInfo.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-2`.
- [x] `src/components/Checkout/Field.jsx` — already responsive (full-width input container).
- [x] `src/components/Checkout/PaymentMethod.jsx` — Wrapped security badge, responsive card padding (`p-5 sm:p-8`).
- [x] `src/components/Checkout/OrderSummary.jsx` — Fluid card padding (`p-5 sm:p-6`).
- [x] `src/components/Checkout/StateSwitcher.jsx` — `max-w-[94vw] overflow-x-auto` to prevent state badge overflow.
- [x] `src/components/Checkout/PaymentStatus.jsx` — Scalable heading typography, fluid width progress track.
- [x] `src/components/Checkout/TrustCards.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-3`.

## Booking Success Components

- [x] `src/components/Success/SuccessSummary.jsx` — Fluid card padding (`p-5 sm:p-6`) for order details and event guidelines.
- [x] `src/components/Success/DigitalTicket.jsx` — Responsive header padding and scroll container.
- [x] `src/components/Success/RecommendedEvents.jsx` — Responsive max-w-7xl padding and header wrap.

## My Bookings Components

- [x] `src/components/MyBookings/BookingStats.jsx` — Responsive typography and stats widget (`grid-cols-1 sm:grid-cols-3`).
- [x] `src/components/MyBookings/BookingToolbar.jsx` — Horizontal swipeable tabs with `no-scrollbar`.
- [x] `src/components/MyBookings/BookingCard.jsx` — Fluid image sizing and responsive details layout.
- [x] `src/components/MyBookings/PromoBanner.jsx` — Fluid typography and padding (`p-5 sm:p-8`).
- [x] `src/components/MyBookings/QuickLinks.jsx` — Fluid padding (`p-5 sm:p-6`) and responsive grid gap.

## Create Event Components

- [x] `src/components/CreateEvent/Stepper.jsx` — Compact mobile step badge, full horizontal stepper on desktop.
- [x] `src/components/CreateEvent/StepInfo.jsx` — already responsive (fluid form inputs).
- [x] `src/components/CreateEvent/StepLocation.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-2`.
- [x] `src/components/CreateEvent/StepTickets.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-2`.
- [x] `src/components/CreateEvent/StepMedia.jsx` — Fluid dropzone padding (`p-6 sm:p-10`) and responsive banner preview height.

## Organizer Dashboard Components

- [x] `src/components/Organizer/MetricsCards.jsx` — Responsive grid `grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`, fluid typography.
- [x] `src/components/Organizer/FinancialPerformance.jsx` — Fluid card padding (`p-5 sm:p-8`), flex-col header on small screens, wrap-safe range buttons.
- [x] `src/components/Organizer/MyEvents.jsx` — Container updated to `flex-col lg:flex-row max-w-7xl`.
- [x] `src/components/Organizer/MyEvents/MyEventsHeader.jsx` — Scalable typography and wrap-safe action buttons.
- [x] `src/components/Organizer/MyEvents/MyEventsStats.jsx` — Fluid padding and gap (`p-4 sm:p-5`, `gap-4 sm:gap-5`).
- [x] `src/components/Organizer/MyEvents/MyEventsFilters.jsx` — Added `no-scrollbar` and `whitespace-nowrap` to filter chips.
- [x] `src/components/Organizer/MyEvents/EventsTable.jsx` — Contained 7-column table in `overflow-x-auto min-w-[760px]`.

## Styles & Root Layout

- [x] `src/App.jsx` — Min-h-screen root wrapper with flex flex-col.
- [x] `src/index.css` — Standard typography and utility classes; custom `no-scrollbar` definitions.
- [x] `src/App.css` — already responsive (scoped styles and utilities).

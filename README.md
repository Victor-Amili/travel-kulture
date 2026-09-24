# TravelKulture

Production-oriented foundation for the TravelKulture travel agency website.

## What is included

- Next.js + TypeScript application structure
- TravelKulture brand/logo preserved from the supplied project
- Home page
- Upcoming tours
- Tour detail pages
- Booking flow foundation
- My Trip / itinerary tracker foundation
- Reviews
- Souvenir shop foundation
- Radio page
- Contact/support
- Admin dashboard foundation
- Supabase client setup
- Production database schema for Supabase
- Environment variable template

## Run locally

1. Install Node.js LTS.
2. Open this folder in a terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `database/schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase URL and anon key.
6. Restart the development server.

## Payments

The booking UI is deliberately separated from payment integration. Paystack or Flutterwave can be connected to a server-side payment route after the business confirms its preferred payment provider and booking/payment rules.

Never place a Supabase service-role key or payment secret key in client-side code.

## Production roadmap

Phase 1: UI + routing + Supabase
Phase 2: authentication + customer profiles
Phase 3: tours + admin CRUD
Phase 4: bookings + payment verification
Phase 5: itinerary + trip updates
Phase 6: reviews + moderation
Phase 7: shop + orders
Phase 8: radio content + notifications
Phase 9: security, testing, analytics and deployment

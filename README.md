# EVOLT RIDE 🔋🚗

India's first EV-only mobility app — MVP (Version 1)

## Tech Stack

**Frontend:** React, React Router, Axios, Leaflet (OpenStreetMap)
**Backend:** Spring Boot 3, Spring Security, Spring Data JPA
**Database:** PostgreSQL
**Maps/Routing:** OpenStreetMap (Nominatim + OSRM) — free, no API key required

## Features (by Sprint)

| Sprint | Feature |
|--------|---------|
| 1 | Rider & Driver Registration |
| 2 | Login / Authentication, Rider–Driver login separation |
| 3 | React Router, Dashboards, Ride Booking, One Active Ride validation |
| 4 | Ride Entity/API, Rider Profile, Ride History |
| 5 | Driver Ride Requests — Accept / Reject |
| 6 | Ride Lifecycle — Started / Completed |
| 7 | Maps, Live Location, ETA (OpenStreetMap) |
| 8 | Fare Calculation & Trip Summary |
| 9 | Wallet, Ride Payments, Transaction History |
| 10 | Ratings, Reviews, Driver Statistics |
| 11 | Admin Dashboard — Users, Drivers, Rides, Analytics |
| 12 | Route protection, password hashing, deployment config, documentation |

## Local Setup

### Backend
```bash
cd backend
# Configure src/main/resources/application.properties with your local PostgreSQL credentials
mvn spring-boot:run
```
Runs on `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

### Environment Variables (frontend/.env)
```
VITE_API_URL=http://localhost:8080
```

## Default Admin Credentials
```
Email: admin@evoltride.com
Password: admin123
```
Change these in `AdminService.java` before going to production.

## API Overview

**Auth:** `POST /api/auth/login`

**Riders:** `POST /api/riders/register`, `GET /api/riders/profile/{email}`, `GET /api/riders/wallet/{email}`, `POST /api/riders/wallet/addmoney`, `GET /api/riders/transactions/{email}`

**Drivers:** `POST /api/drivers/register`, `GET /api/drivers/wallet/{email}`, `GET /api/drivers/transactions/{email}`

**Rides:** `POST /api/rides/book`, `GET /api/rides/history/{email}`, `GET /api/rides/pending`, `GET /api/rides/driver/{email}`, `GET /api/rides/{rideId}`, `PUT /api/rides/accept/{rideId}`, `PUT /api/rides/reject/{rideId}`, `PUT /api/rides/start/{rideId}`, `PUT /api/rides/complete/{rideId}`, `PUT /api/rides/location/{rideId}`

**Reviews:** `POST /api/reviews/submit`, `GET /api/reviews/driver/{email}`, `GET /api/reviews/stats/{email}`

**Admin:** `POST /api/admin/login`, `GET /api/admin/riders`, `GET /api/admin/drivers`, `GET /api/admin/rides`, `GET /api/admin/analytics`

## Deployment
- Database: Render PostgreSQL / Supabase (free tier)
- Backend: Render Web Service (free tier)
- Frontend: Vercel / Netlify (free tier)

See Sprint 12 deployment notes for full steps.

## Known Limitations (Deferred Beyond v1)
- Admin login is a single hardcoded credential (no admin registration flow)
- No JWT/session-based auth — relies on frontend-stored role/email post-login
- No pagination on ride/transaction/review lists
- Fare formula is a fixed flat rate, not surge/dynamic pricing

## Roadmap Beyond v1
Future versions may explore: JWT authentication, admin account management, surge pricing, push notifications, and native mobile apps.
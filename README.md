# Zosh Bajar

Zosh Bajar is a full-stack e-commerce project with a Node.js/Express backend and a React + TypeScript frontend.

## Project Overview

This repository contains:

- **Backend**: REST APIs for auth, users, sellers, products, cart, orders, payments, reports, chatbot, wishlist, reviews, and coupons.
- **Frontend**: Customer/seller-facing UI built with Vite, React, Redux Toolkit, MUI, Tailwind, and Axios.

## Repository Structure

- `backend/` → Express API server
- `frontend/` → frontend workspace docs
- `frontend/zosh-bazaar/` → main Vite React application
- `image/` → static project assets

## Reviewer Quick Start

### 1) Clone and install

```bash
git clone <repo-url>
cd ZoshBajar
```

### 2) Run backend

```bash
cd backend
npm install
npm start
```

If `npm start` is not configured in your local setup, run:

```bash
node server.js
```

Backend default URL:

- `http://localhost:5000`

### 3) Run frontend

```bash
cd ../frontend/zosh-bazaar
npm install
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

## Documentation Index

- Backend API docs: `backend/README.md`
- Frontend setup docs: `frontend/README.md`
- Vite app default docs: `frontend/zosh-bazaar/README.md`

## Core Backend Modules

- `src/controller/` → request handlers
- `src/service/` → business logic
- `src/model/` → MongoDB/Mongoose schemas
- `src/routers/` → endpoint mapping
- `src/middlewares/` → auth and seller auth guards

## Key Frontend Modules

- `src/` → pages, components, app routing, and state integration
- `vite.config.ts` → Vite config
- `eslint.config.js` → lint rules

## Environment Notes

Backend commonly requires environment variables such as database and payment/chat keys (for example: MongoDB URI, Razorpay credentials, Gemini API key).

Frontend uses `VITE_*` variables (example):

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Review Checklist

1. Start backend and frontend successfully.
2. Verify auth flow (`/auth/signup`, `/auth/signin`).
3. Verify product listing/search and product detail APIs.
4. Verify cart → order → payment success flow.
5. Verify seller flows (seller login, seller products, seller orders/report).
6. Verify chatbot endpoint behavior when API key is configured.

## Suggested Review Entry Points

- API bootstrapping: `backend/src/index.js`
- Chatbot controller: `backend/src/controller/chatBotCntroller.js`
- Product controller: `backend/src/controller/productController.js`
- Frontend app entry: `frontend/zosh-bazaar/src/App.tsx`

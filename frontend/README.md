# Zosh Bazaar Frontend

This folder contains the frontend application for Zosh Bazaar.

## Project Structure

- `zosh-bazaar/` → main React + TypeScript + Vite app
- `package.json` (root `frontend/`) → legacy/shared dependency reference

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Router
- MUI
- Tailwind CSS
- Axios

## Prerequisites

- Node.js 18+
- npm 9+

## Install Dependencies

From this folder:

```bash
cd zosh-bazaar
npm install
```

## Run in Development

```bash
npm run dev
```

Default Vite URL is usually:

- `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Build output will be generated in:

- `zosh-bazaar/dist`

## Preview Production Build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env` file inside `frontend/zosh-bazaar` as needed by your app (example API base URL):

```env
VITE_API_BASE_URL=http://localhost:5000
```

In code, access with:

```ts
import.meta.env.VITE_API_BASE_URL
```

## Deployment Notes

- A deployment config exists at `frontend/zosh-bazaar/vercel.json`.
- For Vercel, set required `VITE_*` environment variables in the Vercel project settings.

## Quick Start

```bash
cd frontend/zosh-bazaar
npm install
npm run dev
```

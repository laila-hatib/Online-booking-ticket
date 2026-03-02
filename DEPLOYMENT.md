# Deployment Guide

## 1) Backend on Render

1. Push this project to GitHub.
2. In Render, create a new `Blueprint` and select your repo.
3. Render will read `render.yaml` and create `onlinebooking-backend`.
4. In Render service `Environment`, set:
   - `DJANGO_SECRET_KEY` (strong random value)
   - `DJANGO_ALLOWED_HOSTS` (include your Render backend domain, comma-separated)
   - `CORS_ALLOWED_ORIGINS` (include your Vercel frontend URL)
   - `CSRF_TRUSTED_ORIGINS` (include your Vercel frontend URL)
5. Create a Render PostgreSQL database and attach `DATABASE_URL` to backend service.
6. Deploy and confirm backend URL works:
   - `https://<your-backend>.onrender.com/api/users/`

## 2) Frontend on Vercel

1. In Vercel, import repo and set root directory to:
   - `Fronted projects/Onlinebookingproject`
2. Add environment variable:
   - `VITE_API_BASE_URL=https://<your-backend>.onrender.com/api`
3. Deploy.
4. Open deployed frontend URL and test register/login.

## 3) Final Production Values

- Backend `CORS_ALLOWED_ORIGINS` example:
  - `https://your-frontend.vercel.app`
- Backend `CSRF_TRUSTED_ORIGINS` example:
  - `https://your-frontend.vercel.app`
- Backend `DJANGO_ALLOWED_HOSTS` example:
  - `<your-backend>.onrender.com,localhost,127.0.0.1`

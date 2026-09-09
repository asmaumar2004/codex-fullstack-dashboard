# Frontend Plan

## Overview and Current Status

The frontend is a Next.js project using TypeScript, Tailwind CSS, ESLint, npm,
and the App Router. It lives inside `frontend/nextjs-dashboard` and communicates
with the FastAPI backend through HTTP requests.

## Current Frontend Structure

```text
frontend/
└── nextjs-dashboard/
    ├── app/
    │   ├── dashboard/
    │   │   └── page.tsx
    │   ├── login/
    │   │   └── page.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── DashboardHeader.tsx
    │   ├── Sidebar.tsx
    │   └── StatCard.tsx
    ├── lib/
    │   └── api.ts
    ├── public/
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
```

- `app/page.tsx` is the homepage.
- `app/login/page.tsx` submits credentials, saves the token, and redirects.
- `app/dashboard/page.tsx` validates the token and contains recent activity.
- `components` contains the reusable sidebar, header, and statistics card.
- `lib/api.ts` contains `loginUser` and `getCurrentUser`.
- Token storage currently uses `localStorage` directly in the pages.

This first version should stay simple and beginner-friendly. It will use basic token-based authentication for learning purposes.

## Planned Pages

### Homepage: `/`

The homepage will be the first page visitors see.

It should include:

- The project name
- A short description of the dashboard
- A link or button that opens the login page
- Simple styling that is easy to understand

### Login Page: `/login`

The login page will allow a user to sign in.

It should include:

- An email input
- A password input
- A login button
- A message for invalid login details or connection errors
- A loading state while the login request is running

When the form is submitted, the frontend will send the email and password to the backend login API. If the login succeeds, the frontend will save the returned token and send the user to `/dashboard`.

### Dashboard Page: `/dashboard`

The dashboard will be a protected page. A user should only see it after logging in.

It should include:

- A sidebar for navigation
- A header with a page title or user information
- Simple cards that display dummy dashboard information
- A logout button

When the page opens, the frontend will check for an authentication token. If there is no token, the user will be redirected to `/login`.

The dashboard can also call the backend current-user API to confirm that the token is valid and display the logged-in user's information. If the backend rejects the token, the frontend will remove it and redirect the user to `/login`.

## Authentication Flow

The first version will use a simple token-based flow:

1. The user enters an email and password on `/login`.
2. The login page sends the details to the backend login API.
3. The backend checks the dummy user details.
4. If they are correct, the backend returns a token.
5. The frontend stores the token for later requests.
6. The frontend redirects the user to `/dashboard`.
7. Protected backend requests include the token.
8. Logging out removes the token and redirects the user to `/login`.

This authentication is for learning. Token storage and security will need to be improved before using the application in production.

## API Helper

The `lib/api.ts` helper keeps backend request code in one place. Pages use this helper instead of repeating request URLs and request settings.

The helper currently provides functions for:

- Sending a login request
- Requesting the current user's information
- Adding the authentication token to protected requests
- Handling unsuccessful backend responses

The backend URL is currently `http://127.0.0.1:8000`. Moving it to an environment variable is a future improvement.

## Earlier Planned Folder Structure

```text
frontend/
├── app/
│   ├── dashboard/
│   │   └── page.js
│   ├── login/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── DashboardCard.js
│   ├── DashboardHeader.js
│   └── Sidebar.js
├── lib/
│   ├── api.js
│   └── auth.js
├── public/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## Earlier Planned File Responsibilities

- `app/page.tsx` contains the homepage for `/`.
- `app/login/page.tsx` contains the login form for `/login`.
- `app/dashboard/page.tsx` contains the protected dashboard for `/dashboard`.
- `app/layout.tsx` defines the shared HTML layout for all pages.
- `app/globals.css` will contain simple global styles.
- `components/Sidebar.tsx` contains the dashboard sidebar.
- `components/DashboardHeader.tsx` contains the dashboard header and logout button.
- `components/StatCard.tsx` provides a reusable card for dashboard information.
- `lib/api.ts` contains functions that send requests to the FastAPI backend.
- A separate `lib/auth.ts` is not used yet; the pages currently handle `localStorage` directly.
- `public` will contain static files such as images when they are needed.
- `.env.local` will contain the backend base URL for local development and must not be committed to GitHub.
- `package.json` will list the frontend scripts and dependencies.
- `README.md` will explain how to install, run, and test the frontend.

The structure above was the original plan. The **Current Frontend Structure** at
the start of this document is authoritative for the implemented project.

## Build Progress

Completed: Next.js setup, homepage, login form, API helper, backend login
connection, protected dashboard, current-user request, reusable dashboard
components, loading/error states, and logout behavior.

Possible future work: move the backend URL to an environment variable, improve
accessibility, and add automated frontend tests.

## Frontend Success Criteria

The frontend is working when a visitor can open the homepage, go to the login page, log in using the dummy user details, enter the protected dashboard, see its sidebar, header, and cards, and log out. A visitor without a valid token should be redirected from `/dashboard` to `/login`.

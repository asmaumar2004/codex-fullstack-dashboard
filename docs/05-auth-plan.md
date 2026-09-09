# Authentication Plan

## Overview

This project will start with very simple authentication. The goal is to learn how the frontend and backend work together during login.

This approach is only for learning. It must not be used for a real application with real users.

## Current Implementation

The beginner authentication flow is now implemented in both applications:

- FastAPI checks the dummy credentials and returns `demo-token`.
- The Next.js login page calls `loginUser` from `lib/api.ts`.
- A successful login saves the token as `access_token` in browser `localStorage`.
- The dashboard reads that token and calls `getCurrentUser`.
- The dashboard waits for FastAPI to validate the token before showing protected content.
- An invalid or missing token sends the visitor to `/login`.
- Logout removes `access_token` and sends the visitor to `/login`.

`localStorage` is browser storage for small text values. It keeps the demo token
after a page refresh. It is convenient for learning but is not the preferred
place for sensitive production authentication tokens.

## Dummy Login Details

Use these details to log in:

```text
Email: admin@example.com
Password: 123456
```

After a successful login, the backend will return this token:

```text
demo-token
```

## What Authentication Means

Authentication means checking who a user is.

In this project, the user enters an email and password. The backend checks whether they match the dummy login details. If they match, the backend treats the user as logged in.

## What a Token Is

A token is a piece of text that represents a successful login.

After login, the frontend saves the token and sends it with requests that need authentication. The backend checks the token before returning protected information.

The token in this project is always:

```text
demo-token
```

It works like a simple temporary pass. If a request includes the correct pass, the backend allows access to the protected route.

## How Login Works

The login process will work like this:

1. The user opens the `/login` page.
2. The user enters `admin@example.com` as the email.
3. The user enters `123456` as the password.
4. The frontend sends the email and password to `POST /auth/login`.
5. The backend compares them with the dummy user details.
6. If both values are correct, the backend returns `demo-token`.
7. The frontend saves the token.
8. The frontend sends the user to `/dashboard`.

If the email or password is wrong, the backend returns a `401 Unauthorized` error. The frontend should show a simple message such as "Incorrect email or password."

## How the Dashboard Is Protected

The `/dashboard` page should only be shown to an authenticated user.

When a user tries to open the dashboard:

1. The frontend checks whether it has a token.
2. If there is no token, it redirects the user to `/login`.
3. If there is a token, the frontend sends it to `GET /auth/me`.
4. The request uses this authorization header:

```text
Authorization: Bearer demo-token
```

5. The backend checks whether the token is exactly `demo-token`.
6. If it is correct, the backend returns the dummy user's information and the dashboard can be shown.
7. If it is missing or incorrect, the backend returns `401 Unauthorized`.
8. The frontend removes the invalid token and redirects the user to `/login`.

When the user clicks the logout button, the frontend removes the token and redirects the user to `/login`.

## Why This Is Beginner-Only Authentication

This approach is useful for learning because it has very few moving parts. However, it is not secure because:

- The email and password are fixed in the backend code.
- The password is stored as plain text.
- Every successful login receives the same token.
- The token does not expire.
- The token does not safely identify different users.
- A person who knows `demo-token` can use the protected API.
- There is no database for users or login sessions.
- There is no password reset or account management.

The dummy credentials and token must never be used to protect real user data.

## What a Production App Would Improve

A real production application would later add:

- A database for user accounts
- Securely hashed passwords instead of plain-text passwords
- A unique token or secure session for each login
- Tokens that expire after a limited time
- A safe way to refresh or replace expired tokens
- Secure cookie storage when appropriate
- HTTPS to protect information while it travels over the internet
- Environment variables for secrets and configuration
- Registration, logout, and password reset behavior
- User roles and permission checks when needed
- Protection against common attacks
- Logging, monitoring, and automated authentication tests

These improvements should be added only after the simple login flow is understood and working.

## Authentication Success Criteria

The beginner authentication flow is working when:

- `admin@example.com` and `123456` return `demo-token`.
- Incorrect login details return `401 Unauthorized`.
- A user with `demo-token` can open the dashboard and request current-user information.
- A user without the token is redirected to `/login`.
- An incorrect token is rejected and removed.
- Clicking logout removes the token and returns the user to `/login`.

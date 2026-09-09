# API Contract

## Overview

This document defines how the Next.js frontend and FastAPI backend communicate.

An API contract is an agreement between the frontend and backend. It describes each URL, the information the frontend sends, and the response the backend returns. Both sides should follow the same contract so they can work together correctly.

During local development, the frontend API helper uses this backend base URL:

```text
http://127.0.0.1:8000
```

## 1. Backend Health Check

### Request

```http
GET /
```

This is a public endpoint. It does not need login details or a token.

### Successful Response

```json
{
  "message": "FastAPI backend is running"
}
```

### Beginner-Friendly Explanation

The frontend, browser, or Postman can call this endpoint to check whether the backend server is running. If this message is returned, the FastAPI application is ready to receive requests.

## 2. Log In

### Request

```http
POST /auth/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

### Successful Response

```json
{
  "access_token": "demo-token",
  "token_type": "bearer"
}
```

### Error Response

```json
{
  "detail": "Invalid email or password"
}
```

### Beginner-Friendly Explanation

The login page sends the user's email and password to this endpoint. The backend compares them with the dummy user details.

If both values are correct, the backend returns `demo-token`. The frontend saves this token and uses it when requesting protected information.

If either value is incorrect, the backend returns the error message `Invalid email or password`. The frontend should show a clear error to the user and should not open the dashboard.

The successful response should use HTTP status `200 OK`. Incorrect credentials should use HTTP status `401 Unauthorized`.

## 3. Get the Current User

### Request

```http
GET /auth/me
Authorization: Bearer demo-token
```

This endpoint does not need a request body. It needs the token in the `Authorization` header.

### Successful Response

```json
{
  "email": "admin@example.com",
  "name": "Admin User"
}
```

### Error Response

```json
{
  "detail": "Not authenticated"
}
```

### Beginner-Friendly Explanation

The dashboard calls this endpoint to check the saved token and get information about the logged-in user.

`Bearer` tells the backend that the text after it is an authentication token. There must be one space between `Bearer` and `demo-token`.

If the token is correct, the backend returns the current user's email and name. The frontend can display this information in the dashboard header.

If the header is missing, incorrectly formatted, or contains the wrong token, the backend returns `Not authenticated`. The frontend should remove the invalid saved token and redirect the user to `/login`.

The successful response should use HTTP status `200 OK`. A missing or invalid token should use HTTP status `401 Unauthorized`.

## Contract Summary

| Method | Path | Authentication | Purpose |
| --- | --- | --- | --- |
| `GET` | `/` | None | Check that the backend is running |
| `POST` | `/auth/login` | Email and password | Log in and receive the demo token |
| `GET` | `/auth/me` | `Bearer demo-token` | Get the authenticated user's information |

## Frontend Usage

The frontend should follow this order:

1. Send the login form data to `POST /auth/login`.
2. Save `access_token` when login succeeds.
3. Add `Authorization: Bearer demo-token` when calling `GET /auth/me`.
4. Show the returned name and email on the dashboard.
5. Redirect to `/login` if an authentication request returns `401 Unauthorized`.

The implemented helper is `frontend/nextjs-dashboard/lib/api.ts`. The FastAPI
backend allows browser requests from `http://localhost:3000` through CORS.
Postman does not need CORS because CORS is a browser security rule.

This is a fixed demo contract for beginner learning. If an endpoint, field name, response message, or authentication method changes later, update this document and both applications together.

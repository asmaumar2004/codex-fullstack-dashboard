# Backend Plan

## Overview and Current Status

The backend is a FastAPI application inside `backend/fastapi-backend`. It
provides API routes for the Next.js frontend.

## Current Backend Structure

```text
backend/
└── fastapi-backend/
    ├── .venv/
    └── main.py
```

- `.venv` contains the local Python environment, FastAPI, and Uvicorn. It should not be committed to GitHub.
- `main.py` contains the FastAPI app, CORS setup, login request model, dummy credentials, demo token, health route, login route, and current-user route.

Keeping the current beginner backend in one Python file makes the complete flow
easy to follow. It can be split into smaller modules later when it grows.

The first version will use one dummy user and a simple demo token. This keeps authentication easy to understand while learning how frontend and backend applications work together.

This authentication system is for learning only. It is not secure enough for a real production application.

## Main Application

The `main.py` file will create the FastAPI application and connect the API routes.

It will include:

- The FastAPI application setup
- CORS configuration
- The `GET /` health route
- The authentication routes

The backend development server runs at `http://127.0.0.1:8000`.

## CORS Setup

CORS allows the frontend and backend to communicate when they run on different local ports.

The backend will allow requests from:

```text
http://localhost:3000
```

This is the normal local address for the Next.js frontend. The CORS configuration should allow the request methods and headers needed by the application.

## Planned Routes

### Health Route: `GET /`

This public route will confirm that the backend is running.

Example response:

```json
{
  "message": "FastAPI backend is running"
}
```

### Login Route: `POST /auth/login`

This public route will receive an email and password from the frontend.

Example request body:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

The route will compare these values with the dummy user. If they match, it will return a simple demo token and basic user information.

Example successful response:

```json
{
  "access_token": "demo-token",
  "token_type": "bearer"
}
```

If the email or password is incorrect, the route should return a clear authentication error with HTTP status code `401 Unauthorized`.

### Current User Route: `GET /auth/me`

This protected route will return information about the current user.

The frontend or Postman will send the demo token in the request header:

```text
Authorization: Bearer demo-token
```

If the token is correct, the route will return the dummy user's public information.

Example response:

```json
{
  "email": "admin@example.com",
  "name": "Admin User"
}
```

If the token is missing or incorrect, the route should return `401 Unauthorized`.

## Dummy Authentication Flow

The beginner authentication flow will work like this:

1. The backend stores one dummy user's name, email, and password in code.
2. The frontend sends login details to `POST /auth/login`.
3. The backend compares the submitted details with the dummy user.
4. Correct details receive the fixed demo token.
5. The frontend sends that token when requesting `GET /auth/me`.
6. The backend checks the token and returns the dummy user's information.
7. Missing or incorrect details receive a `401 Unauthorized` response.

Passwords and tokens should not be stored directly in code in a production application. Secure password hashing, a database, environment variables, and real token creation can be added later.

## Possible Future Backend Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── auth.py
│   ├── models.py
│   └── data.py
├── tests/
│   └── test_api.py
├── .gitignore
├── requirements.txt
└── README.md
```

## Folder and File Responsibilities

- `app/__init__.py` marks the `app` folder as a Python package.
- `app/main.py` creates the FastAPI application, configures CORS, and defines or includes the routes.
- `app/auth.py` contains the login route, current-user route, and demo-token check.
- `app/models.py` contains simple request and response models, such as the login form data.
- `app/data.py` contains the dummy user and demo token used for learning.
- `tests/test_api.py` will contain automated tests when backend testing is added.
- `.gitignore` prevents local Python files, virtual environments, and secret environment files from being committed.
- `requirements.txt` lists FastAPI, the development server, and any other required Python packages.
- `README.md` explains how to install, run, and test the backend.

Keeping routes, models, and dummy data in separate files will make their purposes easier to understand. For the very first step, the application may start with only `main.py` and then be separated as it grows.

## Suggested Build Order

1. Create the backend folder structure and Python virtual environment.
2. Install FastAPI and Uvicorn.
3. Create `main.py` and the `GET /` health route.
4. Run the server and test the health route.
5. Add CORS for `http://localhost:3000`.
6. Add the dummy user and request models.
7. Create and test `POST /auth/login`.
8. Add demo-token validation.
9. Create and test `GET /auth/me`.
10. Test successful and unsuccessful requests in Postman.
11. Update the backend documentation if the structure or behavior changes.

## Testing Plan

The API should be tested using the FastAPI documentation at `http://127.0.0.1:8000/docs` and with Postman.

Testing should confirm that:

- `GET /` returns a successful health message.
- Correct login details return the demo token.
- Incorrect login details return `401 Unauthorized`.
- `GET /auth/me` returns the user when the correct token is provided.
- `GET /auth/me` returns `401 Unauthorized` when the token is missing or incorrect.
- The frontend at `http://localhost:3000` can call the backend without a CORS error.

## Backend Success Criteria

The first backend version is working when FastAPI starts without errors, the health route responds, valid dummy credentials return a demo token, and the current-user route only returns user information when the correct token is provided.

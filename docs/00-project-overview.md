# Codex Full-Stack Dashboard

## Project Overview

Codex Full-Stack Dashboard is a beginner learning project for Asma.

The goal is to learn how a frontend and backend work together in a simple full-stack application. The frontend will use Next.js, and the backend will use FastAPI.

## Main Features

The application should include:

- A homepage
- A login page
- A protected dashboard page
- A FastAPI backend
- A login API
- A current user API
- Postman testing for the backend APIs
- Simple dummy authentication as the first authentication system
- GitHub repository setup

## Project Structure

The project has three main folders. The current application folders are:

```text
codex-fullstack-dashboard/
├── docs/
├── frontend/
│   └── nextjs-dashboard/
└── backend/
    └── fastapi-backend/
```

- `docs` contains project notes and documentation.
- `frontend/nextjs-dashboard` contains the Next.js application.
- `backend/fastapi-backend` contains the FastAPI application.

## Current Progress

The homepage, working login page, protected dashboard, reusable dashboard
components, frontend API helper, FastAPI health route, login API, current-user
API, CORS setup, dummy authentication, and Postman API tests are implemented.
GitHub repository setup and production-ready authentication are future tasks.

## Frontend

The Next.js frontend should provide the pages that users see and use.

The homepage should introduce the application and provide a way to go to the login page. The login page should collect simple login details and send them to the FastAPI backend. The dashboard page should only be available to a logged-in user.

## Backend

The FastAPI backend should provide APIs for the frontend.

The login API should check dummy login details and return a simple authentication result. The current user API should return information about the logged-in user when authentication is valid.

## Authentication

Start with simple dummy authentication so the project stays easy to understand. Use fixed test user details during the first version. This is for learning only and is not secure enough for a real production application.

More secure authentication can be added later after the basic frontend and backend connection works.

## API Testing

Use Postman to test the login API and current user API. Confirm that valid login details work, invalid details are rejected, and protected user information is only returned with valid authentication.

## GitHub

Set up a GitHub repository for the project. Commit the project in small steps so the learning progress is easy to follow. Do not commit secrets, passwords, generated dependency folders, or local environment files.

## Learning Goal

By completing this project, you will be able to understand:

- How to organize a full-stack project
- How to create pages with Next.js
- How to create APIs with FastAPI
- How a frontend calls a backend API
- How basic authentication and protected pages work
- How to test APIs with Postman
- How to track a project with Git and GitHub

## First-Version Success Criteria

The first version is complete when a user can open the homepage, go to the login page, log in with dummy credentials, view the protected dashboard, and request current-user information from the FastAPI backend. The backend APIs should also be tested successfully in Postman, and the project should be stored in a GitHub repository.

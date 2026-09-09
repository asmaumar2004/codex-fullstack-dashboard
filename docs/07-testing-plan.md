# Testing Plan

## Overview

This plan explains how to test the Codex Full-Stack Dashboard as a beginner. Test one part at a time so errors are easier to find.

The local application addresses are:

- Next.js frontend: `http://localhost:3000`
- FastAPI backend: `http://127.0.0.1:8000`
- FastAPI interactive docs: `http://127.0.0.1:8000/docs`

The dummy login details are:

```text
Email: admin@example.com
Password: 123456
Token: demo-token
```

## Before Testing

Start the backend and frontend in two separate PowerShell terminals. Keep both
terminals open while testing.

Backend terminal:

```powershell
cd C:\Users\asmau\Desktop\codex-fullstack-dashboard\backend\fastapi-backend
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Frontend terminal:

```powershell
cd C:\Users\asmau\Desktop\codex-fullstack-dashboard\frontend\nextjs-dashboard
npm run dev
```

If both servers are already running, do not start duplicate copies. Uvicorn
uses port `8000`, and Next.js uses port `3000`.

## 1. Test the FastAPI Backend

Open this address in a browser:

```text
http://127.0.0.1:8000
```

Expected result:

```json
{
  "message": "FastAPI backend is running"
}
```

If the browser shows this message, the backend is running and the `GET /` route works.

## 2. Test the FastAPI Documentation

Open this address in a browser:

```text
http://127.0.0.1:8000/docs
```

Expected result:

- A page titled Swagger UI appears.
- The `GET /`, `POST /auth/login`, and `GET /auth/me` endpoints are listed.
- Each endpoint can be opened and tested with the **Try it out** button.

This page is created automatically by FastAPI and is useful for checking available endpoints.

## 3. Test `GET /` in Postman

1. Open Postman and create a new HTTP request.
2. Select the `GET` method.
3. Enter `http://127.0.0.1:8000/`.
4. Select **Send**.

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "message": "FastAPI backend is running"
}
```

This is the same health route tested in the browser. Testing it in both places confirms that Postman can also reach the backend.

## 4. Test `POST /auth/login` in Postman

### Test a Successful Login

1. Create a new request in Postman.
2. Select the `POST` method.
3. Enter `http://127.0.0.1:8000/auth/login`.
4. Open the **Body** tab.
5. Select **raw** and choose **JSON**.
6. Enter this request body:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

7. Select **Send**.

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "access_token": "demo-token",
  "token_type": "bearer"
}
```

### Test an Incorrect Login

Change the password to an incorrect value and send the request again.

Expected status:

```text
401 Unauthorized
```

Expected response:

```json
{
  "detail": "Invalid email or password"
}
```

## 5. Test `GET /auth/me` in Postman

### Test with the Correct Bearer Token

1. Create a new request in Postman.
2. Select the `GET` method.
3. Enter `http://127.0.0.1:8000/auth/me`.
4. Open the **Authorization** tab.
5. Choose **Bearer Token** as the type.
6. Enter `demo-token` in the token field.
7. Select **Send**.

Postman will send this header:

```text
Authorization: Bearer demo-token
```

Expected status:

```text
200 OK
```

Expected response:

```json
{
  "email": "admin@example.com",
  "name": "Admin User"
}
```

### Test Without a Valid Token

Remove the token or change it to an incorrect value, and send the request again.

Expected status:

```text
401 Unauthorized
```

Expected response:

```json
{
  "detail": "Not authenticated"
}
```

## 6. Test the Next.js Frontend

Open this address in a browser:

```text
http://localhost:3000
```

Expected result:

- The homepage loads without an error.
- The project name and description are visible.
- A login link or button opens `http://localhost:3000/login`.
- The login page contains email and password inputs and a login button.

Also check the frontend terminal and the browser developer console for error messages.

## 7. Test Login from the Next.js Frontend

1. Open `http://localhost:3000/login`.
2. Enter `admin@example.com` in the email field.
3. Enter `123456` in the password field.
4. Select the login button.

Expected result:

- The frontend sends a request to the FastAPI login endpoint.
- The backend returns `demo-token`.
- The frontend saves the token.
- The browser moves to `http://localhost:3000/dashboard`.
- The dashboard displays the sidebar, header, cards, logout button, and current-user information.

Next, enter an incorrect password and try again.

Expected result:

- The dashboard does not open.
- A simple invalid-login message appears.

## 8. Test Dashboard Protection

### Test Without Logging In

1. Log out or remove the saved token using the browser's developer tools.
2. Enter `http://localhost:3000/dashboard` directly in the address bar.

Expected result:

- The dashboard is not shown.
- The browser redirects to `http://localhost:3000/login`.

### Test with an Invalid Token

1. Use the browser's developer tools to replace the saved token with an incorrect value.
2. Open or refresh `http://localhost:3000/dashboard`.

Expected result:

- The backend rejects the current-user request.
- The frontend removes the invalid token.
- The browser redirects to the login page.

### Test Logout

1. Log in with the correct dummy details.
2. Select the logout button on the dashboard.

Expected result:

- The frontend removes the saved token.
- The browser returns to the login page.
- Opening `/dashboard` again redirects back to `/login`.

## Recommended Testing Order

Test the project in this order:

1. Backend health route in the browser
2. FastAPI documentation
3. All backend routes in Postman
4. Frontend homepage and login page
5. Frontend login with correct and incorrect details
6. Dashboard with a valid token
7. Dashboard without a token and with an invalid token
8. Logout

If an early test fails, fix it before moving to the next test.

## What to Do When Something Breaks

Do not change several files immediately. First, identify which part is failing.

1. Read the complete error message.
2. Check the frontend and backend terminal windows for errors.
3. Decide whether the problem is in the frontend, backend, or connection between them.
4. Confirm that both development servers are running.
5. Check that the URL, HTTP method, request body, and header match the API contract.
6. Test `GET /` to confirm the backend is reachable.
7. Test the failing backend endpoint directly in Postman.
8. Check the browser developer console and **Network** tab for failed frontend requests.
9. Fix one likely cause at a time.
10. Repeat the exact test that failed.

### Common Problems

- **The page cannot be reached:** The related development server may not be running, or the address may be incorrect.
- **A `404 Not Found` response appears:** The URL or route may be incorrect.
- **A `401 Unauthorized` response appears:** The login details or token may be missing or incorrect.
- **A `422 Unprocessable Entity` response appears:** The JSON body may have missing fields, incorrect field names, or invalid values.
- **A CORS error appears in the browser:** The backend may not allow `http://localhost:3000`, or the frontend may be using a different address.
- **Postman works but the frontend fails:** Check the frontend API URL, request format, browser console, and CORS setup.
- **The frontend shows old behavior:** Save the files, refresh the page, and restart the development server if needed.
- **A port is already in use:** Another program may already be running on port `3000` or `8000`. Stop the older process or use the correct running server.

When asking Codex for help, include the command that was run, the full error message, the page or endpoint being tested, and what result was expected. Codex should explain the likely cause in simple English before making a change.

## Testing Success Criteria

Testing is successful when all three backend endpoints return the expected success and error responses, the frontend can log in through the backend, the dashboard only opens with the valid demo token, and logout removes access to the dashboard.

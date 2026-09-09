# Common Errors and Windows Fixes

## Overview

This document explains common errors that may happen while building the Codex Full-Stack Dashboard on Windows.

When something breaks:

1. Read the complete error message.
2. Check which terminal or browser produced it.
3. Try one fix at a time.
4. Repeat the same test after each fix.

## 1. `npx.ps1 Cannot Be Loaded`

### What It Means

PowerShell found `npx`, but Windows blocked its PowerShell script from running.

The error may include text like:

```text
npx.ps1 cannot be loaded because running scripts is disabled on this system
```

### Why It Happens

PowerShell uses an execution policy to control which scripts can run. The current policy may block the `npx.ps1` script installed with Node.js.

### How to Fix It

The simplest temporary option is to run the command through the Windows command version of npx:

```powershell
npx.cmd create-next-app@latest
```

You can also use Command Prompt instead of PowerShell and run:

```cmd
npx create-next-app@latest
```

If you want to allow locally created scripts for your Windows user, open PowerShell and run:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Read the confirmation question and enter `Y` only if you understand and accept the change. This changes the policy for your user account, so it is not required when `npx.cmd` already works.

Close and reopen PowerShell, then test:

```powershell
npx --version
```

## 2. `node` Is Not Recognized

### What It Means

Windows cannot find the Node.js program.

### Why It Happens

- Node.js is not installed.
- Node.js was installed without being added to `PATH`.
- The terminal was open before Node.js was installed.

`PATH` is a Windows setting that tells the terminal where programs are located.

### How to Fix It

1. Install the current Node.js LTS version from the official Node.js website.
2. Keep the option that adds Node.js to `PATH` enabled during installation.
3. Close every terminal and reopen VS Code.
4. Run:

```powershell
node --version
npm --version
```

Both commands should display version numbers.

If the error continues, check whether Windows can find Node.js:

```powershell
where.exe node
```

A normal installation commonly appears under `C:\Program Files\nodejs`. Repairing or reinstalling Node.js is usually simpler than editing `PATH` manually.

## 3. `python` Is Not Recognized

### What It Means

Windows cannot find the Python program when the `python` command is used.

### Why It Happens

- Python is not installed.
- Python was not added to `PATH` during installation.
- Windows expects the Python Launcher command, `py`, instead.
- A Microsoft Store app alias is opening or interfering with the command.

### How to Fix It

First, test the Windows Python Launcher:

```powershell
py --version
```

If it works, use `py` for this project. For example:

```powershell
py -m venv .venv
```

If neither `python` nor `py` works:

1. Install Python from the official Python website.
2. Enable **Add python.exe to PATH** during installation.
3. Close and reopen the terminal.
4. Test again:

```powershell
python --version
py --version
```

If typing `python` opens the Microsoft Store, open Windows **Manage app execution aliases** and disable the conflicting Python aliases, or continue using `py`.

## 4. Port 3000 Is Already in Use

### What It Means

The Next.js frontend wants to use port `3000`, but another running program is already using it.

### Why It Happens

- Another Next.js server is already running.
- An earlier terminal still has the frontend server running.
- A different application is using port `3000`.

### How to Fix It

First, check your open terminals. If an old frontend server is running, select its terminal and press:

```text
Ctrl+C
```

Then start the frontend again.

To find the process using port `3000`, run:

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

Look at its `OwningProcess` number, then inspect that process:

```powershell
Get-Process -Id PROCESS_ID
```

Replace `PROCESS_ID` with the number shown. Only stop it if you recognize it and know it is safe to close:

```powershell
Stop-Process -Id PROCESS_ID
```

Next.js may offer another port, such as `3001`. That can work, but the backend CORS setting must then allow the frontend's new address.

## 5. Port 8000 Is Already in Use

### What It Means

FastAPI or Uvicorn wants to use port `8000`, but another program is already using it.

### Why It Happens

- Another backend server is already running.
- An earlier terminal still has Uvicorn running.
- A different application is using port `8000`.

### How to Fix It

Check your terminals for an existing backend server. Press `Ctrl+C` in its terminal if you want to stop it.

To inspect port `8000`, run:

```powershell
Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue
```

Inspect the process using its `OwningProcess` number:

```powershell
Get-Process -Id PROCESS_ID
```

Only if you recognize that process and want to close it, run:

```powershell
Stop-Process -Id PROCESS_ID
```

The backend can use another port, but the frontend backend URL and testing documentation must be updated to match it.

## 6. Virtual Environment Is Not Activating

### What It Means

The Python virtual environment exists, but its activation command does not work or PowerShell blocks the activation script.

### Why It Happens

- The virtual environment has not been created.
- The command is being run from the wrong folder.
- The wrong activation command is being used for the terminal.
- PowerShell's execution policy blocks `Activate.ps1`.

### How to Fix It

From the `backend` folder, create the environment if it does not exist:

```powershell
py -m venv .venv
```

Activate it in PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

For Command Prompt, use:

```cmd
.venv\Scripts\activate.bat
```

When activation succeeds, the terminal prompt usually starts with `(.venv)`.

If PowerShell blocks the script, use Command Prompt or apply a policy only to the current PowerShell process:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

The `Process` scope lasts only until that PowerShell window is closed.

You can also use the environment without activating it:

```powershell
.\.venv\Scripts\python.exe -m pip --version
```

## 7. CORS Error

### What It Means

The browser blocked the frontend from reading a backend response because the backend did not allow the frontend's origin.

An origin includes the protocol, host, and port. For example, `http://localhost:3000` and `http://localhost:3001` are different origins.

### Why It Happens

- FastAPI CORS middleware is missing.
- The allowed origin does not exactly match the frontend address.
- The frontend started on a different port.
- The backend was not restarted after its CORS settings changed.
- The backend failed before it could return the expected CORS headers.

### How to Fix It

Confirm that FastAPI allows this exact development origin:

```text
http://localhost:3000
```

The backend should use `CORSMiddleware` and include that address in `allow_origins`.

Then:

1. Save the backend file.
2. Restart the backend server.
3. Confirm the frontend is actually running at `http://localhost:3000`.
4. Refresh the browser.
5. Check the browser developer tools **Network** tab for the failed request.

Do not add every possible origin as a permanent production fix. Allow only the frontend addresses the application needs.

## 8. Login Request Is Failing

### What It Means

The frontend sent a login request but did not receive the expected token response.

### Why It Happens

- The backend is not running.
- The frontend is using the wrong backend URL.
- The request uses the wrong method or path.
- The JSON field names do not match the API contract.
- The email or password is incorrect.
- CORS blocked the browser request.
- The backend returned an error.

### How to Fix It

Check the backend health route first:

```text
http://127.0.0.1:8000/
```

Then confirm the login request uses:

```text
POST http://127.0.0.1:8000/auth/login
```

The JSON body must be:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

Test this request in Postman. If Postman also fails, inspect the backend terminal and response body. If Postman works but the frontend fails, inspect the browser developer console and **Network** tab, then check the frontend API URL and CORS configuration.

## 9. Postman Body Is Not Working

### What It Means

FastAPI did not receive the JSON data in the expected format.

The response may be `422 Unprocessable Entity`, which means FastAPI received the request but could not validate its data.

### Why It Happens

- Postman is set to `form-data` or `Text` instead of JSON.
- The JSON syntax is invalid.
- A required field is missing.
- A field name uses the wrong spelling or capitalization.
- The `Content-Type` header is not `application/json`.

### How to Fix It

In Postman:

1. Select the **Body** tab.
2. Select **raw**.
3. Choose **JSON** from the format list.
4. Paste this exact body:

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

5. Confirm that Postman adds this header:

```text
Content-Type: application/json
```

6. Send the request and read the complete response. A FastAPI `422` response normally identifies the missing or invalid field.

## 10. Dashboard Is Not Redirecting

### What It Means

The dashboard stays open without authentication, or a logged-in user is not sent to the dashboard or login page as expected.

### Why It Happens

- The token check is missing or not running.
- The token was saved under a different name from the name being checked.
- Redirect code is using the wrong path.
- A browser-only API such as `localStorage` is being used in server code.
- The current-user request is not handling `401 Unauthorized`.
- An old or invalid token remains saved in the browser.

### How to Fix It

1. Open the browser developer tools.
2. Check whether `demo-token` was saved after login.
3. Confirm the dashboard checks the same storage key.
4. Confirm unauthenticated users are redirected to `/login`.
5. Confirm a successful login redirects to `/dashboard`.
6. Confirm a `401` response removes the token and redirects to `/login`.
7. Test again in a private browser window to avoid old saved data.

With the App Router, code that uses `localStorage`, React state, effects, or client-side navigation must run in a Client Component. Such a file needs this line at the top:

```javascript
"use client";
```

Also check the browser console for React or Next.js errors that stopped the redirect code.

## 11. `npm install` Issues

### What It Means

npm could not download or install the frontend packages listed in `package.json`.

### Why It Happens

- The internet connection is unavailable or unstable.
- Node.js or npm is missing or outdated.
- The command is running outside the `frontend` folder.
- A proxy, firewall, or antivirus program blocks npm.
- A package version conflict exists.
- The npm cache contains damaged download data.

### How to Fix It

Confirm the terminal is inside the frontend folder:

```powershell
Get-Location
```

Confirm Node.js and npm work:

```powershell
node --version
npm --version
```

Confirm that `package.json` exists:

```powershell
Test-Path .\package.json
```

Then try again:

```powershell
npm install
```

If the error mentions the cache, verify it:

```powershell
npm cache verify
```

Read the first clear error in the npm output. Messages near the end may only describe the result of an earlier problem.

If the error mentions network access, test the connection and check whether a work or school proxy, firewall, VPN, or antivirus setting is blocking npm. Do not disable security software without understanding the risk and having permission.

Avoid using `--force` or `--legacy-peer-deps` as the first fix. These options can hide a dependency problem instead of solving it.

## Errors Encountered in This Project

### `npm` Could Not Find `package.json`

This happened when `npm install` or `npm run dev` was run from the repository
root. The frontend `package.json` is in a deeper folder. Enter that folder first:

```powershell
cd C:\Users\asmau\Desktop\codex-fullstack-dashboard\frontend\nextjs-dashboard
npm run dev
```

### `'next' Is Not Recognized`

This means the local Next.js packages are missing or were not installed
successfully. From the folder containing `package.json`, run:

```powershell
npm install
npm run dev
```

### PowerShell Treated `--ts` as a Command

An option such as `--ts` cannot run by itself. It must be on the same command
line as `create-next-app`:

```powershell
npx.cmd create-next-app@latest nextjs-dashboard --ts --tailwind --eslint --app --use-npm
```

### Postman Cloud Agent Rejected `127.0.0.1`

Postman's Cloud Agent cannot reach a server running only on your computer.
Use the Postman Desktop application or select the Desktop Agent, then send the
request to `http://127.0.0.1:8000` again.

### Next.js Reported Multiple Lockfiles

Next.js found a `package-lock.json` in both the repository root and the actual
frontend. The frontend lockfile belongs in:

```text
frontend\nextjs-dashboard\package-lock.json
```

This warning does not stop the development server. An extra root lockfile may
have been created by running npm from the wrong folder. Confirm there is no root
`package.json` before deciding whether the root lockfile is unnecessary.

### `GET /docs 404` Appeared in the Next.js Terminal

This happens when `/docs` is opened on frontend port `3000`. FastAPI's automatic
documentation is on backend port `8000`:

```text
http://127.0.0.1:8000/docs
```

The frontend does not currently have a `/docs` page, so a `404` on port `3000`
is expected.

## Information to Share When Asking for Help

Include all of the following:

- The full command you ran
- The complete error message
- Whether the error came from PowerShell, the browser, Postman, Next.js, or FastAPI
- Your current folder from `Get-Location`
- The page or endpoint you were testing
- What you expected to happen
- What happened instead

This information helps Codex explain the cause in simple English and make the smallest appropriate fix.

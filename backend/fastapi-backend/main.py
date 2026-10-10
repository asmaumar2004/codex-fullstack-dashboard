import os

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# This model describes the JSON data expected by the login route.
class LoginRequest(BaseModel):
    email: str
    password: str


# These fixed values are only for learning. A real app would use a database.
DUMMY_EMAIL = "admin@example.com"
DUMMY_PASSWORD = "123456"
DEMO_TOKEN = "demo-token"

# Railway supplies the production frontend address through this variable.
# The localhost value keeps local development working.
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000").rstrip("/")


# Create the FastAPI application.
app = FastAPI()


# Allow the configured Next.js frontend to send requests to this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# This route checks that the backend is running.
@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running"}


# Check the submitted email and password, then return the demo token.
@app.post("/auth/login")
def login(login_data: LoginRequest):
    email_is_correct = login_data.email == DUMMY_EMAIL
    password_is_correct = login_data.password == DUMMY_PASSWORD

    if not email_is_correct or not password_is_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    return {
        "access_token": DEMO_TOKEN,
        "token_type": "bearer",
    }


# Return the dummy user only when the correct Bearer token is provided.
@app.get("/auth/me")
def get_current_user(authorization: str | None = Header(default=None)):
    expected_header = f"Bearer {DEMO_TOKEN}"

    if authorization != expected_header:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    return {
        "email": DUMMY_EMAIL,
        "name": "Admin User",
    }

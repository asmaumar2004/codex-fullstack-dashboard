// This is the address where the FastAPI backend runs during development.
export const BACKEND_URL = "http://127.0.0.1:8000";

// These types describe the data returned by the backend.
export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type CurrentUser = {
  email: string;
  name: string;
};

type ErrorResponse = {
  detail?: string;
};

// Send an email and password to the backend login route.
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail ?? "Login failed");
  }

  return response.json();
}

// Ask the backend for the user connected to the supplied token.
export async function getCurrentUser(token: string): Promise<CurrentUser> {
  const response = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.detail ?? "Could not get the current user");
  }

  return response.json();
}

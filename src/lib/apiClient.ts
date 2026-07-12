import { getAccessToken, getRefreshToken, setTokens } from "@/lib/authToken";
import type {
  Annotation,
  AuthResponse,
  Shape,
  Task,
  User,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api"; // Default to localhost if not set

let isRefreshing = false;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data: Record<string, string[] | string> | null = null,
  ) {
    super(message);
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  const headers = new Headers(options.headers || {});
  if (access) {
    headers.set("Authorization", `Bearer ${access}`);
  }
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  console.log("Sending request with headers:", headers);
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry && refresh) {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const { access: newAccess } = await refreshToken(refresh);
        setTokens(newAccess, refresh); // Update the in-memory token
        isRefreshing = false;
        return await request<T>(endpoint, options, false); // Retry original request
      } catch (e) {
        isRefreshing = false;
        setTokens(null, null); // Clear tokens on refresh failure
        window.location.href = "/login"; // Force redirect
        throw new ApiError(
          "Your session has ended. Please sign in again.",
          401,
        );
      }
    } else {
      // Wait for the token refresh to complete
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          if (!isRefreshing) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
      return await request<T>(endpoint, options, false);
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.detail || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, errorBody);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// --- Auth ---
export function register(fields: {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
}) {
  return request<{ message: string }>("/auth/register/", {
    method: "POST",
    body: JSON.stringify(fields),
  });
}

export function login(fields: { username: string; password: string }) {
  return request<AuthResponse>("/auth/login/", {
    method: "POST",
    body: JSON.stringify(fields),
  });
}

export function refreshToken(refresh: string) {
  return request<{ access: string }>("/auth/login/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh }),
  });
}

export function getProfile() {
  return request<User>("/auth/profile/");
}

// --- Tasks ---
export function listTasks() {
  return request<Task[]>("/tasks/");
}

export function createTask(fields: {
  title?: string;
  description?: string;
  status?: Task["status"];
  priority?: Task["priority"];
  due_date?: string;
}) {
  console.log("createTask payload:", JSON.stringify(fields));
  return request<Task>("/tasks/", {
    method: "POST",
    body: JSON.stringify(fields),
  });
}

export function getTask(id: number) {
  return request<Task>(`/tasks/${id}/`);
}

export function updateTask(
  id: number,
  fields: Partial<{
    title: string;
    description: string;
    status: Task["status"];
    priority: Task["priority"];
    due_date: string;
  }>,
) {
  return request<Task>(`/tasks/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });
}

export function deleteTask(id: number) {
  return request<void>(`/tasks/${id}/`, { method: "DELETE" });
}

// --- Annotations ---
export function listAnnotations() {
  return request<Annotation[]>("/annotations/");
}

export function createAnnotation(image: File, shapes: Shape[]) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("shapes", JSON.stringify(shapes));
  return request<Annotation>("/annotations/", {
    method: "POST",
    body: formData,
  });
}

export function getAnnotation(id: number) {
  return request<Annotation>(`/annotations/${id}/`);
}

export function updateAnnotation(
  id: number,
  fields: Partial<{ shapes: Shape[] }>,
) {
  return request<Annotation>(`/annotations/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(fields),
  });
}

export function deleteAnnotation(id: number) {
  return request<void>(`/annotations/${id}/`, { method: "DELETE" });
}

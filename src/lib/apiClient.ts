import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getAccessToken, getRefreshToken, setTokens } from "@/lib/authToken";
import type { Annotation, AuthResponse, Shape, Task, User } from "@/types";

type RetriableConfig = AxiosRequestConfig & { _retried?: boolean };
type ErrorData = Record<string, string[] | string> | null;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public isSessionExpired = false,
    public data: ErrorData = null,
  ) {
    super(message);
  }
}

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

api.interceptors.request.use((config) => {
  const access = getAccessToken();
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isAxiosError(error)) {
    const data = (error.response?.data ?? null) as ErrorData;
    const detail = data?.detail;
    return new ApiError(
      typeof detail === "string" ? detail : error.message,
      error.response?.status ?? 0,
      data,
    );
  }
  return new ApiError("Request failed.", 0);
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;
    const refresh = getRefreshToken();
    const isRefreshRequest = original?.url?.includes("/auth/login/refresh/");

    if (
      error.response?.status === 401 &&
      original &&
      !original._retried &&
      refresh &&
      !isRefreshRequest
    ) {
      original._retried = true;
      try {
        const { access } = await refreshToken(refresh);
        setTokens(access, refresh);
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${access}`;
        return api.request(original);
      } catch (refreshError) {
        setTokens(null, null);
        localStorage.removeItem("anvil-access");
        localStorage.removeItem("anvil-refresh");
        localStorage.removeItem("anvil-user");
        window.location.assign("/login");
        const apiError = toApiError(refreshError);
        apiError.isSessionExpired = true;
        return Promise.reject(apiError);
      }
    }

    return Promise.reject(toApiError(error));
  },
);

async function send<T>(config: AxiosRequestConfig): Promise<T> {
  try {
    const response = await api.request<T>(config);
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export function register(fields: {
  email: string;
  password: string;
  password2: string;
}) {
  return send<{ message: string }>({
    method: "POST",
    url: "/auth/register/",
    data: fields,
  });
}

export function login(fields: { email: string; password: string }) {
  return send<AuthResponse>({
    method: "POST",
    url: "/auth/login/",
    data: fields,
  });
}

export function refreshToken(refresh: string) {
  return send<{ access: string }>({
    method: "POST",
    url: "/auth/login/refresh/",
    data: { refresh },
  });
}

export function getProfile() {
  return send<User>({ url: "/auth/profile/" });
}
export function listTasks() {
  return send<Task[]>({ url: "/tasks/" });
}
export function createTask(
  fields: Partial<
    Pick<
      Task,
      "title" | "description" | "status" | "priority" | "due_date" | "tags"
    >
  >,
) {
  return send<Task>({ method: "POST", url: "/tasks/", data: fields });
}
export function getTask(id: number) {
  return send<Task>({ url: `/tasks/${id}/` });
}
export function updateTask(
  id: number,
  fields: Partial<
    Pick<
      Task,
      "title" | "description" | "status" | "priority" | "due_date" | "tags"
    >
  >,
) {
  return send<Task>({ method: "PATCH", url: `/tasks/${id}/`, data: fields });
}
export function deleteTask(id: number) {
  return send<void>({ method: "DELETE", url: `/tasks/${id}/` });
}
export async function listAnnotations() {
  const data = await send<Annotation[] | { results: Annotation[] }>({
    url: "/annotations/",
  });
  return Array.isArray(data) ? data : (data.results ?? []);
}
export function createAnnotation(image: File, shapes: Shape[]) {
  const form = new FormData();
  form.append("image", image);
  form.append("shapes", JSON.stringify(shapes));
  return send<Annotation>({ method: "POST", url: "/annotations/imageupload/", data: form });
}
export function getAnnotation(id: number) {
  return send<Annotation>({ url: `/annotations/${id}/` });
}
export function updateAnnotation(
  id: number,
  fields: Partial<Pick<Annotation, "shapes">>,
) {
  return send<Annotation>({
    method: "PATCH",
    url: `/annotations/${id}/`,
    data: fields,
  });
}
export function deleteAnnotation(id: number) {
  return send<void>({ method: "DELETE", url: `/annotations/${id}/` });
}

let currentAccessToken: string | null = null;
let currentRefreshToken: string | null = null;
let tokenRefreshCallback: ((access: string) => void) | null = null;

export function setTokens(access: string | null, refresh: string | null) {
  currentAccessToken = access;
  currentRefreshToken = refresh;
}
export function onTokenRefreshed(callback: (access: string) => void) {
  tokenRefreshCallback = callback;
}

export function tokenRefreshed(access: string) {
  tokenRefreshCallback?.(access);
}

export function getAccessToken() {
  return currentAccessToken;
}

export function getRefreshToken() {
  return currentRefreshToken;
}

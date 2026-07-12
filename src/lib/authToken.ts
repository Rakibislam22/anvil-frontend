let currentAccessToken: string | null = null;
let currentRefreshToken: string | null = null;

export function setTokens(access: string | null, refresh: string | null) {
  currentAccessToken = access;
  currentRefreshToken = refresh;
}

export function getAccessToken() {
  return currentAccessToken;
}

export function getRefreshToken() {
  return currentRefreshToken;
}
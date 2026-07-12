"use client";
import { createContext, useEffect, useReducer } from "react";
import { setTokens } from "@/lib/authToken";
import type { AuthResponse, User } from "@/types";
export type AnvilState = {
  selectedDate: string;
  auth: {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
  };
  dragState: { taskId: string | null };
  isHydrating: boolean;
};
type Action =
  | { type: "SET_SELECTED_DATE"; date: string }
  | { type: "SET_AUTH"; auth: AuthResponse }
  | { type: "CLEAR_AUTH" }
  | { type: "START_DRAG"; taskId: string }
  | { type: "END_DRAG" }
  | { type: "SET_HYDRATED" };
const initialState: AnvilState = {
  selectedDate: new Date().toISOString().slice(0, 10),
  auth: { accessToken: null, refreshToken: null, user: null },
  dragState: { taskId: null },
  isHydrating: true,
};
function reducer(state: AnvilState, action: Action): AnvilState {
  switch (action.type) {
    case "SET_SELECTED_DATE":
      return { ...state, selectedDate: action.date };
    case "SET_AUTH":
      return {
        ...state,
        auth: {
          accessToken: action.auth.access,
          refreshToken: action.auth.refresh,
          user: action.auth.user,
        },
      };
    case "CLEAR_AUTH":
      return { ...state, auth: initialState.auth };
    case "START_DRAG":
      return { ...state, dragState: { taskId: action.taskId } };
    case "END_DRAG":
      return { ...state, dragState: initialState.dragState };
    case "SET_HYDRATED":
      return { ...state, isHydrating: false };
  }
}
export const AnvilContext = createContext<{
  state: AnvilState;
  dispatch: React.Dispatch<Action>;
} | null>(null);
export function AnvilProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const access = localStorage.getItem("anvil-access");
    const refresh = localStorage.getItem("anvil-refresh");
    const rawUser = localStorage.getItem("anvil-user");
    if (access && refresh && rawUser) {
      dispatch({
        type: "SET_AUTH",
        auth: { access, refresh, user: JSON.parse(rawUser) as User },
      });
    }
    // Always mark as hydrated, even if no tokens were found
    dispatch({ type: "SET_HYDRATED" });
  }, []);
  useEffect(() => {
    const { accessToken, refreshToken, user } = state.auth;
    if (accessToken && refreshToken && user) {
      localStorage.setItem("anvil-access", accessToken);
      localStorage.setItem("anvil-refresh", refreshToken);
      localStorage.setItem("anvil-user", JSON.stringify(user));
    }
  }, [state.auth]);
  useEffect(() => {
    setTokens(state.auth.accessToken, state.auth.refreshToken);
  }, [state.auth.accessToken, state.auth.refreshToken]);
  return (
    <AnvilContext.Provider value={{ state, dispatch }}>
      {children}
    </AnvilContext.Provider>
  );
}

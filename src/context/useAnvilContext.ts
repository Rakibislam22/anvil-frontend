"use client";
import { useContext } from "react";
import { AnvilContext } from "./AnvilContext";
export function useAnvilContext() {
  const context = useContext(AnvilContext);
  if (!context)
    throw new Error("useAnvilContext must be used inside <AnvilProvider>.");
  return context;
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ForgeMark from "@/components/auth/ForgeMark";
import { useAnvilContext } from "@/context/useAnvilContext";
import { getProfile } from "@/lib/apiClient";

export default function AppHeader() {
  const path = usePathname();
  const router = useRouter();
  const { state, dispatch } = useAnvilContext();
  const { user, auth } = state;

  useEffect(() => {
    if (auth.access && !user) {
      getProfile()
        .then((profile) => {
          dispatch({ type: "SET_USER", user: profile });
        })
        .catch(() => {
          // If getProfile fails, tokens might be stale.
          // The API client's 401 handler will manage this.
        });
    }
  }, [auth.access, user, dispatch]);

  function handleSignOut() {
    dispatch({ type: "CLEAR_AUTH" });
    router.replace("/login");
  }

  if (path === "/login" || path === "/register") {
    return null;
  }

  return (
    <header className="border-b border-ink/15 bg-pale-steel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/tasks" className="flex items-center gap-2 text-ink">
          <ForgeMark size={30} />
          <span className="font-display text-xl">Anvil</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 font-mono text-xs uppercase">
            <Link
              className={path === "/tasks" ? "text-ember" : ""}
              href="/tasks"
            >
              Tasks
            </Link>
            <Link
              className={path === "/annotate" ? "text-ember" : ""}
              href="/annotate"
            >
              Annotate
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm">{user?.first_name}</span>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ForgeMark from "@/components/auth/ForgeMark";
import { useAnvilContext } from "@/context/useAnvilContext";

export default function AppHeader() {
  const path = usePathname();
  const router = useRouter();
  const { state, dispatch } = useAnvilContext();
  if (path === "/login" || path === "/register") return null;
  function handleSignOut() {
    dispatch({ type: "CLEAR_AUTH" });
    localStorage.removeItem("anvil-access");
    localStorage.removeItem("anvil-refresh");
    localStorage.removeItem("anvil-user");
    router.replace("/login");
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
            <span className="text-sm">{state.auth.user?.email}</span>
            <button onClick={handleSignOut}>Sign out</button>
          </div>
        </div>
      </div>
    </header>
  );
}

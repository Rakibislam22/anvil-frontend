"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAnvilContext } from "@/context/useAnvilContext";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { state } = useAnvilContext();

  useEffect(() => {
    if (!state.isHydrating && !state.auth.accessToken) {
      router.replace("/login");
    }
  }, [state.isHydrating, state.auth.accessToken, router]);

  if (state.isHydrating) {
    return (
      <div className="page-shell">
        <p className="eyebrow">Loading...</p>
      </div>
    );
  }

  if (!state.auth.accessToken) {
    return null; // redirect is in flight, render nothing
  }

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasToken = localStorage.getItem("anvil-access");
    router.replace(hasToken ? "/tasks" : "/landing");
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-pale-steel font-mono text-sm">
      Opening Anvil…
    </main>
  );
}

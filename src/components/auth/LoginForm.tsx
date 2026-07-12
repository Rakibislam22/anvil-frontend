"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/apiClient";
import { useAnvilContext } from "@/context/useAnvilContext";

const emailPattern = /^\S+@\S+\.\S+$/;

export default function LoginForm() {
  const router = useRouter();
  const { dispatch } = useAnvilContext();
  const { state } = useAnvilContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state.isHydrating && state.auth.accessToken) {
      router.replace("/tasks");
    }
  }, [state.isHydrating, state.auth.accessToken, router]);

  if (state.isHydrating || state.auth.accessToken) {
    return (
      <div className="page-shell">
        <p className="eyebrow">Loading...</p>
      </div>
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const authResponse = await login({ email, password });
      dispatch({ type: "SET_AUTH", auth: authResponse });
      router.replace("/tasks");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md space-y-5">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          aria-invalid={Boolean(error)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            id="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-sm text-steel"
            onClick={() => setShow(!show)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-ember p-3 text-sm text-ember"
        >
          {error}
        </p>
      )}
      <button className="button-primary w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

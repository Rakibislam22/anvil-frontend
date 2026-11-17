"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnvilContext } from "@/context/useAnvilContext";
import { login } from "@/lib/apiClient";
import Spinner from "@/components/Spinner";
import { IconEye, IconEyeOff } from "@/components/icons";

export default function LoginForm() {
  const { dispatch } = useAnvilContext();
  const router = useRouter();
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("Demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSlowMessage, setShowSlowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");

    setLoading(true);
    const timer = setTimeout(() => setShowSlowMessage(true), 4000);

    try {
      const user = await login({ email, password });
      dispatch({ type: "SET_AUTH", auth: user });
      router.push("/tasks");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Login failed.",
      );
    } finally {
      clearTimeout(timer);
      setLoading(false);
      setShowSlowMessage(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input w-full"
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      <button type="submit" className="button-primary" disabled={loading}>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner />
            <span>Logging in...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>
      {error && <p className="error">{error}</p>}
      {showSlowMessage && (
        <p className="text-sm text-ink/60">
          Server is waking up, this can take up to a minute on the first try...
        </p>
      )}
    </form>
  );
}
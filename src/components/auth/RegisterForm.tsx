"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnvilContext } from "@/context/useAnvilContext";
import { register, login } from "@/lib/apiClient";
import Spinner from "@/components/Spinner";
import { IconEye, IconEyeOff } from "../icons";

export default function RegisterForm() {
  const { dispatch } = useAnvilContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
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
      // Register only returns a success message, not tokens/user
      await register({ email, password, password2 });
      // So log the user in right after registering
      const user = await login({ email, password });
      dispatch({ type: "SET_AUTH", auth: user });
      router.push("/annotate");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Registration failed.",
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
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm password"
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
            <span>Registering...</span>
          </div>
        ) : (
          "Register"
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

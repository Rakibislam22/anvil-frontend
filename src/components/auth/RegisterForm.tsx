"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, register } from "@/lib/apiClient";

type Fields = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};
type Errors = Partial<Record<keyof Fields | "general", string>>;

const initial: Fields = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password2: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(name: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({
      ...current,
      [name]: undefined,
      general: undefined,
    }));
  }

  function validate() {
    const next: Errors = {};
    (Object.keys(fields) as (keyof Fields)[]).forEach((name) => {
      if (!fields[name].trim()) {
        next[name] = "This field is required.";
      }
    });
    if (fields.email && !/^\S+@\S+\.\S+$/.test(fields.email)) {
      next.email = "Enter a valid email address.";
    }
    if (fields.password2 && fields.password !== fields.password2) {
      next.password2 = "Passwords do not match.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      await register(fields);
      router.replace("/login?registered=1");
    } catch (reason) {
      if (reason instanceof ApiError && reason.data) {
        const backend: Errors = {};
        Object.entries(reason.data).forEach(([key, value]) => {
          if (key in fields) {
            backend[key as keyof Fields] = Array.isArray(value)
              ? value.join(" ")
              : value;
          } else if (key === "detail") {
            backend.general = Array.isArray(value) ? value.join(" ") : value;
          }
        });
        setErrors(
          Object.keys(backend).length ? backend : { general: reason.message },
        );
      } else {
        setErrors({
          general:
            reason instanceof Error
              ? reason.message
              : "Account could not be created.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const input = (
    name: keyof Fields,
    label: string,
    type = "text",
    show?: boolean,
    toggle?: () => void,
  ) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className={toggle ? "relative" : ""}>
        <input
          id={name}
          type={show ? "text" : type}
          value={fields[name]}
          onChange={(event) => set(name, event.target.value)}
          autoComplete={name === "password2" ? "new-password" : name}
          aria-invalid={Boolean(errors[name])}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {toggle && (
          <button
            type="button"
            className="absolute right-3 top-3 text-sm text-steel"
            onClick={toggle}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1 text-sm text-ember">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} className="w-full max-w-md space-y-4">
      {input("username", "Username")}
      {input("first_name", "First name")}
      {input("last_name", "Last name")}
      {input("email", "Email", "email")}
      {input("password", "Password", "password", showPassword, () =>
        setShowPassword((value) => !value),
      )}
      {input("password2", "Confirm password", "password", showPassword2, () =>
        setShowPassword2((value) => !value),
      )}
      {errors.general && (
        <p
          role="alert"
          className="rounded-lg border border-ember p-3 text-sm text-ember"
        >
          {errors.general}
        </p>
      )}
      <button className="button-primary w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

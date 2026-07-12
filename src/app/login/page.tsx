import Link from "next/link";
import ForgeMark from "@/components/auth/ForgeMark";
import LoginForm from "@/components/auth/LoginForm";
import styles from "./login.module.css";
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string }>;
}) {
  const registered = (await searchParams).registered === "1";
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section
        className={`${styles.panel} flex min-h-[38vh] flex-col justify-between p-8 text-parchment sm:p-12`}
      >
        <div className="flex items-center gap-3 text-ember">
          <ForgeMark />
          <span className="font-display text-2xl text-parchment">Anvil</span>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[.2em] text-ember">
            Task craft / Image marks
          </p>
          <h1 className="mt-4 max-w-lg font-display text-4xl leading-tight sm:text-6xl">
            Shape the work. Mark what matters.
          </h1>
        </div>
        <p className="font-mono text-xs text-parchment/70">
          A focused workspace for tasks and visual feedback.
        </p>
      </section>
      <section className="flex items-center justify-center bg-pale-steel p-8 sm:p-12">
        <div className="w-full max-w-md">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-steel">
            Welcome back
          </p>
          <h2 className="mt-3 font-display text-4xl">Sign in to Anvil</h2>
          <p className="mt-3 mb-6">
            Use your workspace credentials to continue.
          </p>
          {registered && (
            <p
              role="status"
              className="mb-5 rounded-lg border border-steel p-3 text-sm text-steel"
            >
              Account created. Sign in with your new credentials.
            </p>
          )}
          <LoginForm />
          <p className="mt-5 text-sm">
            Don&apos;t have an account?{" "}
            <Link className="text-steel underline" href="/register">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

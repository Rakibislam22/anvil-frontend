import Link from "next/link";
import ForgeMark from "@/components/auth/ForgeMark";
import RegisterForm from "@/components/auth/RegisterForm";
import styles from "../login/login.module.css";
export default function RegisterPage() {
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
            Build the work you want to shape.
          </h1>
        </div>
        <p className="font-mono text-xs text-parchment/70">
          A focused workspace for tasks and visual feedback.
        </p>
      </section>
      <section className="flex items-center justify-center bg-pale-steel p-8 sm:p-12">
        <div className="w-full max-w-md">
          <p className="font-mono text-xs uppercase tracking-[.18em] text-steel">
            New workspace
          </p>
          <h2 className="mt-3 font-display text-4xl">Create your account</h2>
          <p className="mt-3 mb-6">Set up your Anvil credentials.</p>
          <RegisterForm />
          <p className="mt-5 text-sm">
            Already have an account?{" "}
            <Link className="text-steel underline" href="/login">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for solo developers and small side projects.",
    features: [
      "1 workspace",
      "Up to 3 team members",
      "50 tasks per board",
      "Basic image annotation",
      "7-day activity history",
      "Community support",
    ],
    missing: ["Advanced analytics", "Priority support", "Custom fields", "API access"],
    cta: "Get started free",
    href: "/register",
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 12,
    yearlyPrice: 9,
    description: "For growing teams who need power and speed.",
    features: [
      "5 workspaces",
      "Up to 20 team members",
      "Unlimited tasks",
      "Full image annotation suite",
      "90-day activity history",
      "Advanced analytics",
      "Custom fields & labels",
      "Priority email support",
    ],
    missing: ["Dedicated account manager", "On-prem deployment"],
    cta: "Start Pro trial",
    href: "/register",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Custom pricing for large organizations with custom needs.",
    features: [
      "Unlimited workspaces",
      "Unlimited team members",
      "Unlimited tasks & history",
      "Full annotation suite",
      "Full analytics & exports",
      "API access + webhooks",
      "SSO / SAML",
      "On-prem deployment option",
      "Dedicated account manager",
      "24/7 SLA support",
    ],
    missing: [],
    cta: "Contact sales",
    href: "/register",
    highlight: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-parchment">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Simple, transparent{" "}
            <span className="text-ember">pricing</span>
          </h2>
          <p className="mt-5 text-base text-ink/60 leading-relaxed">
            Start free. Scale when you're ready. No hidden fees, no surprise
            invoices.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-pale-steel/60 p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                !yearly
                  ? "bg-parchment text-charcoal shadow-sm"
                  : "text-ink/50"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                yearly
                  ? "bg-parchment text-charcoal shadow-sm"
                  : "text-ink/50"
              }`}
            >
              Yearly
              <span className="ml-2 rounded-full bg-ember/15 px-2 py-0.5 text-xs text-ember font-mono">
                −25%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 transition-shadow duration-300 ${
                plan.highlight
                  ? "border-ember bg-charcoal text-parchment shadow-xl shadow-ember/20"
                  : "border-ink/10 bg-pale-steel hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-4 py-1 text-xs font-bold text-parchment uppercase tracking-widest font-mono">
                  Most popular
                </span>
              )}

              <div>
                <p
                  className={`font-mono text-xs uppercase tracking-widest ${
                    plan.highlight ? "text-parchment/50" : "text-ink/40"
                  }`}
                >
                  {plan.name}
                </p>
                <div className="mt-3 flex items-end gap-1">
                  {plan.monthlyPrice === null ? (
                    <span
                      className={`font-display text-4xl font-bold ${
                        plan.highlight ? "text-parchment" : "text-charcoal"
                      }`}
                    >
                      Custom
                    </span>
                  ) : (
                    <>
                      <span
                        className={`font-display text-5xl font-bold ${
                          plan.highlight ? "text-parchment" : "text-charcoal"
                        }`}
                      >
                        \${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span
                        className={`mb-2 text-sm ${
                          plan.highlight ? "text-parchment/50" : "text-ink/40"
                        }`}
                      >
                        /mo
                      </span>
                    </>
                  )}
                </div>
                <p
                  className={`mt-2 text-sm ${
                    plan.highlight ? "text-parchment/60" : "text-ink/55"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-ember" : "text-ember"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.highlight ? "text-parchment/80" : "text-ink/70"}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm opacity-35">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={plan.highlight ? "text-parchment/40" : "text-ink/40"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-bold transition-all duration-200 ${
                  plan.highlight
                    ? "bg-ember text-parchment hover:bg-ember/90 shadow-lg"
                    : "border border-ink/20 text-ink hover:border-ember hover:text-ember"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-ink/40">
          All plans include a 14-day free trial of Pro features. No credit card
          required.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is Anvil free to use?",
    a: "Yes! Anvil has a fully-featured free plan for solo developers and small teams. You can create a workspace, invite up to 3 team members, and manage up to 50 tasks per board — forever free, no credit card required.",
  },
  {
    q: "Can I migrate from Trello, Jira, or Linear?",
    a: "Absolutely. Anvil supports CSV import from Trello and Linear, and we have a step-by-step migration guide for Jira. Our onboarding wizard walks you through the process in under 10 minutes.",
  },
  {
    q: "How does image annotation work?",
    a: "Upload any image directly to a task card. The built-in annotation canvas lets you draw bounding boxes, add labels, and leave comments on specific regions. Annotations are stored with the task and visible to all team members.",
  },
  {
    q: "Is my data secure?",
    a: "Security is core to Anvil. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We're SOC 2 Type II compliant, and Enterprise plans support SSO/SAML and on-prem deployment.",
  },
  {
    q: "Can I use Anvil on mobile?",
    a: "Yes. Anvil is fully responsive and works great on phones and tablets. We also have native iOS and Android apps in public beta — search 'Anvil Tasks' in your app store.",
  },
  {
    q: "What happens when my team grows beyond the free plan?",
    a: "You'll get an in-app prompt when you approach limits. Upgrading to Pro takes 30 seconds — just enter a card and all your data, boards, and history migrate instantly. No downtime.",
  },
  {
    q: "Do you offer discounts for open-source projects or nonprofits?",
    a: "Yes! Open-source projects and registered nonprofits get a free Pro plan. Email us at open@anvil.app with proof of eligibility and we'll set you up within 48 hours.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-pale-steel">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Questions, <span className="text-ember">answered</span>
          </h2>
          <p className="mt-5 text-base text-ink/60 leading-relaxed">
            Everything you need to know before you start. Can't find what you're
            looking for? Email us at{" "}
            <a
              href="mailto:hello@anvil.app"
              className="text-ember hover:underline"
            >
              hello@anvil.app
            </a>
            .
          </p>
        </div>

        <div className="mt-12 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-parchment overflow-hidden">
          {FAQS.map((faq, idx) => (
            <div key={idx}>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-pale-steel/50 transition-colors duration-200"
              >
                <span className="font-semibold text-charcoal text-sm sm:text-base">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 h-6 w-6 rounded-full border border-ink/20 flex items-center justify-center transition-transform duration-300 text-ink/50 ${
                    open === idx ? "rotate-45 border-ember text-ember" : ""
                  }`}
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="h-3 w-3"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="M6 1v10M1 6h10" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === idx ? "max-h-60" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm text-ink/60 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

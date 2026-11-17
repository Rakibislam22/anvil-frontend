"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-ember/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-steel/5 blur-3xl" />
        {/* Grid lines */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#1c1812"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <span
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/8 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ember"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
          Now in public beta
        </span>

        <h1 className="mt-8 font-display text-5xl font-bold leading-tight tracking-tight text-charcoal sm:text-6xl md:text-7xl">
          Ship tasks.{" "}
          <span className="relative inline-block text-ember">
            Faster.
            <svg
              aria-hidden
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C40 2 100 1 198 6"
                stroke="#c4491f"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="[stroke-dasharray:220] [stroke-dashoffset:220] animate-[draw_1s_0.5s_ease-out_forwards]"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-ink/60 leading-relaxed">
          Anvil is a Kanban-powered project management platform built for
          engineering teams. Drag, drop, annotate, and ship — everything your
          team needs in one focused workspace.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="button-primary w-full sm:w-auto px-8 py-3.5 text-base rounded-xl font-semibold shadow-lg shadow-ember/20 hover:shadow-ember/30 transition-shadow"
          >
            Start for free →
          </Link>
          <Link
            href="#how-it-works"
            className="button-secondary w-full sm:w-auto px-8 py-3.5 text-base rounded-xl font-semibold"
          >
            See how it works
          </Link>
        </div>

        <p className="mt-5 font-mono text-xs text-ink/40 uppercase tracking-widest">
          No credit card required · Free forever plan
        </p>

        {/* Hero visual — stylised kanban board */}
        <div className="relative mx-auto mt-16 max-w-4xl rounded-2xl border border-ink/10 bg-pale-steel/60 shadow-2xl backdrop-blur-sm overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center gap-2 border-b border-ink/10 bg-parchment/80 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-ember/50" />
            <span className="h-3 w-3 rounded-full bg-steel/40" />
            <span className="h-3 w-3 rounded-full bg-ink/20" />
            <span className="ml-4 font-mono text-xs text-ink/40">
              anvil.app / tasks
            </span>
          </div>
          {/* Board columns */}
          <div className="grid grid-cols-3 gap-4 p-5">
            {[
              {
                col: "To Do",
                color: "bg-ink/5",
                cards: [
                  "Design system tokens",
                  "API rate limiter",
                  "Onboarding flow",
                ],
              },
              {
                col: "In Progress",
                color: "bg-steel/8",
                cards: ["Auth service refactor", "Dashboard charts"],
              },
              {
                col: "Done",
                color: "bg-ember/5",
                cards: ["CI/CD pipeline", "DB migrations", "Unit tests"],
              },
            ].map((lane) => (
              <div key={lane.col} className={`rounded-xl ${lane.color} p-3`}>
                <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-3">
                  {lane.col}
                </p>
                <div className="flex flex-col gap-2">
                  {lane.cards.map((card) => (
                    <div
                      key={card}
                      className="rounded-lg border border-ink/8 bg-parchment/90 px-3 py-2.5 text-left"
                    >
                      <p className="text-xs font-medium text-ink/80 leading-snug">
                        {card}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-4 w-4 rounded-full bg-steel/30 text-[8px] flex items-center justify-center text-ink/50">
                          A
                        </span>
                        <span className="font-mono text-[9px] text-ink/30 uppercase">
                          #anvil
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof numbers */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          {[
            { n: "12k+", label: "Teams onboarded" },
            { n: "98%", label: "Uptime SLA" },
            { n: "4.9★", label: "Average rating" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-charcoal">
                {s.n}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

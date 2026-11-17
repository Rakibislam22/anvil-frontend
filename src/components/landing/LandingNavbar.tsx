"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ForgeMark from "@/components/auth/ForgeMark";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-sm shadow-sm border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link
          href="/landing"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-ink"
        >
          <ForgeMark size={30} />
          <span className="font-display text-xl font-bold tracking-tight">
            Anvil
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink/60 hover:text-ember transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="font-mono text-xs uppercase tracking-widest text-ink/70 hover:text-ember transition-colors duration-200 px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="button-primary text-sm px-5 py-2 rounded-lg font-semibold"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-ink/5 transition-colors"
        >
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-parchment border-b border-ink/10`}
      >
        <nav className="flex flex-col px-5 pb-5 pt-2 gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="font-mono text-xs uppercase tracking-widest text-ink/70 hover:text-ember transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-ink/10">
            <Link
              href="/login"
              onClick={handleNavClick}
              className="text-center font-semibold text-sm py-2.5 rounded-lg border border-ink/20 hover:border-ember hover:text-ember transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={handleNavClick}
              className="button-primary text-center text-sm py-2.5 rounded-lg font-semibold"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

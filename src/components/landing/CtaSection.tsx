import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-20 md:py-28 bg-parchment">
      <div className="mx-auto max-w-4xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center sm:px-16">
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-ember/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-steel/20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ember">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
              Limited beta spots
            </span>

            <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-parchment sm:text-5xl">
              Ready to forge your
              <br />
              <span className="text-ember">best work?</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-parchment/60 leading-relaxed">
              Join over 12,000 teams who ship faster with Anvil. Create your
              free workspace in under 60 seconds — no credit card, no sales
              call, no nonsense.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto rounded-xl bg-ember px-8 py-3.5 text-base font-bold text-parchment hover:bg-ember/90 shadow-lg shadow-ember/30 transition-all duration-200"
              >
                Start building for free →
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto rounded-xl border border-parchment/20 px-8 py-3.5 text-base font-semibold text-parchment/70 hover:border-parchment/40 hover:text-parchment transition-all duration-200"
              >
                Already have an account?
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {[
                "No credit card required",
                "Free forever plan",
                "Setup in &lt;60 seconds",
              ].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-1.5 font-mono text-xs text-parchment/40 uppercase tracking-widest"
                >
                  <svg className="h-3.5 w-3.5 text-ember" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: badge }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Anvil replaced three separate tools for us — Trello, Figma comments, and Linear. Our sprint cycle dropped from 3 weeks to 10 days.",
    name: "Sarah K.",
    role: "Engineering Lead @ Stackform",
    avatar: "S",
    color: "bg-ember/20 text-ember",
  },
  {
    quote:
      "The image annotation feature alone is worth switching. QA can now mark bugs directly on screenshots and engineers know exactly what to fix.",
    name: "Marcus T.",
    role: "Product Manager @ Orbito",
    avatar: "M",
    color: "bg-steel/20 text-steel",
  },
  {
    quote:
      "We evaluated 6 tools. Anvil was the only one that felt designed for developers, not project managers. The keyboard shortcuts are 🔥",
    name: "Priya N.",
    role: "Staff Engineer @ Layerform",
    avatar: "P",
    color: "bg-ember/20 text-ember",
  },
  {
    quote:
      "Onboarding the team took less than 15 minutes. Even our non-technical stakeholders figured it out without any training.",
    name: "James R.",
    role: "CTO @ Driftcode",
    avatar: "J",
    color: "bg-steel/20 text-steel",
  },
  {
    quote:
      "The analytics dashboard finally gave us data to have honest retros. Cycle time dropped 40% in two sprints once we could see the bottlenecks.",
    name: "Leila V.",
    role: "Agile Coach @ Blueshift",
    avatar: "L",
    color: "bg-ember/20 text-ember",
  },
  {
    quote:
      "We run a fully remote team across 4 time zones. Anvil's real-time board keeps everyone in sync without a single status meeting.",
    name: "David C.",
    role: "VP Engineering @ Pulseware",
    avatar: "D",
    color: "bg-steel/20 text-steel",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-ember" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-pale-steel">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Testimonials</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Loved by{" "}
            <span className="text-ember">engineering teams</span>
          </h2>
          <p className="mt-5 text-base text-ink/60 leading-relaxed">
            Don't take our word for it — here's what teams shipping with Anvil
            have to say.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-ink/10 bg-parchment p-6 hover:shadow-md transition-shadow duration-300"
            >
              <StarRating />
              <blockquote className="mt-4 flex-1 text-sm text-ink/70 leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4">
                <div
                  className={`h-9 w-9 rounded-full ${t.color} flex items-center justify-center font-bold text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">
                    {t.name}
                  </p>
                  <p className="font-mono text-xs text-ink/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

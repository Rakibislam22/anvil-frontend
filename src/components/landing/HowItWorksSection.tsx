const STEPS = [
  {
    num: "01",
    title: "Create your workspace",
    desc: "Sign up in seconds. Create a workspace for your team and invite collaborators with a shareable link. No setup overhead.",
    aside: (
      <div className="rounded-xl border border-ink/10 bg-parchment p-5 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">
          New workspace
        </p>
        <div className="flex flex-col gap-2">
          <div className="rounded-lg border border-ink/10 bg-pale-steel/50 px-3 py-2 text-sm text-ink/70">
            🏗️ &nbsp;Forge Team
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-ember/20 text-ember text-xs flex items-center justify-center font-bold">A</div>
            <div className="h-8 w-8 rounded-full bg-steel/20 text-steel text-xs flex items-center justify-center font-bold">B</div>
            <div className="h-8 w-8 rounded-full bg-ink/10 text-ink/40 text-xs flex items-center justify-center font-bold">+4</div>
          </div>
          <button className="mt-1 w-full rounded-lg bg-ember text-parchment text-xs font-semibold py-2">
            Invite teammates →
          </button>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Build your Kanban board",
    desc: "Add columns that match your workflow — Backlog, In Review, Deployed. Create tasks with priority, assignee, and due date.",
    aside: (
      <div className="rounded-xl border border-ink/10 bg-parchment p-5 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">
          Sprint board
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["Backlog", "Active", "Done"].map((col, i) => (
            <div key={col} className="rounded-lg bg-pale-steel/60 p-2">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink/40 mb-1.5">{col}</p>
              {Array.from({ length: i === 1 ? 2 : 1 }).map((_, j) => (
                <div key={j} className="mb-1.5 rounded bg-parchment border border-ink/8 p-1.5 text-[10px] text-ink/70 leading-snug">
                  Task #{i * 2 + j + 1}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Annotate & collaborate",
    desc: "Attach screenshots and annotate them directly. Loop in designers and QA with visual feedback baked right into task cards.",
    aside: (
      <div className="rounded-xl border border-ink/10 bg-parchment p-5 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-2">
          Annotation canvas
        </p>
        <div className="relative rounded-lg bg-pale-steel h-24 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 120 60" className="w-full h-full opacity-30">
              <rect x="10" y="10" width="40" height="40" rx="3" fill="none" stroke="#c4491f" strokeWidth="2" strokeDasharray="4 2"/>
              <rect x="70" y="20" width="40" height="25" rx="3" fill="none" stroke="#4f7396" strokeWidth="2" strokeDasharray="4 2"/>
              <text x="12" y="23" fontSize="6" fill="#c4491f">Bug area</text>
              <text x="72" y="33" fontSize="6" fill="#4f7396">UI region</text>
            </svg>
          </div>
        </div>
        <p className="mt-2 font-mono text-[10px] text-ink/40">2 annotations · 3 comments</p>
      </div>
    ),
  },
  {
    num: "04",
    title: "Track & ship",
    desc: "Monitor velocity and cycle time on your analytics dashboard. Celebrate done columns and ship features with confidence.",
    aside: (
      <div className="rounded-xl border border-ink/10 bg-parchment p-5 shadow-sm">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-3">
          Sprint velocity
        </p>
        <div className="flex items-end gap-2 h-20">
          {[40, 55, 45, 70, 60, 85, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-t" style={{
              height: `${h}%`,
              background: i === 6 ? '#c4491f' : i >= 4 ? 'rgba(196,73,31,0.4)' : 'rgba(79,115,150,0.2)'
            }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] text-ink/30">
          <span>W1</span><span>W7</span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-parchment">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Go from zero to{" "}
            <span className="text-ember">shipping</span> in minutes
          </h2>
          <p className="mt-5 text-base text-ink/60 leading-relaxed">
            Four simple steps. No lengthy onboarding. No configuration hell.
            Just you, your team, and momentum.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:gap-16">
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Text side */}
              <div className="flex-1">
                <span className="font-display text-6xl font-bold text-ember/15 select-none">
                  {step.num}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-charcoal sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base text-ink/60 leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>

              {/* Visual side */}
              <div className="flex-1 max-w-sm w-full mx-auto lg:mx-0">
                {step.aside}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

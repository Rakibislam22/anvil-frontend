const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    title: "Drag-and-drop Kanban",
    desc: "Move tasks across columns with fluid, touch-friendly drag-and-drop powered by @dnd-kit. Reorder in a single gesture.",
    color: "text-ember bg-ember/8 border-ember/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Image Annotation",
    desc: "Mark up screenshots, designs, or bug reports with bounding boxes and labels — right inside your workspace. No external tools.",
    color: "text-steel bg-steel/8 border-steel/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Due Dates & Scheduling",
    desc: "Assign deadlines with the built-in date picker. Never miss a sprint deadline again — highlights overdue tasks automatically.",
    color: "text-ember bg-ember/8 border-ember/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Team Collaboration",
    desc: "Invite teammates, assign tasks, and see who's working on what in real-time. Full role-based access control included.",
    color: "text-steel bg-steel/8 border-steel/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Real-time Analytics",
    desc: "Track velocity, cycle time, and throughput with live dashboards. Data-driven decisions made simple for every sprint.",
    color: "text-ember bg-ember/8 border-ember/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Any Device, Any Screen",
    desc: "Fully responsive design built mobile-first. Access your boards from phone, tablet, or desktop — seamlessly.",
    color: "text-steel bg-steel/8 border-steel/20",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-pale-steel">
      <div className="mx-auto max-w-7xl px-5">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Platform features</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            Everything your team needs to{" "}
            <span className="text-ember">ship faster</span>
          </h2>
          <p className="mt-5 text-base text-ink/60 leading-relaxed">
            Purpose-built for engineering teams who care about focused
            execution. No bloat, no noise — just the tools that matter.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-ink/10 bg-parchment p-6 hover:border-ink/20 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center rounded-xl border p-3 ${f.color}`}
              >
                {f.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-charcoal">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">
                {f.desc}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-ember/0 via-ember/40 to-ember/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

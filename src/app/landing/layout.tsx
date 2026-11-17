// Landing page gets its own layout so the global AppHeader is NOT rendered.
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

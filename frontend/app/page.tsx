import ThemeToggle from "@/layout/theme-toggle";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl p-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">AI Wiki – Design system ✅</h1>
        <ThemeToggle />
      </div>

      <div className="card p-4">
        <p>
          Fond <code>bg-bg</code>, texte <code>fg</code>, accents{" "}
          <span className="text-accent font-medium">accent</span>.
        </p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-xl bg-primary px-3 py-2 text-white">Primaire</button>
          <button className="rounded-xl bg-secondary px-3 py-2 text-fg">Secondaire</button>
          <button className="rounded-xl bg-accent px-3 py-2 text-white">Accent</button>
        </div>
      </div>
    </div>
  );
}

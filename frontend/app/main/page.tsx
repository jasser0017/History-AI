export default function HomePage() {
    return (
      <div className="space-y-6">
        <section className="flex items-center justify-between gap-3 rounded-xl2 border border-fg/10 bg-muted p-3 shadow-soft">
          <input
            disabled
            placeholder="Rechercher par titre… (arrive à l'étape 4)"
            className="w-full rounded-xl border border-fg/20 bg-white px-3 py-2 text-sm text-fg/80"
          />
          <button
            disabled
            className="rounded-xl bg-secondary px-3 py-2 text-fg opacity-60"
            title="Arrive à l'étape 5"
          >
            + Ajouter
          </button>
        </section>
  
        
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-4">
            <div className="h-5 w-3/4 rounded bg-white/70" />
            <div className="mt-2 h-4 w-1/2 rounded bg-white/60" />
          </div>
          <div className="card p-4">
            <div className="h-5 w-2/3 rounded bg-white/70" />
            <div className="mt-2 h-4 w-1/3 rounded bg-white/60" />
          </div>
          <div className="card p-4">
            <div className="h-5 w-2/3 rounded bg-white/70" />
            <div className="mt-2 h-4 w-1/3 rounded bg-white/60" />
          </div>
        </section>
      </div>
    );
  }
  
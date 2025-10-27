
"use client";
import { useEffect } from "react";
import SearchPanel from "@//layout/search-panel";
import CardPreview from "@/components/cards/card-preview";
import useAppStore from "@/store/app-store";

function CardSkeleton() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-5 w-3/4 rounded bg-white/60" />
      <div className="mt-2 h-4 w-1/2 rounded bg-white/50" />
    </div>
  );
}

export default function HomePage() {
  const { cards, loading, error, refresh } = useAppStore();
  useEffect(() => { refresh(); }, [refresh]);

  return (
    <div className="space-y-6">
      <SearchPanel />
      {error && <p className="text-red-600">{error}</p>}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && cards.length === 0 && (<><CardSkeleton/><CardSkeleton/><CardSkeleton/></>)}
        {!loading && cards.length === 0 && !error && (
          <p className="col-span-full text-fg/70">Aucune carte trouvée.</p>
        )}
        {cards.map((c) => (<CardPreview key={c.id} card={c} />))}
      </section>
    </div>
  );
}

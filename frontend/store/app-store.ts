import { create } from "zustand";
import type { Card } from "@/lib/validators";
import { fetchCards } from "@/lib/api";

type State = {
  query: string;
  cards: Card[];
  loading: boolean;
  error?: string;
};

type Actions = {
  setQuery: (q: string) => void;
  refresh: () => Promise<void>;
  addCard: (newCard: Card) => void;
};

 export const useAppStore = create<State & Actions>((set, get) => ({
  query: "",
  cards: [],
  loading: false,

  setQuery: (q) => set({ query: q }),

  refresh: async () => {
    set({ loading: true, error: undefined });
    try {
      const data = await fetchCards(get().query);
      set({ cards: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message || "Erreur", loading: false });
    }
  },
  addCard: (newCard) => {
    set((state) => {
      const exists = state.cards.some((c) => c.id === newCard.id);
      if (exists) return state; 
      return { cards: [newCard, ...state.cards] };
    });
  },
  
}));




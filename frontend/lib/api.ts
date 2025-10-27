import { CardSchema, Card, FullCardSchema, FullCard } from "./validators";
const API = process.env.NEXT_PUBLIC_API_URL
export async function fetchCards(q?: string): Promise<Card[]> {
    const url = new URL(`${API}/v1/cards`);
    if (q) url.searchParams.set("q", q);
    const r = await fetch(url.toString(), { cache: "no-store" });
    if (!r.ok) throw new Error("Erreur de récupération des cartes");
    const data = await r.json();
    return data.map((c: unknown) => CardSchema.parse(c));
  }

  export async function fetchCardById(id: string): Promise<FullCard> {
    const r = await fetch(`${API}/v1/cards/${id}`, { cache: "no-store" });
    if (!r.ok) throw new Error("Carte introuvable");
    return FullCardSchema.parse(await r.json());
  }

  export async function createCard(form: FormData): Promise<Card> {
    const r = await fetch(`${API}/v1/cards`, { method: "POST", body: form });
    if (!r.ok) throw new Error("Échec de création");
    return CardSchema.parse(await r.json());
  }


  export async function aiCopilot(question: string, context: string) {
    const r = await fetch(`${API}/v1/ai/copilot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context }),
    });
    if (!r.ok) throw new Error("Copilot error");
    return (await r.json()) as { answer: string };
  }


  export async function biasJudge(text: string) {
    const r = await fetch(`${API}/v1/ai/bias-judge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!r.ok) throw new Error("Bias judge error");
    return (await r.json()) as { bias_score: number; explanation: string };
  }

import { CardSchema, Card, FullCardSchema, FullCard,createCardSchema, type  CreateCardInput  } from "./validators";

const API = process.env.NEXT_PUBLIC_API_URL

export async function fetchCards(q?: string): Promise<Card[]> {
  await new Promise((r) => setTimeout(r, 1500))
    const url = new URL(`${API}/v1/cards`);
    if (q) url.searchParams.set("q", q);
    const r = await fetch(url.toString(), { cache: "no-store" });
    if (!r.ok) throw new Error("Erreur de récupération des cartes");
    const data = await r.json();
    return data.map((c: unknown) => CardSchema.parse(c));
  }

export async function fetchCardById(id: string): Promise<FullCard> {
  await new Promise((r) => setTimeout(r, 1200));
    const r = await fetch(`${API}/v1/cards/${id}`, { cache: "no-store" });
    if (!r.ok) throw new Error("Carte introuvable");
    return FullCardSchema.parse(await r.json());
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


const BASE = `${API}/v1`;

export async function createCard(input: CreateCardInput) {
  const parsed = createCardSchema.safeParse(input);
  if (!parsed.success) {
    const message = parsed.error.issues.map((e) => e.message).join(" et ");
    throw new Error(message);
  }

  const { title, systemPrompt, topics} = parsed.data;

  const fd = new FormData();
  fd.append("title", title);
  fd.append("system_prompt", systemPrompt);
  fd.append("topics", topics); 
  
 

  const res = await fetch(`${BASE}/cards`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}


  
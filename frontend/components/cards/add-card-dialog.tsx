
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCard } from "@//lib/api";
import { createCardSchema } from "@//lib/validators";
import { z } from "zod";
import { Plus } from "lucide-react";
import { Dialog } from "../ui/dialog";
import {useAppStore} from "@/store/app-store";



export default function AddCardDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [topics, setTopics] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const { addCard } = useAppStore.getState();


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const payload = {
      title,
      systemPrompt,
      topics
    };

    const parsed = createCardSchema.safeParse(payload);
    if (!parsed.success) {
      setErr(parsed.error.issues.map((e) => e.message).join(" et "));
      return;
    }

    try {
      setLoading(true);
      const newCard =await createCard(parsed.data);
      addCard(newCard)
      setOpen(false);
      setTitle("");
      setSystemPrompt("");
      setTopics("");
    } catch (e: any) {
      setErr(e.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

return(
<>
<button
onClick={() => setOpen(true)}
className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-white shadow-sm hover:opacity-90"
>
<Plus className="h-4 w-4" />
Add New Card
</button>
<Dialog open={open} onClose={() => setOpen(false)} title="Generate New Historical Card">

<form onSubmit={onSubmit} className="flex flex-col gap-5 font-[Inter] text-gray-800 dark:text-gray-100">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200"> Event Title</label>
            <input
              className="rounded-lg border border-gray-300 bg-white dark:bg-darkcard px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Arab Spring"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">System Prompt </label>
            <textarea
              className="min-h-[90px] rounded-lg border border-gray-300 bg-white dark:bg-darkcard px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-all"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Define the AI's tone perspective (e.g,, 'Write an objective historian focusing on factual accuracy and multiple perspectives')."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">Topics to Cover</label>
            <textarea
              className="min-h-[90px] rounded-lg border border-gray-300 bg-white dark:bg-darkcard px-3 py-2 text-sm placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-all whitespace-normal break-words"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="List specific aspects to include (e.g,, 'causes,key events, major figures, regional impact, international response')"
              required
            />
          </div>
          {err && (
            <div className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {err}
            </div>
          )}

          <div className="mt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-md border border-fg/20 dark:border-darkborder px-4 py-2 hover:bg-muted dark:hover:bg-darkborder/40"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="rounded-md bg-accent px-4 py-2 text-white shadow-sm hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Generating…" : "Create"}
            </button>
          </div>
        </form>

</Dialog>
</>

)

     
}



"use client";

import { useState } from "react";
import { Send, Bot, X, Loader2 } from "lucide-react";
import { aiCopilot } from "@/lib/api";

export default function CopilotPopup({ context }: { context: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

     

    try {
      const res = await aiCopilot(input, context)

      setMessages((prev) => [...prev, { role: "assistant", text: res.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: " Erreur de communication avec le serveur." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-semibold text-white shadow-lg hover:bg-accent/90 dark:bg-darkaccent dark:hover:bg-darkaccent/80 transition-all"
        >
          <Bot className="h-5 w-5" />
          Copilot
        </button>
      )}

      {/* Fenêtre du chat */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-[340px] max-h-[500px] rounded-2xl border border-fg/10 bg-white dark:bg-darkcard shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-fg/10 dark:border-darkborder bg-accent/10 dark:bg-darkaccent/20 px-3 py-2">
            <div className="flex items-center gap-2 font-semibold text-accent dark:text-darkaccent">
              <Bot className="h-4 w-4" /> AI Copilot
            </div>
            <button onClick={() => {setIsOpen(false); resetChat()}}  className="text-fg/70 hover:text-fg">
              <X className="h-4 w-4"  />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.length === 0 && (
              <p className="text-fg/50 dark:text-darkfg/60 italic text-center">
                Posez une question sur cet article…
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "ml-auto bg-accent text-white"
                    : "mr-auto bg-fg/5 dark:bg-darkborder text-fg dark:text-darkfg"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-fg/60 dark:text-darkfg/60">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>L’IA réfléchit...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-fg/10 dark:border-darkborder p-2 flex gap-2">
            <input
              type="text"
              className="flex-1 rounded-lg border border-fg/10 dark:border-darkborder bg-bg dark:bg-darkbg px-3 py-2 text-sm outline-none"
              placeholder="Demandez quelque chose..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="rounded-lg bg-accent px-3 py-2 text-white hover:bg-accent/90 dark:bg-darkaccent dark:hover:bg-darkaccent/80"
              disabled={loading}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

const starters = [
  "12 extra-saucy wings to-go",
  "2 Shriners tickets for Aug 29",
  "House sauce pouch for pickup",
];

export function OrderChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat();

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function submit(text: string) {
    const next = text.trim();
    if (!next || status === "streaming" || status === "submitted") return;
    sendMessage({ text: next });
    setInput("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-[60] grid h-14 w-14 place-items-center rounded-full bg-ember text-cream shadow-[0_12px_30px_rgba(194,48,26,0.45)] bottom-[5.5rem] right-4 md:bottom-6 md:right-6"
        aria-expanded={open}
        aria-label={open ? "Close order chat" : "Open order chat"}
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Chat
          </span>
        )}
      </button>

      {open && (
        <section className="fixed z-[60] flex flex-col overflow-hidden border border-cream/15 bg-char shadow-2xl bottom-[5.5rem] right-3 left-3 h-[min(72svh,640px)] rounded-2xl md:bottom-24 md:left-auto md:right-6 md:h-[min(70vh,640px)] md:w-[420px]">
          <header className="bg-ember">
            <div className="rainbow-bar" />
            <div className="px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-bright">
                COA 4300 / 4510
              </p>
              <h2 className="font-display text-2xl leading-tight">
                Order with the Saloon
              </h2>
              <p className="text-sm text-cream/85">
                Wings, sauce, or Aug 29 tickets. We write it up.
              </p>
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            {messages.length === 0 && (
              <div className="rounded-xl bg-wood p-3 text-sm text-paper/85">
                Howdy. Want extra-saucy wings to-go, a sauce pouch, or Shriners
                tickets for Saturday?
                <div className="mt-3 flex flex-col gap-2">
                  {starters.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="rounded-full border border-cream/15 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider hover:border-amber hover:text-amber"
                      onClick={() => submit(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "ml-8 rounded-2xl bg-ember px-3 py-2 text-sm"
                    : "mr-6 rounded-2xl bg-wood px-3 py-2 text-sm text-paper/90"
                }
              >
                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <p key={i} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    );
                  }
                  if (part.type === "tool-placeOrder") {
                    const output =
                      "output" in part
                        ? (part.output as {
                            ok?: boolean;
                            id?: string;
                            knownTotal?: string;
                            error?: string;
                          })
                        : undefined;
                    if (!output) {
                      return (
                        <p key={i} className="text-xs text-muted">
                          Writing up the ticket…
                        </p>
                      );
                    }
                    if (!output.ok) {
                      return (
                        <p key={i} className="text-xs text-amber">
                          {output.error}
                        </p>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className="mt-2 rounded-lg border border-amber/40 bg-char p-3"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber">
                          Order in
                        </p>
                        <p className="font-display text-xl">{output.id}</p>
                        <p className="text-xs text-muted">{output.knownTotal}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            {(status === "submitted" || status === "streaming") && (
              <p className="text-xs uppercase tracking-wider text-muted">
                Checking with the kitchen…
              </p>
            )}
            {error && (
              <p className="rounded-lg bg-ember-deep p-3 text-sm">
                {error.message.includes("503")
                  ? "Chat needs an XAI_API_KEY on the server. Call (801) 776-9678 in the meantime."
                  : "Couldn’t reach the bar just now. Call (801) 776-9678."}
              </p>
            )}
            <div ref={bottom} />
          </div>

          <form
            className="border-t border-cream/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Wings, sauce, or tickets…"
                className="min-w-0 flex-1 rounded-full border border-cream/15 bg-wood px-4 py-3 text-sm outline-none focus:border-amber"
              />
              <button type="submit" className="btn btn-amber px-4 py-3">
                Send
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

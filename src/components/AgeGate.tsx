"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

const KEY = "rs-age-21";

type Gate = "loading" | "ask" | "ok" | "no";

export function AgeGate() {
  const [gate, setGate] = useState<Gate>("loading");

  useEffect(() => {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "yes") setGate("ok");
    else if (saved === "no") setGate("no");
    else setGate("ask");
  }, []);

  function enter() {
    window.localStorage.setItem(KEY, "yes");
    setGate("ok");
  }

  function leave() {
    window.localStorage.setItem(KEY, "no");
    setGate("no");
  }

  if (gate === "ok") return null;

  if (gate === "loading") {
    return (
      <div
        className="fixed inset-0 z-[80] bg-char"
        aria-hidden
        aria-busy="true"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-char/95 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-cream/15 bg-wood p-8 text-center shadow-2xl">
        <div className="rainbow-bar mb-6 rounded-full" />
        <p className="kicker">Rainbow Saloon · Roy, Utah</p>
        {gate === "ask" ? (
          <>
            <h1 className="display mt-3 text-4xl">Are you 21 or older?</h1>
            <p className="mt-4 text-sm text-paper/80">
              This is a bar. Utah drinking age is 21. ID at the door. You don’t
              have to drink to belong here — you do have to be of age.
            </p>
            <div className="mt-8 grid gap-3">
              <button type="button" className="btn btn-primary w-full" onClick={enter}>
                I am 21 or older
              </button>
              <button type="button" className="btn btn-ghost w-full" onClick={leave}>
                I am under 21
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="display mt-3 text-4xl">Come back at 21.</h1>
            <p className="mt-4 text-sm text-paper/80">
              The Rainbow is a 21-and-over bar. If you’re looking for the
              Stricklands’ community work, that’s still at the door — with a
              grown-up.
            </p>
            <p className="mt-6 text-xs text-muted">{site.address.full}</p>
          </>
        )}
      </div>
    </div>
  );
}

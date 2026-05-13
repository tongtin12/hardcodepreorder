import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Heart, Mail, Package } from "lucide-react";

export const Route = createFileRoute("/checkout/success")({
  component: Success,
  head: () => ({ meta: [{ title: "Preorder confirmed — Heartcode" }] }),
});

type Order = { id: string; ts: number; subtotal: number; shipping?: { email?: string } };

function Success() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("heartcode-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <main className="bg-background pt-32 pb-24 min-h-screen relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[600px] bg-crimson-radial opacity-70" />
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.2 220 / 0.3) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-pink-gradient grid place-items-center glow-primary animate-glow-pulse">
          <Check className="w-8 h-8 text-background" strokeWidth={2.5} />
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-primary">Preorder confirmed</p>
        <h1 className="font-serif text-5xl sm:text-7xl leading-[1.05] mt-4 text-balance">
          Welcome to the <em className="font-display italic">edition.</em>
        </h1>
        <p className="mt-6 max-w-md mx-auto text-muted-foreground">
          A confirmation has been sent to your inbox. Your numbered piece will be
          hand-finished and shipped in April 2026.
        </p>

        {order && (
          <div className="mt-10 glass-strong rounded-3xl p-6 text-left">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Order</p>
                <p className="font-serif text-2xl mt-1">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Total reserved</p>
                <p className="font-serif text-2xl mt-1">${order.subtotal}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                { i: Mail, l: "Confirmation email sent", s: order.shipping?.email ?? "—" },
                { i: Package, l: "Hand-finished", s: "March 2026" },
                { i: Heart, l: "Shipped with love", s: "April 2026" },
              ].map(({ i: Icon, l, s }) => (
                <div key={l} className="flex items-center gap-3 glass rounded-2xl p-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-gradient/15 grid place-items-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{l}</p>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-3.5 text-sm font-medium glow-primary"
          >
            Back to collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-12 font-serif italic text-muted-foreground">
          "Yours, while it lasts."
        </p>
      </div>
    </main>
  );
}

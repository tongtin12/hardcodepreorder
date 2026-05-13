import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Lock, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout/shipping")({
  component: Shipping,
  head: () => ({ meta: [{ title: "Shipping · Checkout — Heartcode" }] }),
});

const fields = [
  { name: "email", label: "Email", type: "email", placeholder: "you@heartcode.fm", full: true },
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "address", label: "Address", type: "text", full: true },
  { name: "city", label: "City", type: "text" },
  { name: "postal", label: "Postal code", type: "text" },
  { name: "country", label: "Country", type: "text", full: true },
];

function Shipping() {
  const { items, subtotal, resolve } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <main className="pt-40 px-6 text-center min-h-screen bg-background">
        <h1 className="font-serif text-3xl">Your bag is empty</h1>
        <Link to="/collection" className="inline-block mt-6 underline text-sm">Browse the collection</Link>
      </main>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("heartcode-shipping", JSON.stringify(form));
    navigate({ to: "/checkout/payment" });
  };

  return (
    <main className="bg-background pt-24 sm:pt-28 pb-32 sm:pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Steps current={1} />
        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-10 mt-8 sm:mt-10">
          <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">Shipping</h1>
              <p className="text-sm text-muted-foreground mt-2">Where should we send the edition?</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {fields.map((f) => (
                <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{f.label}</label>
                  <input
                    required
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="mt-2 w-full glass rounded-xl px-4 py-3.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/5 transition-all"
                  />
                </div>
              ))}
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl mb-3 sm:mb-4">Delivery method</h2>
              <DeliveryOptions />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                to="/collection"
                className="text-sm text-muted-foreground hover:text-foreground text-center sm:text-left"
              >
                ← Continue browsing
              </Link>
              <button
                type="submit"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-6 sm:px-7 py-3.5 text-sm font-medium glow-primary hover:scale-[1.02] transition-transform"
              >
                Continue to payment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="order-1 lg:order-2">
            <OrderSummaryCard items={items} subtotal={subtotal} resolve={resolve} />
          </div>
        </div>
      </div>
    </main>
  );
}

function DeliveryOptions() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-4 ring-1 ring-primary/40 glow-soft">
      <div className="w-12 h-12 rounded-xl bg-pink-gradient text-background grid place-items-center shrink-0">
        <Truck className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">DHL Express</p>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-primary">
            <Check className="w-3 h-3" /> Free worldwide
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          Hand-finished · Ships April 2026 with tracking
        </p>
      </div>
      <span className="text-sm font-medium shrink-0">Free</span>
    </div>
  );
}

export function Steps({ current }: { current: 1 | 2 | 3 }) {
  const labels = ["Shipping", "Payment", "Confirmed"];
  return (
    <div className="space-y-3 sm:space-y-2">
      <div className="flex items-center justify-center gap-3 sm:gap-3">
        {labels.map((l, i) => {
          const idx = (i + 1) as 1 | 2 | 3;
          const active = idx === current;
          const done = idx < current;
          return (
            <div key={l} className="flex items-center gap-3">
              {/* Mobile: big circle */}
              <div
                className={`sm:hidden w-11 h-11 rounded-full grid place-items-center font-serif text-base transition-colors ${
                  active
                    ? "bg-pink-gradient text-background glow-primary"
                    : done
                    ? "glass text-foreground ring-1 ring-primary/30"
                    : "glass text-muted-foreground"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? <Check className="w-4 h-4" strokeWidth={2.5} /> : idx.toString().padStart(2, "0")}
              </div>
              {/* Desktop: chip with label */}
              <div
                className={`hidden sm:flex items-center gap-2 rounded-full px-4 py-2 text-xs transition-colors ${
                  active
                    ? "bg-pink-gradient text-background glow-primary"
                    : done
                    ? "glass text-foreground"
                    : "glass text-muted-foreground"
                }`}
              >
                <span className="font-serif">{idx.toString().padStart(2, "0")}</span>
                <span className="uppercase tracking-[0.2em]">{l}</span>
              </div>
              {i < labels.length - 1 && (
                <div
                  className={`h-px w-8 sm:w-8 transition-colors ${
                    done ? "bg-primary/50" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="sm:hidden text-center text-xs uppercase tracking-[0.3em] text-primary font-medium">
        Step {current} · {labels[current - 1]}
      </p>
    </div>
  );
}

export function OrderSummaryCard({
  items,
  subtotal,
  resolve,
  showCoupon = false,
}: {
  items: ReturnType<typeof useCart>["items"];
  subtotal: number;
  resolve: ReturnType<typeof useCart>["resolve"];
  showCoupon?: boolean;
}) {
  const shipping = 0;
  const tax = Math.round(subtotal * 0.07);
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((n, it) => n + it.qty, 0);
  const [open, setOpen] = useState(false);

  return (
    <aside className="glass-strong rounded-2xl sm:rounded-3xl h-fit lg:sticky lg:top-28 overflow-hidden">
      {/* Mobile collapsed header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="lg:hidden w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
          <Lock className="w-3 h-3 shrink-0" />
          <span className="truncate">Order summary · {itemCount} item{itemCount !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-serif text-lg">${total}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      <div className={`${open ? "block" : "hidden"} lg:block p-5 sm:p-6 lg:pt-6 pt-0`}>
        <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" /> Secure checkout
        </div>
        <h3 className="hidden lg:block font-serif text-xl mt-2">Order summary</h3>

        <div className="lg:mt-5 space-y-3">
          {items.map((it) => {
            const p = resolve(it);
            if (!p) return null;
            return (
              <div key={`${it.productId}-${it.variant ?? ""}`} className="flex gap-3 items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover duotone" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {it.variant ? `${it.variant} · ` : ""}Qty {it.qty}
                  </p>
                </div>
                <p className="text-sm shrink-0">${p.price * it.qty}</p>
              </div>
            );
          })}
        </div>

        {showCoupon && <CouponField />}

        <div className="mt-5 pt-5 border-t border-white/10 space-y-2 text-sm">
          <Row l="Subtotal" v={`$${subtotal}`} />
          <Row l="Shipping" v="Free" />
          <Row l="Tax (est.)" v={`$${tax}`} />
          <div className="pt-2 mt-2 border-t border-white/10 flex justify-between text-base">
            <span className="font-serif">Total</span>
            <span className="font-medium">${total}</span>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Preorders are charged at confirmation. Shipped April 2026 in numbered packaging.</span>
        </div>
      </div>
    </aside>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{l}</span>
      <span className="text-foreground">{v}</span>
    </div>
  );
}

function CouponField() {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  return (
    <div className="mt-5 pt-5 border-t border-white/10">
      <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Coupon code</label>
      <div className="mt-2 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="HEARTCODE"
          className="flex-1 min-w-0 glass rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="button"
          onClick={() => setApplied(code || null)}
          className="rounded-xl glass px-4 text-xs font-medium hover:bg-white/10 shrink-0"
        >
          Apply
        </button>
      </div>
      {applied && (
        <p className="mt-2 text-xs text-primary">"{applied}" applied at confirmation.</p>
      )}
    </div>
  );
}

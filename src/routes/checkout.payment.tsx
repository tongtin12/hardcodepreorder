import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Download,
  Loader2,
  Lock,
  MapPin,
  Pencil,
  QrCode,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { OrderSummaryCard, Steps } from "./checkout.shipping";

export const Route = createFileRoute("/checkout/payment")({
  component: Payment,
  head: () => ({ meta: [{ title: "Payment · Checkout — Heartcode" }] }),
});

type Method = "promptpay" | "card" | "banking";

const METHOD_LABELS: Record<Method, string> = {
  promptpay: "QR PromptPay",
  card: "Credit / Debit Card",
  banking: "Mobile Banking",
};

const METHOD_ICONS: Record<Method, typeof QrCode> = {
  promptpay: QrCode,
  card: CreditCard,
  banking: Building2,
};

function Payment() {
  const { items, subtotal, resolve, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<Method>("promptpay");
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("heartcode-shipping");
      if (raw) setShipping(JSON.parse(raw));
    } catch {}
  }, []);

  if (items.length === 0) {
    return (
      <main className="pt-40 px-6 text-center min-h-screen bg-background">
        <h1 className="font-serif text-3xl">Your bag is empty</h1>
        <Link to="/collection" className="inline-block mt-6 underline text-sm">
          Browse the collection
        </Link>
      </main>
    );
  }

  const completeOrder = (extra: Record<string, unknown> = {}) => {
    setProcessing(true);
    setTimeout(() => {
      let shipping: Record<string, string> | null = null;
      try {
        const raw = sessionStorage.getItem("heartcode-shipping");
        if (raw) shipping = JSON.parse(raw);
      } catch {}
      sessionStorage.setItem(
        "heartcode-order",
        JSON.stringify({
          id: `HC-${Math.floor(100000 + Math.random() * 900000)}`,
          items,
          subtotal,
          shipping,
          method,
          ts: Date.now(),
          ...extra,
        }),
      );
      clear();
      navigate({ to: "/checkout/success" });
    }, 1400);
  };

  return (
    <main className="bg-background pt-24 sm:pt-28 pb-32 min-h-screen relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[700px] bg-crimson-radial opacity-60 pointer-events-none" />
      <div
        className="absolute -top-32 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-float-slow"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.2 220 / 0.2) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Steps current={2} />

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-10 mt-8 sm:mt-10">
          <div className="space-y-6 sm:space-y-8 animate-fade-up order-2 lg:order-1">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary">Step 02 · Secure payment</p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3">Choose how you'd like to pay</h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Encrypted end-to-end. You'll only be charged once your numbered piece is reserved.
              </p>
            </div>

            <ShippingAddressCard shipping={shipping} />

            {!confirmed ? (
              <div className="space-y-5 animate-fade-up">
                <MethodSelector method={method} setMethod={setMethod} />
                <button
                  onClick={() => setConfirmed(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-4 text-sm font-medium glow-primary animate-glow-pulse hover:scale-[1.01] transition-transform"
                >
                  <Lock className="w-4 h-4" />
                  Continue with {METHOD_LABELS[method]}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-muted-foreground text-center">
                  We'll prepare your payment details on the next step.
                </p>
              </div>
            ) : (
              <div className="space-y-5 animate-fade-up">
                <SelectedMethodCard method={method} onChange={() => setConfirmed(false)} />
                {method === "promptpay" && (
                  <PromptPayPanel onComplete={completeOrder} processing={processing} amount={subtotal} />
                )}
                {method === "card" && <CardPanel onComplete={completeOrder} processing={processing} />}
                {method === "banking" && <BankingPanel onComplete={completeOrder} processing={processing} />}
              </div>
            )}

            <TrustRow />

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <Link
                to="/checkout/shipping"
                className="text-sm text-muted-foreground hover:text-foreground text-center sm:text-left"
              >
                ← Back to shipping
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" /> 256-bit TLS · PCI-DSS
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <OrderSummaryCard items={items} subtotal={subtotal} resolve={resolve} />
          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- Shipping address ---------- */
function ShippingAddressCard({ shipping }: { shipping: Record<string, string> | null }) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-pink-gradient/15 grid place-items-center shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Ship to</p>
            {shipping ? (
              <div className="mt-1.5 text-sm leading-relaxed">
                <p className="font-medium truncate">
                  {[shipping.firstName, shipping.lastName].filter(Boolean).join(" ") || "—"}
                </p>
                {shipping.address && <p className="text-muted-foreground truncate">{shipping.address}</p>}
                <p className="text-muted-foreground truncate">
                  {[shipping.city, shipping.postal].filter(Boolean).join(", ")}
                </p>
                {shipping.country && <p className="text-muted-foreground truncate">{shipping.country}</p>}
                {shipping.email && (
                  <p className="text-muted-foreground mt-1 truncate text-xs">{shipping.email}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">No shipping address yet.</p>
            )}
          </div>
        </div>
        <Link
          to="/checkout/shipping"
          className="text-xs inline-flex items-center gap-1 text-muted-foreground hover:text-foreground shrink-0"
        >
          <Pencil className="w-3 h-3" /> Edit
        </Link>
      </div>
    </section>
  );
}

/* ---------- Selected method (confirmed) ---------- */
function SelectedMethodCard({ method, onChange }: { method: Method; onChange: () => void }) {
  const Icon = METHOD_ICONS[method];
  return (
    <section className="glass rounded-2xl p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-pink-gradient text-background grid place-items-center shrink-0 glow-primary">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Paying with</p>
          <p className="text-sm font-medium truncate">{METHOD_LABELS[method]}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onChange}
        className="text-xs text-muted-foreground hover:text-foreground shrink-0 underline-offset-2 hover:underline"
      >
        Change
      </button>
    </section>
  );
}

/* ---------- Method selector ---------- */
function MethodSelector({ method, setMethod }: { method: Method; setMethod: (m: Method) => void }) {
  const opts: { id: Method; name: string; sub: string; icon: typeof QrCode }[] = [
    { id: "promptpay", name: "QR PromptPay", sub: "Scan & pay instantly", icon: QrCode },
    { id: "card", name: "Credit / Debit", sub: "Visa · Mastercard · JCB", icon: CreditCard },
    { id: "banking", name: "Mobile Banking", sub: "All major Thai banks", icon: Building2 },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {opts.map(({ id, name, sub, icon: Icon }) => {
        const active = method === id;
        return (
          <button
            key={id}
            onClick={() => setMethod(id)}
            className={`group relative text-left rounded-2xl p-5 transition-all duration-300 ${
              active
                ? "glass-strong ring-1 ring-primary glow-primary -translate-y-0.5"
                : "glass hover:bg-white/5 hover:-translate-y-0.5"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl grid place-items-center mb-4 transition-all ${
                active ? "bg-pink-gradient text-background" : "bg-white/5 text-foreground/80"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            {active && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- PromptPay ---------- */
function PromptPayPanel({
  onComplete,
  processing,
  amount,
}: {
  onComplete: (extra?: Record<string, unknown>) => void;
  processing: boolean;
  amount: number;
}) {
  const [seconds, setSeconds] = useState(15 * 60);
  const [slip, setSlip] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const qrSvg = useMemo(
    () =>
      `data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='white'/>${Array.from(
          { length: 400 },
          (_, i) => {
            const x = (i % 20) * 10;
            const y = Math.floor(i / 20) * 10;
            const on = (i * 9301 + 49297) % 233 > 110;
            return on ? `<rect x='${x}' y='${y}' width='10' height='10' fill='black'/>` : "";
          },
        ).join("")}<rect x='0' y='0' width='60' height='60' fill='white'/><rect x='10' y='10' width='40' height='40' fill='black'/><rect x='20' y='20' width='20' height='20' fill='white'/><rect x='140' y='0' width='60' height='60' fill='white'/><rect x='150' y='10' width='40' height='40' fill='black'/><rect x='160' y='20' width='20' height='20' fill='white'/><rect x='0' y='140' width='60' height='60' fill='white'/><rect x='10' y='150' width='40' height='40' fill='black'/><rect x='20' y='160' width='20' height='20' fill='white'/></svg>`,
      )}`,
    [],
  );

  return (
    <section className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8">
      <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-pink-gradient opacity-30 blur-2xl animate-glow-pulse" />
            <div className="relative bg-white p-3 sm:p-4 rounded-2xl">
              <img src={qrSvg} alt="PromptPay QR" className="w-44 h-44 sm:w-56 sm:h-56" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background text-[10px] uppercase tracking-[0.25em] border border-white/10">
              PromptPay
            </div>
          </div>
          <a
            href={qrSvg}
            download="heartcode-promptpay-qr.svg"
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download QR
          </a>
        </div>

        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Scan to reserve</p>
          <h3 className="font-serif text-2xl sm:text-3xl mt-2">฿{(amount * 36).toLocaleString()}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Open your banking app and scan the QR. We'll confirm automatically.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <div className="glass rounded-xl px-4 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Expires in</p>
              <p className="font-serif text-xl tabular-nums">
                {mm}:{ss}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground glass rounded-xl px-3 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Awaiting payment
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              Already paid? Upload slip
            </label>
            <label className="flex items-center gap-3 glass rounded-2xl p-4 cursor-pointer hover:bg-white/5 transition-all border border-dashed border-white/10">
              <Upload className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground flex-1 truncate">
                {slip ?? "PNG · JPG · up to 10MB"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSlip(e.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>

          <button
            disabled={verifying || processing}
            onClick={() => {
              setVerifying(true);
              setTimeout(() => onComplete({ slip }), 1200);
            }}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-3.5 text-sm font-medium glow-primary disabled:opacity-70"
          >
            {verifying || processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying payment…
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" /> I've completed payment
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Card ---------- */
function CardPanel({
  onComplete,
  processing,
}: {
  onComplete: (extra?: Record<string, unknown>) => void;
  processing: boolean;
}) {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState<string>("");

  const formatNum = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const valid = num.replace(/\s/g, "").length >= 15 && exp.length === 5 && cvc.length >= 3 && name.length > 1;

  return (
    <section className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-5 sm:gap-6">
      {/* Card preview */}
      <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden p-5 sm:p-6 bg-pink-gradient text-background shadow-glow noise max-w-sm md:max-w-none mx-auto md:mx-0 w-full">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
        <div className="relative h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg tracking-widest">HEARTCODE</span>
            <CreditCard className="w-6 h-6 opacity-80" />
          </div>
          <div>
            <p className="font-mono text-[15px] tracking-[0.18em]">
              {(num || "•••• •••• •••• ••••").padEnd(19, " ")}
            </p>
            <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.25em] opacity-80">
              <div>
                <p className="opacity-70">Card holder</p>
                <p className="text-sm tracking-wider mt-0.5 normal-case">{name || "Your name"}</p>
              </div>
              <div>
                <p className="opacity-70">Expires</p>
                <p className="text-sm tracking-wider mt-0.5">{exp || "MM/YY"}</p>
              </div>
            </div>
          </div>
        </div>
        {focus && (
          <div className="absolute inset-0 ring-2 ring-white/40 rounded-2xl pointer-events-none animate-fade-up" />
        )}
      </div>

      {/* Fields */}
      <div className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4">
        <Field
          label="Card number"
          value={num}
          onChange={(v) => setNum(formatNum(v))}
          onFocus={() => setFocus("num")}
          onBlur={() => setFocus("")}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
        />
        <Field
          label="Cardholder name"
          value={name}
          onChange={setName}
          onFocus={() => setFocus("name")}
          onBlur={() => setFocus("")}
          placeholder="As printed on card"
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Expiry"
            value={exp}
            onChange={(v) => setExp(formatExp(v))}
            onFocus={() => setFocus("exp")}
            onBlur={() => setFocus("")}
            placeholder="MM/YY"
            inputMode="numeric"
          />
          <Field
            label="CVC"
            value={cvc}
            onChange={(v) => setCvc(v.replace(/\D/g, "").slice(0, 4))}
            onFocus={() => setFocus("cvc")}
            onBlur={() => setFocus("")}
            placeholder="•••"
            inputMode="numeric"
          />
        </div>

        <button
          disabled={!valid || processing}
          onClick={() => onComplete({ last4: num.slice(-4) })}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-3.5 text-sm font-medium glow-primary disabled:opacity-50 disabled:grayscale"
        >
          {processing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing securely…
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" /> Pay securely <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <p className="text-[11px] text-muted-foreground text-center">
          Your card details are encrypted and never stored on our servers.
        </p>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  inputMode?: "text" | "numeric";
}) {
  const filled = value.length > 0;
  return (
    <label className="block relative">
      <span
        className={`absolute left-4 transition-all pointer-events-none uppercase tracking-[0.2em] ${
          filled ? "top-1.5 text-[9px] text-primary" : "top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground"
        }`}
      >
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={filled ? "" : placeholder}
        inputMode={inputMode}
        className="w-full glass rounded-xl px-4 pt-6 pb-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white/5 transition-all"
      />
    </label>
  );
}

/* ---------- Mobile Banking ---------- */
function BankingPanel({
  onComplete,
  processing,
}: {
  onComplete: (extra?: Record<string, unknown>) => void;
  processing: boolean;
}) {
  const banks = [
    { id: "scb", name: "SCB", color: "#4e2a84" },
    { id: "kbank", name: "KBank", color: "#138f6b" },
    { id: "bbl", name: "Bangkok Bank", color: "#1c4a9e" },
    { id: "ktb", name: "Krungthai", color: "#00a4e4" },
    { id: "bay", name: "Krungsri", color: "#fec20e" },
    { id: "ttb", name: "ttb", color: "#1565c0" },
  ];
  const [sel, setSel] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  return (
    <section className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8">
      <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Select your bank</p>
      <h3 className="font-serif text-xl sm:text-2xl mt-2">You'll be securely redirected</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        {banks.map((b) => {
          const active = sel === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSel(b.id)}
              className={`group flex items-center gap-3 glass rounded-2xl p-4 transition-all ${
                active ? "ring-1 ring-primary glow-soft -translate-y-0.5" : "hover:bg-white/5"
              }`}
            >
              <span
                className="w-9 h-9 rounded-lg grid place-items-center text-[11px] font-bold text-white shrink-0"
                style={{ background: b.color }}
              >
                {b.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-sm text-left">{b.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 glass rounded-2xl p-4 text-xs text-muted-foreground flex gap-3">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p>
          You'll be redirected to your bank to confirm. After approval, you'll automatically return to
          Heartcode to complete your reservation.
        </p>
      </div>

      <button
        disabled={!sel || redirecting || processing}
        onClick={() => {
          setRedirecting(true);
          setTimeout(() => onComplete({ bank: sel }), 1500);
        }}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-3.5 text-sm font-medium glow-primary disabled:opacity-50"
      >
        {redirecting || processing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to bank…
          </>
        ) : (
          <>
            Continue with {sel ? banks.find((b) => b.id === sel)?.name : "bank"}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </section>
  );
}

/* ---------- Trust ---------- */
function TrustRow() {
  const items = [
    { i: ShieldCheck, l: "Encrypted checkout", s: "End-to-end TLS" },
    { i: Sparkles, l: "Numbered edition", s: "Limited preorder" },
    { i: Lock, l: "Refundable until ship", s: "30-day policy" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {items.map(({ i: Icon, l, s }) => (
        <div key={l} className="glass rounded-2xl p-4 flex items-center gap-3">
          <Icon className="w-4 h-4 text-primary shrink-0" />
          <div>
            <p className="text-sm">{l}</p>
            <p className="text-[11px] text-muted-foreground">{s}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { X, Plus, Minus, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, items, subtotal, setQty, remove, resolve } = useCart();

  const recommendations = products
    .filter((p) => !items.find((i) => i.productId === p.id))
    .slice(0, 2);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[61] w-full sm:w-[440px] glass-strong flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Your Bag</p>
            <h3 className="font-serif text-2xl mt-1">{items.length} {items.length === 1 ? "piece" : "pieces"}</h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full glass grid place-items-center hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 && (
            <div className="py-16 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-pink-gradient/20 grid place-items-center mb-4 animate-glow-pulse">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <p className="font-serif text-xl">Your bag is empty</p>
              <p className="text-sm text-muted-foreground mt-2">Begin the collection.</p>
              <Link
                to="/collection"
                onClick={() => setOpen(false)}
                className="inline-flex mt-6 items-center gap-2 px-5 py-2.5 rounded-full bg-pink-gradient text-background text-sm font-medium glow-primary"
              >
                Browse collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {items.map((item) => {
            const p = resolve(item);
            if (!p) return null;
            return (
              <div
                key={`${item.productId}-${item.variant ?? ""}`}
                className="flex gap-4 glass rounded-2xl p-3 animate-fade-up"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover duotone" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                      )}
                    </div>
                    <p className="text-sm font-medium whitespace-nowrap">${p.price * item.qty}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 glass rounded-full p-1">
                      <button
                        className="w-6 h-6 rounded-full grid place-items-center hover:bg-white/10"
                        onClick={() => setQty(item.productId, item.variant, item.qty - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs w-5 text-center">{item.qty}</span>
                      <button
                        className="w-6 h-6 rounded-full grid place-items-center hover:bg-white/10"
                        onClick={() => setQty(item.productId, item.variant, item.qty + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.variant)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {items.length > 0 && recommendations.length > 0 && (
            <div className="pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                Pair it with
              </p>
              <div className="space-y-2">
                {recommendations.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 glass rounded-xl p-2 hover:bg-white/10 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover duotone" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">${p.price}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/5 p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Limited edition. Shipped Q2 2026 in numbered packaging.
            </p>
            <Link
              to="/checkout/shipping"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-pink-gradient text-background font-medium glow-primary hover:scale-[1.02] transition-transform"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
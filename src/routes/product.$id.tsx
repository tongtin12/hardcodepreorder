import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Minus, Package, Plus, ShoppingCart, Sparkles, Truck, Zap } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Heartcode Series` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Heartcode` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="pt-40 px-6 text-center">
      <h1 className="font-serif text-4xl">Piece not found</h1>
      <Link to="/collection" className="inline-block mt-6 underline text-sm">Back to collection</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const [variant, setVariant] = useState(product.variants?.[0]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);

  const handleAddToCart = () => {
    add(product.id, variant, qty);
    setOpen(true);
  };

  const handleBuyNow = () => {
    add(product.id, variant, qty);
    setOpen(false);
    navigate({ to: "/checkout/shipping" });
  };

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <main className="pt-28 pb-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/collection" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
          ← The Collection
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden glass cursor-zoom-in glow-soft"
              onClick={() => setZoom(true)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 duotone"
              />
              <div className="absolute top-4 left-4 glass-strong rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Preorder · Open
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden glass border border-white/5 hover:border-primary/40 transition-all cursor-pointer">
                  <img src={src} alt="" className="w-full h-full object-cover duotone" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-28 self-start">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{product.category}</p>
            <h1 className="font-serif text-4xl sm:text-6xl leading-[1.05] mt-3">{product.name}</h1>
            <p className="mt-2 text-muted-foreground italic">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl">${product.price}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">USD · Preorder</span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Variants */}
            {product.variants && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Choose size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v: string) => (
                    <button
                      key={v}
                      onClick={() => setVariant(v)}
                      className={`min-w-[56px] px-4 py-2.5 rounded-xl text-sm transition-all ${
                        variant === v
                          ? "bg-pink-gradient text-background glow-primary"
                          : "glass hover:bg-white/10"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + CTAs (desktop) */}
            <div className="mt-6 hidden lg:flex flex-wrap gap-3">
              <div className="flex items-center glass rounded-full p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-full grid place-items-center hover:bg-white/10">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-full grid place-items-center hover:bg-white/10">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                title="Add to cart"
                className="w-12 h-12 shrink-0 grid place-items-center rounded-full glass-strong border border-primary/30 hover:bg-white/10 hover:border-primary/60 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-6 py-3.5 text-sm font-medium glow-primary hover:scale-[1.02] transition-transform"
              >
                <Zap className="w-4 h-4" />
                Checkout · ${product.price * qty}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bonus */}
            {product.bonus && (
              <div className="mt-6 glass rounded-2xl p-4 flex items-start gap-3 border border-primary/20">
                <div className="w-9 h-9 rounded-full bg-pink-gradient/20 grid place-items-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary">Fan-exclusive bonus</p>
                  <p className="text-sm mt-1">{product.bonus}</p>
                </div>
              </div>
            )}

            {/* Shipping timeline */}
            <div className="mt-6 space-y-3">
              {[
                { i: Check, l: "Preorder confirmed instantly with numbered receipt" },
                { i: Package, l: "Hand-finished and packed in March 2026" },
                { i: Truck, l: "Worldwide shipping begins April 2026" },
              ].map(({ i: Icon, l }) => (
                <div key={l} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full glass grid place-items-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-24">
          <h2 className="font-serif text-3xl sm:text-4xl mb-8">More from the series</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {related.map((p) => (
              <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden glass relative">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 duotone" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-serif text-lg">{p.name}</p>
                    <p className="text-sm text-muted-foreground">${p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky mobile CTA — single consolidated bar */}
      <div className="lg:hidden fixed bottom-3 inset-x-3 z-40 glass-strong rounded-full p-1.5 flex items-center gap-1.5 sm:gap-2 shadow-glow">
        <div className="flex items-center shrink-0">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Decrease quantity"
            className="w-9 h-9 rounded-full grid place-items-center hover:bg-white/10 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            aria-label="Increase quantity"
            className="w-9 h-9 rounded-full grid place-items-center hover:bg-white/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="w-10 h-10 shrink-0 grid place-items-center rounded-full border border-primary/30 hover:bg-white/10 transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 min-w-0 rounded-full px-3 py-2.5 flex items-center justify-center gap-1.5 glow-primary bg-pink-gradient text-background"
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">Checkout · ${product.price * qty}</span>
        </button>
      </div>

      {/* Zoom */}
      {zoom && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-6" onClick={() => setZoom(false)}>
          <img src={product.image} alt={product.name} className="max-h-full max-w-full rounded-2xl duotone" />
        </div>
      )}
    </main>
  );
}

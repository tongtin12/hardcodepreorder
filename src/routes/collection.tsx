import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Heart, Lock, Package, Plus, Sparkles } from "lucide-react";
import { products, categories, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/collection")({
  component: CollectionPage,
  head: () => ({
    meta: [
      { title: "Collection — Heartcode Series" },
      {
        name: "description",
        content:
          "Six numbered pieces. Photobook, vinyl, apparel, collectibles. Browse the full Heartcode Series.",
      },
      { property: "og:title", content: "The Heartcode Collection" },
      {
        property: "og:description",
        content: "Six numbered pieces. Photobook, vinyl, apparel, collectibles.",
      },
    ],
  }),
});

function CollectionPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [preview, setPreview] = useState<Product | null>(null);
  const { add } = useCart();

  const visible = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-background min-h-screen">
      {/* Hero */}
      <section className="px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4 inline-flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Heartcode Series · Spring 2026
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
            Six pieces. <em className="font-display italic">One series.</em>
          </h1>
          <p className="mt-5 sm:mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
            A cinematic edition of six numbered objects. Hand-finished in March, sealed once preorders close.
          </p>


        </div>
      </section>

      {/* Filter bar */}
      <section className="px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-white/5">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 order-2 sm:order-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                    filter === c
                      ? "bg-pink-gradient text-background glow-primary"
                      : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground tabular-nums order-1 sm:order-2 shrink-0">
              {visible.length} of {products.length} {visible.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 mt-8 sm:mt-10">
        <div className="max-w-7xl mx-auto">
          {visible.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
              Nothing here yet — try another category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {visible.map((p, i) => (
                <ProductCard key={p.id} p={p} onQuickView={setPreview} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 mt-20 sm:mt-24">
        <div className="max-w-3xl mx-auto glass-strong rounded-3xl p-8 sm:p-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3">
            Ready to reserve?
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl">
            Skip the browsing — <em className="font-display italic">reserve yours.</em>
          </h2>
          <Link
            to="/preorder"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-3.5 text-sm font-medium glow-primary hover:scale-[1.02] transition-transform"
          >
            Go to preorder list <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Quick view modal */}
      {preview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-up">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPreview(null)} />
          <div className="relative glass-strong rounded-3xl max-w-3xl w-full grid sm:grid-cols-2 overflow-hidden">
            <div className="aspect-square sm:aspect-auto bg-secondary">
              <img src={preview.image} alt={preview.name} className="w-full h-full object-cover duotone" />
            </div>
            <div className="p-6 sm:p-8 flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary">{preview.category}</p>
              <h3 className="font-serif text-3xl mt-2">{preview.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{preview.tagline}</p>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{preview.description}</p>
              {preview.bonus && (
                <div className="mt-4 glass rounded-xl p-3 flex items-start gap-2">
                  <Heart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs">{preview.bonus}</p>
                </div>
              )}
              <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-serif">${preview.price}</span>
                <button
                  onClick={() => {
                    add(preview.id, preview.variants?.[0]);
                    setPreview(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-pink-gradient text-background px-5 py-3 text-sm font-medium glow-primary"
                >
                  <Plus className="w-4 h-4" /> Add to bag
                </button>
                <Link
                  to="/product/$id"
                  params={{ id: preview.id }}
                  onClick={() => setPreview(null)}
                  className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Full details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function InfoPill({ icon: Icon, label }: { icon: typeof Sparkles; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      <Icon className="w-3 h-3 text-primary" />
      {label}
    </span>
  );
}

function ProductCard({
  p,
  onQuickView,
  delay,
}: {
  p: Product;
  onQuickView: (p: Product) => void;
  delay: number;
}) {
  return (
    <article
      className="group relative animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden glass">
        <Link to="/product/$id" params={{ id: p.id }} className="block w-full h-full">
          <img
            src={p.image}
            alt={p.name}
            width={1024}
            height={1280}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 duotone"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
        </Link>

        <button
          onClick={() => onQuickView(p)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 glass-strong rounded-full px-3 sm:px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] sm:opacity-0 sm:group-hover:opacity-100 transition-all"
        >
          Quick view
        </button>

        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {p.category}
          </p>
          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl mt-1 leading-tight">
            {p.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{p.tagline}</p>

          <div className="mt-4 sm:mt-5 flex items-center justify-between">
            <span className="text-base sm:text-lg font-medium">${p.price}</span>
            <Link
              to="/product/$id"
              params={{ id: p.id }}
              className="inline-flex items-center gap-1.5 rounded-full bg-pink-gradient px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-background glow-primary"
            >
              Preorder <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

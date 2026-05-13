import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Lock, Package, Sparkles } from "lucide-react";
import { products, categories, type Product } from "@/lib/products";
import { Countdown } from "@/components/countdown";

const launch = new Date(Date.now() + 1000 * 60 * 60 * 24 * 12 + 1000 * 60 * 60 * 7);

export const Route = createFileRoute("/preorder")({
  component: PreorderPage,
  head: () => ({
    meta: [
      { title: "Preorder — Heartcode Series" },
      {
        name: "description",
        content:
          "Reserve your numbered Heartcode edition. Open preorders, hand-finished and shipped April 2026.",
      },
      { property: "og:title", content: "Heartcode Preorder" },
      {
        property: "og:description",
        content: "Every piece numbered. Hand-finished. Sealed once the timer ends.",
      },
    ],
  }),
});

type Sort = "featured" | "price-low" | "price-high";

function PreorderPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [now, setNow] = useState(() => Date.now());
  const [forceClosed, setForceClosed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "closed") setForceClosed(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const expired = forceClosed || launch.getTime() <= now;

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "featured") return a.stockLeft - b.stockLeft;
    if (sort === "price-low") return a.price - b.price;
    return b.price - a.price;
  });

  const closedDate = launch.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="pt-28 sm:pt-32 pb-24 bg-background min-h-screen">
      {/* Dev preview toggle — Open / Closed */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-5 right-5 z-50 glass-strong rounded-full p-1 flex items-center gap-0.5 text-[10px] uppercase tracking-[0.2em] shadow-glow">
          <button
            onClick={() => setForceClosed(false)}
            className={`px-3.5 py-2 rounded-full transition-all ${
              !expired
                ? "bg-pink-gradient text-background glow-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setForceClosed(true)}
            className={`px-3.5 py-2 rounded-full transition-all ${
              expired
                ? "bg-pink-gradient text-background glow-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Closed
          </button>
        </div>
      )}

      {/* Preview banner when ?preview=closed */}
      {forceClosed && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 glass-strong rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground inline-flex items-center gap-2 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Previewing closed state
        </div>
      )}

      {/* HERO */}
      <section className="px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {expired ? (
            <ClosedHero closedDate={closedDate} />
          ) : (
            <OpenHero />
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto mt-10 sm:mt-14">
        {/* Mobile: sort row on top */}
        <div className="sm:hidden flex items-center justify-between gap-3 px-4 mb-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Browse
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="glass rounded-full pl-3.5 pr-8 py-1.5 text-[11px] bg-transparent focus:outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 viewBox=%220 0 10 10%22><path fill=%22%23999%22 d=%22M2 4l3 3 3-3z%22/></svg>')] bg-no-repeat bg-[right_0.7rem_center]"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>

        {/* Chips row: mobile scroll horizontally, desktop flex-wrap with sort on right */}
        <div className="sm:flex sm:items-center sm:justify-between sm:gap-3 sm:px-6">
          <div className="overflow-x-auto no-scrollbar -mx-0 sm:mx-0">
            <div className="flex gap-2 px-4 sm:px-0 w-max sm:w-auto sm:flex-wrap sm:gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all ${
                    filter === c
                      ? "bg-pink-gradient text-background glow-primary"
                      : "glass hover:bg-white/10 text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="hidden sm:block glass rounded-full px-4 py-2 text-xs bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer shrink-0"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
        {sorted.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
            Nothing in this category right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sorted.map((p, i) => (
              <PreorderCard key={p.id} p={p} delay={i * 60} sealed={expired} />
            ))}
          </div>
        )}
      </section>

      {/* Footer note */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="w-3.5 h-3.5" />
          {expired
            ? "Series archived. The next chapter is being written."
            : "Hand-finished in March · Shipped April 2026 worldwide"}
        </div>
      </section>
    </main>
  );
}

function OpenHero() {
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-4 inline-flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </span>
        Preorder window · Open
      </p>
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
        Yours, <em className="font-display italic">while it lasts.</em>
      </h1>
      <p className="mt-5 sm:mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
        Every piece is numbered, hand-finished, and pressed in the same studio session.
        Once the timer ends, the edition is sealed.
      </p>
      <div className="mt-8 inline-flex items-center gap-3 glass-strong rounded-full px-4 sm:px-5 py-2.5 sm:py-3">
        <Clock className="w-4 h-4 text-primary" />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Closes in
        </span>
        <Countdown target={launch} compact />
      </div>
    </>
  );
}

function ClosedHero({ closedDate }: { closedDate: string }) {
  const monthYear = closedDate.replace(/, \d{1,2},/, "").toUpperCase();
  return (
    <>
      <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 inline-flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
        Preorder window · Closed
      </p>
      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
        Order <em className="font-display italic">Closed.</em>
      </h1>
      <p className="mt-5 sm:mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
        This drop closed on {closedDate}. The series is archived — no reissue, no second pressing.
        Watch this space for the next chapter.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3 sm:gap-4">
        <span className="h-px w-12 sm:w-20 bg-white/15" />
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Edition 01 / 01 · {monthYear}
        </p>
        <span className="h-px w-12 sm:w-20 bg-white/15" />
      </div>
    </>
  );
}

function PreorderCard({
  p,
  delay,
  sealed,
}: {
  p: Product;
  delay: number;
  sealed: boolean;
}) {
  return (
    <article
      className="group relative animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link to="/product/$id" params={{ id: p.id }} className="block">
        <div
          className={`relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden glass transition-all duration-500 ${
            sealed
              ? "opacity-80"
              : "group-hover:glow-soft group-hover:-translate-y-1"
          }`}
        >
          <img
            src={p.image}
            alt={p.name}
            width={1024}
            height={1280}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-700 duotone ${
              sealed ? "saturate-50" : "group-hover:scale-105"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />

          {sealed ? (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 glass-strong rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-1.5">
              <Lock className="w-3 h-3" /> Closed
            </div>
          ) : (
            p.bonus && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 glass-strong rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" /> Bonus
              </div>
            )
          )}

          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {p.category}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl mt-1 leading-tight">{p.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1 hidden sm:block">
              {p.tagline}
            </p>
            <div className="mt-3 sm:mt-4 flex items-center justify-between">
              <span className="text-base sm:text-lg font-medium">${p.price}</span>
              {sealed ? (
                <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-muted-foreground">
                  <Lock className="w-3 h-3" /> Closed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-gradient px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium text-background glow-primary">
                  Preorder <ArrowRight className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

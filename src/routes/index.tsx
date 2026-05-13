import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { useEffect } from "react";
import heroImg from "@/assets/hero-artists.jpg";
import { Countdown } from "@/components/countdown";
import { Reveal } from "@/components/reveal";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Heartcode Series — A Cinematic Limited Edition" },
      {
        name: "description",
        content:
          "Preorder the Heartcode Series. A cinematic limited edition collection by Jessie × Tungpang. Numbered, hand-finished, shipped Q2 2026.",
      },
      { property: "og:title", content: "Heartcode Series — A Cinematic Limited Edition" },
      {
        property: "og:description",
        content: "Crafted for collectors, designed for the heart. Preorder open now.",
      },
    ],
  }),
});

const launch = new Date(Date.now() + 1000 * 60 * 60 * 24 * 12 + 1000 * 60 * 60 * 7);

function Particles() {
  // Deterministic positions for SSR safety
  const dots = Array.from({ length: 24 }, (_, i) => {
    const x = (i * 37) % 100;
    const y = (i * 53) % 100;
    const d = 6 + ((i * 7) % 10);
    const s = 0.4 + ((i * 13) % 9) / 10;
    return { x, y, d, s, i };
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((p) => (
        <span
          key={p.i}
          className="absolute rounded-full bg-pink-gradient blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${4 * p.s}px`,
            height: `${4 * p.s}px`,
            opacity: 0.35 * p.s,
            animation: `float-slow ${p.d}s ease-in-out ${p.i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Landing() {
  const featured = products.slice(0, 4);

  // Scroll to hash on mount (when arriving from another route with #section)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center bg-crimson-radial noise">
        <img
          src={heroImg}
          alt="Jessie and Tungpang — Heartcode campaign portrait"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-luminosity scale-105 duotone"
        />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, oklch(0.08 0.02 240 / 0.85) 100%)",
          }}
        />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.2 220 / 0.35) 0%, transparent 60%)",
          }}
        />
        <Particles />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 animate-fade-up">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] uppercase tracking-[0.3em]">
              Limited Preorder Collection
            </span>
          </div>

          <h1
            className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-[0.92] mt-8 animate-fade-up text-balance tracking-tight"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-pink-gradient">Heartcode</span>
            <br />
            <em className="font-display italic font-normal">Series</em>
          </h1>

          <div
            className="flex items-center justify-center gap-4 mt-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-muted-foreground">
              Jessie
            </span>
            <span className="text-primary">×</span>
            <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-muted-foreground">
              Tungpang
            </span>
          </div>

          <p
            className="mt-10 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground text-balance animate-fade-up leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            A cinematic limited edition collection. Crafted for collectors,
            designed for the heart.
          </p>

          <div
            className="mt-12 flex flex-col items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Preorder closes in
            </p>
            <Countdown target={launch} />
          </div>

        </div>

        <a
          href="#collection"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
        >

        </a>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="relative py-32 px-6 bg-background scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3">
                  The Collection
                </p>
                <h2 className="font-serif text-5xl sm:text-7xl leading-[1.02] tracking-tight">
                  Featured <em className="font-display italic">pieces</em>
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Six objects. Each numbered, hand-finished, and pressed in the
                  same studio session.
                </p>
              </div>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground group"
              >
                See all 6 pieces{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  className="group relative block"
                >
                  <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-secondary glass transition-all duration-700 group-hover:glow-soft group-hover:-translate-y-1">
                  <img
                    src={p.image}
                    alt={p.name}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 duotone"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="font-serif text-lg sm:text-2xl mt-1 leading-tight">
                      {p.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium">${p.price}</span>
                      <span className="w-8 h-8 rounded-full glass grid place-items-center group-hover:bg-pink-gradient group-hover:text-background transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative py-32 px-6 bg-background scroll-mt-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, oklch(0.72 0.2 220 / 0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, oklch(0.82 0.13 210 / 0.12) 0%, transparent 55%)",
          }}
        />
        <Reveal>
          <div className="relative max-w-5xl mx-auto text-center mb-20">
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-6">
              Chapter One
            </p>
            <h2 className="font-serif text-5xl sm:text-7xl leading-[1.02] text-balance tracking-tight">
              A love letter,
              <br />
              <em className="font-display italic">pressed in crimson.</em>
            </h2>
            <p className="mt-8 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
              Each piece in the Heartcode Series is built from the same studio sessions —
              shot in low light, scored in slow tempo. The collection is deliberately small,
              quietly numbered, and made to be kept.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="relative aspect-[4/5] rounded-3xl overflow-hidden glow-soft">
            <img
              src={heroImg}
              alt="Jessie and Tungpang"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1500ms] hover:scale-105 duotone"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Behind the lens
              </p>
              <p className="font-serif text-lg mt-1">
                Studio sessions, December 2025
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-6">
              Chapter Two
            </p>
            <h3 className="font-serif text-4xl sm:text-6xl leading-[1.05] text-balance tracking-tight">
              Made in small numbers,
              <br />
              <em className="font-display italic">kept for a long time.</em>
            </h3>
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Every Heartcode piece is hand-finished and individually numbered. We
                pressed the vinyl in translucent crimson. We bound the photobook in
                foil-stamped linen. We tied each polaroid set with a length of black
                satin ribbon, by hand.
              </p>
            </div>

          </Reveal>
        </div>
      </section>

      {/* PREORDER CTA */}
      <section
        id="preorder"
        className="relative py-32 px-6 overflow-hidden scroll-mt-24"
      >
        <div className="absolute inset-0 bg-crimson-radial" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.72 0.2 220 / 0.3) 0%, transparent 60%)",
          }}
        />
        <Particles />
        <Reveal className="relative max-w-3xl mx-auto text-center">
          <Heart className="w-10 h-10 text-primary mx-auto mb-6 animate-glow-pulse rounded-full p-2 bg-pink-gradient/20" />
          <h2 className="font-serif text-5xl sm:text-7xl leading-[1.02] text-balance tracking-tight">
            <em className="font-display italic">Yours,</em> while it lasts.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md mx-auto leading-relaxed">
            Preorder window is open. Once the timer ends, the edition is sealed.
          </p>
          <div className="mt-10 inline-flex flex-col items-center gap-6">
            <Countdown target={launch} compact />
            <Link
              to="/preorder"
              className="group inline-flex items-center gap-2 rounded-full bg-pink-gradient text-background px-9 py-4 text-sm font-medium glow-primary hover:scale-[1.04] transition-transform"
            >
              Reserve your edition
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-7 h-7 rounded-full bg-pink-gradient">
              <Heart className="w-3.5 h-3.5 fill-background text-background" />
            </span>
            <span className="font-serif text-lg">Heartcode</span>
          </Link>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link to="/collection" className="hover:text-foreground transition-colors">Collection</Link>
            <Link to="/preorder" className="hover:text-foreground transition-colors">Preorder</Link>
            <Link to="/story" className="hover:text-foreground transition-colors">Story</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Heartcode Studio</p>
        </div>
      </footer>
    </main>
  );
}

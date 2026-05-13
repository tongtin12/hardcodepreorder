import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Quote, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-artists.jpg";
import { products } from "@/lib/products";

export const Route = createFileRoute("/story")({
  component: Story,
  head: () => ({
    meta: [
      { title: "Story — Heartcode Series" },
      {
        name: "description",
        content:
          "The story behind the Heartcode Series. A cinematic limited edition by Jessie × Tungpang.",
      },
      { property: "og:title", content: "Heartcode — The Story" },
      { property: "og:description", content: "How the Heartcode Series came to be." },
    ],
  }),
});

const chapters: Record<string, string> = {
  "heartcode-photobook":
    "Before there was a series, there was a stack of contact sheets in a folder on the studio floor. 180 pages later, the photobook became the closest thing to standing in the room with us — handwritten letters tucked between portraits, foil-stamped at the cover, ribboned shut.",
  "crimson-vinyl":
    "The score came after the photographs. Eight tracks, recorded slow, pressed at 180g on translucent crimson. Etched on the B-side is the date we finished mixing. The gatefold opens into a fold-out poster we couldn't bring ourselves to crop.",
  "embroidered-hoodie":
    "Garment-dyed in obsidian, cut boxy, weighted at 480 grams to feel like a coat. The embroidered heart was sketched by hand on day two. The signature on the inner cuff is the one nobody else sees.",
  "polaroid-set":
    "Twelve polaroids tied with hand-cut satin ribbon. These were the first frames we shot — before the lighting was set, before anyone said a word. Two of them are lenticular prints. We won't tell you which two.",
  "heart-necklace":
    "Solid 925 sterling silver, cast from a wax we carved one evening when the studio went quiet. The Heartcode glyph is engraved on the reverse, small enough that you have to know it's there.",
  "heart-tote":
    "The everyday piece. 16oz canvas, pink heart silkscreened on. This is the thing we'd hand to a friend at the end of a long shoot — heavy, useful, signed inside.",
};

function Story() {
  return (
    <main className="bg-background pt-28 sm:pt-32 pb-24 overflow-hidden">
      {/* HERO */}
      <section className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-5 inline-flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            The Story · Chapter One
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-balance tracking-tight">
            Two artists, <em className="font-display italic">one winter.</em>
          </h1>
          <p className="mt-5 sm:mt-6 text-muted-foreground leading-relaxed">
            December 2025. A four-week studio residency in low light and slower tempo.
            Heartcode is what came out of it — six objects, hand-finished, made to be kept.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16 aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden glow-soft">
          <img
            src={heroImg}
            alt="Jessie and Tungpang in studio"
            className="w-full h-full object-cover duotone"
          />
        </div>

        {/* Caption */}
        <p className="max-w-5xl mx-auto mt-3 sm:mt-4 text-[11px] text-muted-foreground italic text-right pr-2">
          Studio · Day 14 · 35mm
        </p>
      </section>

      {/* PULL QUOTE + INTRO */}
      <section className="px-4 sm:px-6 mt-16 sm:mt-24">
        <div className="max-w-3xl mx-auto">
          {/* Pull quote — centered, dramatic */}
          <div className="text-center">
            <Quote className="w-7 h-7 sm:w-9 sm:h-9 text-primary/40 mx-auto mb-5 sm:mb-6 rotate-180" />
            <blockquote className="font-display italic text-3xl sm:text-5xl md:text-6xl leading-[1.1] text-foreground tracking-tight text-balance">
              We wanted to make objects you'd keep on a{" "}
              <span className="text-pink-gradient">shelf</span>, not in a drawer.
            </blockquote>
            <div className="mt-6 sm:mt-8 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-primary/40" />
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Jessie × Tungpang
              </p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
          </div>

          {/* Ornament divider */}
          <div className="flex items-center justify-center gap-3 my-12 sm:my-16">
            <span className="h-px w-12 sm:w-16 bg-white/10" />
            <Sparkles className="w-3 h-3 text-primary/60" />
            <span className="h-px w-12 sm:w-16 bg-white/10" />
          </div>

          {/* Body — drop cap + pulled-out highlight + closing */}
          <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10 text-muted-foreground leading-relaxed text-base sm:text-[17px]">
            <p className="first-letter:float-left first-letter:font-display first-letter:italic first-letter:text-[5.5rem] sm:first-letter:text-[6.5rem] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1.5 first-letter:text-pink-gradient">
              Every piece in the Heartcode Series began as a photograph. The vinyl is
              scored to a roll of film. The hoodie, cut from the same cloth as the
              sleeve insert. The polaroids — twelve of them — were the first frames
              shot on day one.
            </p>

            <p className="font-display italic text-2xl sm:text-4xl text-foreground text-center leading-tight py-2 sm:py-3 text-balance">
              Nothing in this collection<br className="sm:hidden" /> exists in isolation.
            </p>

            <p>
              We pressed 500 of each. When they're gone, the series is sealed and
              archived — there won't be a reissue. The hope was simple: a piece of
              this winter, numbered, living in rooms around the world.
            </p>
          </div>
        </div>
      </section>


      {/* CHAPTERS — product-paired narratives */}
      <section className="px-4 sm:px-6 mt-20 sm:mt-32">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3">
            The Objects
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl leading-[1.05]">
            Six chapters, <em className="font-display italic">one room.</em>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Each piece is a fragment of the residency — what we made, why we made it,
            and what we couldn't bear to throw away.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
          {products.map((p, i) => {
            const flip = i % 2 === 1;
            const story = chapters[p.id] ?? p.description;
            return (
              <article
                key={p.id}
                className="grid md:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <Link
                  to="/product/$id"
                  params={{ id: p.id }}
                  className={`block relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden glass glow-soft group ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105 duotone"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 glass-strong rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]">
                    Ch. {(i + 1).toString().padStart(2, "0")}
                  </span>
                </Link>

                <div className={flip ? "md:order-1" : ""}>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-primary">
                    Chapter {(i + 1).toString().padStart(2, "0")} · {p.category}
                  </p>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl mt-3 leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground italic">{p.tagline}</p>
                  <p className="mt-5 sm:mt-6 text-muted-foreground leading-relaxed">
                    {story}
                  </p>
                  {p.bonus && (
                    <div className="mt-5 glass rounded-xl p-3 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs">{p.bonus}</p>
                    </div>
                  )}
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-foreground hover:text-primary group transition-colors"
                  >
                    <span className="underline underline-offset-4">See the piece</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-4 sm:px-6 mt-20 sm:mt-32">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-8 h-8 text-primary mx-auto mb-6 animate-glow-pulse rounded-full p-1.5 bg-pink-gradient/20" />
          <h2 className="font-serif text-3xl sm:text-5xl leading-[1.05]">
            And when it's gone, <em className="font-display italic">it's gone.</em>
          </h2>
          <p className="mt-5 sm:mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Heartcode is a preorder window, not a permanent collection. After the
            timer ends, the edition is sealed and the archive closes.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/preorder"
              className="inline-flex items-center gap-2 rounded-full bg-pink-gradient text-background px-7 py-3.5 text-sm font-medium glow-primary hover:scale-[1.02] transition-transform"
            >
              See preorder list <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/collection"
              className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Back to collection
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

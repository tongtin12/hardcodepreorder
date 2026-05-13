import { Fragment, useEffect, useState } from "react";

export function Countdown({ target, compact = false }: { target: Date; compact?: boolean }) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  const cells = [
    { v: d, l: "Days" },
    { v: h, l: "Hrs" },
    { v: m, l: "Min" },
    { v: s, l: "Sec", live: true },
  ];

  if (compact) {
    return (
      <div className="flex items-stretch gap-2 sm:gap-2.5">
        {cells.map((c, i) => (
          <Fragment key={c.l}>
            <div className="text-center">
              <div className="font-display tabular-nums text-xl sm:text-2xl leading-none text-pink-gradient">
                {c.v.toString().padStart(2, "0")}
              </div>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-1">
                {c.l}
              </div>
            </div>
            {i < cells.length - 1 && (
              <span className="self-start mt-0.5 font-display text-lg sm:text-xl leading-none text-muted-foreground/30">
                :
              </span>
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {cells.map((c, i) => (
        <Fragment key={c.l}>
          <div className="relative glass-strong rounded-2xl px-5 sm:px-7 py-4 sm:py-5 min-w-[78px] sm:min-w-[108px] text-center overflow-hidden">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            {c.live && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
            )}
            <div className="font-display italic tabular-nums text-4xl sm:text-6xl leading-none text-pink-gradient">
              {c.v.toString().padStart(2, "0")}
            </div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground mt-2.5 sm:mt-3">
              {c.l}
            </div>
          </div>
          {i < cells.length - 1 && (
            <span className="font-display text-2xl sm:text-3xl text-muted-foreground/30 leading-none">
              :
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

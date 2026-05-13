import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/collection", label: "Collection" },
  { to: "/preorder", label: "Preorder" },
  { to: "/story", label: "Story" },
] as const;

export function SiteNav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 200 && y > lastY + 4);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobile(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl transition-all duration-500 ${
            scrolled ? "glass-strong px-4 sm:px-6 py-2.5" : "px-2 py-2"
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-pink-gradient glow-primary group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 fill-background text-background" strokeWidth={2.5} />
            </span>
            <span className="font-serif text-xl tracking-tight">Heartcode</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = location.pathname === l.to || location.pathname.startsWith(`${l.to}/`);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm transition-all rounded-full hover:bg-white/5 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span
                    className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[2px] rounded-full bg-pink-gradient transition-all duration-500 ${
                      isActive ? "w-5 opacity-100 shadow-[0_0_10px_var(--glow)]" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 glass rounded-full pl-3 pr-4 py-2 hover:bg-white/10 transition-all hover:scale-[1.02]"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grid place-items-center min-w-[20px] h-5 px-1 rounded-full bg-pink-gradient text-[10px] font-semibold text-background glow-primary">
                  {count}
                </span>
              )}
            </button>
            <button
              className="md:hidden glass w-10 h-10 grid place-items-center rounded-full"
              onClick={() => setMobile((v) => !v)}
              aria-label="Menu"
            >
              {mobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobile && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-2 animate-fade-up">
            {links.map((l) => {
              const isActive = location.pathname === l.to || location.pathname.startsWith(`${l.to}/`);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`block px-4 py-3 text-sm rounded-xl transition-colors ${
                    isActive ? "bg-white/10 text-foreground" : "hover:bg-white/5 text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { SiteNav } from "@/components/site-nav";
import { CartDrawer } from "@/components/cart-drawer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 bg-crimson-radial">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-8xl text-pink-gradient">404</h1>
        <h2 className="mt-4 font-serif text-2xl">This page is off the record</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has been retired or never released.
        </p>
        <Link
          to="/"
          className="inline-flex mt-8 items-center justify-center rounded-full bg-pink-gradient px-6 py-3 text-sm font-medium text-background glow-primary"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl">Something interrupted the moment</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again — we'll pick up where we left off.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-pink-gradient px-5 py-2.5 text-sm font-medium text-background"
          >
            Try again
          </button>
          <a href="/" className="rounded-full glass px-5 py-2.5 text-sm">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Heartcode — Limited Preorder Collection" },
      {
        name: "description",
        content:
          "A cinematic limited edition collection. Crafted for collectors, designed for the heart. Preorder the Heartcode Series.",
      },
      { name: "author", content: "Heartcode" },
      { property: "og:title", content: "Heartcode — Limited Preorder Collection" },
      {
        property: "og:description",
        content: "A cinematic limited edition collection. Crafted for collectors, designed for the heart.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Heartcode — Limited Preorder Collection" },
      { name: "description", content: "Crimson Bloom offers a cinematic, luxury pre-order experience for exclusive artist merchandise." },
      { property: "og:description", content: "Crimson Bloom offers a cinematic, luxury pre-order experience for exclusive artist merchandise." },
      { name: "twitter:description", content: "Crimson Bloom offers a cinematic, luxury pre-order experience for exclusive artist merchandise." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/CVoy5seJDMfZTlpG6RryvLS8vxC2/social-images/social-1778432304441-Screenshot_2569-05-10_at_23.58.03.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/CVoy5seJDMfZTlpG6RryvLS8vxC2/social-images/social-1778432304441-Screenshot_2569-05-10_at_23.58.03.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Italiana&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <filter id="duotone-blue" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.299 0.587 0.114 0 0
                        0.299 0.587 0.114 0 0
                        0.299 0.587 0.114 0 0
                        0     0     0     1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.04 0.55" />
                <feFuncG type="table" tableValues="0.10 0.82" />
                <feFuncB type="table" tableValues="0.26 0.95" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
        <div className="min-h-screen bg-background">
          <SiteNav />
          <Outlet />
          <CartDrawer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

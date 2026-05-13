import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export type CartItem = {
  productId: string;
  variant?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (productId: string, variant?: string, qty?: number) => void;
  remove: (productId: string, variant?: string) => void;
  setQty: (productId: string, variant: string | undefined, qty: number) => void;
  clear: () => void;
  resolve: (item: CartItem) => Product | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "heartcode-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((productId: string, variant?: string, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === productId && i.variant === variant);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { productId, variant, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((productId: string, variant?: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variant === variant)));
  }, []);

  const setQty = useCallback((productId: string, variant: string | undefined, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.variant === variant ? { ...i, qty: Math.max(0, qty) } : i,
        )
        .filter((i) => i.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const resolve = useCallback((item: CartItem) => products.find((p) => p.id === item.productId), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => {
      const p = products.find((p) => p.id === i.productId);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
    return { items, count, subtotal, open, setOpen, add, remove, setQty, clear, resolve };
  }, [items, open, add, remove, setQty, clear, resolve]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
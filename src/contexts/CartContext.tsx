import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;       // unit price INR/month
  ram?: string;
  quantity: number;
}

// ─── Coupon definitions ───────────────────────────────────────────────────────
const COUPONS: Record<string, number> = {
  WELCOME10: 10,
  CREEPER20: 20,
  LAUNCH15:  15,
};

export const PLATFORM_FEE = 49;   // flat INR
export const GST_RATE      = 0.18; // 18 %

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: 1 | -1) => void;
  clearCart: () => void;
  // coupon
  couponCode: string;
  couponPct: number;          // 0-100
  applyCoupon: (code: string) => string | null; // returns error msg or null
  removeCoupon: () => void;
  // billing
  count: number;              // total units in cart
  subtotal: number;
  discount: number;
  platformFee: number;
  gst: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY  = "cc_cart";
const COUPON_KEY   = "cc_coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      return parsed.map(item => ({
        ...item,
        price:    (typeof item.price === 'number' && !isNaN(item.price))    ? item.price    : (Number(item.price) || 0),
        quantity: (typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0) ? item.quantity : 1,
      }));
    } catch { return []; }
  });

  const [couponCode, setCouponCode] = useState<string>(() =>
    localStorage.getItem(COUPON_KEY) ?? ""
  );
  const couponPct = COUPONS[couponCode.toUpperCase()] ?? 0;

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem(COUPON_KEY, couponCode); }, [couponCode]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateQuantity(id: string, delta: 1 | -1) {
    setItems(prev =>
      prev
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
    setCouponCode("");
  }

  function applyCoupon(code: string): string | null {
    const upper = code.trim().toUpperCase();
    if (!COUPONS[upper]) return "Invalid or expired coupon code.";
    setCouponCode(upper);
    return null;
  }

  function removeCoupon() { setCouponCode(""); }

  // ── Billing math ──────────────────────────────────────────────────────────
  const count     = items.reduce((s, i) => s + (Number(i.quantity) || 1), 0);
  const subtotal  = items.reduce((s, i) => s + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0);
  const discount  = Math.round(subtotal * couponPct / 100);
  const afterDiscount = subtotal - discount;
  const platformFee   = items.length > 0 ? PLATFORM_FEE : 0;
  const gst           = Math.round((afterDiscount + platformFee) * GST_RATE);
  const grandTotal    = afterDiscount + platformFee + gst;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      couponCode, couponPct, applyCoupon, removeCoupon,
      count, subtotal, discount, platformFee, gst, grandTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

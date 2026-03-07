import { useState } from "react";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus, Tag, X, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export function CartDrawer() {
  const {
    items, removeItem, updateQuantity, clearCart,
    couponCode, couponPct, applyCoupon, removeCoupon,
    count, subtotal, discount, platformFee, gst, grandTotal,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  function handleApplyCoupon() {
    if (!couponInput.trim()) return;
    const err = applyCoupon(couponInput);
    if (err) { setCouponError(err); }
    else { setCouponError(""); setCouponInput(""); }
  }

  function handleCheckout() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    const description = items.length === 1 ? items[0].name : `${items.length} plans`;
    navigate(`/checkout?amount=${grandTotal}&description=${encodeURIComponent(description)}`);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.06] transition-colors text-gray-300 hover:text-white">
          <ShoppingCart size={18} />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-creeper text-[10px] font-bold text-white leading-none">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="bg-[#0d1424] border-white/[0.08] text-white w-full max-w-sm flex flex-col p-0">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/[0.08]">
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart size={18} className="text-creeper" />
            Cart
            {count > 0 && (
              <span className="ml-auto text-xs text-gray-400 font-normal">{count} unit{count !== 1 ? "s" : ""}</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-12 px-5">
            <ShoppingCart size={40} className="text-gray-600" />
            <p className="text-gray-400 text-sm">Your cart is empty</p>
            <p className="text-gray-500 text-xs">Browse our plans to get started</p>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map(item => (
                <div key={item.id} className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.category}{item.ram ? ` · ${item.ram}` : ""}</p>
                      <p className="text-sm font-semibold text-creeper mt-1">
                        ₹{item.price * item.quantity}
                        <span className="text-xs font-normal text-gray-400"> /mo · ₹{item.price} each</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-md bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <span className="text-xs text-gray-500 ml-1">months</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 pb-5 space-y-4 border-t border-white/[0.08] pt-4">

              {/* Coupon section */}
              {couponCode ? (
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-creeper/10 border border-creeper/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-creeper flex-shrink-0" />
                    <span className="text-xs font-semibold text-creeper">{couponCode}</span>
                    <span className="text-xs text-gray-400">— {couponPct}% off applied</span>
                  </div>
                  <button onClick={removeCoupon} className="text-gray-500 hover:text-red-400 transition-colors">
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        value={couponInput}
                        onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                        onKeyDown={e => e.key === "Enter" && handleApplyCoupon()}
                        placeholder="Coupon code"
                        className="pl-8 h-9 bg-white/[0.04] border-white/[0.10] text-white placeholder:text-gray-600 text-xs focus-visible:ring-creeper/40"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={handleApplyCoupon}
                      variant="outline"
                      className="h-9 border-white/[0.10] text-gray-300 hover:text-white hover:bg-white/[0.06] text-xs px-3"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponError && <p className="text-xs text-red-400 pl-1">{couponError}</p>}
                </div>
              )}

              {/* Billing breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-creeper">
                    <span>Discount ({couponPct}%)</span>
                    <span>− ₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Platform fee (3%)</span>
                  <span className="text-white">₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST (18%)</span>
                  <span className="text-white">₹{gst}</span>
                </div>
                <Separator className="bg-white/[0.08]" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-white">Total / month</span>
                  <span className="text-creeper">₹{grandTotal}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-creeper hover:bg-creeper/90 text-white font-semibold flex items-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={15} />
              </Button>

              <button
                onClick={clearCart}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors py-1"
              >
                <Trash2 size={12} />
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

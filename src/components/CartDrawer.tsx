import { ShoppingCart, X, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export function CartDrawer() {
  const { items, removeItem, clearCart, count, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleCheckout() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    const description = items.length === 1
      ? items[0].name
      : `${items.length} plans`;
    navigate(`/checkout?amount=${total}&description=${encodeURIComponent(description)}`);
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

      <SheetContent side="right" className="bg-[#0d1424] border-white/[0.08] text-white w-full max-w-sm flex flex-col">
        <SheetHeader className="pb-4 border-b border-white/[0.08]">
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingCart size={18} className="text-creeper" />
            Cart
            {count > 0 && (
              <span className="ml-auto text-xs text-gray-400 font-normal">{count} item{count !== 1 ? "s" : ""}</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center py-12">
            <ShoppingCart size={40} className="text-gray-600" />
            <p className="text-gray-400 text-sm">Your cart is empty</p>
            <p className="text-gray-500 text-xs">Browse our plans to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category}{item.ram ? ` · ${item.ram}` : ""}</p>
                    <p className="text-sm font-semibold text-creeper mt-1">₹{item.price}<span className="text-xs font-normal text-gray-400">/mo</span></p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                    aria-label="Remove"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Total / month</span>
                <span className="text-lg font-bold text-white">₹{total}</span>
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

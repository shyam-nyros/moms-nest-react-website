import { X, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import CartItem from "./CartItem.jsx";

export default function CartDrawer({
  items,
  total,
  onClose,
  onUpdateQty,
  onRemove,
  onCheckout,
  onShopPickles,
}) {
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-head">
          <h3>Your Cart</h3>
          <button aria-label="Close cart" onClick={onClose}>
            <X />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag />
            <p>Your cart is empty.</p>
            <button className="primary-btn" onClick={onShopPickles}>
              Shop Pickles <ArrowRight />
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <CartItem
                  key={item.key}
                  item={item}
                  onUpdateQty={(delta) => onUpdateQty(item.key, delta)}
                  onRemove={() => onRemove(item.key)}
                />
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>₹{total}</strong>
              </div>

              <button className="primary-btn full" onClick={onCheckout}>
                Checkout on WhatsApp <MessageCircle size={17} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

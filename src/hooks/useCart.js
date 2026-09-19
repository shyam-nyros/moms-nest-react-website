import { useRef, useState } from "react";

const WHATSAPP_NUMBER = "919876543210";

const cartKey = (name, size) => (size ? `${name}__${size}` : name);

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const addToCart = (product, size = null) => {
    const key = cartKey(product.name, size);
    const price = size ? product.prices[size] : product.price;

    setCartItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...current,
        { key, name: product.name, size, image: product.image, price, qty: 1 },
      ];
    });
    showToast(`${product.name}${size ? ` (${size})` : ""} added to cart`);
  };

  const updateQty = (key, delta) => {
    setCartItems((current) =>
      current
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (key) => {
    setCartItems((current) => current.filter((item) => item.key !== key));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const checkoutOnWhatsApp = () => {
    const lines = cartItems.map(
      (item) =>
        `- ${item.name}${item.size ? ` (${item.size})` : ""} x${item.qty} — ₹${
          item.price * item.qty
        }`
    );
    const message = [
      "Hi Mom's Nest! I'd like to order:",
      ...lines,
      `Total: ₹${cartTotal}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return {
    cartItems,
    cartOpen,
    setCartOpen,
    cartCount,
    cartTotal,
    addToCart,
    updateQty,
    removeFromCart,
    checkoutOnWhatsApp,
    toast,
    showToast,
  };
}

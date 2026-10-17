const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const bumpCart = (cart) => {
  cart.classList.remove("cart-bump");
  // Force a reflow so the animation restarts on rapid clicks.
  void cart.offsetWidth;
  cart.classList.add("cart-bump");
};

// Flies a copy of the product image along an arc into the navbar cart icon.
export function flyToCart(sourceImage) {
  const cart = document.querySelector(".navbar .cart");
  if (!cart) return;

  if (!sourceImage || prefersReducedMotion() || !sourceImage.animate) {
    bumpCart(cart);
    return;
  }

  const from = sourceImage.getBoundingClientRect();
  const to = cart.getBoundingClientRect();
  const size = Math.min(from.width, from.height, 140);

  const flyer = sourceImage.cloneNode();
  flyer.className = "cart-flyer";
  flyer.removeAttribute("loading");
  flyer.alt = "";
  Object.assign(flyer.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${from.left + from.width / 2 - size / 2}px`,
    top: `${from.top + from.height / 2 - size / 2}px`,
  });
  document.body.appendChild(flyer);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const endScale = 18 / size;

  const animation = flyer.animate(
    [
      { transform: "translate(0, 0) scale(1) rotate(0deg)", opacity: 1 },
      {
        transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 120}px) scale(0.55) rotate(-12deg)`,
        opacity: 1,
        offset: 0.45,
      },
      {
        transform: `translate(${dx}px, ${dy}px) scale(${endScale}) rotate(8deg)`,
        opacity: 0.6,
      },
    ],
    { duration: 800, easing: "cubic-bezier(0.55, 0, 0.35, 1)" }
  );

  animation.onfinish = () => {
    flyer.remove();
    bumpCart(cart);
  };
  animation.oncancel = () => flyer.remove();
}

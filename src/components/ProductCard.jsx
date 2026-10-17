import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { flyToCart } from "../utils/flyToCart.js";

export default function ProductCard({
  item,
  price,
  sizeOptions,
  selectedSize,
  onSelectSize,
  onAddToCart,
}) {
  const imageRef = useRef(null);
  const addedTimer = useRef(null);
  const [added, setAdded] = useState(false);

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const handleAddToCart = () => {
    onAddToCart();
    flyToCart(imageRef.current);
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <img ref={imageRef} src={item.image} alt={item.name} loading="lazy" decoding="async" />
        <span className="badge">HANDMADE</span>
      </div>

      <div className="product-info">
        <h3>{item.name}</h3>
        <p>{item.description}</p>

        {sizeOptions && (
          <div
            className="size-selector"
            role="group"
            aria-label={`Select size for ${item.name}`}
          >
            {sizeOptions.map((option) => (
              <button
                key={option}
                className={option === selectedSize ? "size-btn active" : "size-btn"}
                aria-pressed={option === selectedSize}
                onClick={() => onSelectSize(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <div className="product-bottom">
          <strong>₹{price}</strong>

          <button className={added ? "added" : ""} onClick={handleAddToCart}>
            {added ? (
              <>
                Added <Check />
              </>
            ) : (
              <>
                Add to cart <ArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

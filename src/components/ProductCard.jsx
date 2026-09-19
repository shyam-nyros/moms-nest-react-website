import { ArrowRight } from "lucide-react";

export default function ProductCard({
  item,
  price,
  sizeOptions,
  selectedSize,
  onSelectSize,
  onAddToCart,
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
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

          <button onClick={onAddToCart}>
            Add to cart <ArrowRight />
          </button>
        </div>
      </div>
    </article>
  );
}

import { ArrowRight } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard.jsx";

export default function FeaturedPickles({ addToCart, onViewFullMenu }) {
  return (
    <section className="products section">
      <div className="section-heading">
        <div>
          <p className="kicker">A JAR FULL OF MEMORIES</p>
          <h2>
            Our Pickles <span>♡</span>
          </h2>
        </div>

        <button className="view-all-link" onClick={onViewFullMenu}>
          View Full Menu <ArrowRight />
        </button>
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <ProductCard
            key={item.name}
            item={item}
            price={item.price}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </div>
    </section>
  );
}

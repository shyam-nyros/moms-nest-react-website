import { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { SIZE_OPTIONS } from "../data/products";

function groupByCategory(items) {
  const groups = [];
  const byCategory = new Map();
  items.forEach((item) => {
    if (!byCategory.has(item.category)) {
      const group = { category: item.category, items: [] };
      byCategory.set(item.category, group);
      groups.push(group);
    }
    byCategory.get(item.category).items.push(item);
  });
  return groups;
}

export default function PicklesSection({ items, searchQuery, setSearchQuery, addToCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});

  const groups = groupByCategory(items);

  return (
    <section className="products section" id="pickles">
      <div className="section-heading">
        <div>
          <p className="kicker">A JAR FULL OF MEMORIES</p>
          <h2>
            Our Pickles <span>♡</span>
          </h2>
        </div>
      </div>

      {searchQuery.trim() && (
        <p className="search-status">
          Showing {items.length} result{items.length === 1 ? "" : "s"} for "{searchQuery}"
          <button onClick={() => setSearchQuery("")}>Clear search</button>
        </p>
      )}

      {items.length === 0 ? (
        <p className="no-results">
          No pickles match "{searchQuery}". Try a different search.
        </p>
      ) : (
        groups.map((group) => (
          <div className="category-group" key={group.category}>
            <h3 className="category-heading">{group.category}</h3>

            <div className="product-grid">
              {group.items.map((item) => {
                const size = selectedSizes[item.name] || SIZE_OPTIONS[0];

                return (
                  <ProductCard
                    key={item.name}
                    item={item}
                    price={item.prices[size]}
                    sizeOptions={SIZE_OPTIONS}
                    selectedSize={size}
                    onSelectSize={(option) =>
                      setSelectedSizes((current) => ({ ...current, [item.name]: option }))
                    }
                    onAddToCart={() => addToCart(item, size)}
                  />
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

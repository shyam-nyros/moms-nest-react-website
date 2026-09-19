import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  Heart,
  Leaf,
  CookingPot,
  ShieldCheck,
  PackageCheck,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Star,
  Plus,
  Minus,
  Trash2,
  Send,
} from "lucide-react";
import "./styles.css";
import { chickenPickleImage, products, reviews } from "./data/products";

const WHATSAPP_NUMBER = "919876543210";
const CONTACT_EMAIL = "hello@momsnest.in";

const NAV_LINKS = [
  ["Home", "home"],
  ["Pickles", "pickles"],
  ["Our Story", "story"],
  ["Ingredients", "ingredients"],
  ["Reviews", "reviews"],
  ["Contact", "contact"],
];

const SECTION_ORDER = ["home", "pickles", "story", "ingredients", "reviews", "contact"];

function parsePrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [rev, setRev] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toastTimer = useRef(null);
  const searchInputRef = useRef(null);
  const navActionsRef = useRef(null);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const showToast = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.name === product.name);
      if (existing) {
        return current.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQty = (name, delta) => {
    setCartItems((current) =>
      current
        .map((item) => (item.name === name ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (name) => {
    setCartItems((current) => current.filter((item) => item.name !== name));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0
  );

  const checkoutOnWhatsApp = () => {
    const lines = cartItems.map(
      (item) => `- ${item.name} x${item.qty} — ₹${parsePrice(item.price) * item.qty}`
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

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.trim().toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (navActionsRef.current && !navActionsRef.current.contains(event.target)) {
        setSearchOpen(false);
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setCartOpen(false);
      setSearchOpen(false);
      setAccountOpen(false);
      setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 700);

      const scrollPos = window.scrollY + 140;
      let current = SECTION_ORDER[0];
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPos) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nextReview = () => setRev((current) => (current + 1) % reviews.length);
  const previousReview = () =>
    setRev((current) => (current - 1 + reviews.length) % reviews.length);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const messageText = form.message.value.trim();

    const subject = encodeURIComponent(`Enquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(`${messageText}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    showToast("Opening your email app…");
  };

  return (
    <div className="site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="announcement">
        <span>✦ Traditional Taste</span>
        <b>|</b>
        <span>Homemade with Love</span>
        <b>|</b>
        <span>No Preservatives</span>
        <b>|</b>
        <span>From Our Kitchen to Your Table</span>
        <em>Pickles that feel like home ♡</em>
      </div>

      <header className="navbar">
        <button
          className="mobile-menu"
          onClick={() => setMenu((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={menu}
        >
          {menu ? <X /> : <Menu />}
        </button>

        <button className="brand" onClick={() => go("home")}>
          <span className="brand-mark">⌁</span>
          <span>
            <strong>Mom's Nest</strong>
            <small>ANDHRA PICKLES</small>
          </span>
        </button>

        <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Primary">
          {NAV_LINKS.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={activeSection === id ? "active" : ""}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions" ref={navActionsRef}>
          <div className="search-wrap">
            <button
              aria-label={searchOpen ? "Close search" : "Search"}
              aria-expanded={searchOpen}
              onClick={() => {
                setAccountOpen(false);
                setSearchOpen((current) => !current);
              }}
            >
              {searchOpen ? <X /> : <Search />}
            </button>

            {searchOpen && (
              <div className="dropdown-panel search-panel" role="search">
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search pickles…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setSearchOpen(false);
                      go("pickles");
                    }
                  }}
                  aria-label="Search pickles"
                />
                <p className="search-hint">
                  {searchQuery.trim()
                    ? `${filteredProducts.length} result${
                        filteredProducts.length === 1 ? "" : "s"
                      } for "${searchQuery}"`
                    : "Try “prawn”, “cashew”, “spicy”…"}
                </p>
              </div>
            )}
          </div>

          <div className="account-wrap">
            <button
              aria-label="Account"
              aria-expanded={accountOpen}
              onClick={() => {
                setSearchOpen(false);
                setAccountOpen((current) => !current);
              }}
            >
              <UserRound />
            </button>

            {accountOpen && (
              <div className="dropdown-panel account-panel" role="menu">
                <p>
                  <strong>Accounts are coming soon.</strong>
                </p>
                <p>Need help with an order or have a question?</p>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  Email us <ArrowRight size={14} />
                </a>
              </div>
            )}
          </div>

          <button
            className="cart"
            onClick={() => setCartOpen(true)}
            aria-label={`Shopping cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
          >
            <ShoppingBag />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">TRADITIONAL • HOMEMADE • ANDHRA</p>

            <h1>
              Homemade
              <br />
              <i>Pickles with</i>
              <br />
              Heart <span>♡</span>
            </h1>

            <p className="hero-text">
              Authentic Andhra recipes, made with pure ingredients and a whole
              lot of love.
            </p>

            <button className="primary-btn" onClick={() => go("pickles")}>
              Shop Now <ArrowRight />
            </button>

            <div className="hero-features">
              <Feature icon={<Leaf />} label="No Preservatives" />
              <Feature icon={<CookingPot />} label="Traditional Recipes" />
              <Feature icon={<Heart />} label="Homemade in Small Batches" />
              <Feature icon={<ShieldCheck />} label="Premium Ingredients" />
            </div>
          </div>

          <div className="hero-product">
            <div className="hero-glow" />

            <img
              src={chickenPickleImage}
              alt="Mom's Nest Chicken Pickle"
              className="hero-real-image"
            />

            <p className="hero-note">
              “More than a pickle.
              <br />
              It's a piece of home ♡”
            </p>
          </div>
        </section>

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
              Showing {filteredProducts.length} result
              {filteredProducts.length === 1 ? "" : "s"} for "{searchQuery}"
              <button onClick={() => setSearchQuery("")}>Clear search</button>
            </p>
          )}

          <div className="product-grid">
            {filteredProducts.length === 0 ? (
              <p className="no-results">
                No pickles match "{searchQuery}". Try a different search.
              </p>
            ) : (
              filteredProducts.map(({ name, description, price, image }) => (
                <article className="product-card" key={name}>
                  <div className="product-image">
                    <img src={image} alt={name} loading="lazy" decoding="async" />
                    <span className="badge">HANDMADE</span>
                  </div>

                  <div className="product-info">
                    <h3>{name}</h3>
                    <p>{description}</p>

                    <div className="product-bottom">
                      <strong>{price}</strong>

                      <button onClick={() => addToCart({ name, price, image })}>
                        Add to cart <ArrowRight />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="story-photo" aria-hidden="true" />

          <div className="story-copy">
            <p className="kicker light">ROOTED IN TRADITION</p>

            <h2>
              Recipes that
              <br />
              <i>feel like home.</i> ♡
            </h2>

            <p>
              At Mom’s Nest, we bring you the authentic taste of Andhra with
              recipes passed down through generations. Every jar is prepared
              with pure ingredients, traditional methods and a whole lot of
              love.
            </p>

            <button className="light-btn" onClick={() => go("contact")}>
              Get in Touch <ArrowRight />
            </button>
          </div>

          <div className="ingredient-card" id="ingredients">
            <h3>What goes in every jar</h3>

            <Ingredient icon={<Leaf />} text="Authentic Andhra Taste" />
            <Ingredient icon={<CookingPot />} text="Made in Small Batches" />
            <Ingredient icon={<Leaf />} text="No Preservatives" />
            <Ingredient icon={<ShieldCheck />} text="Quality Ingredients" />
            <Ingredient icon={<PackageCheck />} text="Packed with Care" />
          </div>

          <div className="story-quote">
            “Good food
            <br />
            brings people
            <br />
            closer.” <span>♡♡</span>
          </div>
        </section>

        <section className="reviews section" id="reviews">
          <div className="section-heading center">
            <div>
              <p className="kicker">FROM OUR KITCHEN TO YOUR TABLE</p>
              <h2>What Our Customers Say</h2>
            </div>
          </div>

          <div className="review-wrap">
            <button
              className="review-arrow"
              onClick={previousReview}
              aria-label="Previous review"
            >
              ‹
            </button>

            <div className="review-grid">
              {reviews.map(({ quote, author }, index) => (
                <article
                  className={
                    index === rev ? "review-card active-review" : "review-card"
                  }
                  key={author}
                >
                  <span className="quote-mark">“</span>
                  <p>{quote}</p>
                  <strong>— {author}</strong>

                  <div className="stars" aria-label="5 star review">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={15} fill="currentColor" />
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <button
              className="review-arrow"
              onClick={nextReview}
              aria-label="Next review"
            >
              ›
            </button>
          </div>
        </section>

        <section className="contact" id="contact">
          <div>
            <p className="kicker light">GET IN TOUCH</p>

            <h2>
              We'd love <i>to hear</i> from you ♡
            </h2>

            <p>
              Questions about flavours, bulk orders or gifting? Send us a
              message and we'll get back to you within a day.
            </p>

            <div className="contact-list">
              <span>
                <Phone /> <a href="tel:+919876543210">+91 98765 43210</a>
              </span>
              <span>
                <Mail /> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </span>
              <span>
                <MapPin /> Visakhapatnam, Andhra Pradesh
              </span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" required autoComplete="name" />
            </div>

            <div>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={4} required />
            </div>

            <button className="primary-btn" type="submit">
              Send Message <Send size={17} />
            </button>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark">⌁</span>

          <div>
            <strong>Mom's Nest</strong>
            <small>ANDHRA PICKLES</small>
          </div>

          <p>
            Spreading happiness
            <br />
            one jar at a time ♡
          </p>
        </div>

        <div className="footer-col">
          <h4>Stay Connected</h4>
          <p>Follow us for updates, new flavours & more.</p>

          <div className="socials">
            <Instagram aria-hidden="true" />
            <Facebook aria-hidden="true" />
            <MessageCircle aria-hidden="true" />
            <Youtube aria-hidden="true" />
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => go("story")}>Our Story</button>
          <button onClick={() => go("pickles")}>Pickles</button>
          <button onClick={() => go("contact")}>Contact</button>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>

          <p>
            <Phone /> <a href="tel:+919876543210">+91 98765 43210</a>
          </p>

          <p>
            <Mail /> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>

          <p>
            <MapPin /> Visakhapatnam, Andhra Pradesh
          </p>
        </div>
      </footer>

      <div className="copyright">
        © 2026 Mom's Nest. All rights reserved.{" "}
        <span>Made with ♥ for authentic flavours.</span>
      </div>

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}

      {showBackToTop && (
        <button
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp />
        </button>
      )}

      {cartOpen && (
        <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-head">
              <h3>Your Cart</h3>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag />
                <p>Your cart is empty.</p>
                <button
                  className="primary-btn"
                  onClick={() => {
                    setCartOpen(false);
                    go("pickles");
                  }}
                >
                  Shop Pickles <ArrowRight />
                </button>
              </div>
            ) : (
              <>
                <ul className="cart-list">
                  {cartItems.map((item) => (
                    <li key={item.name} className="cart-item">
                      <img src={item.image} alt="" />

                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>{item.price}</span>

                        <div className="qty-control">
                          <button
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => updateQty(item.name, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.qty}</span>
                          <button
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => updateQty(item.name, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="cart-remove"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item.name)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Subtotal</span>
                    <strong>₹{cartTotal}</strong>
                  </div>

                  <button className="primary-btn full" onClick={checkoutOnWhatsApp}>
                    Checkout on WhatsApp <MessageCircle size={17} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="feature">
      <span>{icon}</span>
      <small>{label}</small>
    </div>
  );
}

function Ingredient({ icon, text }) {
  return (
    <div className="ingredient">
      <span>{icon}</span>
      {text}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

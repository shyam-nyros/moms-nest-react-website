import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
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
} from "lucide-react";
import "./styles.css";
import { chickenPickleImage, products, reviews } from "./data/products";

function App() {
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(0);
  const [rev, setRev] = useState(0);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const nextReview = () => {
    setRev((current) => (current + 1) % reviews.length);
  };

  const previousReview = () => {
    setRev((current) => (current - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="site">
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

        <nav className={menu ? "nav-links open" : "nav-links"}>
          {[
            ["Home", "home"],
            ["Our Story", "story"],
            ["Pickles", "pickles"],
            ["Ingredients", "ingredients"],
            ["Reviews", "reviews"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button aria-label="Search">
            <Search />
          </button>

          <button aria-label="Account">
            <UserRound />
          </button>

          <button
            className="cart"
            onClick={() => go("pickles")}
            aria-label="Shopping cart"
          >
            <ShoppingBag />
            {cart > 0 && <span>{cart}</span>}
          </button>
        </div>
      </header>

      <main>
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

            <button className="text-btn" onClick={() => go("pickles")}>
              Explore All <ArrowRight />
            </button>
          </div>

          <div className="product-grid">
            {products.map(({ name, description, price, image }) => (
              <article className="product-card" key={name}>
                <div className="product-image">
                  <img src={image} alt={name} />
                  <span className="badge">HANDMADE</span>
                </div>

                <div className="product-info">
                  <h3>{name}</h3>
                  <p>{description}</p>

                  <div className="product-bottom">
                    <strong>{price}</strong>

                    <button onClick={() => setCart((current) => current + 1)}>
                      Add to cart <ArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
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

            <button className="light-btn" onClick={() => go("story")}>
              Our Story <ArrowRight />
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
      </main>

      <footer id="contact">
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
            <Instagram />
            <Facebook />
            <MessageCircle />
            <Youtube />
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
            <Phone /> +91 98765 43210
          </p>

          <p>
            <Mail /> hello@momsnest.in
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

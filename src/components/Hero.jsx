import { ArrowRight, Heart, Leaf, CookingPot, ShieldCheck } from "lucide-react";
import Feature from "./Feature.jsx";

export default function Hero({ go, image }) {
  return (
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

        <img src={image} alt="Mom's Nest Chicken Pickle" className="hero-real-image" />

        <p className="hero-note">
          “More than a pickle.
          <br />
          It's a piece of home ♡”
        </p>
      </div>
    </section>
  );
}

import { ArrowRight, Leaf, CookingPot, ShieldCheck, PackageCheck } from "lucide-react";
import Ingredient from "./Ingredient.jsx";

export default function StorySection({ go }) {
  return (
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
  );
}

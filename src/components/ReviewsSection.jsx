import { Star } from "lucide-react";

export default function ReviewsSection({ reviews, activeIndex, onPrevious, onNext }) {
  return (
    <section className="reviews section" id="reviews">
      <div className="section-heading center">
        <div>
          <p className="kicker">FROM OUR KITCHEN TO YOUR TABLE</p>
          <h2>What Our Customers Say</h2>
        </div>
      </div>

      <div className="review-wrap">
        <button className="review-arrow" onClick={onPrevious} aria-label="Previous review">
          ‹
        </button>

        <div className="review-grid">
          {reviews.map(({ quote, author }, index) => (
            <article
              className={index === activeIndex ? "review-card active-review" : "review-card"}
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

        <button className="review-arrow" onClick={onNext} aria-label="Next review">
          ›
        </button>
      </div>
    </section>
  );
}

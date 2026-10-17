import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactSection({ contactEmail, onSubmit }) {
  return (
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
            <Phone /> <a href="tel:+918985998996">+91 89859 98996</a>
          </span>
          <span>
            <Mail /> <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </span>
          <span>
            <MapPin /> Analysis Nine Cube, Old Water Tank Road, Samalkot
          </span>
        </div>
      </div>

      <form className="contact-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" />
        </div>

        <div>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" />
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
  );
}

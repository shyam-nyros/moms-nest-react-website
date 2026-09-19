import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import logoMark from "../assets/products/web-logo-icon.png";

export default function Footer({ go, contactEmail }) {
  return (
    <footer>
      <div className="footer-brand">
        <img className="brand-mark" src={logoMark} alt="" />

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
          <Mail /> <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </p>

        <p>
          <MapPin /> Visakhapatnam, Andhra Pradesh
        </p>
      </div>
    </footer>
  );
}

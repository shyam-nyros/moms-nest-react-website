import { ArrowUp } from "lucide-react";

export default function BackToTop({ show }) {
  if (!show) return null;

  return (
    <button
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp />
    </button>
  );
}

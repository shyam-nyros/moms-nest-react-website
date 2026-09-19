import { ArrowRight } from "lucide-react";

export default function AccountPanel({ contactEmail }) {
  return (
    <div className="dropdown-panel account-panel" role="menu">
      <p>
        <strong>Accounts are coming soon.</strong>
      </p>
      <p>Need help with an order or have a question?</p>
      <a href={`mailto:${contactEmail}`}>
        Email us <ArrowRight size={14} />
      </a>
    </div>
  );
}

import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({ item, onUpdateQty, onRemove }) {
  const label = item.size ? `${item.name} (${item.size})` : item.name;

  return (
    <li className="cart-item">
      <img src={item.image} alt="" />

      <div className="cart-item-info">
        <strong>{item.name}</strong>
        <span>
          {item.size ? `${item.size} · ` : ""}₹{item.price}
        </span>

        <div className="qty-control">
          <button aria-label={`Decrease ${label} quantity`} onClick={() => onUpdateQty(-1)}>
            <Minus size={14} />
          </button>
          <span>{item.qty}</span>
          <button aria-label={`Increase ${label} quantity`} onClick={() => onUpdateQty(1)}>
            <Plus size={14} />
          </button>
        </div>
      </div>

      <button className="cart-remove" aria-label={`Remove ${label} from cart`} onClick={onRemove}>
        <Trash2 size={16} />
      </button>
    </li>
  );
}

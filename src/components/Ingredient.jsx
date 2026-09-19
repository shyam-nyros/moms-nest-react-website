export default function Ingredient({ icon, text }) {
  return (
    <div className="ingredient">
      <span>{icon}</span>
      {text}
    </div>
  );
}

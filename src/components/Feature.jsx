export default function Feature({ icon, label }) {
  return (
    <div className="feature">
      <span>{icon}</span>
      <small>{label}</small>
    </div>
  );
}

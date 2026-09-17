export default function Badge({ children, tone = "green", className = "" }) {
  const tones = {
    green: "bg-urgency-green-bg text-urgency-green-text",
    amber: "bg-urgency-yellow-bg text-urgency-yellow-text",
    red: "bg-urgency-red-bg text-urgency-red-text",
    blue: "bg-[#e9f3f7] text-[#2e6475]",
    neutral: "bg-[#f0f2ed] text-[#5d675f]",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

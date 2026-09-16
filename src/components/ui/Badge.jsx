export default function Badge({ children, tone = "green", className = "" }) {
  const tones = {
    green: "bg-[#e6f3e9] text-[#285f3e]",
    amber: "bg-[#fff4d8] text-[#8b6421]",
    red: "bg-[#feece7] text-[#a54830]",
    blue: "bg-[#e9f3f7] text-[#2e6475]",
    neutral: "bg-[#f0f2ed] text-[#5d675f]",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

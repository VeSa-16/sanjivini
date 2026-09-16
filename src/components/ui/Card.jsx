export default function Card({ children, className = "", interactive = false }) {
  return (
    <section
      className={`rounded-[28px] border border-[#183b2a]/8 bg-white/92 shadow-[0_16px_50px_rgba(26,62,43,0.08)] backdrop-blur ${
        interactive ? "transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(26,62,43,0.12)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

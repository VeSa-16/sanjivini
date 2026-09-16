export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    primary:
      "bg-[#173f2c] text-white shadow-[0_12px_24px_rgba(23,63,44,.20)] hover:bg-[#0e3020]",
    secondary:
      "bg-[#eef5ef] text-[#173f2c] hover:bg-[#e1eee4]",
    outline:
      "border border-[#173f2c]/14 bg-white text-[#173f2c] hover:bg-[#f5f8f4]",
    danger:
      "bg-[#fff0ec] text-[#9b4029] hover:bg-[#ffe4dd]",
  };

  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

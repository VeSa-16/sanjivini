import { Link, Outlet, useLocation } from "react-router-dom";

export default function MarketingLayout() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Why Sanjivani", path: "/why" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Features", path: "/features" },
    { name: "Impact", path: "/impact" },
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      {/* SHARED TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent px-6 py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          
          {/* Logo Left */}
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src="/logo.png" alt="Sanjivani Logo" className="h-12 w-auto object-contain drop-shadow-sm" />
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm transition ${
                  location.pathname === link.path 
                    ? "font-bold text-[#173f2c]" 
                    : "font-semibold text-[#59645d] hover:text-[#173f2c]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Right */}
          <div>
            <Link to="/onboarding" className="rounded-full bg-[#173f2c] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#173f2c]/20 transition-transform hover:scale-105 active:scale-95">
              Get Started →
            </Link>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
}

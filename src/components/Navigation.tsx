import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/branding/logo.png';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
  ];

  const rightLinks = [
    { name: 'Packages', path: '/packages' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  const navLinks = [...leftLinks, ...rightLinks];

  const isDarkHeader = isScrolled || location.pathname === '/testimonials';

  const linkClass = (path: string) =>
    `font-sans text-sm tracking-wide uppercase transition-all hover:opacity-70 text-[#F5F0E8] border-[#D4A574] text-shadow-sm ${
      location.pathname === path ? 'border-b-2 pb-1' : ''
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDarkHeader
          ? 'bg-[#121113]/95 backdrop-blur-sm shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        {/* Desktop: links clustered close to the logo, centered as one group */}
        <div className="hidden md:flex items-center justify-center gap-10 lg:gap-14">
          <div className="flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>

          <Link to="/" className="flex-shrink-0 group px-1 py-1">
            <img
              src={logo}
              alt="Love Light Vision Studio"
              className="h-[58px] md:h-[67px] w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="flex items-center gap-8">
            {rightLinks.map((link) => (
              <Link key={link.path} to={link.path} className={linkClass(link.path)}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile: logo centered, hamburger on the right */}
        <div className="md:hidden relative flex items-center justify-center">
          <Link to="/" className="flex-shrink-0 group px-1 py-1">
            <img
              src={logo}
              alt="Love Light Vision Studio"
              className="h-[58px] w-auto drop-shadow-lg"
            />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="absolute right-0 text-[#F5F0E8] drop-shadow-md transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#121113] shadow-lg mt-4 animate-slide-down">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-sans text-sm tracking-wide uppercase transition-colors hover:text-[#D4A574] ${
                  location.pathname === link.path
                    ? 'text-[#D4A574] font-semibold'
                    : 'text-[#F5F0E8]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

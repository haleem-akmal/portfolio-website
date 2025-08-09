// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FiArrowRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const menuRef = useRef(null);

  const location = useLocation();

  // Active hash highlight
  const [activeHash, setActiveHash] = useState(
    typeof window !== 'undefined' ? window.location.hash || '#home' : '#home'
  );

  // Close on Esc + focus management + body scroll lock
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    const prev = document.body.style.overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstMobileLinkRef.current?.focus(), 0);
    } else {
      toggleBtnRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  // Simple focus trap inside mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e) => {
      if (e.key !== 'Tab') return;
      const focusables = menuRef.current?.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const isShift = e.shiftKey;

      if (isShift && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!isShift && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isMenuOpen]);

  // Active hash state -> update whenever route or hash changes
  useEffect(() => {
    setActiveHash(location.hash || '#home');
  }, [location]);

  // Scroll Manager: handle hash scroll with navbar offset, else scroll to top on route change
  useEffect(() => {
    const { hash } = location;

    const scrollToHash = () => {
      if (!hash) return false;
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return false;

      const navEl = document.getElementById('site-nav');
      const offset = (navEl?.offsetHeight ?? 72) + 8; // navbar height + small gap
      const y = el.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: y, behavior: 'smooth' });
      return true;
    };

    if (hash) {
      // Try immediately, then retry a few times (for SPA content mount)
      if (scrollToHash()) return;

      let attempts = 0;
      const maxAttempts = 20;
      const timer = setInterval(() => {
        attempts += 1;
        if (scrollToHash() || attempts >= maxAttempts) {
          clearInterval(timer);
        }
      }, 50);

      return () => clearInterval(timer);
    } else {
      // No hash -> new route: go to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Smart NavLink (hash => always Link to "/#hash" so SPA + our scroll manager will handle)
  const NavLink = React.forwardRef(
    ({ href, children, className, onClick, ...rest }, ref) => {
      const isExternal = /^https?:\/\//i.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            ref={ref}
            onClick={onClick}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            {...rest}
          >
            {children}
          </a>
        );
      }

      if (href.startsWith('#')) {
        const to = `/${href}`; // always route to home + hash
        return (
          <Link to={to} ref={ref} onClick={onClick} className={className} {...rest}>
            {children}
          </Link>
        );
      }

      if (href.startsWith('/')) {
        return (
          <Link to={href} ref={ref} onClick={onClick} className={className} {...rest}>
            {children}
          </Link>
        );
      }

      // Fallback
      return (
        <Link to={href} ref={ref} onClick={onClick} className={className} {...rest}>
          {children}
        </Link>
      );
    }
  );
  NavLink.displayName = 'NavLink';

  return (
    <>
      {/* Skip link (same-page a11y) */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only fixed top-2 left-2 z-[60] rounded bg-purple-600 px-3 py-2 text-white"
      >
        Skip to content
      </a>

      {/* Main Navbar */}
      <nav
        id="site-nav"
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0f0f1b]/70 backdrop-blur-md text-white"
      >
        <div className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/#home"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = activeHash === link.href;
              return (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium
                      ${active ? 'text-white bg-white/5' : 'text-gray-200 hover:text-white hover:bg-white/5'}
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:ring-offset-2`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
            <li className="ml-2">
              <Link
                to="/admin-login"
                className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white
                           hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:ring-offset-2"
              >
                Dashboard
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hidden" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <button
        aria-hidden={!isMenuOpen}
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Side Sheet */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 left-0 z-50 h-full w-[70%] md:hidden
              transform transition-transform duration-300 ease-out
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div
          className="relative h-full overflow-hidden bg-[#0b0f1a]/90 backdrop-blur-xl
               border-r border-white/10 shadow-2xl rounded-r-2xl
               px-5 pt-[calc(16px+env(safe-area-inset-top))] pb-[calc(24px+env(safe-area-inset-bottom))]
               flex flex-col"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(50% 40% at 20% 20%, rgba(168,85,247,0.18) 0%, rgba(0,0,0,0) 60%), radial-gradient(40% 30% at 80% 80%, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 60%)',
            }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <Link
                to="/#home"
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
              >
                Portfolio
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Collapse menu"
                className="rounded-full p-2 text-white/90 hover:bg-white/10 shadow-sm
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M9 4v16" />
                  <path d="M14 15l-3-3 3-3" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <ul className="mt-8 space-y-2">
              {navLinks.map((link, i) => {
                const active = activeHash === link.href;
                return (
                  <li
                    key={link.href}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    className={`transform transition-all duration-300 ${
                      isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                  >
                    <NavLink
                      ref={i === 0 ? firstMobileLinkRef : null}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center justify-between rounded-xl px-4 py-3 text-xl font-semibold
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60
                                  ${active ? 'bg-white/10 text-white' : 'text-gray-200 hover:text-white hover:bg-white/10'}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 rounded-full transition-colors ${
                            active ? 'bg-purple-400' : 'bg-white/20 group-hover:bg-white/40'
                          }`}
                        />
                        {link.label}
                      </span>
                      <FiArrowRight
                        className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex-1" />

            {/* Quick actions */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <NavLink
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 px-4 py-3 text-center font-semibold
                             hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
                >
                  Contact
                </NavLink>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-center font-semibold text-gray-200
                             hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
                >
                  Resume
                </a>
              </div>

              {/* Socials */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <a
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
                  aria-label="GitHub"
                >
                  <FiGithub size={20} aria-hidden="true" />
                </a>
                <a
                  href="https://linkedin.com/in/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={20} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
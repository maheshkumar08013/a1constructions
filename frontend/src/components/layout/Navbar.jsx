import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import logo from '../../assets/logo.png'

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About',    to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact',  to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.09)]' : 'shadow-[0_1px_0_rgba(0,0,0,0.06)]'
      }`}>
        {/* Top gradient accent bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-navy via-blue-brand to-navy" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[100px] lg:h-[120px]">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="A1 Construction" className="h-16 lg:h-[100px] w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`relative text-[13.5px] font-semibold font-inter px-3.5 py-2 rounded inline-block transition-colors duration-200 ${
                      isActive(to)
                        ? 'text-blue-brand'
                        : 'text-navy hover:text-blue-brand'
                    }`}
                  >
                    {label}
                    <span className={`absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-blue-brand rounded-full transition-transform duration-200 origin-left ${
                      isActive(to) ? 'scale-x-100' : 'scale-x-0'
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+919845370474" className="flex items-center gap-1.5 text-navy/65 text-[13px] font-medium hover:text-blue-brand transition-colors">
                <Phone size={13} />
                +91 98453 70474
              </a>
              <div className="w-px h-4 bg-gray-200" />
              {/* <Link
                to="/contact"
                className="bg-blue-brand hover:bg-blue-dark text-white px-5 py-2.5 rounded text-[13px] font-bold font-inter transition-colors shadow-sm"
              >
                Get in Touch
              </Link> */}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-md text-navy hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-2 pb-5 space-y-0.5">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-semibold font-inter transition-colors ${
                  isActive(to)
                    ? 'bg-blue-brand/8 text-blue-brand'
                    : 'text-navy hover:bg-gray-50 hover:text-blue-brand'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  isActive(to) ? 'bg-blue-brand' : 'bg-gray-300'
                }`} />
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <a href="tel:+919845370474" className="flex items-center gap-2 px-4 py-2 text-[13px] text-navy/60 font-medium">
                <Phone size={13} /> +91 98453 70474
              </a>
              {/* <Link to="/contact" className="block text-center bg-blue-brand text-white px-5 py-3 rounded text-[13px] font-bold hover:bg-blue-dark transition-colors">
                Get in Touch
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Fixed navbar spacer */}
      <div className="h-[69px] lg:h-[77px]" />
    </>
  )
}

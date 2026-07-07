import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Facebook, Linkedin, Instagram, Youtube, ArrowRight } from 'lucide-react'
import logo from '../../assets/logo.png'

// X Logo component
function XLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.209-6.807-5.974 6.807H2.882l7.732-8.835L1.227 2.25h6.836l4.713 6.231 5.448-6.231zM17.15 19.75h1.826L6.883 4.15H4.95l12.2 15.6z"/>
    </svg>
  )
}

const quickLinks = [
  { label: 'Home',     to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact',  to: '/contact' },
]

const services = [
  'Building Construction', 'Government Infrastructure',
  'Healthcare Facilities', 'Educational Campuses',
  'Industrial Construction', 'Project Management',
]

const socials = [
  // { Icon: Facebook,  href: '#', label: 'Facebook' },
  { Icon: XLogo,   href: '#', label: 'X' },
  // { Icon: Linkedin,  href: '#', label: 'LinkedIn' },
  // { Icon: Instagram, href: '#', label: 'Instagram' },
  // { Icon: Youtube,   href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-[#cdcdcd]">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-14 lg:py-16 border-b border-white/6">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="A1 Construction" className="h-12 w-auto mb-5 " />
            <p className="text-black text-sm leading-relaxed mb-6">
              Bengaluru-based infrastructure company established in 2012. Specialists in government, healthcare, educational, and corporate construction across Karnataka and South India.
            </p>
            <div className="flex items-center gap-6 mb-6">
              {[['12+', 'Years'], ['100+', 'Projects'], ['500+', 'Team']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-montserrat font-black text-black text-lg leading-none">{n}</div>
                  <div className="text-black/25 text-[9px] uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 border border-black rounded flex items-center justify-center text-black hover:bg-blue-brand hover:border-blue-brand hover:text-white transition-all duration-200">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-black text-[10px] font-bold uppercase tracking-[3px] mb-5 font-inter">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-black text-sm hover:text-black flex items-center gap-2 transition-colors group">
                    <ArrowRight size={11} className="text-blue-brand opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-black text-[10px] font-bold uppercase tracking-[3px] mb-5 font-inter">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <Link to="/services" className="text-black text-sm hover:text-black flex items-center gap-2 transition-colors group">
                    <ArrowRight size={11} className="text-blue-brand opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-black text-[10px] font-bold uppercase tracking-[3px] mb-5 font-inter">Contact Us</h4>
            <div className="space-y-4">
              {[
                { Icon: MapPin, text: '#352/32, 1st Floor, 3rd Block, Nagarabhavi 2nd Stage, Bangalore – 560072' },
                { Icon: Phone, text: '+91 9845370474', href: 'tel:+919845370474' },
                { Icon: Mail,  text: 'info@a1construction.co.in', href: 'mailto:info@a1construction.co.in' },
                { Icon: Globe, text: 'www.a1construction.co.in' },
              ].map(({ Icon, text, href }) => (
                <div key={text} className="flex gap-3 items-start">
                  <Icon size={13} className="text-blue-brand mt-0.5 flex-shrink-0" />
                  {href
                    ? <a href={href} className="text-black text-sm hover:text-black transition-colors leading-relaxed">{text}</a>
                    : <p className="text-black text-sm leading-relaxed">{text}</p>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-5 gap-2">
          <p className="text-black/18 text-xs">© {new Date().getFullYear()} A1 Construction. All Rights Reserved.</p>
          {/* <p className="text-black/12 text-xs">
            Designed & Developed by <span className="text-blue-brand/40">Sunsys Technologies</span>
          </p> */}
        </div>
      </div>
    </footer>
  )
}

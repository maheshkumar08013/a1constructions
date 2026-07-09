import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react'
import logo from '../../assets/logo.png'

const pageLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Workers', href: '#workers' },
  { label: 'Projects', href: '#projects' },
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { Icon: Instagram, label: 'Instagram', href: '' },
  { Icon: Linkedin, label: 'LinkedIn', href: '' },
  { Icon: Facebook, label: 'Facebook', href: '' },
  { Icon: Youtube, label: 'YouTube', href: '' },
]

export default function Footer() {
  return (
    <footer className="bg-[#cdcdcd] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">

          <div className="space-y-6">
            <img src={logo} alt="A1 Construction" className="h-20 w-auto" />
            <p className="text-sm leading-relaxed text-black/80 max-w-sm">
              A1 Construction delivers durable infrastructure across Bangalore and South India. Explore our pages, learn about our teams, and find the right service for your next project.
            </p>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[3px] mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {pageLinks.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="hover:text-black/90 transition-colors">{label}</Link>
                    ) : (
                      <a href={href} className="hover:text-black/90 transition-colors">{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[3px] mb-4">Social Media</h4>
            <p className="text-sm text-black/80 max-w-sm">Follow us on social media for project updates, company news, and industry highlights.</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            {/* <div className="mt-4 space-y-2 text-sm text-black/70">
              <p className="font-medium">Connect with us:</p>
              <p>Instagram | LinkedIn | Facebook | YouTube</p>
            </div> */}
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[3px] mb-4">Contact Us</h4>
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <iframe
                title="A1 Construction Google Map"
                src="https://maps.google.com/maps?q=Bengaluru&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-48"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-3 text-sm text-black/80">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-blue-brand" />
                <p>#352/32, 1st Floor, 3rd Block, Nagarabhavi 2nd Stage, Bangalore – 560072</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-blue-brand" />
                <a href="tel:+919845370474" className="hover:text-black/90 transition-colors">+91 98453 70474</a>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-blue-brand" />
                <a href="mailto:info@a1construction.co.in" className="hover:text-black/90 transition-colors">info@a1construction.co.in</a>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={16} className="mt-0.5 text-blue-brand" />
                <p>www.a1construction.co.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-6 text-sm text-black/50">
          © {new Date().getFullYear()} A1 Construction. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

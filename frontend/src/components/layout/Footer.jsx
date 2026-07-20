import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react'
import logo from '../../assets/logo.png'

const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/a1con_2012/' },
  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/neelakanta-reddy-2522953aa' },
  // { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/a1construction' },
  // { Icon: Youtube, label: 'YouTube', href: '' },
]

export default function Footer() {
  return (
    <footer className="bg-[#cdcdcd] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">

          <div className="space-y-6">
            <img src={logo} alt="A1 Construction" className="h-20 w-auto" />
            <p className="text-sm leading-relaxed text-black/80 max-w-sm">
              A1 Construction delivers durable infrastructure across Bangalore and South India. Explore our pages, learn about our teams, and find the right service for your next project.
            </p>
      
          </div>
 <div className="space-y-6">
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
            {/* <p className="text-sm text-black/80 max-w-sm">Follow us on social media for project updates, company news, and industry highlights.</p> */}
            <div className="flex flex-col gap-3">
            
              {socialLinks.map(({ Icon, href, label }) => (
                <div><a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 border border-black rounded-full text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Icon size={18} /> 
                </a> 
               &nbsp;<span><a href={href}>{label} </a></span>
               </div>
              ))}
              
            </div>
            {/* <div className="mt-4 space-y-2 text-sm text-black/70">
              <p className="font-medium">Connect with us:</p>
              <p>Instagram | LinkedIn | Facebook | YouTube</p>
            </div> */}
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[3px] mb-4">Contact Us</h4>
            {/* <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
    
<iframe 
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8674705295807!2d77.5123399!3d12.980327299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d0005ece8ab%3A0xdceb8f59965334ec!2sA1%20Construction!5e0!3m2!1sen!2sin!4v1783747910169!5m2!1sen!2sin" 
referrerpolicy="strict-origin-when-cross-origin" className="w-full h-48"
                loading="lazy" />

              
            </div> */}

            <div className="space-y-3 text-sm text-black/80">
              <div className="flex items-start gap-3">
                <MapPin size={30} className="mt-0.5 text-blue-brand" />
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

        <div className="mt-6 border-t border-black/10 pt-3 text-xs text-black/50">
          © {new Date().getFullYear()} A1 Construction. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}

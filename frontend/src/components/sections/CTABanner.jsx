import React from 'react'
import { AnimatedSection } from '../ui/SectionHeader'

export function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-brand via-[#1a91d9] to-[#1565c0]">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E")`,
        backgroundSize: '60px'
      }} />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <AnimatedSection>
          <h2 className="font-montserrat font-black text-white text-3xl sm:text-4xl lg:text-[44px] leading-tight mb-4">
            Let's Build the Future Together.
          </h2>
          <p className="text-white/75 text-base mb-8 max-w-xl mx-auto">
            Partner with A1 Construction for your next government, institutional, or infrastructure project.
          </p>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-block bg-white text-navy font-bold px-10 py-4 rounded font-inter text-sm hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
          >
            Contact Us Today
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}

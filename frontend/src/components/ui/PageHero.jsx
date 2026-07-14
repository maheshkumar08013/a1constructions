import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Reusable interior page hero banner
 * props: title, subtitle, breadcrumbs=[{label,to}], bgImage?
 */
export default function PageHero({ title, subtitle, breadcrumbs = [], bgImage }) {
  return (
    <section className="relative bg-white/40 overflow-hidden">
      {/* Background image */}
      {bgImage && (
        <>
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-white/05" />
        </>
      )}

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(29,161,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(29,161,242,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Bottom angle slice */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-8 block">
          <path d="M0 32 L1440 0 L1440 32 Z" fill="white" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[132px] sm:pt-[148px] lg:pt-[170px] pb-20 sm:pb-24">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 mb-5 flex-wrap">
            <Link to="/" className="text-white/90 text-xs font-inter hover:text-blue-brand transition-colors">Home</Link>
            {breadcrumbs.map(({ label, to }, i) => (
              <React.Fragment key={label}>
                <ChevronRight size={11} className="text-navy/80" />
                {to ? (
                  <Link to={to} className="text-navy/40 text-xs font-inter hover:text-blue-brand transition-colors">{label}</Link>
                ) : (
                  <span className="text-blue-brand text-xs font-semibold font-inter">{label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Eyebrow */}
        <div className="w-8 h-[3px] bg-blue-brand rounded-full mb-4" />

        {/* Title */}
        <h1 className="font-poppins font-black text-navy text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] leading-tight tracking-tight mb-4 max-w-2xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-black text-base sm:text-lg leading-relaxed max-w-xl">{subtitle}</p>
        )}
      </div>
    </section>
  )
}

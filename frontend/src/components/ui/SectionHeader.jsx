import React from 'react'

export function SectionLabel({ children, light = false }) {
  return (
    <p className={`text-xs font-bold tracking-[3px] uppercase mb-2.5 font-inter ${light ? 'text-blue-brand/80' : 'text-blue-brand'}`}>
      {children}
    </p>
  )
}

export function SectionTitle({ children, light = false, center = false }) {
  return (
    <h2 className={`font-montserrat font-800 leading-[1.15] mb-3 text-2xl sm:text-3xl lg:text-4xl ${light ? 'text-white' : 'text-navy'} ${center ? 'text-center' : ''}`}>
      {children}
    </h2>
  )
}

export function SectionRule({ center = false }) {
  return (
    <div className={`w-11 h-[3px] bg-blue-brand rounded-full mb-7 ${center ? 'mx-auto' : ''}`} />
  )
}

export function SectionDesc({ children, light = false, center = false }) {
  return (
    <p className={`text-base leading-relaxed ${light ? 'text-white/55' : 'text-gray-500'} ${center ? 'text-center' : ''}`}>
      {children}
    </p>
  )
}

export function AnimatedSection({ children, className = '' }) {
  const ref = React.useRef(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  )
}

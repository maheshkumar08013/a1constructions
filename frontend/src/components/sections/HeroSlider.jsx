import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'
import Counter from '../ui/Counter'
import { resolveMediaUrl } from '../../utils/media'

const defaultSlides = [
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=85',
    eyebrow: 'Est. 2012 · Bengaluru, Karnataka',
    title: 'Building Infrastructure That Shapes Communities',
    subtitle: 'Trusted partner for government, institutional and corporate projects across Karnataka and South India.',
    position: 'middle-left',
    overlay_color: '#0d1420',
    overlay_opacity: 85,
  },
  {
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85',
    eyebrow: 'Government · Healthcare · Education',
    title: 'Delivering Engineering Excellence Across South India',
    subtitle: 'End-to-end construction solutions — from project planning through to final handover.',
    position: 'middle-left',
    overlay_color: '#0d1420',
    overlay_opacity: 85,
  },
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=85',
    eyebrow: 'Quality · Safety · Sustainability',
    title: 'Building National Assets, Enabling Economic Progress',
    subtitle: 'Proven track record of 100+ projects for government bodies, PSUs, and institutional clients.',
    position: 'middle-left',
    overlay_color: '#0d1420',
    overlay_opacity: 85,
  },
]

const INTERVAL = 6000

// slide.position: '<top|middle|bottom>-<left|center|right>'
const POSITION_LAYOUT = {
  'top-left':      { vertical: 'justify-start', horizontal: 'justify-start', align: 'text-left',   bar: '',        barOrigin: 'origin-left',   btn: 'justify-start' },
  'top-center':    { vertical: 'justify-start', horizontal: 'justify-center', align: 'text-center', bar: 'mx-auto', barOrigin: '',              btn: 'justify-center' },
  'top-right':     { vertical: 'justify-start', horizontal: 'justify-end',   align: 'text-right',  bar: 'ml-auto',  barOrigin: 'origin-right',  btn: 'justify-end' },
  'middle-left':   { vertical: 'justify-center', horizontal: 'justify-start', align: 'text-left',   bar: '',        barOrigin: 'origin-left',   btn: 'justify-start' },
  'middle-center': { vertical: 'justify-center', horizontal: 'justify-center', align: 'text-center', bar: 'mx-auto', barOrigin: '',              btn: 'justify-center' },
  'middle-right':  { vertical: 'justify-center', horizontal: 'justify-end',   align: 'text-right',  bar: 'ml-auto',  barOrigin: 'origin-right',  btn: 'justify-end' },
  'bottom-left':   { vertical: 'justify-end',   horizontal: 'justify-start', align: 'text-left',   bar: '',        barOrigin: 'origin-left',   btn: 'justify-start' },
  'bottom-center': { vertical: 'justify-end',   horizontal: 'justify-center', align: 'text-center', bar: 'mx-auto', barOrigin: '',              btn: 'justify-center' },
  'bottom-right':  { vertical: 'justify-end',   horizontal: 'justify-end',   align: 'text-right',  bar: 'ml-auto',  barOrigin: 'origin-right',  btn: 'justify-end' },
}

const hexToRgb = (hex) => {
  const clean = (hex || '#0d1420').replace('#', '')
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean
  const n = parseInt(full, 16)
  return Number.isNaN(n) ? '13,20,32' : `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

const buildOverlayGradient = (side, color, opacity) => {
  const rgb = hexToRgb(color)
  const a = Math.min(100, Math.max(0, opacity ?? 85)) / 100
  if (side === 'center') {
    return `linear-gradient(90deg, rgba(${rgb},0) 0%, rgba(${rgb},${a}) 30%, rgba(${rgb},${a}) 70%, rgba(${rgb},0) 100%)`
  }
  const angle = side === 'right' ? 260 : 100
  return `linear-gradient(${angle}deg, rgba(${rgb},${a}) 0%, rgba(${rgb},${(a * 0.87).toFixed(2)}) 38%, rgba(${rgb},0) 72%)`
}

const stats = [
  { num:'14+',     label:'Years Experience' },
  { num:'100+',    label:'Projects Completed' },
  { num:'500+',    label:'Workforce' },
  { num:'50+',     label:'Govt Projects' },
  { num:'₹500Cr+', label:'Project Value' },
]

export default function HeroSlider() {
  const [current, setCurrent]         = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [textVisible, setTextVisible]   = useState(true)
  const timerRef = useRef(null)

  const { data } = useQuery({
    queryKey: ['slides'],
    queryFn: () => api.get('/content/slides').then(r => r.data),
    placeholderData: defaultSlides,
    retry: 1,
  })

  const slides = data?.length ? data : defaultSlides

  const go = useCallback((idx) => {
    if (transitioning) return
    setTransitioning(true)
    setTextVisible(false)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
      setTimeout(() => setTextVisible(true), 80)
    }, 600)
  }, [transitioning])

  const next = useCallback(() => go((current + 1) % slides.length), [current, slides.length, go])
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, slides.length, go])

  useEffect(() => {
    timerRef.current = setInterval(next, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [next])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(next, INTERVAL)
  }

  const slide = slides[current]
  const layout = POSITION_LAYOUT[slide.position] || POSITION_LAYOUT['middle-left']
  const side = slide.position?.endsWith('center') ? 'center' : slide.position?.endsWith('right') ? 'right' : 'left'
  const overlayRgb = hexToRgb(slide.overlay_color)
  const overlayAlpha = Math.min(100, Math.max(0, slide.overlay_opacity ?? 85)) / 100

  return (
    <>
      <section
        id="home"
        className="relative w-full overflow-hidden select-none"
        style={{ height: 'clamp(520px, 88vh, 860px)' }}
      >
      {/* Background slides */}
      {slides.map((s, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <img
            src={resolveMediaUrl(s.image)} alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${i === current ? 'scale-[1.06]' : 'scale-100'}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlay — scrim follows the text zone for the active slide's position */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="hidden md:block absolute inset-0 transition-[background] duration-500" style={{ background: buildOverlayGradient(side, slide.overlay_color, slide.overlay_opacity) }} />
        <div className="md:hidden absolute inset-0 transition-[background] duration-500" style={{ background: `rgba(${overlayRgb}, ${(overlayAlpha * 0.85).toFixed(2)})` }} />
      </div>
      {/* Bottom gradient for stats */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-[#0d1420]/95 to-transparent pointer-events-none" />

      {/* Text content */}
      <div className={`absolute inset-0 z-30 flex flex-col ${layout.vertical} pt-[118px] sm:pt-[132px] lg:pt-[150px] pb-24 sm:pb-28`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
          <div className={`flex ${layout.horizontal}`}>
          <div className={`max-w-[520px] md:max-w-[560px] lg:max-w-[600px] ${layout.align}`}>

            <div className={`inline-flex items-center gap-2.5 border border-[#1DA1F2]/35 bg-[#000]/40 backdrop-blur-sm rounded-sm px-4 py-1.5 mb-5 transition-all duration-500 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DA1F2] animate-pulse flex-shrink-0" />
              <span className="text-[#1DA1F2] text-[11px] font-bold tracking-[2.5px] uppercase font-inter">{slide.eyebrow}</span>
            </div>

            <h1
              className={`font-poppins text-white leading-[1.06] tracking-tight mb-5 text-[22px] sm:text-[28px] md:text-[34px] lg:text-[44px] xl:text-[60px] transition-all duration-600 delay-75 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ textShadow:'0 2px 16px rgba(0,0,0,0.25)' }}
            >
              {slide.title}
            </h1>

            <div className={`w-12 h-[3px] bg-[#1DA1F2] mb-5 rounded-full transition-all duration-600 delay-100 ${layout.bar} ${layout.barOrigin} ${textVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />

            <p className={`text-white/80 text-[14px] sm:text-[16px] leading-[1.75] mb-8 max-w-[440px] ${side === 'center' ? 'mx-auto' : side === 'right' ? 'ml-auto' : ''} transition-all duration-600 delay-150 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {slide.subtitle}
            </p>

            <div className={`flex flex-wrap gap-3 ${layout.btn} transition-all duration-600 delay-200 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91d9] text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded text-[13px] sm:text-sm font-bold font-inter transition-all duration-200 shadow-lg shadow-[#1DA1F2]/20"
              >
                Explore Projects <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/8 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded text-[13px] sm:text-sm font-bold font-inter transition-all duration-200 backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Prev/Next */}
      <button onClick={() => { prev(); resetTimer() }} aria-label="Previous"
        className="absolute left-3 sm:left-5 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all duration-200 backdrop-blur-sm">
        <ChevronLeft size={18} />
      </button>
      <button onClick={() => { next(); resetTimer() }} aria-label="Next"
        className="absolute right-3 sm:right-5 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all duration-200 backdrop-blur-sm">
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-[6.5rem] sm:bottom-28 right-4 sm:right-8 z-40 flex flex-col items-center gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => { go(i); resetTimer() }} aria-label={`Slide ${i+1}`}
            className={`rounded-full transition-all duration-300 ${i === current ? 'bg-[#1DA1F2] h-6 w-2' : 'bg-white/30 hover:bg-white/55 h-2 w-2'}`} />
        ))}
      </div>

      {/* Counter
      <div className="absolute bottom-24 left-4 sm:left-8 z-40 hidden sm:block">
        <span className="text-white/30 text-[11px] font-mono tracking-widest">
          {String(current + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}
        </span>
      </div> */}
    </section>

    {/* Stats bar below banner
    <div className="bg-[#0d1420]/90 backdrop-blur-md border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x-0 sm:divide-x divide-white/8">
      {stats.map(({ num, label }, i) => (
  <div key={label}
    className={`text-center py-3.5 sm:py-5 px-2 ${i === stats.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
    <Counter targetValue={num} duration={2000} />
    <div className="text-white/60 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 font-inter">{label}</div>
  </div>
))}
        </div>
      </div>
    </div> */}
    </>
  )
}

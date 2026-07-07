import React from 'react'
import { CheckSquare } from 'lucide-react'
import { SectionLabel, SectionTitle, SectionRule, AnimatedSection } from '../ui/SectionHeader'
import logo from '../../assets/logo.png'

const checks = [
  { title: 'Project Planning & Engineering Coordination', desc: 'Comprehensive pre-construction services.' },
  { title: 'Construction Management', desc: 'On-site leadership and resource optimisation.' },
  { title: 'Quality Assurance & Compliance', desc: 'IS codes adherence and third-party inspection.' },
  { title: 'Pan-India Expansion', desc: 'Growing presence across South India and beyond.' },
]

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual side */}
          <AnimatedSection>
            <div className="relative">
              <div className="bg-gradient-to-br from-navy to-[#1e2d47] rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center relative">
                {/* Blueprint grid */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(29,161,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(29,161,242,1) 1px, transparent 1px)',
                    backgroundSize: '28px 28px'
                  }}
                />
                {/* Building SVG */}
                <svg className="relative z-10" width="240" height="200" viewBox="0 0 240 200" fill="none">
                  <rect x="20" y="60" width="60" height="140" fill="rgba(29,161,242,0.12)" stroke="rgba(29,161,242,0.4)" strokeWidth="1.5"/>
                  <rect x="90" y="30" width="60" height="170" fill="rgba(29,161,242,0.18)" stroke="rgba(29,161,242,0.5)" strokeWidth="1.5"/>
                  <rect x="160" y="80" width="60" height="120" fill="rgba(29,161,242,0.1)" stroke="rgba(29,161,242,0.35)" strokeWidth="1.5"/>
                  {[[30,80],[48,80],[30,104],[48,104]].map(([x,y],i) => <rect key={i} x={x} y={y} width="10" height="14" fill="rgba(29,161,242,0.4)"/>)}
                  {[[100,50],[120,50],[100,76],[120,76],[100,102],[120,102]].map(([x,y],i) => <rect key={i} x={x} y={y} width="12" height="16" fill="rgba(29,161,242,0.5)"/>)}
                  {[[170,100],[188,100]].map(([x,y],i) => <rect key={i} x={x} y={y} width="10" height="12" fill="rgba(29,161,242,0.35)"/>)}
                  <rect x="113" y="10" width="14" height="20" fill="rgba(29,161,242,0.65)"/>
                  <line x1="0" y1="200" x2="240" y2="200" stroke="rgba(29,161,242,0.3)" strokeWidth="1.5"/>
                </svg>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-blue-brand text-white px-5 py-4 rounded-lg shadow-xl text-center">
                <div className="font-montserrat font-black text-2xl leading-none">A+</div>
                <div className="text-xs text-white/80 mt-1 font-inter">Quality Rating</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <AnimatedSection className="delay-150">
            <SectionLabel>About A1 Construction</SectionLabel>
            <SectionTitle>Trusted Infrastructure Partner Since 2012</SectionTitle>
            <SectionRule />
            <p className="text-gray-500 leading-relaxed mb-4">
              A1 Construction is a Bengaluru-based infrastructure development company established in 2012, specialising in institutional, healthcare, educational, commercial, industrial, and public infrastructure projects.
            </p>
            <p className="text-gray-500 leading-relaxed mb-7">
              With extensive experience in government and public sector projects, we deliver end-to-end construction solutions — from project planning through to final handover — across Karnataka and South India.
            </p>

            <div className="space-y-3.5 mb-8">
              {checks.map(c => (
                <div key={c.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border-[1.5px] border-blue-brand/40 bg-blue-brand/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-brand text-xs font-bold">✓</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    <span className="text-navy font-semibold">{c.title}</span> — {c.desc}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 bg-blue-brand text-white px-6 py-3 rounded text-sm font-semibold font-inter hover:bg-blue-dark transition-colors"
            >
              Download Company Profile
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

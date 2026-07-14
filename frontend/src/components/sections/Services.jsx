import React from 'react'
import { SectionLabel, SectionTitle, SectionRule, SectionDesc, AnimatedSection } from '../ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'

const defaultServices = [
  { icon: '🏗', name: 'Building Construction', desc: 'Residential, commercial, and institutional structures to the highest standards.' },
  { icon: '🏛', name: 'Government Infrastructure', desc: 'Public buildings, civil works, and government-mandated projects.' },
  { icon: '🏥', name: 'Healthcare Infrastructure', desc: 'Hospitals, medical centres, and healthcare facilities with precision.' },
  { icon: '🎓', name: 'Educational Infrastructure', desc: 'Colleges, universities, hostels, and academic campuses.' },
  { icon: '🏭', name: 'Industrial Construction', desc: 'Warehouses, storage facilities, and industrial complexes.' },
  { icon: '⚙️', name: 'Structural Works', desc: 'RCC frameworks, steel structures, and civil engineering at scale.' },
  { icon: '⚡', name: 'Electrical & Plumbing', desc: 'Complete MEP services integrated into construction workflows.' },
  { icon: '🎨', name: 'Interior & Exterior', desc: 'Finishing, cladding, and interior fit-outs for premium delivery.' },
  { icon: '🛣', name: 'Infrastructure Development', desc: 'Roads, drainage, utilities, and urban infrastructure.' },
  { icon: '📋', name: 'Project Management', desc: 'Full PMC services — planning, coordination, quality, and timely delivery.' },
]

function ServiceCard({ service, delay }) {
  return (
    <div
      className="group bg-white border border-gray-200 rounded-lg p-6 hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition-all duration-300 relative overflow-hidden cursor-default"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      <div className="w-11 h-11 bg-blue-brand/8 rounded-md flex items-center justify-center text-xl mb-4">
        {service.icon}
      </div>
      <h3 className="font-poppins font-semibold text-white text-sm mb-2 leading-snug">{service.name}</h3>
      <p className="text-white-400 text-[13px] leading-relaxed">{service.desc}</p>
    </div>
  )
}

export default function Services() {
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/content/services').then(r => r.data),
    placeholderData: defaultServices,
    retry: 1
  })

  const list = services?.length ? services : defaultServices

  return (
    <section id="services" className="py-20 lg:py-28 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <SectionTitle>End-to-End Construction Solutions</SectionTitle>
              <SectionRule />
              <SectionDesc>Comprehensive infrastructure services for government, institutional, and corporate clients.</SectionDesc>
            </div>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="flex-shrink-0 inline-flex items-center gap-2 bg-blue-brand text-white px-6 py-3 rounded text-sm font-semibold font-inter hover:bg-blue-dark transition-colors"
            >
              All Services →
            </a>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {list.map((s, i) => (
            <AnimatedSection key={s.name || i} className={`delay-[${Math.min(i * 50, 400)}ms]`}>
              <ServiceCard service={s} delay={i * 40} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

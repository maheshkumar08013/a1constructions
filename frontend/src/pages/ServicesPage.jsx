import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { AnimatedSection, SectionLabel, SectionTitle, SectionRule } from '../components/ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { resolveMediaUrl } from '../utils/media'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import buildingConstruction from '../assets/images/building-construction.jpg'
import governmentInfrastructure from '../assets/images/government-infrastructure.jpg'
import healthcareInfrastructure from '../assets/images/heathcare-infrastructure.jpg'
import educationalInfrastructure from '../assets/images/educational-infrastructure.jpg'
import industrialConstruction from '../assets/images/industrial-construction.jpg'
import structuralWorks from '../assets/images/structural-works.jpg'
import electricalPlumbing from '../assets/images/electrical-plumbing.jpg'
import interiorExteriorWorks from '../assets/images/interiore-exterior-works.jpg'
import infrastructureDevelopment from '../assets/images/infrastructure-development.jpg'
import projectManagement from '../assets/images/project-management.jpg'


const defaultServices = [
  {
    id:1, icon:'🏗', name:'Building Construction',
    desc:'Complete construction of residential, commercial, and institutional buildings to IS standards.',
    details:['RCC framed structures','Load-bearing masonry','Structural steel works','Foundation engineering','Multi-storey complexes'],
    image:buildingConstruction
  },
  {
    id:2, icon:'🏛', name:'Government Infrastructure',
    desc:'Public buildings, civil works, and government-mandated infrastructure projects.',
    details:['Government office complexes','Civic amenity buildings','Public works department projects','PWD empanelled contractor','Full tender compliance support'],
    image:governmentInfrastructure
  },
  {
    id:3, icon:'🏥', name:'Healthcare Infrastructure',
    desc:'Hospitals, medical centres, and healthcare facilities built to precise specifications.',
    details:['Multi-speciality hospitals','Primary health centres','Operation theatre suites','ICU and ward infrastructure','Medical gas pipeline integration'],
    image:healthcareInfrastructure
  },
  {
    id:4, icon:'🎓', name:'Educational Infrastructure',
    desc:'Colleges, universities, hostels, and academic campuses across Karnataka.',
    details:['Degree college buildings','University campus complexes','Student hostels and residences','Auditoriums and seminar halls','Library and lab blocks'],
    image:educationalInfrastructure
  },
  {
    id:5, icon:'🏭', name:'Industrial Construction',
    desc:'Warehouses, storage facilities, and industrial complexes built for durability.',
    details:['Industrial shed construction','Pre-engineered buildings','Cold storage facilities','Warehouse complexes','Factory floor works'],
    image:industrialConstruction
  },
  {
    id:6, icon:'⚙️', name:'Structural Works',
    desc:'RCC frameworks, steel structures, and civil engineering at scale.',
    details:['RCC frame construction','Steel structure fabrication','Pre-stressed concrete works','Foundation and piling','Retaining walls and slopes'],
    image:structuralWorks
  },
  {
    id:7, icon:'⚡', name:'Electrical & Plumbing',
    desc:'Complete MEP services integrated seamlessly into construction workflows.',
    details:['LT/HT electrical works','Plumbing and sanitation','Fire-fighting systems','HVAC works','Solar panel installation'],
    image:electricalPlumbing
  },
  {
    id:8, icon:'🎨', name:'Interior & Exterior Works',
    desc:'Finishing, cladding, and interior fit-outs for premium project delivery.',
    details:['Interior fit-outs','Facade and cladding works','False ceiling and flooring','Painting and finishing','Exterior landscaping'],
    image:interiorExteriorWorks
  },
  {
    id:9, icon:'🛣', name:'Infrastructure Development',
    desc:'Roads, drainage, utilities, and urban infrastructure for public authorities.',
    details:['Road construction and laying','Storm water drainage','Underground utilities','Compound wall and fencing','Landscaping and external works'],
    image:infrastructureDevelopment
  },
  {
    id:10, icon:'📋', name:'Project Management',
    desc:'Full PMC services — planning, coordination, quality, and timely delivery.',
    details:['Pre-construction planning','Contractor coordination','Quality audits and reporting','Cost and schedule management','Handover documentation'],
    image:projectManagement
  },
  {
    id:11, icon:'🏟', name:'Sports Complex',
    desc:'Stadiums, indoor arenas, and sports infrastructure built to competition standards.',
    details:['Multi-purpose sports stadiums','Indoor sports arenas','Synthetic and natural turf grounds','Swimming pool construction','Spectator stands and amenities'],
  },
  {
    id:12, icon:'🏠', name:'Residential Building',
    desc:'Apartments, villas, and gated communities built for comfort and durability.',
    details:['Apartment and villa complexes','Gated community development','Individual bungalow construction','Amenities and clubhouse blocks','Vaastu-compliant planning'],
  },
]

const process = [
  { step:'01', title:'Initial Consultation', desc:'We understand your project requirements, site conditions, budget, and timelines.' },
  { step:'02', title:'Site Assessment', desc:'Our engineers conduct a detailed site survey and feasibility study.' },
  { step:'03', title:'Proposal & Estimation', desc:'Detailed project proposal with itemised cost estimate and execution schedule.' },
  { step:'04', title:'Design & Planning', desc:'Structural design, drawing preparation, and regulatory approvals.' },
  { step:'05', title:'Construction', desc:'Phased construction with weekly progress reports and quality control checkpoints.' },
  { step:'06', title:'Handover', desc:'Punch list completion, defect rectification, and final documentation handover.' },
]

export default function ServicesPage() {
  const [selected, setSelected] = useState(null)

  const { data } = useQuery({
    queryKey:['services'],
    queryFn:()=>api.get('/content/services').then(r=>r.data),
    placeholderData:defaultServices,
    retry:1
  })
  const list = data?.length ? data.map((s,i)=>({...defaultServices[i],...s})) : defaultServices
  const isSelected = (service) => selected?.id === service.id || selected?.name === service.name
  const getRowEndIndex = (selectedIndex, columns) => Math.min(list.length - 1, Math.ceil((selectedIndex + 1) / columns) * columns - 1)
  const renderSelectedDetail = (service, visibilityClass) => (
    <div className={`col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 ${visibilityClass}`}>
      <div className="bg-light rounded-2xl overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-2">
        {service.image && (
          <div className="h-56 lg:h-auto">
            <img src={resolveMediaUrl(service.image)} alt={service.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{service.icon || '🏗'}</span>
            <h3 className="font-poppins font-bold text-navy text-xl">{service.name}</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
          {service.details && (
            <ul className="space-y-2 mb-6">
              {service.details.map(d => (
                <li key={d} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <CheckCircle2 size={14} className="text-blue-brand flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          )}
          <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-brand text-white px-6 py-3 rounded text-sm font-bold hover:bg-blue-dark transition-colors">
            Enquire About This Service <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="End-to-End Construction Services"
        subtitle="Comprehensive infrastructure solutions for government, institutional, and corporate clients across Karnataka."
        breadcrumbs={[{ label:'Services' }]}
        bgImage="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80"
      />

      {/* Services grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <SectionLabel>What We Build</SectionLabel>
            <SectionTitle>12 Core Service Areas</SectionTitle>
            <SectionRule />
            <p className="text-gray-500 text-[15px] max-w-xl">Click any service to learn more about our capabilities and approach.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((s, i) => (
              <Fragment key={s.id || s.name || i}>
                <AnimatedSection
                  className={i === 4 ? 'col-span-full sm:col-span-2 lg:col-span-1 max-w-[420px] mx-auto xl:max-w-none' : ''}
                >
                  <button
                    onClick={() => setSelected(isSelected(s) ? null : s)}
                    className={`w-full text-left group border rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                      isSelected(s)
                        ? 'border-blue-brand bg-blue-brand/4 shadow-lg -translate-y-1'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="w-12 h-12 bg-blue-brand/8 rounded-xl flex items-center justify-center text-2xl mb-4">{s.icon || '🏗'}</div>
                    <h3 className="font-poppins font-semibold text-navy text-sm mb-2">{s.name}</h3>
                    <p className="text-gray-400 text-[12px] leading-relaxed">{s.desc}</p>
                  </button>
                </AnimatedSection>

                {selected && getRowEndIndex(list.findIndex(item => isSelected(item)), 1) === i && renderSelectedDetail(selected, 'sm:hidden')}
                {selected && getRowEndIndex(list.findIndex(item => isSelected(item)), 2) === i && renderSelectedDetail(selected, 'hidden sm:block lg:hidden')}
                {selected && getRowEndIndex(list.findIndex(item => isSelected(item)), 3) === i && renderSelectedDetail(selected, 'hidden lg:block xl:hidden')}
                {selected && getRowEndIndex(list.findIndex(item => isSelected(item)), 4) === i && renderSelectedDetail(selected, 'hidden xl:block')}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel light>How We Work</SectionLabel>
            <SectionTitle light center>Our Project Delivery Process</SectionTitle>
            <SectionRule center />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <AnimatedSection key={p.step}>
                <div className="relative border border-white/8 rounded-xl p-6 hover:bg-white/4 hover:border-blue-brand/30 transition-all duration-200">
                  <div className="text-blue-brand/90 font-poppins font-black text-5xl leading-none mb-4 select-none">{p.step}</div>
                  <h3 className="font-poppins font-semibold text-white text-sm mb-2">{p.title}</h3>
                  <p className="text-white/80 text-xs leading-relaxed">{p.desc}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-3 text-blue-brand/25 text-lg">→</div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <SectionTitle center>Have a Project in Mind?</SectionTitle>
            <p className="text-gray-400 mb-7 text-sm max-w-lg mx-auto">Share your requirements and our engineering team will respond with a detailed proposal within 48 hours.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-brand text-white px-8 py-4 rounded font-bold text-sm hover:bg-blue-dark transition-colors shadow-md">
              Request a Proposal <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}

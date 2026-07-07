import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { AnimatedSection } from '../components/ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { MapPin, ArrowRight } from 'lucide-react'

const uploadBase = import.meta.env.DEV ? 'http://localhost:3000/uploads/images' : 'https://a1.sunsysweb.co.in/uploads/images'

const projectGalleryMap = {
  1: [
    'WhatsApp Image 2026-06-30 at 10.27.22.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.16.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.17.jpeg',
  ],
  2: [
    'WhatsApp Image 2026-06-30 at 10.28.18.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.19.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.20.jpeg',
  ],
  3: [
    'WhatsApp Image 2026-06-30 at 10.28.21.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.25.jpeg',
    'WhatsApp Image 2026-06-30 at 10.28.26.jpeg',
  ],
  4: [
    'WhatsApp Image 2026-06-30 at 10.29.46.jpeg',
    'WhatsApp Image 2026-06-30 at 10.31.23.jpeg',
    'WhatsApp Image 2026-06-30 at 10.31.26.jpeg',
  ],
  5: [
    'WhatsApp Image 2026-06-30 at 10.33.20.jpeg',
    'WhatsApp Image 2026-06-30 at 10.33.26.jpeg',
    'WhatsApp Image 2026-06-30 at 10.33.49.jpeg',
  ],
  6: [
    'WhatsApp Image 2026-06-30 at 10.33.52.jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.28.jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.29.jpeg',
  ],
  7: [
    'WhatsApp Image 2026-06-30 at 10.35.30.jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.31.jpeg',
    'WhatsApp Image 2026-06-30 at 10.37.17.jpeg',
  ],
  8: [
    'WhatsApp Image 2026-06-30 at 10.37.18.jpeg',
    'WhatsApp Image 2026-06-30 at 10.38.11.jpeg',
    'WhatsApp Image 2026-06-30 at 10.37.18 (1).jpeg',
  ],
  9: [
    'WhatsApp Image 2026-06-30 at 10.38.11 (1).jpeg',
    'WhatsApp Image 2026-06-30 at 10.35.30 (1).jpeg',
    'WhatsApp Image 2026-06-30 at 10.29.46 (1).jpeg',
  ],
}

const defaultProjects = [
  { id:1, name:'Assam Bhawan', category:'Government', location:'Bengaluru, Karnataka', desc:'State guest house and diplomatic facility with premium government-grade finishing and modern amenities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.27.22.jpeg`, year:'2022' },
  { id:2, name:'BBMP Multi Speciality Hospital', category:'Healthcare', location:'Bengaluru, Karnataka', desc:'Large-scale multi-speciality hospital serving thousands of Bangalore citizens daily with state-of-the-art facilities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.28.18.jpeg`, year:'2023' },
  { id:3, name:'Dr Puneeth Rajkumar Hospital', category:'Healthcare', location:'Karnataka', desc:'Dedicated healthcare facility built in honour of Kannada icon Dr Puneeth Rajkumar, serving rural communities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.28.21.jpeg`, year:'2023' },
  { id:4, name:'Yeshwanthpur Railway Station', category:'Railway', location:'Bengaluru, Karnataka', desc:'Infrastructure development for South Western Railway — platform works, station buildings, and civic amenities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.29.46.jpeg`, year:'2021' },
  { id:5, name:'Government Degree College', category:'Education', location:'Karnataka', desc:'Complete college complex including classrooms, laboratory blocks, library, and student amenity facilities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.33.20.jpeg`, year:'2020' },
  { id:6, name:'BGS Ground', category:'Urban Development', location:'Bengaluru, Karnataka', desc:'Sports and civic ground development for urban recreation, community events, and public utility.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.33.52.jpeg`, year:'2022' },
  { id:7, name:'BBMP Ward Office Complex', category:'Government', location:'Bengaluru, Karnataka', desc:'Administrative office complex with public service areas, meeting rooms, and civic infrastructure.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.35.30.jpeg`, year:'2021' },
  { id:8, name:'Karnataka Housing Board Flats', category:'Government', location:'Bengaluru, Karnataka', desc:'Affordable housing complex for Karnataka Housing Board — multi-storey residential blocks with all amenities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.37.18.jpeg`, year:'2020' },
  { id:9, name:'Bangalore University Building', category:'Education', location:'Karnataka', desc:'Academic block construction for Bangalore University with modern lecture halls and research facilities.', image:`${uploadBase}/WhatsApp Image 2026-06-30 at 10.38.11 (1).jpeg`, year:'2019' },
]

const cats = ['All', 'Government', 'Healthcare', 'Education', 'Railway', 'Urban Development', 'Industrial', 'Commercial']

export default function ProjectsPage() {
  const [active, setActive] = useState('All')

  const { data } = useQuery({
    queryKey:['projects'],
    queryFn:()=>api.get('/content/projects').then(r=>r.data),
    placeholderData:defaultProjects,
    retry:1
  })

  const list = data?.length ? data : defaultProjects
  const filtered = active === 'All' ? list : list.filter(p => p.category === active)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Projects That Define Communities"
        subtitle="100+ projects delivered for government bodies, public institutions, and corporate clients across Karnataka and South India."
        breadcrumbs={[{ label:'Projects' }]}
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
      />

      {/* Filter + Grid */}
      <section className="py-16 lg:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  active === c
                    ? 'bg-blue-brand text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-brand hover:text-blue-brand'
                }`}
              >
                {c} {c === 'All' ? `(${list.length})` : ''}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No projects in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <AnimatedSection key={p.id || i}>
                  <Link
                    to={`/projects/${p.id}`}
                    className="w-full text-left group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden">
                      {p.image
                        ? <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" loading="lazy" />
                        : <div className="w-full h-full bg-gradient-to-br from-navy to-[#1e2d47]" />
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 left-3 bg-blue-brand text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {p.category}
                      </span>
                      {p.year && (
                        <span className="absolute top-3 right-3 bg-white/90 text-navy text-[10px] font-bold px-2 py-1 rounded-sm">{p.year}</span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-poppins font-bold text-navy text-sm mb-1.5 group-hover:text-blue-brand transition-colors">{p.name}</h3>
                      <p className="text-gray-400 text-xs flex items-center gap-1.5 mb-2.5">
                        <MapPin size={11} /> {p.location || '—'}
                      </p>
                      <p className="text-gray-400 text-[12px] leading-relaxed line-clamp-2">{p.desc}</p>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-montserrat font-black text-white text-2xl sm:text-3xl mb-4">Want to See More Projects?</h2>
            <p className="text-white/40 text-sm mb-7 max-w-md mx-auto">Contact us for a complete project portfolio and case studies relevant to your sector.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-brand text-white px-7 py-3.5 rounded font-bold text-sm hover:bg-blue-dark transition-colors">
              Request Portfolio <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}

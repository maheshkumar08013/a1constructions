import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { AnimatedSection } from '../components/ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { MapPin, ArrowRight } from 'lucide-react'
import { resolveMediaUrl } from '../utils/media'

const STATUSES = ['All', 'Completed', 'Ongoing' ]

const STATUS_STYLES = {
  Upcoming: 'bg-amber-500',
  Ongoing: 'bg-blue-brand',
  Completed: 'bg-emerald-500',
}

export default function ProjectsPage() {
  const [activeStatus, setActiveStatus] = useState('All')

  const { data: list = [] } = useQuery({
    queryKey:['projects'],
    queryFn:()=>api.get('/content/projects').then(r=>r.data),
    retry:1
  })

  const filtered = list.filter(p => activeStatus === 'All' || p.status === activeStatus)

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

          {/* Status filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide transition-all duration-200 ${
                  activeStatus === s
                    ? 'bg-navy text-white shadow-md'
                    : 'bg-white text-gray-400 border border-gray-200 hover:border-navy hover:text-navy'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Grid */}
          {list.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No projects have been added from the backend yet.</div>
          ) : filtered.length === 0 ? (
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
                        ? <img src={resolveMediaUrl(p.image)} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" loading="lazy" />
                        : <div className="w-full h-full bg-gradient-to-br from-navy to-[#1e2d47]" />
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 left-3 bg-blue-brand text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {p.category}
                      </span>
                      {p.status && (
                        <span className={`absolute bottom-3 left-3 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm ${STATUS_STYLES[p.status] || 'bg-gray-500'}`}>
                          {p.status}
                        </span>
                      )}
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
            <h2 className="font-poppins font-black text-white text-2xl sm:text-3xl mb-4">Want to See More Projects?</h2>
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

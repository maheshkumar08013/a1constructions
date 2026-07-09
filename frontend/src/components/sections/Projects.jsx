import React, { useState } from 'react'
import { SectionLabel, SectionTitle, SectionRule, SectionDesc, AnimatedSection } from '../ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'
import { ExternalLink } from 'lucide-react'
import { resolveMediaUrl } from '../../utils/media'

function ProjectCard({ project }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden h-48 sm:h-52">
        {project.image
          ? <img src={resolveMediaUrl(project.image)} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          : <div className={`w-full h-full bg-gradient-to-br ${project.color}`} />
        }
        <span className="absolute top-3 left-3 bg-blue-brand text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
          {project.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-poppins font-bold text-navy text-sm mb-1.5">{project.name}</h3>
        <p className="text-gray-400 text-xs mb-2.5 flex items-center gap-1">📍 {project.location}</p>
        <p className="text-gray-500 text-[13px] leading-relaxed mb-4 flex-1">{project.desc}</p>
        <a href="#" className="inline-flex items-center gap-1.5 text-blue-brand text-xs font-semibold hover:gap-2.5 transition-all">
          View Details <ExternalLink size={12} />
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState('All')

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/content/projects').then(r => r.data),
    retry: 1
  })

  const list = projects
  const cats = ['All', ...Array.from(new Set(list.map(p => p.category).filter(Boolean)))]
  const filtered = active === 'All' ? list : list.filter(p => p.category === active)

  return (
    <section id="projects" className="py-20 lg:py-28 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center">
          <SectionLabel>Our Work</SectionLabel>
          <SectionTitle center>Featured Projects</SectionTitle>
          <SectionRule center />
          <SectionDesc center>Signature projects delivered for government bodies, public institutions, and corporate clients across Karnataka.</SectionDesc>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection className="mt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active === cat
                    ? 'bg-blue-brand text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-brand hover:text-blue-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {list.length === 0 ? (
          <div className="text-center py-14 text-gray-400">Projects will appear here once they are added from the backend.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <AnimatedSection key={p.id || i}>
                <ProjectCard project={p} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

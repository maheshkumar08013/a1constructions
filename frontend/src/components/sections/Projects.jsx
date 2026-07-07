import React, { useState } from 'react'
import { SectionLabel, SectionTitle, SectionRule, SectionDesc, AnimatedSection } from '../ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'
import { ExternalLink } from 'lucide-react'

const defaultProjects = [
  { id:1, name:'Assam Bhawan', category:'Government', location:'Bengaluru, Karnataka', desc:'State guest house and diplomatic facility with premium government-grade finishing.', color:'from-[#1e3a5f] to-[#1DA1F2]', image:'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80' },
  { id:2, name:'BBMP Multi Speciality Hospital', category:'Healthcare', location:'Bengaluru, Karnataka', desc:'Large-scale multi-speciality hospital serving thousands of Bangalore citizens.', color:'from-[#1a3a2a] to-[#3d8b5e]', image:'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80' },
  { id:3, name:'Dr Puneeth Rajkumar Hospital', category:'Healthcare', location:'Karnataka', desc:'Dedicated healthcare facility honouring the legacy of Kannada icon Dr Puneeth Rajkumar.', color:'from-[#3a1a1a] to-[#8b3d3d]', image:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { id:4, name:'Yeshwanthpur Railway Station', category:'Railway', location:'Bengaluru, Karnataka', desc:'Infrastructure works for South Western Railway — flagship railway development project.', color:'from-[#1a2a3a] to-[#2d3d5a]', image:'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80' },
  { id:5, name:'Government Degree College', category:'Education', location:'Karnataka', desc:'Complete college complex with classrooms, labs, and student amenities.', color:'from-[#2a1a3a] to-[#5a3d8b]', image:'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80' },
  { id:6, name:'BGS Ground', category:'Urban Development', location:'Bengaluru, Karnataka', desc:'Sports and civic ground development for urban recreation and community use.', color:'from-[#1e3a5f] to-[#2d8b5e]', image:'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' },
]

const cats = ['All', 'Government', 'Healthcare', 'Education', 'Railway', 'Urban Development']

function ProjectCard({ project }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden h-48 sm:h-52">
        {project.image
          ? <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/content/projects').then(r => r.data),
    placeholderData: defaultProjects,
    retry: 1
  })

  const list = projects?.length ? projects : defaultProjects
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <AnimatedSection key={p.id || i}>
              <ProjectCard project={p} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

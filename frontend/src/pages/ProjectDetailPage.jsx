import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { ArrowRight, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { parseGallery, resolveMediaUrl } from '../utils/media'

export default function ProjectDetailPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const { id } = useParams()
  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => api.get(`/content/projects/${id}`).then(r => r.data),
    retry: 1,
  })

  const heroImage = resolveMediaUrl(project?.image)
  const galleryImages = project
    ? Array.from(new Set([heroImage, ...parseGallery(project.gallery)].filter(Boolean)))
    : []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-gray-400">
          Loading project...
        </div>
        <Footer />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
        <Navbar />
        <div className="max-w-xl mx-auto py-24">
          <h1 className="text-3xl font-black text-navy mb-4">Project not found</h1>
          <p className="text-gray-500 mb-8">The requested project does not exist or may have been removed.</p>
          <Link to="/projects" className="inline-flex items-center gap-2 bg-blue-brand text-white px-6 py-3 rounded font-bold text-sm hover:bg-blue-dark transition-colors">
            Back to Projects <ArrowRight size={14} />
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={project.name}
        subtitle={project.desc}
        breadcrumbs={[{ label:'Projects', path:'/projects' }, { label: project.name }]}
        bgImage={heroImage}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
          <section>
            {heroImage && (
              <div className="rounded-3xl overflow-hidden shadow-lg mb-8">
                <img src={heroImage} alt={project.name} className="w-full h-[420px] object-cover" />
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-navy mb-3">Project Overview</h2>
                <p className="text-gray-500 leading-relaxed">{project.desc}</p>
              </div>

              {project.content && (
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Project Content</h3>
                  <div className="text-gray-500 leading-relaxed whitespace-pre-line">{project.content}</div>
                </div>
              )}

              {galleryImages.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {galleryImages.map((imageUrl, idx) => (
                      <button
                        type="button"
                        key={`${imageUrl}-${idx}`}
                        onClick={() => setSelectedImage(imageUrl)}
                        className="w-full h-64 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50"
                      >
                        <img
                          src={imageUrl}
                          alt={`${project.name} gallery ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="p-8 bg-blue-brand/5 rounded-3xl border border-blue-brand/10">
              <h3 className="text-lg font-semibold text-navy mb-4">Project Details</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between"><span className="font-semibold">Category</span><span>{project.category}</span></div>
                {project.status && (
                  <div className="flex justify-between"><span className="font-semibold">Status</span><span>{project.status}</span></div>
                )}
                <div className="flex justify-between"><span className="font-semibold">Location</span><span>{project.location}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Year</span><span>{project.year}</span></div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-navy mb-4">Interested in a similar project?</h3>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-brand text-white px-5 py-3 rounded-full font-bold text-sm hover:bg-blue-dark transition-colors">
                Contact Us <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-white" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/70 text-white p-2 hover:bg-black/90"
            >
              <X size={20} />
            </button>
            <img src={selectedImage} alt="Gallery preview" className="w-full max-h-[85vh] object-contain bg-black" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

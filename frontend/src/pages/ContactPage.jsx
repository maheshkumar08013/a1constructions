import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { AnimatedSection, SectionLabel, SectionTitle, SectionRule } from '../components/ui/SectionHeader'
import { useForm } from 'react-hook-form'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, Globe, Clock, CheckCircle2 } from 'lucide-react'

const offices = [
  {
    label:'Registered Office',
    address:'#352/32, 1st Floor, 3rd Block\nNagarabhavi 2nd Stage\nBangalore – 560072, Karnataka',
    phone:'+91 9845370474',
    email:'info@a1construction.co.in',
    hours:'Mon–Sat: 9:00 AM – 6:00 PM',
  }
]

const faqs = [
  { q:'What types of projects does A1 Construction undertake?', a:'We handle government, healthcare, educational, commercial, industrial, and railway infrastructure projects across Karnataka and South India.' },
  { q:'Are you empanelled with government departments?', a:'Yes. We are registered with PWD Karnataka, BBMP, South Western Railway, Karnataka Housing Board, and several other government bodies.' },
  { q:'How long does it take to receive a project proposal?', a:'We typically respond with a preliminary proposal within 48–72 hours of receiving project details. Complex projects may require a site visit first.' },
  { q:'What is your minimum project size?', a:'We take up projects from ₹25 lakhs onwards. For government tender works, we follow the relevant department\'s empanelment criteria.' },
  { q:'Do you offer project management services separately?', a:'Yes. Our PMC (Project Management Consultancy) services are available as a standalone offering for clients with their own construction teams.' },
]

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { isSubmitting, isSubmitSuccessful } } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post('/enquiries', data)
      toast.success('Enquiry sent! We\'ll get back to you within 48 hours.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Get in Touch"
        subtitle="Tell us about your project. Our engineering team will get back to you within 48 hours."
        breadcrumbs={[{ label:'Contact' }]}
        bgImage="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80"
      />

      {/* Main contact section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Form — wider col */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <SectionLabel>Send an Enquiry</SectionLabel>
                <SectionTitle>Tell Us About Your Project</SectionTitle>
                <SectionRule />
                <p className="text-gray-400 text-sm mb-8">Whether you're a government department, architect, or corporate client — share your project requirements below.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input {...register('name', { required:true })} placeholder="Full name" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                      <input {...register('email', { required:true })} type="email" placeholder="you@organisation.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input {...register('phone')} placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Organisation</label>
                      <input {...register('organisation')} placeholder="Department / Company" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Project Type</label>
                    <select {...register('type')} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all bg-white">
                      <option value="">Select project type…</option>
                      <option>Government / Public Sector</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Railway / Infrastructure</option>
                      <option>Project Management (PMC)</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Project Description</label>
                    <textarea {...register('message')} rows={5} placeholder="Describe your project — location, scope, estimated area, timeline, and any special requirements…" className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-brand hover:bg-blue-dark text-white py-4 rounded-lg font-bold text-sm font-inter transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                  >
                    {isSubmitting ? '⏳ Sending…' : 'Send Enquiry →'}
                  </button>

                  <p className="text-gray-300 text-xs text-center">We typically respond within 48 hours on working days.</p>
                </form>
              </AnimatedSection>
            </div>

            {/* Info col */}
            <div className="lg:col-span-2 space-y-5">
              <AnimatedSection className="delay-150">
                {offices.map(o => (
                  <div key={o.label} className="bg-light rounded-xl p-6 border border-gray-100 mb-5">
                    <h3 className="font-poppins font-semibold text-navy text-sm mb-5 flex items-center gap-2">
                      <MapPin size={14} className="text-blue-brand" /> {o.label}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <MapPin size={13} className="text-blue-brand flex-shrink-0 mt-1" />
                        <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{o.address}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Phone size={13} className="text-blue-brand flex-shrink-0" />
                        <a href={`tel:${o.phone.replace(/\s/g,'')}`} className="text-gray-500 text-sm hover:text-blue-brand transition-colors">{o.phone}</a>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Mail size={13} className="text-blue-brand flex-shrink-0" />
                        <a href={`mailto:${o.email}`} className="text-gray-500 text-sm hover:text-blue-brand transition-colors">{o.email}</a>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Clock size={13} className="text-blue-brand flex-shrink-0" />
                        <p className="text-gray-500 text-sm">{o.hours}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Map embed */}
                <div className="bg-navy rounded-xl overflow-hidden h-44">
                  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d615.0798392808252!2d77.51231587691987!3d12.98024850240866!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d0005ece8ab%3A0xdceb8f59965334ec!2sA1%20Construction!5e1!3m2!1sen!2sin!4v1783916745924!5m2!1sen!2sin"
    className="w-full h-full opacity-100"
    loading="lazy"
    title="A1 Construction Office Location"
    style={{ border: 0 }}
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  />
                </div>

                {/* Quick reach */}
                <div className="bg-blue-brand rounded-xl p-5 text-center mt-5">
                  <p className="text-white/80 text-xs mb-2">For urgent enquiries, call us directly</p>
                  <a href="tel:+919845370474" className="font-montserrat font-black text-white text-xl hover:text-white/80 transition-colors">
                    +91 9845370474
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-24 bg-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionLabel>FAQs</SectionLabel>
            <SectionTitle center>Frequently Asked Questions</SectionTitle>
            <SectionRule center />
          </AnimatedSection>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <AnimatedSection key={i}>
                <details className="bg-white rounded-xl border border-gray-100 group">
                  <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                    <h3 className="font-poppins font-semibold text-navy text-sm">{f.q}</h3>
                    <span className="text-blue-brand flex-shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-45 text-lg leading-none">+</span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                  </div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

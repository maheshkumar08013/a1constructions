import React from 'react'
import { SectionLabel, SectionTitle, SectionRule, SectionDesc, AnimatedSection } from '../ui/SectionHeader'
import { useForm } from 'react-hook-form'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'

const whyCards = [
  { icon:'⚙️', title:'Engineering Excellence', desc:'Technically rigorous approach backed by experienced engineers and IS-code compliance.' },
  { icon:'🏛', title:'Government Project Expertise', desc:'Proven track record with full tender and compliance support for PSU projects.' },
  { icon:'✅', title:'Quality Assurance', desc:'Structured QA processes, material testing, and third-party inspection at every milestone.' },
  { icon:'🦺', title:'Strong Safety Culture', desc:'Comprehensive HSE management — zero-accident commitment across all sites.' },
  { icon:'🌿', title:'Sustainable Development', desc:'Environmentally conscious practices and resource-efficient construction methodologies.' },
  { icon:'⏱', title:'Timely Delivery', desc:'Systematic scheduling and milestone tracking ensures on-time handover every project.' },
  { icon:'👷', title:'Experienced Team', desc:'500+ skilled workforce led by seasoned project managers and engineers.' },
  { icon:'🤝', title:'Client-Centric Approach', desc:'Transparent communication and complete post-handover support.' },
]

const clients = [
  { abbr:'SWR', name:'South Western Railway' },
  { abbr:'PWD', name:'Public Works Dept' },
  { abbr:'KHB', name:'Karnataka Housing Board' },
  { abbr:'BBMP', name:'BBMP' },
  { abbr:'BU', name:'Bangalore University' },
  { abbr:'KRIDL', name:'KRIDL' },
  { abbr:'NIAS', name:'NIAS' },
  { abbr:'TSCL', name:'TSCL' },
  { abbr:'KOF', name:'KOF' },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel light>Why Choose Us</SectionLabel>
          <SectionTitle light center>Built on a Foundation of Engineering Excellence</SectionTitle>
          <SectionRule center />
          <SectionDesc light center>Eight pillars that define every project we undertake — from tender submission to final handover.</SectionDesc>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyCards.map((c, i) => (
            <AnimatedSection key={c.title}>
              <div className="border border-white/8 rounded-lg p-6 hover:bg-blue-brand/8 hover:border-blue-brand/25 transition-all duration-200 h-full">
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-poppins font-semibold text-white text-sm mb-2">{c.title}</h3>
                <p className="text-white/42 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Clients() {
  return (
    <section id="clients" className="py-20 lg:py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionLabel>Our Clients</SectionLabel>
          <SectionTitle>Government & Institutional Partners</SectionTitle>
          <SectionRule />
          <SectionDesc>Trusted by Karnataka's leading government departments, PSUs, and institutional bodies.</SectionDesc>
        </AnimatedSection>

        <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 divide-x divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-gray-200">
          {clients.map(c => (
            <div
              key={c.name}
              className="bg-white py-5 px-2 flex flex-col items-center justify-center gap-2 cursor-default group hover:bg-navy transition-all duration-200"
            >
              <div className="w-10 h-10 bg-gray-100 rounded group-hover:bg-blue-brand/15 flex items-center justify-center font-montserrat font-black text-[11px] text-navy group-hover:text-blue-brand transition-all">
                {c.abbr}
              </div>
              <span className="text-[10px] font-semibold text-gray-400 group-hover:text-white/60 uppercase tracking-tight text-center leading-tight transition-colors">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post('/enquiries', data)
      toast.success('Enquiry sent! We\'ll get back to you shortly.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <AnimatedSection>
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionTitle>Send Us an Enquiry</SectionTitle>
            <SectionRule />
            <p className="text-gray-400 text-sm mb-8">Whether you're a government department, architect, or corporate client — reach out to discuss your project requirements.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input {...register('name', { required: true })} placeholder="Your Name" className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-brand transition-colors" />
                <input {...register('email', { required: true })} type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-brand transition-colors" />
              </div>
              <input {...register('organisation')} placeholder="Organisation / Company" className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-brand transition-colors" />
              <input {...register('phone')} placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-brand transition-colors" />
              <select {...register('type')} className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-gray-500 focus:outline-none focus:border-blue-brand transition-colors bg-white">
                <option value="">Project Type</option>
                <option>Government / Public Sector</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Other</option>
              </select>
              <textarea {...register('message')} rows={4} placeholder="Project description & requirements" className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-brand transition-colors resize-none" />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-brand text-white py-3.5 rounded font-semibold text-sm font-inter hover:bg-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection className="delay-150">
            <div className="bg-light rounded-xl p-6 mb-4">
              <h3 className="font-poppins font-semibold text-navy text-sm mb-5">Contact Information</h3>
              {[
                { Icon: MapPin, label: 'Registered Office', text: '#352/32, 1st Floor, 3rd Block, Nagarabhavi 2nd Stage, Bangalore – 560072, Karnataka' },
                { Icon: Phone, label: 'Phone', text: '+91 9845370474' },
                { Icon: Mail, label: 'Email', text: 'info@a1construction.co.in' },
                { Icon: Globe, label: 'Website', text: 'www.a1construction.co.in' },
              ].map(({ Icon, label, text }) => (
                <div key={label} className="flex gap-3 mb-4 last:mb-0">
                  <Icon size={15} className="text-blue-brand flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-navy text-xs mb-0.5">{label}</div>
                    <div className="text-gray-500 text-sm leading-relaxed">{text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-navy rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">📍</div>
              <p className="text-white font-semibold text-sm">Nagarabhavi 2nd Stage</p>
              <p className="text-white/40 text-xs mt-1">Bangalore – 560072, Karnataka</p>
              <a
                href="https://maps.google.com/?q=Nagarabhavi+2nd+Stage+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-brand text-white px-5 py-2 rounded text-xs font-semibold hover:bg-blue-dark transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

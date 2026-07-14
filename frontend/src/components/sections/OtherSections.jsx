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
              <div className="w-10 h-10 bg-gray-100 rounded group-hover:bg-blue-brand/15 flex items-center justify-center font-poppins font-black text-[11px] text-navy group-hover:text-blue-brand transition-all">
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
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3">
            <SectionLabel>Get in Touch</SectionLabel>
            <SectionTitle>Send Us an Enquiry</SectionTitle>
            <SectionRule />
            <p className="text-gray-400 text-sm mb-8">Whether you're a government department, architect, or corporate client, share your project requirements and we’ll get back to you quickly.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input {...register('name', { required: true })} placeholder="Your Name" className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
                <input {...register('email', { required: true })} type="email" placeholder="Email Address" className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
              </div>
              <input {...register('organisation')} placeholder="Organisation / Company" className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
              <input {...register('phone')} placeholder="Phone Number" className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all" />
              <select {...register('type')} className="w-full px-4 py-3.5 border border-gray-200 rounded-md text-sm text-gray-500 focus:outline-none focus:border-blue-brand focus:ring-1 focus:ring-blue-brand/20 transition-all bg-white">
                <option value="">Project Type</option>
                <option>Government / Public Sector</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Railway / Infrastructure</option>
                <option>Project Management (PMC)</option>
                <option>Other</option>
              </select>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-brand text-white py-4 rounded-md font-semibold text-sm font-inter hover:bg-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection className="delay-150 lg:col-span-2">
            <div className="bg-light rounded-xl p-7 border border-gray-100 mb-4">
              {[
                { Icon: MapPin, label: 'Registered Office', text: '#352/32, 1st Floor, 3rd Block, Nagarabhavi 2nd Stage, Bangalore – 560072, Karnataka' },
                { Icon: Phone, label: 'Phone', text: '+91 9845370474' },
                { Icon: Mail, label: 'Email', text: 'info@a1construction.co.in' },
                { Icon: Globe, label: 'Website', text: 'www.a1construction.co.in' },
              ].map(({ Icon, label, text }) => (
                <div key={label} className="flex gap-3 mb-5 last:mb-0">
                  <Icon size={16} className="text-blue-brand flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-navy text-sm mb-0.5">{label}</div>
                    <div className="text-gray-500 text-sm leading-relaxed">{text}</div>
                  </div>
                </div>
              ))}
            </div>

<div className="rounded-xl  ">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d615.0798392808252!2d77.51231587691987!3d12.98024850240866!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d0005ece8ab%3A0xdceb8f59965334ec!2sA1%20Construction!5e1!3m2!1sen!2sin!4v1783916745924!5m2!1sen!2sin"
    className="w-full h-[200px] opacity-100"
    loading="lazy"
    title="A1 Construction Office Location"
    style={{ border: 0 }}
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  />
</div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

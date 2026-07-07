import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { AnimatedSection, SectionLabel, SectionTitle, SectionRule } from '../components/ui/SectionHeader'
import { CheckCircle2, ArrowRight, Award, Users, Calendar, TrendingUp } from 'lucide-react'
import swrLogo from '../assets/images/clientlogo/south western railways.jpg'
import bbmpLogo from '../assets/images/clientlogo/Bruhat_Bengaluru_Mahanagara_Palike_logo.jpg'
import pwdLogo from '../assets/images/clientlogo/pwd-karnataka-logo.jpg'
import khbLogo from '../assets/images/clientlogo/karnataka housing board.png'
import buLogo from '../assets/images/clientlogo/bangalore university.png'
import kridlLogo from '../assets/images/clientlogo/kridl.png'
import niasLogo from '../assets/images/clientlogo/National_Institute_of_Advanced_Studies_Logo.png'

const milestones = [
  { year:'2012', event:'A1 Construction founded in Bengaluru with a focus on government and institutional projects.' },
  { year:'2014', event:'First major government contract — BBMP civil infrastructure works across Bengaluru.' },
  { year:'2016', event:'Empanelled with South Western Railway for station infrastructure development.' },
  { year:'2018', event:'Expanded to healthcare sector — first BBMP hospital project commenced.' },
  { year:'2020', event:'Workforce grew to 300+, expanded operations across Karnataka.' },
  { year:'2022', event:'Completed Dr Puneeth Rajkumar Hospital — a landmark healthcare project.' },
  { year:'2024', event:'500+ workforce, ₹500Cr+ total project value, 100+ projects delivered.' },
]

const values = [
  { icon:'🏆', title:'Engineering Excellence', desc:'Technically rigorous approach — every project designed and executed to IS codes, with multi-stage quality control from groundwork to final handover.' },
  { icon:'✅', title:'Quality Assurance', desc:'Structured QA processes including material testing, site audits, and third-party inspections at every project milestone.' },
  { icon:'🦺', title:'Safety First', desc:'Comprehensive HSE management — zero-accident commitment, daily safety briefings, and regulatory compliance across all sites.' },
  { icon:'🌿', title:'Sustainable Practices', desc:'Environmentally conscious construction methods, resource efficiency, and waste reduction embedded in our project methodology.' },
  { icon:'⏱', title:'Timely Delivery', desc:'Systematic scheduling, milestone tracking, and proactive risk management ensure on-time project completion and client satisfaction.' },
  { icon:'🤝', title:'Client Partnership', desc:'Transparent communication, regular updates, and complete post-handover support — we build long-term relationships, not just buildings.' },
]

const team = [
  { name:'Managing Director', dept:'Leadership', desc:'20+ years in infrastructure and government construction across South India.' },
  { name:'Chief Engineer', dept:'Engineering', desc:'Structural and civil engineering expert with extensive RCC and government project experience.' },
  { name:'Project Director', dept:'Operations', desc:'End-to-end project delivery specialist managing multiple concurrent government projects.' },
  { name:'Quality Manager', dept:'QA / QC', desc:'IS code compliance, material testing, and third-party inspection coordinator.' },
]

const certifications = [
  'Registered with PWD Karnataka',
  'Empanelled with BBMP',
  'South Western Railway Approved Contractor',
  'Karnataka Housing Board Empanelled',
  'ISO 9001 Quality Management',
  'MSME Registered Enterprise',
]

const stats = [
  { Icon:Calendar, num:'12+', label:'Years Experience' },
  { Icon:Award, num:'100+', label:'Projects Delivered' },
  { Icon:Users, num:'500+', label:'Skilled Workforce' },
  { Icon:TrendingUp, num:'₹500Cr+', label:'Total Project Value' },
]

const clients = [
  { name:'South Western Railway', logo:swrLogo, alt:'South Western Railway' },
  { name:'BBMP', logo:bbmpLogo, alt:'Bruhat Bengaluru Mahanagara Palike' },
  { name:'PWD Karnataka', logo:pwdLogo, alt:'Public Works Department Karnataka' },
  { name:'Karnataka Housing Board', logo:khbLogo, alt:'Karnataka Housing Board' },
  { name:'Bangalore University', logo:buLogo, alt:'Bangalore University' },
  { name:'KRIDL', logo:kridlLogo, alt:'Karnataka Renewable Energy Development Ltd' },
  { name:'NIAS', logo:niasLogo, alt:'National Institute of Advanced Studies' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Building Karnataka's Future Since 2012"
        subtitle="A trusted infrastructure partner for government departments, PSUs, and institutional clients across South India."
        breadcrumbs={[{ label:'About Us' }]}
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80"
      />

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {stats.map(({ Icon, num, label }) => (
              <div key={label} className="text-center py-8 px-4">
                <Icon size={20} className="text-blue-brand mx-auto mb-3" />
                <div className="font-montserrat font-black text-navy text-2xl sm:text-3xl leading-none mb-1">{num}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider font-inter">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <SectionLabel>Our Story</SectionLabel>
              <SectionTitle>Infrastructure Built on Integrity</SectionTitle>
              <SectionRule />
              <div className="space-y-4 text-gray-500 text-[15px] leading-relaxed">
                <p>A1 Construction was founded in 2012 in Bengaluru with a clear mission: to deliver high-quality infrastructure that serves communities and stands the test of time. From humble beginnings with a small team of engineers, we have grown into one of Karnataka's trusted construction firms.</p>
                <p>Our expertise spans institutional buildings, healthcare facilities, educational campuses, railway infrastructure, and urban development projects. We have had the privilege of working with leading government bodies including the BBMP, PWD Karnataka, South Western Railway, and Karnataka Housing Board.</p>
                <p>Headquartered in Nagarabhavi, Bengaluru, our team of 500+ skilled professionals brings the same dedication to a ₹50 lakh civil works as to a ₹100 crore hospital project. Every project is personal to us — because we understand that what we build becomes part of people's lives.</p>
              </div>

              <div className="mt-8 p-5 bg-light rounded-xl border-l-4 border-blue-brand">
                <p className="text-navy font-semibold text-sm italic">"Our purpose is to build infrastructure that creates lasting value for communities, delivered with the engineering precision and project management discipline that every client deserves."</p>
                <p className="text-gray-400 text-xs mt-2">— Managing Director, A1 Construction</p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="delay-150">
              <SectionLabel>Certifications & Registrations</SectionLabel>
              <SectionTitle>Empanelled & Qualified</SectionTitle>
              <SectionRule />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {certifications.map(c => (
                  <div key={c} className="flex items-center gap-3 bg-light rounded-lg px-4 py-3">
                    <CheckCircle2 size={15} className="text-blue-brand flex-shrink-0" />
                    <span className="text-navy text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>

              <div className="bg-navy rounded-xl p-6">
                <h4 className="font-poppins font-semibold text-white text-sm mb-3">Registered Office</h4>
                <p className="text-white/50 text-sm leading-relaxed">#352/32, 1st Floor, 3rd Block<br />Nagarabhavi 2nd Stage<br />Bangalore – 560072, Karnataka</p>
                <div className="flex flex-col gap-1.5 mt-4">
                  <a href="tel:+919845370474" className="text-blue-brand text-sm hover:text-blue-dark transition-colors">📞 +91 9845370474</a>
                  <a href="mailto:info@a1construction.co.in" className="text-blue-brand text-sm hover:text-blue-dark transition-colors">✉️ info@a1construction.co.in</a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionLabel>Our Values</SectionLabel>
            <SectionTitle center>The Principles Behind Every Project</SectionTitle>
            <SectionRule center />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(v => (
              <AnimatedSection key={v.title}>
                <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-poppins font-semibold text-navy text-sm mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-[13px] leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel>Our Journey</SectionLabel>
            <SectionTitle center>12 Years of Infrastructure Excellence</SectionTitle>
            <SectionRule center />
          </AnimatedSection>

          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year}>
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                      <div className="bg-light rounded-xl p-5 border border-gray-100 hover:border-blue-brand/30 transition-colors">
                        <div className="inline-block bg-blue-brand text-white text-xs font-bold px-3 py-1 rounded-full font-inter mb-3">{m.year}</div>
                        <p className="text-gray-500 text-sm leading-relaxed">{m.event}</p>
                      </div>
                    </div>
                    {/* Centre dot */}
                    <div className="hidden md:flex w-4 h-4 bg-blue-brand rounded-full flex-shrink-0 mx-auto border-4 border-white shadow-md relative z-10" />
                    <div className="md:w-1/2" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 lg:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionLabel>Leadership</SectionLabel>
            <SectionTitle center>The Team Behind A1</SectionTitle>
            <SectionRule center />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map(t => (
              <AnimatedSection key={t.name}>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="bg-gradient-to-br from-navy to-[#1e2d47] h-28 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-brand/20 border-2 border-blue-brand/40 flex items-center justify-center">
                      <Users size={22} className="text-blue-brand" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] text-blue-brand font-bold uppercase tracking-widest mb-1">{t.dept}</div>
                    <h3 className="font-poppins font-semibold text-navy text-sm mb-2">{t.name}</h3>
                    <p className="text-gray-400 text-[12px] leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Partners */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>Our Clients</SectionLabel>
            <SectionTitle center>Trusted by Leading Organizations</SectionTitle>
            <SectionRule center />
            <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">We are empanelled and approved by India's leading government departments, public sector undertakings, and institutional clients.</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map(c => (
              <AnimatedSection key={c.name}>
                <div className="bg-light rounded-xl p-6 border border-gray-100 hover:border-blue-brand/30 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-40">
                  <img src={c.logo} alt={c.alt} className="h-16 object-contain mb-3" />
                  <p className="text-navy text-xs font-semibold text-center">{c.name}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-montserrat font-black text-white text-2xl sm:text-3xl mb-4">Ready to Start Your Project?</h2>
            <p className="text-white/45 mb-7 max-w-lg mx-auto text-sm">Connect with our engineering team to discuss your infrastructure requirements.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-brand text-white px-7 py-3.5 rounded font-bold text-sm hover:bg-blue-dark transition-colors">
                Get in Touch <ArrowRight size={14} />
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded font-bold text-sm hover:bg-white/5 transition-colors">
                View Our Projects
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}

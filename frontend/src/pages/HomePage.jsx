import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSlider from '../components/sections/HeroSlider'
import TaglineStrip from '../components/sections/TaglineStrip'
import { ContactSection } from '../components/sections/OtherSections'
import Counter from '../components/ui/Counter'   // add this import at the top with your other imports

import { SectionLabel, SectionTitle, SectionRule, SectionDesc, AnimatedSection } from '../components/ui/SectionHeader'
import { useQuery } from '@tanstack/react-query'
import api from '../utils/api'
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react'
import { resolveMediaUrl } from '../utils/media'
import aboutUsImage from '../assets/about-us1.webp'
import swrLogo from '../assets/images/clientlogo/south western railways.jpg'
import bbmpLogo from '../assets/images/clientlogo/Bruhat_Bengaluru_Mahanagara_Palike_logo.jpg'
import pwdLogo from '../assets/images/clientlogo/pwd.png'
import khbLogo from '../assets/images/clientlogo/karnataka housing board.png'
import buLogo from '../assets/images/clientlogo/bangalore university.png'
import kridlLogo from '../assets/images/clientlogo/kridl.png'
import niasLogo from '../assets/images/clientlogo/National_Institute_of_Advanced_Studies_Logo.png'
import kfO from '../assets/images/clientlogo/kof.png'
import tscL from '../assets/images/clientlogo/tscl.png'
import rvs from '../assets/images/clientlogo/rvs.png'


/* ── About Teaser ───────────────────────────── */
function AboutTeaser() {
  const highlights = [
    'Est. 2012, Bengaluru — 14+ years in infrastructure',
    'Pan-Karnataka projects: government, healthcare, education',
    'Registered with PWD, BBMP, South Western Railway',
    '500+ skilled workforce, dedicated project teams',
  ]
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Visual */}
          <AnimatedSection>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                <img src={aboutUsImage} alt="A1 Construction - About Us" className="w-full h-full object-cover" />
              </div>
              {/* Stats cards */}
              <div className="absolute -bottom-5 -right-5 bg-blue-brand text-white px-6 py-4 rounded-xl shadow-xl text-center">
                <div className="font-poppins font-black text-2xl leading-none">100+</div>
                <div className="text-xs text-white/75 mt-1 font-inter">Projects Done</div>
              </div>
              <div className="absolute -top-5 -left-5 bg-white shadow-xl rounded-xl px-5 py-3 border border-gray-100">
                <div className="font-poppins font-black text-navy text-xl leading-none">14+</div>
                <div className="text-xs text-gray-400 mt-0.5 font-inter">Years Est.</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection className="delay-150">
            <SectionLabel>About A1 Construction</SectionLabel>
            <SectionTitle>Trusted Infrastructure Partner Since 2012</SectionTitle>
            <SectionRule />
            <p className="text-gray-500 leading-relaxed mb-5 text-[15px]">
              A1 Construction is a Bengaluru-based infrastructure development firm established in 2012. We specialise in institutional, healthcare, educational, commercial, industrial, and public infrastructure projects across Karnataka and South India.
            </p>
            <div className="space-y-3 mb-8">
              {highlights.map(h => (
                <div key={h} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-blue-brand flex-shrink-0 mt-0.5" />
                  <p className="text-gray-500 text-sm leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded text-sm font-bold font-inter hover:bg-[#1e2d47] transition-colors">
              More About Us <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

/* ── Services Teaser ────────────────────────── */
const defaultServices = [
  { icon:'🏗', name:'Building Construction', desc:'Residential, commercial, and institutional structures to IS standards.' },
  { icon:'🏛', name:'Government Infrastructure', desc:'Public buildings, civil works, and government-mandated projects.' },
  { icon:'🏥', name:'Healthcare Infrastructure', desc:'Hospitals, medical centres, and healthcare facilities.' },
  { icon:'🎓', name:'Educational Infrastructure', desc:'Colleges, universities, hostels, and academic campuses.' },
  { icon:'🏭', name:'Industrial Construction', desc:'Warehouses, storage facilities, and industrial complexes.' },
  { icon:'📋', name:'Project Management', desc:'Full PMC — planning, coordination, quality, and timely delivery.' },
]

function ServicesTeaser() {
  const { data } = useQuery({ queryKey:['services'], queryFn:()=>api.get('/content/services').then(r=>r.data), placeholderData:defaultServices, retry:1 })
  const list = (data?.length ? data : defaultServices).slice(0, 6)

  return (
    <section className="py-20 lg:py-28 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-4">
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <SectionTitle>End-to-End Construction Solutions</SectionTitle>
              <SectionRule />
              <SectionDesc>Comprehensive infrastructure services for government, institutional, and corporate clients.</SectionDesc>
            </div>
            <Link to="/services" className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-navy text-navy px-6 py-3 rounded text-sm font-bold font-inter hover:bg-navy hover:text-white transition-all">
              All Services <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((s, i) => (
            <AnimatedSection key={s.name || i}>
              <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl hover:border-transparent transition-all duration-300 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-12 h-12 bg-blue-brand/8 rounded-xl flex items-center justify-center text-2xl mb-4">{s.icon}</div>
                <h3 className="font-poppins font-semibold text-navy text-sm mb-2">{s.name}</h3>
                <p className="text-gray-400 text-[13px] leading-relaxed">{s.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Projects Teaser ────────────────────────── */
function ProjectsTeaser() {
  const { data: projects = [] } = useQuery({ queryKey:['projects'], queryFn:()=>api.get('/content/projects').then(r=>r.data), retry:1 })
  const list = projects.slice(0, 6)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel>Our Work</SectionLabel>
          <SectionTitle center>Featured Projects</SectionTitle>
          <SectionRule center />
          <SectionDesc center>Signature projects delivered for government bodies, public institutions, and corporate clients.</SectionDesc>
        </AnimatedSection>

        {list.length === 0 ? (
          <div className="text-center py-14 text-gray-400 mb-10">Projects will appear here once they are added from the backend.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {list.map((p, i) => (
              <AnimatedSection key={p.id || i}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={resolveMediaUrl(p.image)} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <span className="absolute top-3 left-3 bg-blue-brand text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-poppins font-bold text-navy text-sm mb-1">{p.name}</h3>
                    <p className="text-gray-400 text-xs">📍 {p.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/projects" className="inline-flex items-center gap-2 bg-blue-brand text-white px-8 py-3.5 rounded text-sm font-bold font-inter hover:bg-blue-dark transition-colors shadow-md">
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Clients Strip ──────────────────────────── */
const clients = [
  { name:'South Western Railway', logo:swrLogo, alt:'South Western Railway' },
  { name:'BBMP', logo:bbmpLogo, alt:'Bruhat Bengaluru Mahanagara Palike' },
  { name:'PWD ', logo:pwdLogo, alt:'Public Works Department Karnataka' },
  { name:'Karnataka Housing Board', logo:khbLogo, alt:'Karnataka Housing Board' },
  { name:'Bangalore University', logo:buLogo, alt:'Bangalore University' },
  { name:'KRIDL', logo:kridlLogo, alt:'Karnataka Renewable Energy Development Ltd' },
  { name:'NIAS', logo:niasLogo, alt:'National Institute of Advanced Studies' },
  { name:'TSCL', logo:tscL, alt:'Tumkur Smart City Limited' },
  { name:'KOF', logo:kfO, alt:'Karnataka Opportunity Fund' },
  { name:'RVS', logo:rvs, alt:'Rural Development Society' },
]

function ClientsStrip() {
  return (
    <section className="py-16 bg-light border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="text-gray-400 text-xs uppercase tracking-[3px] font-semibold font-inter">Trusted by Indias's Leading Organizations</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map(c => (
            <AnimatedSection key={c.name}>
              <div className="bg-white rounded-lg p-5 border border-gray-100 hover:border-blue-brand/30 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center h-28">
                <img src={c.logo} alt={c.alt} className="h-16 object-contain mb-2" />
                <p className="text-navy text-[11px] font-semibold text-center leading-tight">{c.name}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ───────────────────────────── */
const testimonials = [
  {
    quote: 'A1 Construction delivered our hospital project ahead of schedule without compromise on quality. Their professionalism was evident throughout.',
    initials: 'RK',
    name: 'R. Kumar',
    role: 'Project Director, BBMP',
  },
  {
    quote: 'Their experience with government tender processes and compliance made the programme seamless. A reliable partner we continue to engage.',
    initials: 'PS',
    name: 'P. Sharma',
    role: 'Chief Engineer, PWD Karnataka',
  },
  {
    quote: 'The railway station project was complex and time-critical. A1 Construction\'s site management and stakeholder coordination was exceptional.',
    initials: 'MN',
    name: 'M. Nair',
    role: 'DRM, South Western Railway',
  },
]

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-24 bg-[#111325] border-t border-b border-blue-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 lg:mb-14">
          <p className="text-blue-brand text-xs font-bold uppercase tracking-[4px] mb-4 font-inter">Testimonials</p>
          <h2 className="font-poppins font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            What Our Clients Say
          </h2>
          <div className="w-11 h-[3px] bg-blue-brand rounded-full mx-auto mt-5" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((item) => (
            <AnimatedSection key={item.name}>
              <div className="h-full rounded-xl border border-white/8 bg-white/[0.03] px-7 py-8">
                <div className="text-blue-brand/60 text-4xl leading-none mb-5">"</div>
                <p className="text-white/90 text-[15px] leading-8 italic min-h-[150px]">
                  {item.quote}
                </p>
                <div className="border-t border-white/8 mt-7 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-brand flex items-center justify-center text-white text-sm font-bold font-inter">
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.name}</div>
                    <div className="text-white/60 text-sm">{item.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Stats Section ──────────────────────────── */
function StatsSection() {
  const stats = [
    { num: '14+',     label: 'Years Experience' },
    // { num: '100+',    label: 'Projects Completed' },
    { num: '50+',    label: 'Workforce' },
    { num: '50+',     label: 'Govt Projects' },
    { num: '200Cr+', label: 'Project Value' },
  ]

  return (
    <section className="py-20 lg:py-24  border-t border-b border-blue-brand">
      <div className=" backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 divide-x-0 sm:divide-x divide-white/8">
            {stats.map(({ num, label }, i) => (
              <div
                key={label}
                className={`text-center text-black/100 py-3.5 sm:py-5 px-2`}
              >
                {/* <div
                key={label}
                className={`text-center text-black/100 py-3.5 sm:py-5 px-2 ${i === stats.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
              > */}
                <Counter targetValue={num} duration={2000} />
                <div className="text-black/60 text-[9px] sm:text-[10px] uppercase tracking-widest mt-1 font-inter">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}




/* ── CTA Banner ─────────────────────────────── */
function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background:'linear-gradient(135deg, #1da1f2 0%, #1565c0 100%)' }}>
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(29,161,242,1) 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="text-white/80 text-xs font-bold uppercase tracking-[3px] mb-4 font-inter">Start Your Project</p>
          <h2 className="font-poppins font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 max-w-3xl mx-auto">
            Ready to Build Something That Lasts?
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Share your project requirements and get a detailed proposal from our engineering team.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-navy hover:bg-white hover:text-black text-white px-8 py-4 rounded font-bold font-inter text-sm transition-colors shadow-lg shadow-blue-brand/20">
              Request a Proposal <ArrowRight size={14} />
            </Link>
            {/* <a href="tel:+919845370474" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 hover:bg-white hover:text-black text-white px-8 py-4 rounded font-bold font-inter text-sm transition-all">
              +91 98453 70474
            </a> */}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ── Why Choose Us Strip ────────────────────── */
function WhyStrip() {
  const cards = [
    { icon:'⚙️', title:'Engineering Precision', desc:'IS-code compliance, rigorous QA, and third-party inspections on every project.' },
    { icon:'🏛', name:'title', title:'Govt Project Expertise', desc:'Full tender support, compliance, and a proven track record with PSU clients.' },
    { icon:'⏱', title:'Timely Delivery', desc:'Systematic scheduling and milestone tracking ensures on-time handover.' },
    { icon:'🤝', title:'Client-Centric', desc:'Transparent communication and complete post-handover support.' },
  ]
  return (
    <section className="py-20 lg:py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel light>Why Choose Us</SectionLabel>
          <SectionTitle light center>Built on Engineering Excellence</SectionTitle>
          <SectionRule center />
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <AnimatedSection key={c.title}>
              <div className="border border-white/8 rounded-xl p-6 hover:bg-blue-brand/8 hover:border-blue-brand/25 transition-all duration-200 h-full">
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className="font-poppins font-semibold text-white text-sm mb-2">{c.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── HomePage ───────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSlider />
        <TaglineStrip />
        <AboutTeaser />
        <ServicesTeaser />
        <WhyStrip />
        <ProjectsTeaser />
        <ClientsStrip />
        {/* <TestimonialsSection /> */}
        <StatsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

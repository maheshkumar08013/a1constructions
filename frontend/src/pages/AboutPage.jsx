import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import PageHero from '../components/ui/PageHero'
import { AnimatedSection, SectionLabel, SectionTitle, SectionRule } from '../components/ui/SectionHeader'
import { CheckCircle2, ArrowRight, Award, Users, Calendar, TrendingUp, Compass, Target, ShieldCheck, HardHat, Building2 } from 'lucide-react'
import swrLogo from '../assets/images/clientlogo/south western railways.jpg'
import bbmpLogo from '../assets/images/clientlogo/Bruhat_Bengaluru_Mahanagara_Palike_logo.jpg'
import pwdLogo from '../assets/images/clientlogo/pwd-karnataka-logo.jpg'
import khbLogo from '../assets/images/clientlogo/karnataka housing board.png'
import buLogo from '../assets/images/clientlogo/bangalore university.png'
import kridlLogo from '../assets/images/clientlogo/kridl.png'
import niasLogo from '../assets/images/clientlogo/National_Institute_of_Advanced_Studies_Logo.png'

const milestones = [
  { year:'2012', event:'A1 Construction founded in Bengaluru with a focus on government and institutional projects.' },
  { year:'2014', event:'First major government contract - BBMP civil infrastructure works across Bengaluru.' },
  { year:'2016', event:'Empanelled with South Western Railway for station infrastructure development.' },
  { year:'2018', event:'Expanded to healthcare sector - first BBMP hospital project commenced.' },
  { year:'2020', event:'Workforce grew to 300+, expanded operations across Karnataka.' },
  { year:'2022', event:'Completed Dr Puneeth Rajkumar Hospital - a landmark healthcare project.' },
  { year:'2024', event:'500+ workforce, Rs500Cr+ total project value, 100+ projects delivered.' },
]

const values = [
  { icon:'🏆', title:'Engineering Excellence', desc:'Technically rigorous approach - every project designed and executed to IS codes, with multi-stage quality control from groundwork to final handover.' },
  { icon:'✅', title:'Quality Assurance', desc:'Structured QA processes including material testing, site audits, and third-party inspections at every project milestone.' },
  { icon:'🦺', title:'Safety First', desc:'Comprehensive HSE management - zero-accident commitment, daily safety briefings, and regulatory compliance across all sites.' },
  { icon:'🌿', title:'Sustainable Practices', desc:'Environmentally conscious construction methods, resource efficiency, and waste reduction embedded in our project methodology.' },
  { icon:'⏱', title:'Timely Delivery', desc:'Systematic scheduling, milestone tracking, and proactive risk management ensure on-time project completion and client satisfaction.' },
  { icon:'🤝', title:'Client Partnership', desc:'Transparent communication, regular updates, and complete post-handover support - we build long-term relationships, not just buildings.' },
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
  { Icon:TrendingUp, num:'Rs500Cr+', label:'Total Project Value' },
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

const philosophyPillars = [
  'Engineering Confidence',
  'Building Value',
  'Creating Legacy',
]

const lifecycleCapabilities = [
  'Project Planning & Development',
  'Construction Engineering',
  'Design Coordination',
  'Project Management Consultancy Support',
  'Infrastructure Execution',
  'Quality Management',
  'Contract Administration',
  'Commissioning & Handover',
]

const businessVerticals = [
  {
    title: 'Institutional Infrastructure',
    desc: 'Development of educational campuses, academic institutions, administrative facilities, research centres, and public service buildings designed to support knowledge creation and human capital development.',
  },
  {
    title: 'Healthcare Infrastructure',
    desc: 'Execution of advanced healthcare facilities, referral hospitals, specialty medical institutions, diagnostic centres, and healthcare support infrastructure that contribute to improved public health outcomes.',
  },
  {
    title: 'Commercial Infrastructure',
    desc: 'Construction of commercial complexes, mixed-use developments, office facilities, retail spaces, and business environments designed to meet contemporary operational requirements.',
  },
  {
    title: 'Industrial Infrastructure',
    desc: 'Development of warehouses, storage facilities, logistics infrastructure, utility buildings, processing units, and industrial support facilities that enhance supply chain efficiency and industrial productivity.',
  },
  {
    title: 'Urban Infrastructure',
    desc: 'Implementation of integrated urban development projects including roads, drainage networks, public amenities, utility systems, and civic infrastructure supporting sustainable urban growth.',
  },
]

const engineeringExcellence = [
  {
    title: 'Integrated Project Delivery',
    desc: 'Our project delivery model is structured around recognized engineering and construction management principles that promote predictability, efficiency, and quality throughout the project lifecycle.',
  },
  {
    title: 'Engineering Management',
    desc: 'Comprehensive review and coordination of multidisciplinary engineering systems to optimize constructability, performance, and lifecycle efficiency.',
  },
  {
    title: 'Construction Management',
    desc: 'Application of systematic planning, resource optimization, productivity monitoring, and execution control mechanisms to achieve project objectives.',
  },
  {
    title: 'Project Controls',
    desc: 'Implementation of advanced monitoring frameworks encompassing schedule management, cost control, progress measurement, risk management, and performance reporting.',
  },
  {
    title: 'Technical Governance',
    desc: 'Structured oversight of engineering standards, statutory compliance requirements, quality procedures, and operational protocols.',
  },
]

const qualityFramework = [
  'Quality Planning & Assurance',
  'Material Compliance Verification',
  'Method Statement Implementation',
  'Inspection & Test Planning',
  'Process Audits & Surveillance',
  'Non-Conformance Management',
  'Continuous Improvement Program',
]

const hsePrinciples = [
  'Zero Incident Culture',
  'Risk-Based Safety Management',
  'Environmental Protection Initiatives',
  'Workforce Health & Wellness Programs',
  'Regulatory Compliance Excellence',
  'Sustainable Construction Practices',
]

const humanCapitalPrinciples = [
  'Professional Development',
  'Technical Competency Enhancement',
  'Collaborative Leadership',
  'Innovation & Knowledge Sharing',
  'Performance Excellence',
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

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimatedSection>
              <SectionLabel>Our Story</SectionLabel>
              <SectionTitle>Infrastructure Built on Integrity</SectionTitle>
              <SectionRule />
              <div className="space-y-4 text-gray-500 text-[15px] leading-relaxed">
                <p>A1 Construction was founded in 2012 in Bengaluru with a clear mission: to deliver high-quality infrastructure that serves communities and stands the test of time. From humble beginnings with a small team of engineers, we have grown into one of Karnataka&apos;s trusted construction firms.</p>
                <p>Our expertise spans institutional buildings, healthcare facilities, educational campuses, railway infrastructure, and urban development projects. We have had the privilege of working with leading government bodies including the BBMP, PWD Karnataka, South Western Railway, and Karnataka Housing Board.</p>
                <p>Headquartered in Nagarabhavi, Bengaluru, our team of 500+ skilled professionals brings the same dedication to a Rs50 lakh civil works as to a Rs100 crore hospital project. Every project is personal to us because we understand that what we build becomes part of people&apos;s lives.</p>
              </div>

              <div className="mt-8 p-5 bg-light rounded-xl border-l-4 border-blue-brand">
                <p className="text-navy font-semibold text-sm italic">"Our purpose is to build infrastructure that creates lasting value for communities, delivered with the engineering precision and project management discipline that every client deserves."</p>
                <p className="text-gray-400 text-xs mt-2">- Managing Director, A1 Construction</p>
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
                <p className="text-white/50 text-sm leading-relaxed">#352/32, 1st Floor, 3rd Block<br />Nagarabhavi 2nd Stage<br />Bangalore - 560072, Karnataka</p>
                <div className="flex flex-col gap-1.5 mt-4">
                  <a href="tel:+919845370474" className="text-blue-brand text-sm hover:text-blue-dark transition-colors">+91 9845370474</a>
                  <a href="mailto:info@a1construction.co.in" className="text-blue-brand text-sm hover:text-blue-dark transition-colors">info@a1construction.co.in</a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#f4f7fb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="relative rounded-[30px] overflow-hidden bg-[linear-gradient(135deg,#0f1728_0%,#14233d_52%,#1b4f8f_100%)] px-6 py-10 sm:px-10 lg:px-14 lg:py-16 text-white">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
                  backgroundSize: '26px 26px',
                }}
              />
              <div className="absolute -right-24 top-8 w-72 h-72 rounded-full bg-blue-brand/25 blur-3xl" />
              <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
                <div>
                  
                  <h2 className="font-montserrat font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.04] tracking-tight mt-4">Our Organizational Philosophy</h2>
                  <p className="text-blue-50 text-xl sm:text-2xl font-semibold mt-4">Building Beyond Structures</p>
                  <p className="text-white/72 text-base sm:text-lg leading-relaxed max-w-2xl mt-6">
                    At A1 Construction, infrastructure development is not merely the process of constructing buildings with concrete and steel. It is the strategic creation of assets that influence economic productivity, social advancement, long-term sustainability, communities thrive, and future generations prosper.
                  </p>
                  <p className="text-white/58 text-sm sm:text-[15px] leading-relaxed max-w-2xl mt-4">
                    Every project is approached through a lifecycle-oriented perspective, ensuring that engineering decisions, construction methodologies, and operational considerations collectively contribute to enhanced asset performance and stakeholder value.
                  </p>
                  <p className="text-white/58 text-sm sm:text-[15px] leading-relaxed max-w-2xl mt-4">
                    This philosophy has enabled us to establish a reputation for reliability, professionalism, and technical excellence across diverse project sectors.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  {philosophyPillars.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/12 bg-white/8 backdrop-blur-sm px-5 py-5">
                      <div className="text-[10px] font-bold uppercase tracking-[3px] text-blue-100/70 mb-2 font-inter">0{index + 1}</div>
                      <div className="font-montserrat font-bold text-xl leading-tight">{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
           
            <SectionTitle center>Vision & Mission</SectionTitle>
            <SectionRule center />
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="h-full rounded-[28px] border border-gray-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-7 sm:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-blue-brand/10 flex items-center justify-center mb-5">
                  <Target size={22} className="text-blue-brand" />
                </div>
                <div className="text-[11px] uppercase tracking-[3px] text-blue-brand font-bold font-inter mb-2">Vision</div>
                <h3 className="font-montserrat font-black text-navy text-2xl leading-tight mb-4">Recognition built on innovation, excellence, and national impact</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  To be recognized among India&apos;s most respected infrastructure development organizations, distinguished by engineering innovation, operational excellence, sustainable practices, and the successful delivery of nationally significant projects that create lasting societal impact.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="delay-150">
              <div className="h-full rounded-[28px] overflow-hidden bg-navy text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                <div className="px-7 py-8 sm:px-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                    <Compass size={22} className="text-blue-brand" />
                  </div>
                  <div className="text-[11px] uppercase tracking-[3px] text-blue-brand font-bold font-inter mb-2">Mission</div>
                  <h3 className="font-montserrat font-black text-2xl leading-tight mb-4">Deliver high-quality infrastructure with long-term value at the center</h3>
                  <p className="text-white/68 text-sm leading-relaxed mb-5">
                    To deliver high-quality infrastructure solutions through engineering-driven project execution, technological advancement, operational excellence, professional integrity, sustainable development practices, and customer-centric service delivery while creating long-term value for clients, stakeholders, employees, and society.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Engineering-driven execution', 'Technological advancement', 'Operational excellence', 'Professional integrity', 'Sustainable practices', 'Customer-centric delivery'].map(item => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/84">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
            <AnimatedSection>
             
              <SectionTitle>Who We Are</SectionTitle>
              <SectionRule />
              <p className="text-gray-500 text-[15px] leading-relaxed max-w-xl">
                A1 Construction operates as an integrated engineering and construction organization with capabilities spanning the entire project lifecycle. Our multidisciplinary approach ensures seamless integration between engineering design, construction execution, stakeholder management, and operational objectives.
              </p>
            </AnimatedSection>

            <AnimatedSection className="delay-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lifecycleCapabilities.map(item => (
                  <div key={item} className="group rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm hover:shadow-md hover:border-blue-brand/30 hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                        <Building2 size={18} className="text-blue-brand" />
                      </div>
                      <div className="text-navy text-sm font-medium leading-relaxed">{item}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            
            <SectionTitle>Core Business Verticals</SectionTitle>
            <SectionRule />
            <p className="text-gray-500 text-sm mt-4 max-w-3xl">
              Sector-specific infrastructure expertise shaped around institutional value, operational performance, and future-ready development.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {businessVerticals.map((item, index) => (
              <AnimatedSection key={item.title}>
                <div className="h-full rounded-[24px] border border-gray-100 bg-light p-5 hover:border-blue-brand/30 hover:shadow-lg transition-all duration-300">
                  <div className="font-montserrat font-black text-blue-brand text-2xl mb-4">{String(index + 1).padStart(2, '0')}</div>
                  <h3 className="font-poppins font-semibold text-navy text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            
            <SectionTitle light center>Engineering Excellence</SectionTitle>
            <SectionRule center />
            <p className="text-white/55 text-sm mt-4 max-w-3xl mx-auto">
              Our project delivery model is structured around internationally recognized engineering and construction management principles that promote predictability, efficiency, and quality throughout the project lifecycle.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {engineeringExcellence.map(item => (
              <AnimatedSection key={item.title}>
                <div className="h-full rounded-[24px] border border-white/8 bg-white/[0.04] p-5 hover:bg-blue-brand/10 hover:border-blue-brand/25 transition-all duration-200">
                  <h3 className="font-poppins font-semibold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-white/45 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <AnimatedSection>
              <div className="rounded-[28px] bg-white border border-gray-100 p-7 sm:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-blue-brand/10 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} className="text-blue-brand" />
                </div>
                
                <h3 className="font-montserrat font-black text-navy text-3xl leading-tight mt-4 mb-4">Quality Philosophy</h3>
                <p className="text-navy font-semibold text-lg leading-relaxed">
                  Quality Is Not Inspected Into A Project. It Is Engineered Into Every Process.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mt-4">
                  Quality at A1 Construction is driven by a proactive management philosophy focused on prevention rather than correction. Our quality assurance framework incorporates systematic planning, inspection, testing, monitoring, and continual improvement throughout every phase of project delivery.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="delay-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                {qualityFramework.map(item => (
                  <div key={item} className="rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-blue-brand flex-shrink-0 mt-0.5" />
                      <span className="text-navy text-sm font-medium leading-relaxed">{item}</span>
                    </div>
                  </div>
                ))}
                <div className="sm:col-span-2 rounded-[24px] bg-navy px-6 py-6">
                  <p className="text-white/90 text-sm leading-relaxed px-3 py-3">
                    The result is infrastructure that consistently achieves superior standards of safety, functionality, reliability, and durability.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
         
            <SectionTitle center>Health, Safety, Environment & Human Capital</SectionTitle>
            <SectionRule center />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedSection>
              <div className="h-full rounded-[28px] bg-[linear-gradient(180deg,#102038_0%,#152a4b_100%)] p-7 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <HardHat size={22} className="text-blue-brand" />
                </div>
                <div className="text-[11px] uppercase tracking-[3px] text-blue-brand font-bold font-inter mb-2">Health, Safety & Environment</div>
                <h3 className="font-montserrat font-black text-white text-2xl leading-tight mb-4">A culture of responsibility</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  A1 Construction recognizes that sustainable project success is intrinsically linked to workforce wellbeing, environmental stewardship, and operational safety. Safety is not merely a compliance requirement, it is a core organizational value embedded within every activity we undertake.
                </p>
                <div className="flex flex-wrap gap-2">
                  {hsePrinciples.map(item => (
                    <span key={item} className="text-white rounded-full border border-white/50 bg-white/6 px-3 py-2  text-[11px] sm:text-xs font-medium text-white/92">{item}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="delay-150">
              <div className="h-full rounded-[28px] bg-white border border-gray-100 p-7 sm:p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="w-12 h-12 rounded-2xl bg-blue-brand/10 flex items-center justify-center mb-5">
                  <Users size={22} className="text-blue-brand" />
                </div>
                <div className="text-[11px] uppercase tracking-[3px] text-blue-brand font-bold font-inter mb-2">Human Capital</div>
                <h3 className="font-montserrat font-black text-navy text-2xl leading-tight mb-4">The foundation of our success lies in our people</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  A1 Construction is supported by a highly competent team of engineers, architects, project managers, technical specialists, supervisors, and skilled construction professionals possessing extensive experience across multiple infrastructure sectors.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {humanCapitalPrinciples.map(item => (
                    <div key={item} className="rounded-xl bg-light border border-gray-100 px-4 py-3 text-sm text-navy font-medium">{item}</div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionLabel>Our Journey</SectionLabel>
            <SectionTitle center>12 Years of Infrastructure Excellence</SectionTitle>
            <SectionRule center />
          </AnimatedSection>

          <div className="relative">
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
                    <div className="hidden md:flex w-4 h-4 bg-blue-brand rounded-full flex-shrink-0 mx-auto border-4 border-white shadow-md relative z-10" />
                    <div className="md:w-1/2" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <SectionLabel>Our Clients</SectionLabel>
            <SectionTitle center>Trusted by Leading Organizations</SectionTitle>
            <SectionRule center />
            <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">We are empanelled and approved by India&apos;s leading government departments, public sector undertakings, and institutional clients.</p>
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

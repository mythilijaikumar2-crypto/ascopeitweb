import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUpRaw from 'react-countup'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { Link } from 'react-router-dom'

// @ts-ignore
const CountUp = (CountUpRaw as any).default || CountUpRaw

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// Icons
import {
  FiCode,
  FiSmartphone,
  FiCloud,
  FiLayout,
  FiTrendingUp,
  FiLayers,
  FiShield,
  FiUsers,
  FiClock,
  FiArrowRight,
  FiGlobe,
  FiAward,
  FiBookOpen,
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiMonitor,
  FiTarget
} from 'react-icons/fi'
import { RiDoubleQuotesR } from 'react-icons/ri'

// Animation presets
import { fadeIn, staggerContainer, heroContainer, heroItem } from '../animations'

interface Industry {
  icon: React.ReactNode
  title: string
  desc: string
}

interface CaseStudy {
  title: string
  category: string
  stat: string
  statLabel: string
  desc: string
}

interface Award {
  icon: React.ReactNode
  title: string
  subtitle: string
}

interface FAQItem {
  q: string
  a: string
}

interface Insight {
  category: string
  date: string
  title: string
  desc: string
}

const Home: React.FC = () => {
  // Active states for interactive elements
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'database' | 'cloud'>('frontend')
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null)

  // Intersection observers for animation triggers
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [overviewRef, overviewInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Static/Mock Data representing premium corporate services
  const partners = ['Microsoft', 'IBM', 'TCS', 'Cognizant', 'Accenture']
  
  const stats = [
    { num: 180, suffix: '+', label: 'Projects Completed' },
    { num: 45, suffix: '+', label: 'Senior Developers' },
    { num: 99.8, suffix: '%', decimals: 1, label: 'Client Satisfaction' },
    { num: 12, suffix: '+', label: 'Global Industries' }
  ]

  const services = [
    {
      icon: <FiCode className="text-3xl text-primary" />,
      title: 'Custom Software Engineering',
      desc: 'High-performance, type-safe software platforms custom engineered to match your enterprise workflows.',
      path: '/services/custom-software'
    },
    {
      icon: <FiSmartphone className="text-3xl text-primary" />,
      title: 'Mobile App Architecture',
      desc: 'Stunning native and cross-platform mobile experiences for iOS and Android utilizing modern frameworks.',
      path: '/services/mobile-engineering'
    },
    {
      icon: <FiCloud className="text-3xl text-primary" />,
      title: 'Cloud & Infrastructure',
      desc: 'Kubernetes, AWS/GCP architecture, and secure CI/CD pipelines optimized for zero downtime.',
      path: '/services/cloud-devops'
    },
    {
      icon: <FiLayout className="text-3xl text-primary" />,
      title: 'Design System & UI/UX',
      desc: 'Luxury design tokens, responsive Figma libraries, and micro-interaction visual blueprints.',
      path: '/services/design-systems'
    },
    {
      icon: <FiTrendingUp className="text-3xl text-primary" />,
      title: 'Performance & Optimization',
      desc: 'Comprehensive code audits, Core Web Vitals optimizations, and database query tuning.',
      path: '/services/speed-optimization'
    },
    {
      icon: <FiLayers className="text-3xl text-primary" />,
      title: 'Enterprise IT Consulting',
      desc: 'Legacy codebase refactoring, security vulnerability audits, and expert technology roadmap design.',
      path: '/services/it-consulting'
    },
    {
      icon: <FiTarget className="text-3xl text-primary" />,
      title: 'Digital Marketing',
      desc: 'Performance marketing, SEO scaling, and organic customer acquisition.',
      path: '/services/digital-marketing'
    }
  ]

  const industries: Industry[] = [
    {
      icon: <FiGlobe className="text-2xl text-primary" />,
      title: 'FinTech & Banking',
      desc: 'PCI-compliant payment gateways, transaction auditing ledger logs, and microservices engines.'
    },
    {
      icon: <FiAward className="text-2xl text-primary" />,
      title: 'Healthcare Systems',
      desc: 'HIPAA-compliant patient record systems, secure clinical databases, and real-time alerts.'
    },
    {
      icon: <FiLayers className="text-2xl text-primary" />,
      title: 'Logistics & Supply Chain',
      desc: 'Fleet telemetry trackers, shipment route calculations, and warehouse scheduling indices.'
    },
    {
      icon: <FiMonitor className="text-2xl text-primary" /> as any, // fallback
      title: 'E-Commerce Platforms',
      desc: 'Global retail systems with complex cart states, localized tax engines, and checkout pipelines.'
    },
    {
      icon: <FiBookOpen className="text-2xl text-primary" />,
      title: 'EdTech Ecosystems',
      desc: 'Interactive distance learning databases, real-time video dashboards, and analytics trackers.'
    },
    {
      icon: <FiUsers className="text-2xl text-primary" />,
      title: 'SaaS Platforms',
      desc: 'Multi-tenant subscription architectures, webhook integrations, and client portal layers.'
    }
  ]

  const techStack = {
    frontend: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    backend: ['Node.js', 'Express.js', 'Go (Golang)', 'gRPC API', 'REST Schema', 'GraphQL'],
    database: ['PostgreSQL', 'Redis Cache', 'MongoDB', 'Supabase', 'Prisma ORM', 'DynamoDB'],
    cloud: ['Kubernetes', 'AWS VPC', 'Google Cloud', 'Docker Container', 'Terraform IaC', 'GitHub Actions']
  }

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Schema Alignment',
      desc: 'We map out user flows, detail system architecture blueprints, and design type schemas before coding.'
    },
    {
      step: '02',
      title: 'Prototyping & Design Systems',
      desc: 'We construct beautiful high-fidelity component layouts and align on typography, grids, and brand assets.'
    },
    {
      step: '03',
      title: 'Iterative Sprint Construction',
      desc: 'Feature construction happens in structured two-week sprints, complete with staging deploys and feedback.'
    },
    {
      step: '04',
      title: 'QA & Accessibility Audits',
      desc: 'Automated test suite validation, load checking, and manual accessibility audits check for robust operation.'
    },
    {
      step: '05',
      title: 'CI/CD Cloud Deployment',
      desc: 'Safe migration to hosting environments, establishing server metrics, and automatic backup routines.'
    }
  ]

  const values = [
    {
      icon: <FiShield className="text-2xl text-secondary" />,
      title: 'Enterprise-Grade Security',
      desc: 'Standardized security audits, static code analysis (SAST), encryption at rest/transit, and compliance.'
    },
    {
      icon: <FiLayers className="text-2xl text-secondary" />,
      title: 'Vastly Scalable Architecture',
      desc: 'Highly modular designs that decouple layouts, APIs, and state systems to allow rapid parallel development.'
    },
    {
      icon: <FiUsers className="text-2xl text-secondary" />,
      title: 'Senior Product Engineers',
      desc: 'Work directly with tech leads and seasoned developers. No junior translation layers or coordination delays.'
    },
    {
      icon: <FiClock className="text-2xl text-secondary" />,
      title: '24/7 Active Monitoring',
      desc: 'Proactive error logging, alert management, and automated monitoring to ensure near-zero disruption.'
    }
  ]

  const caseStudies: CaseStudy[] = [
    {
      title: 'FinVerse Core Ledger Redesign',
      category: 'FinTech Systems',
      stat: '99.99%',
      statLabel: 'Transactional Accuracy',
      desc: 'Redesigned core banking ledger tables, optimizing write speeds under heavy concurrency.'
    },
    {
      title: 'OmniScale Enterprise Portal',
      category: 'Cloud Architecture',
      stat: '-34%',
      statLabel: 'Server Overhead Saved',
      desc: 'Migrated monolithic database connections to Kubernetes clusters, automating load balancing.'
    },
    {
      title: 'CloudCore UI Design Engine',
      category: 'Frontend Products',
      stat: '100/100',
      statLabel: 'Perfect Web Vitals Score',
      desc: 'Built custom tailwind token packages and responsive codebases, maximizing SEO index metrics.'
    }
  ]

  const testimonials = [
    {
      quote: 'Ascope Tech completely restructured our legacy dashboard. Their attention to design details, performance metrics, and type-safety exceeded all our expectations.',
      author: 'Marcus Vance',
      role: 'CTO, OmniScale Inc.',
      initials: 'MV'
    },
    {
      quote: 'The custom mobile application Ascope Tech built has achieved a 99.9% crash-free rate. Their communication was flawless, and the timeline was met ahead of schedule.',
      author: 'Sarah Chen',
      role: 'Director of Product, FinVerse',
      initials: 'SC'
    },
    {
      quote: 'Their knowledge of React, Tailwind, and animation sequences is top-tier. Our customer conversion rate grew by 24% after the design system rollout.',
      author: 'Robert Sterling',
      role: 'VP of Engineering, CloudCore',
      initials: 'RS'
    }
  ]

  const cloudPartners = [
    { name: 'Amazon Web Services', badge: 'AWS Consulting Partner' },
    { name: 'Google Cloud Platform', badge: 'Cloud Solution Builder' },
    { name: 'Microsoft Azure', badge: 'Enterprise Silver Partner' },
    { name: 'GitHub Enterprise', badge: 'Advanced Workflow Builder' }
  ]

  const awards: Award[] = [
    { icon: <FiAward className="text-2xl text-primary" />, title: 'SOC 2 Type II Certified', subtitle: 'Verified Infrastructure Security' },
    { icon: <FiShield className="text-2xl text-primary" />, title: 'ISO 27001 Standard', subtitle: 'Global Data Compliance Compliant' },
    { icon: <FiUsers className="text-2xl text-primary" />, title: 'Top Dev Consulting Hub', subtitle: 'Ranked by Enterprise Tech Leaders' }
  ]

  const globalHubs = [
    { city: 'San Francisco, US', role: 'Headquarters & Architecture' },
    { city: 'London, UK', role: 'Solutions & Delivery' },
    { city: 'Chennai, India', role: 'Global Tech Hub' }
  ]

  const insights: Insight[] = [
    {
      category: 'Engineering',
      date: 'June 24, 2026',
      title: 'Optimizing PostgreSQL Ledger Systems under high Concurrency',
      desc: 'How Ascope Tech tuned indexing scopes and connection pools to eliminate query bottlenecks.'
    },
    {
      category: 'Frontend Architecture',
      date: 'May 18, 2026',
      title: 'Enterprise Design Token Orchestration with React 19',
      desc: 'Establishing strict, type-safe visual rules across multiple decoupled SaaS applications.'
    },
    {
      category: 'DevOps',
      date: 'April 02, 2026',
      title: 'Automated CI/CD rollback protocols for zero-downtime microservices',
      desc: 'Implementing reliable deployment policies using Kubernetes ingress selectors.'
    }
  ]

  const faqs: FAQItem[] = [
    {
      q: 'How does Ascope Tech ensure code security and SOC2 compliance?',
      a: 'We implement automated static code analysis (SAST) in all pipeline branches, enforce strict PR validation review workflows, and compile security audits regularly.'
    },
    {
      q: 'Can you work with existing in-house enterprise engineering teams?',
      a: 'Absolutely. We regularly integrate as specialized technical squads focusing on architectural redesigns, cloud migrations, or performance profiling.'
    },
    {
      q: 'What is your operational model for remote communication?',
      a: 'We work asynchronously using structured Jira boards, GitHub logs, Slack channels, and daily stand-up summaries to fit global timezone boundaries.'
    },
    {
      q: 'Do you charge flat rates or hourly sprint scopes?',
      a: 'We offer flexible retainer models mapped to two-week engineering sprints or custom fixed-price solutions based on pre-defined technical specs.'
    }
  ]

  const toggleFaq = (idx: number) => {
    setFaqOpenIdx(faqOpenIdx === idx ? null : idx)
  }

  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* Background Decorative Glow Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float"></div>
      <div className="glow-orb w-[500px] h-[500px] bg-accent/20 top-[60vh] -right-48 animate-float-delayed"></div>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 space-y-8 text-left"
            >
              <motion.div
                variants={heroItem}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-softLight/60 border border-accent/30 text-xs font-semibold text-primary font-heading uppercase tracking-wider"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Next-Gen Product Engineering
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
              >
                Engineering Premium <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Software Architectures
                </span> <br />
                for Digital Leaders
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="text-base sm:text-lg text-secondaryText max-w-2xl font-sans leading-relaxed"
              >
                Ascope Tech builds high-availability enterprise services, custom UI design tokens, and next-generation web/mobile platforms engineered to scale seamlessly.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="btn-primary flex items-center gap-2">
                  <span>Start Your Project</span>
                  <FiArrowRight />
                </Link>
                <Link to="/services" className="btn-secondary">
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Interactive Mockup / Graphic */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-brand-gradient p-[1px] shadow-premium overflow-hidden"
              >
                <div className="w-full h-full bg-white rounded-3xl p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="text-xs font-semibold text-secondaryText font-heading uppercase tracking-wide">
                      Ascope Engine v2.4
                    </span>
                  </div>

                  <div className="flex-grow flex flex-col justify-center space-y-4 my-6">
                    <div className="flex items-center gap-3 p-3 bg-slate-50/40 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-softLight flex items-center justify-center">
                        <FiCode className="text-primary text-xl" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-dark">Clean TypeScript Modules</p>
                        <p className="text-[10px] text-secondaryText">99.8% Test Coverage</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50/40 rounded-xl border border-slate-100 transform translate-x-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                        <FiCloud className="text-emerald-500 text-xl" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-dark">Auto Scaling Clusters</p>
                        <p className="text-[10px] text-secondaryText">Zero Downtime Strategy</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50/40 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <FiLayout className="text-primary text-xl" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-dark">Custom Design Tokens</p>
                        <p className="text-[10px] text-secondaryText">Dynamic Responsive Core</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[10px] text-secondaryText">
                    <span>Active Branches: 4</span>
                    <span className="text-emerald-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Sync Complete
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. TRUSTED BY LOGOBAR ================= */}
      <section className="py-10 border-y border-slate-100 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-heading font-semibold uppercase tracking-widest text-secondaryText mb-8">
            TRUSTED BY SOFTWARE ENGINEERING TEAMS GLOBALLY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            {partners.map((partner) => (
              <span
                key={partner}
                className="font-heading font-extrabold text-xl md:text-2xl text-slate-400 hover:text-primary transition-colors duration-300 cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. COMPANY STATISTICS ================= */}
      <section
        ref={statsRef}
        className="py-16 md:py-24 bg-brand-gradient text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-primary/20 backdrop-blur-[1px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 text-center">
                <div className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
                  {statsInView ? (
                    <CountUp
                      start={0}
                      end={stat.num}
                      decimals={stat.decimals || 0}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <div className="text-xs sm:text-sm font-heading font-medium text-white/80 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. COMPANY OVERVIEW ================= */}
      <section ref={overviewRef} className="py-20 md:py-32 bg-white/30 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={overviewInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary px-2.5 py-0.5 rounded bg-softLight font-heading">
                About Ascope Tech
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight leading-tight">
                An Enterprise Software Engineering Hub built by senior architects.
              </h2>
              <p className="text-secondaryText font-sans leading-relaxed">
                At Ascope Tech, we operate without communication layers. You collaborate directly with tech leads and seasoned developers. We build robust React layouts, high-concurrency Go microservices, and automated Kubernetes cloud pipelines engineered for performance.
              </p>
              <div className="space-y-4">
                {[
                  'Flat developer structure (zero coordination layers).',
                  'Rigid type safety with 99.8% unit test metrics.',
                  'SOC2 compliance ready configurations.'
                ].map((point, idx) => (
                  <div key={idx} className="flex gap-3 items-center text-sm font-medium text-dark font-sans">
                    <div className="w-5 h-5 rounded-full bg-softLight text-primary flex items-center justify-center shrink-0">
                      <FiCheck className="text-xs" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={overviewInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 flex justify-center"
            >
              <div className="glass-card p-8 bg-white max-w-md w-full shadow-premium border border-slate-100 text-left space-y-6">
                <h3 className="font-heading font-extrabold text-dark text-lg border-b border-slate-100 pb-3">
                  Pillars of Technical Excellence
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'SOLID Architectures', desc: 'Modular classes and decoupling patterns.' },
                    { title: 'Performance Profiling', desc: 'Auditing bundle payloads and database indexing.' },
                    { title: 'Quality Inspections', desc: 'CI pipelines validation checks on every branch commit.' }
                  ].map((pillar, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="font-heading font-bold text-primary text-sm">{pillar.title}</h4>
                      <p className="text-xs text-secondaryText font-sans">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 5. CORE SERVICES ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Enterprise Software Capabilities
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We design modular architectures, optimize performance indices, and implement flawless code.
            </p>
          </div>

          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`block ${idx === services.length - 1 ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
                <motion.div
                  variants={fadeIn('up', idx * 0.05)}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="glass-card p-8 flex flex-col text-left bg-white group hover:border-accent/40 transition-all duration-300 relative h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-softLight flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-colors duration-300">
                    <div className="group-hover:filter group-hover:brightness-[100] transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-secondaryText text-sm font-sans leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= 6. INDUSTRIES ================= */}
      <section className="py-20 md:py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Industries We Calibrate
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We design specialized workflows and data backends customized to compliance rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-card p-6 bg-white border border-slate-100 text-left hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-softLight flex items-center justify-center">
                    {ind.icon}
                  </div>
                  <h3 className="font-heading font-bold text-dark text-base">
                    {ind.title}
                  </h3>
                  <p className="text-secondaryText text-xs font-sans leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. TECHNOLOGY ECOSYSTEM ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Our Technology Ecosystem
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We focus on premium languages and frameworks that power performance and code scalability.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100/70 backdrop-blur rounded-xl max-w-lg mx-auto border border-slate-200/50">
            {(['frontend', 'backend', 'database', 'cloud'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-lg transition-colors capitalize ${
                  activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-secondaryText hover:text-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content list */}
          <div className="max-w-4xl mx-auto pt-6">
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {techStack[activeTab].map((tech) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-primary/20 text-center font-heading font-semibold text-xs text-dark transition-all duration-300"
                  >
                    {tech}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 8. DEVELOPMENT PROCESS ================= */}
      <section ref={processRef} className="py-20 md:py-32 bg-slate-50/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Our Development Process
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              How we execute projects from conceptual schema layout to final secure cloud deployments.
            </p>
          </div>

          <div className="relative overflow-hidden pt-8">
            {/* Visual connecting line */}
            <div className="hidden lg:block absolute top-[5.5rem] left-[10%] right-[10%] h-[2px] bg-slate-200 z-0">
              <motion.div
                initial={{ width: 0 }}
                animate={processInView ? { width: '100%' } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-full bg-brand-gradient"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="space-y-4 text-left lg:text-center group"
                >
                  <div className="flex lg:justify-center">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-100 text-slate-400 group-hover:border-primary group-hover:text-primary transition-all duration-300 flex items-center justify-center font-heading font-extrabold text-xl shadow-sm relative">
                      {step.step}
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-dark text-base group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-secondaryText text-xs font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. WHY CHOOSE ASCOPE TECH ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual element */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="glass-card w-full max-w-[420px] bg-white p-8 space-y-6 shadow-premium border border-slate-100 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full filter blur-xl pointer-events-none"></div>
                <h4 className="font-heading font-extrabold text-dark text-lg border-b border-slate-100 pb-3">
                  Engineering Quality Metres
                </h4>
                <div className="space-y-4 text-left">
                  {[
                    { label: 'Type Safety Coverage', val: '100%' },
                    { label: 'Production Uptime Rate', val: '99.99%' },
                    { label: 'Core Web Vitals Pass Rate', val: 'Perfect 100/100' },
                    { label: 'Standard Code Security Compliance', val: '100%' }
                  ].map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-secondaryText font-sans">{stat.label}</span>
                      <span className="font-heading font-bold text-primary">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why points */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary px-2.5 py-0.5 rounded bg-softLight font-heading">
                  Why Ascope Tech
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight leading-tight">
                  High-Availability Product Engineering
                </h2>
                <p className="text-secondaryText font-sans">
                  Unlike conventional agencies that outsource or build monolithic MVPs, Ascope Tech crafts clean-coded, high-performance systems with strict focus on documentation integrity and scalability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((val, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-softLight flex items-center justify-center">
                        {val.icon}
                      </div>
                      <h4 className="font-heading font-bold text-dark text-base">
                        {val.title}
                      </h4>
                    </div>
                    <p className="text-secondaryText text-sm font-sans pl-11 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. FEATURED CASE STUDIES ================= */}
      <section className="py-20 md:py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              Explore concrete engineering milestones and business outcomes achieved for our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass-card p-6 sm:p-8 bg-white border border-slate-100 text-left hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded bg-softLight">
                    {caseStudy.category}
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-dark">
                    {caseStudy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondaryText font-sans leading-relaxed">
                    {caseStudy.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-heading font-extrabold text-primary">{caseStudy.stat}</p>
                    <p className="text-[10px] uppercase font-bold text-secondaryText font-sans">{caseStudy.statLabel}</p>
                  </div>
                  <Link
                    to="/portfolio"
                    className="w-10 h-10 rounded-full border border-slate-200 hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
                  >
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 11. CLIENT TESTIMONIALS ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              What Engineering Leaders Say
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              Find out how Ascope Tech delivers reliable partnerships for engineering leaders.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              spaceBetween={40}
              slidesPerView={1}
              className="pb-16"
            >
              {testimonials.map((test, idx) => (
                <SwiperSlide key={idx}>
                  <div className="glass-card p-8 md:p-12 bg-white text-left relative overflow-hidden border border-slate-100 shadow-premium">
                    <RiDoubleQuotesR className="absolute top-6 right-6 text-7xl text-slate-100 pointer-events-none" />
                    <div className="space-y-6 relative z-10">
                      <p className="text-dark font-sans text-base sm:text-lg italic leading-relaxed">
                        "{test.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-gradient text-white font-heading font-extrabold flex items-center justify-center text-sm">
                          {test.initials}
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-dark text-sm sm:text-base">
                            {test.author}
                          </h4>
                          <p className="text-secondaryText text-xs sm:text-sm">
                            {test.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ================= 12. TECHNOLOGY PARTNERS ================= */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-dark tracking-tight">
              Ecosystem & Cloud Partners
            </h2>
            <p className="text-secondaryText text-xs sm:text-sm font-sans">
              We align with leading global cloud platforms to provision robust hosting environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {cloudPartners.map((part, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-center space-y-2 hover:border-primary/20 transition-all duration-300"
              >
                <p className="font-heading font-extrabold text-sm text-dark">{part.name}</p>
                <p className="text-[10px] font-sans font-bold text-primary uppercase tracking-wider">{part.badge}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 13. AWARDS & CERTIFICATIONS ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Compliance & Certifications
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We undergo constant verification to ensure absolute security and operation compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm text-center flex flex-col items-center space-y-4 hover:shadow-premium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-softLight flex items-center justify-center">
                  {award.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-dark text-sm">{award.title}</h4>
                  <p className="text-xs text-secondaryText font-sans">{award.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 14. GLOBAL PRESENCE ================= */}
      <section className="py-20 md:py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Our Global Operations
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We sync across timezone borders, serving enterprise accounts from global office hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
            {globalHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 text-primary">
                  <FiMapPin className="text-lg" />
                  <h4 className="font-heading font-extrabold text-dark text-sm">{hub.city}</h4>
                </div>
                <p className="text-xs text-secondaryText font-sans pl-6">{hub.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 15. LATEST INSIGHTS ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Latest Technical Insights
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              Read publication logs covering database indexing, caching scopes, and design systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {insights.map((item, idx) => (
              <div
                key={idx}
                className="glass-card p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-premium hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-sans font-bold text-secondaryText uppercase tracking-wider">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-dark text-base hover:text-primary transition-colors cursor-pointer leading-snug">
                    <Link to="/blog">{item.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-secondaryText font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    to="/blog"
                    className="text-primary text-xs font-heading font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:text-secondary transition-colors"
                  >
                    <span>Read Article</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 16. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-20 md:py-32 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              Find answers to structural enterprise developer policies and retainer models.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-6 flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-heading font-extrabold text-sm sm:text-base text-dark pr-4">
                      {faq.q}
                    </span>
                    <span className="text-secondaryText shrink-0">
                      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-secondaryText leading-relaxed border-t border-slate-50 font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= 17. CONSULTATION CTA ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-brand-gradient p-1 rounded-3xl shadow-premium">
            <div className="bg-white p-8 md:p-16 rounded-[22px] space-y-8">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-dark tracking-tight leading-tight max-w-2xl mx-auto">
                Ready to Build Your Product Roadmap?
              </h2>
              <p className="text-secondaryText font-sans max-w-xl mx-auto leading-relaxed">
                Discuss your engineering requirements directly with a Senior Software Architect and get a complete architectural schema and estimate.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                  <span>Book a Strategy Call</span>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note: 18. Footer is rendered as a global wrapping template in MainLayout.tsx */}
    </div>
  )
}

export default Home

import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCode,
  FiSmartphone,
  FiCloud,
  FiLayout,
  FiTrendingUp,
  FiLayers,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiCpu,
  FiShield,
  FiTarget
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'

interface ServiceData {
  id: string
  icon: React.ReactNode
  title: string
  dept: string
  subtitle: string
  details: string
  features: string[]
  tech: string[]
  metrics: { val: string; label: string }[]
}

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>()

  const servicesData: Record<string, ServiceData> = {
    'custom-software': {
      id: 'custom-software',
      icon: <FiCode className="text-3xl text-primary" />,
      title: 'Custom Software Engineering',
      dept: 'Enterprise Systems',
      subtitle: 'Type-safe, distributed backends custom built to power scaling operations.',
      details: 'We design, build, and support scalable software backends built to serve high concurrent traffic. From complex database indexing strategies in PostgreSQL to distributed messaging schemes in Go, our code enforces modular SOLID design rules with massive test coverage checks. Exception safety and predictable execution models are integrated from day one.',
      features: ['Event-driven backend services', 'Strict API schema definitions', 'Microservices architectures', 'PCI-compliant transactional ledger layers'],
      tech: ['Go (Golang)', 'Node.js', 'PostgreSQL', 'TypeScript', 'gRPC API', 'REST Schema'],
      metrics: [{ val: '99.99%', label: 'Systems Uptime Rate' }, { val: '< 10ms', label: 'Query Read Latency' }]
    },
    'mobile-engineering': {
      id: 'mobile-engineering',
      icon: <FiSmartphone className="text-3xl text-primary" />,
      title: 'Mobile App Architecture',
      dept: 'Frontend Products',
      subtitle: 'Premium native and cross-platform mobile apps targeting iOS and Android platforms.',
      details: 'We write pixel-perfect, interactive mobile layouts built to deliver smooth touch animations. Our apps prioritize local storage synchronization, strict biometric authentication, localized settings, offline caching networks, and continuous error telemetry monitoring to maintain optimal 99.9% crash-free session targets.',
      features: ['Native Swift & Kotlin setups', 'React Native cross-platform code', 'App Store and Play Store releases', 'Local SQL database caching'],
      tech: ['Swift', 'Kotlin', 'React Native', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand'],
      metrics: [{ val: '99.9%', label: 'Crash-Free Session Rate' }, { val: '60 FPS', label: 'Animation Speed Bounds' }]
    },
    'cloud-devops': {
      id: 'cloud-devops',
      icon: <FiCloud className="text-3xl text-primary" />,
      title: 'DevOps & Cloud Orchestration',
      dept: 'Infrastructure',
      subtitle: 'Zero-downtime microservices networks engineered with Kubernetes and Terraform IaC.',
      details: 'Eliminate manual server setup mistakes. We configure automatic resource autoscaling, load-balanced gateway routing, isolated VPC networks, and continuous lint checks inside automated CI/CD actions to scale cluster workloads cleanly.',
      features: ['Kubernetes cluster setups', 'Infrastructure-as-Code (Terraform)', 'CI/CD pipeline automation', 'Active Prometheus & Grafana alerts'],
      tech: ['Kubernetes', 'Docker Container', 'AWS VPC / GCP Cloud', 'Terraform IaC', 'GitHub Actions', 'Linux Shell scripts'],
      metrics: [{ val: '99.99%', label: 'Uptime SLA Metrics' }, { val: 'Zero', label: 'Manual Provisioning Errors' }]
    },
    'design-systems': {
      id: 'design-systems',
      icon: <FiLayout className="text-3xl text-primary" />,
      title: 'Design Systems & UI/UX',
      dept: 'User Interfaces',
      subtitle: 'Unified, highly reusable Figma components converted to responsive codebases.',
      details: 'Establish a single source of styling truth. We define color variables, spacing configurations, grids, typography presets, and accessibility labels to allow developers to build interfaces instantly with clean consistency and no styled redundancies.',
      features: ['Figma design token structures', 'Interactive component wireframes', 'Core accessibility evaluations', 'Dynamic tailwind configuration hooks'],
      tech: ['React.js', 'Tailwind CSS', 'Figma Libraries', 'Framer Motion', 'TypeScript', 'WCAG Audits'],
      metrics: [{ val: '100%', label: 'Reusable Code Elements' }, { val: 'WCAG AA', label: 'Accessibility Standards' }]
    },
    'speed-optimization': {
      id: 'speed-optimization',
      icon: <FiTrendingUp className="text-3xl text-primary" />,
      title: 'Performance & Speed Auditing',
      dept: 'Core Optimization',
      subtitle: 'Profiling browser execution times to hit top Lighthouse optimization margins.',
      details: 'Audit client and server bottlenecks. We reduce DOM reflows, optimize image payloads, cache network assets, configure tree-shaking, and tune slow SQL statements to ensure lightning-fast page loading and perfect performance metrics.',
      features: ['Core Web Vitals optimizations', 'Database query execution tuning', 'Asset optimization and tree-shaking', 'Dynamic CDN caches setting'],
      tech: ['Vite Bundler', 'Chrome DevTools profiling', 'Lighthouse testing scripts', 'PostgreSQL indexes', 'Redis Cache layers'],
      metrics: [{ val: '100/100', label: 'Target Lighthouse Index' }, { val: '-40%', label: 'Average Client Load Times' }]
    },
    'it-consulting': {
      id: 'it-consulting',
      icon: <FiLayers className="text-3xl text-primary" />,
      title: 'Enterprise Architecture Consulting',
      dept: 'Technical Roadmaps',
      subtitle: 'Legacy systems refactoring, security audits, SOC2 preparation, and code scanning.',
      details: 'Protect your codebase integrity. We scan structures for dependencies flaws, verify OWASP security vulnerabilities, align setups with SOC2 Type II requirements, optimize hosting overheads, and design future-proof systems architecture pathways.',
      features: ['Security and compliance scans', 'Cloud hosting cost optimization', 'Legacy codebase refactoring plans', 'OWASP vulnerability scans'],
      tech: ['ESLint & Oxlint scanners', 'Terraform IaC', 'SOC2 guidelines', 'Vulnerability audits', 'SQL injection checks'],
      metrics: [{ val: 'A+ Grade', label: 'Code Quality Rating' }, { val: '100%', label: 'SOC2 Ready Compliance' }]
    },
    'digital-marketing': {
      id: 'digital-marketing',
      icon: <FiTarget className="text-3xl text-primary" />,
      title: 'Digital Marketing & Growth',
      dept: 'Marketing Systems',
      subtitle: 'Performance marketing, SEO scaling, and organic client acquisition pipelines.',
      details: 'We engineer organic and paid marketing channels to drive customer acquisition. We construct optimized landing pages, establish data-driven SEO architectures, monitor search rank positions, design conversion rate pipelines, and set up marketing automation suites to scale enterprise reach.',
      features: ['SEO structural optimizations', 'Conversion funnel tracking', 'Paid acquisition analytics', 'Marketing automation configurations'],
      tech: ['Google Analytics', 'Semrush', 'Mailchimp', 'Next.js SEO', 'Meta Ads SDK', 'A/B Testing Tool'],
      metrics: [{ val: '+120%', label: 'Search Rank Growth' }, { val: '3.4%', label: 'Average Conversion Rate' }]
    }
  }

  const service = serviceId ? servicesData[serviceId] : null

  // If service key is invalid, redirect to Services overview page
  if (!service) {
    return <Navigate to="/services" replace />
  }

  return (
    <div className="relative w-full bg-background">
      {/* Background Glow Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float"></div>
      <div className="glow-orb w-[450px] h-[450px] bg-accent/20 top-[80vh] -right-48 animate-float-delayed"></div>

      {/* Back button container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-left">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-secondaryText hover:text-primary transition-colors font-heading font-semibold uppercase tracking-wider"
        >
          <FiArrowLeft />
          <span>Back to Capabilities</span>
        </Link>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-softLight/60 border border-accent/30 text-xs font-semibold text-primary font-heading uppercase tracking-wider"
          >
            <FiCpu />
            {service.dept}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <motion.h1
                variants={heroItem}
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-dark tracking-tight leading-tight"
              >
                {service.title}
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="text-base sm:text-lg md:text-xl text-primary font-heading font-medium"
              >
                {service.subtitle}
              </motion.p>
            </div>
            
            <motion.div
              variants={heroItem}
              className="lg:col-span-4 flex lg:justify-end"
            >
              <div className="w-16 h-16 rounded-2xl bg-softLight flex items-center justify-center text-3xl border border-accent/20">
                {service.icon}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= DETAILS & CHECKLIST ================= */}
      <section className="py-16 md:py-24 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-heading font-extrabold text-dark tracking-tight">
                Architectural Approach
              </h2>
              <p className="text-sm sm:text-base text-secondaryText leading-relaxed font-sans">
                {service.details}
              </p>
              
              {/* Stats/Metrics grid inside detail */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                {service.metrics.map((met, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-heading font-extrabold text-primary">{met.val}</p>
                    <p className="text-[10px] uppercase font-bold text-secondaryText font-sans tracking-wide">{met.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Checklist */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
              <h3 className="font-heading font-extrabold text-dark text-base border-b border-slate-100 pb-3">
                Core Deliverables
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-secondaryText font-sans">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full bg-softLight text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="text-xs" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY STACK ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-dark tracking-tight">
              Technology Stack Used
            </h2>
            <p className="text-secondaryText text-xs sm:text-sm font-sans leading-relaxed">
              We leverage strict type constraints and optimal execution packages specifically for this capability:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {service.tech.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider rounded-xl bg-white border border-slate-100 shadow-sm text-dark hover:border-primary/20 transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="w-12 h-12 rounded-full bg-softLight flex items-center justify-center mx-auto text-primary text-xl">
            <FiShield />
          </div>
          <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
            Ready to integrate {service.title}?
          </h2>
          <p className="text-secondaryText font-sans max-w-xl mx-auto leading-relaxed">
            Collaborate directly with our senior systems architects to draft your integration schema, timeline bounds, and project cost estimates.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              <span>Book Strategy Call</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail

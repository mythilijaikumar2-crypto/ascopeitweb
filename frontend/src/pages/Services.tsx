import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCode,
  FiSmartphone,
  FiCloud,
  FiLayout,
  FiTrendingUp,
  FiLayers,
  FiCheck,
  FiSettings,
  FiServer,
  FiShield,
  FiTerminal,
  FiX,
  FiArrowRight,
  FiTarget
} from 'react-icons/fi'
import { fadeIn, staggerContainer, heroContainer, heroItem } from '../animations'

interface Capability {
  icon: React.ReactNode
  title: string
  desc: string
  details: string
  features: string[]
}

const Services: React.FC = () => {
  // Modal state for selected service details
  const [selectedService, setSelectedService] = useState<Capability | null>(null)

  const capabilities: Capability[] = [
    {
      icon: <FiCode className="text-3xl text-primary" />,
      title: 'Custom Software Engineering',
      desc: 'Type-safe enterprise software platforms custom engineered using modern backend patterns.',
      details: 'We engineer high-throughput systems, custom transactional engines, and data pipeline flows. Utilizing modular design patterns (such as SOLID principles) and rigid type checks (TypeScript and Go compiler enforcement), we ensure production exception rates stay below 0.05%. Our services include microservices aggregation, REST/gRPC schema coordination, and database query tuning.',
      features: ['Event-driven backend services', 'Strict API schema definitions', 'Microservices architectures']
    },
    {
      icon: <FiSmartphone className="text-3xl text-primary" />,
      title: 'Mobile App Development',
      desc: 'Native and cross-platform mobile apps for iOS and Android built for seamless touch interactions.',
      details: 'Ascope Tech builds premium native (Swift, Kotlin) and hybrid (React Native) mobile apps. We prioritize lightweight state management, custom animation flows, secure local storage, local databases, biometric identity check integrations, and background syncing. We oversee the entire App Store and Play Store approval processes.',
      features: ['Native Swift & Kotlin setups', 'React Native cross-platform code', 'App Store and Play Store releases']
    },
    {
      icon: <FiCloud className="text-3xl text-primary" />,
      title: 'DevOps & Cloud Orchestration',
      desc: 'Zero-downtime deployments utilizing secure cluster management and automated deployments.',
      details: 'We provision cloud resources using Terraform IaC blueprints to eliminate human deployment errors. Our services include Kubernetes scaling configurations, Docker packaging validations, Prometheus metrics monitoring, custom Grafana alerts, and continuous integration pipeline automation via GitHub Actions.',
      features: ['Kubernetes & Docker cluster setups', 'Infrastructure-as-Code (Terraform)', 'CI/CD deployment pipelines']
    },
    {
      icon: <FiLayout className="text-3xl text-primary" />,
      title: 'Design Systems & UI/UX',
      desc: 'Premium Figma design tokens converted into pixel-perfect, accessible component systems.',
      details: 'We translate high-fidelity Figma components into structured, semantic CSS layouts. By defining central design tokens (color variables, spacing matrix, typography tokens), we ensure full code reuse and visual uniformity across multiple products. Accessibility auditing (WCAG 2.2 compliance) is integrated by default.',
      features: ['Figma design token structures', 'Interactive component wireframes', 'Core accessibility evaluations']
    },
    {
      icon: <FiTrendingUp className="text-3xl text-primary" />,
      title: 'Performance & Speed Auditing',
      desc: 'Comprehensive performance profiling to ensure lightning-fast browser load times.',
      details: 'We audit browser rendering pipelines to solve slow layouts, reflow blocks, and asset load delays. We profile LCP (Largest Contentful Paint), INP (Interaction to Next Paint), and CLS (Cumulative Layout Shift) scores to achieve 90-100 score targets on Lighthouse. This covers bundle tree-shaking, data compression, and image sizing optimizations.',
      features: ['Core Web Vitals optimizations', 'Database query execution tuning', 'Asset optimization and tree-shaking']
    },
    {
      icon: <FiLayers className="text-3xl text-primary" />,
      title: 'Enterprise Architecture Consulting',
      desc: 'Auditing legacy software platforms, mapping tech upgrades, and consulting on scale.',
      details: 'We evaluate codebases for scalability blocks, third-party dependency vulnerabilities, and cost efficiencies. We assist client architectures in SOC2 preparation, compliance alignments, legacy refactoring schedules, and database indexing revisions to support growth and reduce server costs.',
      features: ['Security and compliance scans', 'Cloud hosting cost optimization', 'Legacy codebase refactoring plans']
    },
    {
      icon: <FiTarget className="text-3xl text-primary" />,
      title: 'Digital Marketing',
      desc: 'Performance marketing, SEO scaling, and organic acquisition.',
      details: 'We engineer organic and paid marketing channels to drive customer acquisition. We construct optimized landing pages, establish data-driven SEO architectures, monitor search rank positions, design conversion rate pipelines, and set up marketing automation suites to scale enterprise reach.',
      features: ['SEO structural optimizations', 'Conversion funnel tracking', 'Paid acquisition analytics', 'Marketing automation configurations']
    }
  ]

  const techCategories = [
    {
      title: 'Frontend Systems',
      techs: ['React.js', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Backend Engineering',
      techs: ['Go (Golang)', 'Node.js', 'Express', 'Python', 'RESTful APIs', 'gRPC & GraphQL']
    },
    {
      title: 'Cloud & Infrastructure',
      techs: ['AWS & GCP', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Vercel & Netlify']
    },
    {
      title: 'Database & Storage',
      techs: ['PostgreSQL', 'MongoDB', 'Redis Caching', 'Cloud Firestore', 'MySQL', 'Prisma ORM']
    }
  ]

  return (
    <div className="relative w-full bg-background">
      {/* Background Decorative Glow Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float"></div>
      <div className="glow-orb w-[450px] h-[450px] bg-accent/20 top-[100vh] -right-48 animate-float-delayed"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-softLight/60 border border-accent/30 text-xs font-semibold text-primary font-heading uppercase tracking-wider"
          >
            <FiSettings />
            Our Capabilities
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Enterprise Software & <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cloud Solutions
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            We deploy secure application frameworks, configure auto-scaling cloud clusters, and develop clean responsive interfaces for scaling technology leaders. Click any capability below to read its technical specifications.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= CAPABILITIES GRID ================= */}
      <section className="py-16 md:py-24 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn('up', idx * 0.05)}
                whileHover={{ y: -8, scale: 1.01 }}
                onClick={() => setSelectedService(cap)}
                className="glass-card p-8 flex flex-col text-left group hover:border-primary/20 transition-all duration-300 relative cursor-pointer bg-white"
              >
                <div className="w-14 h-14 rounded-xl bg-softLight flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-colors duration-300">
                  <div className="group-hover:filter group-hover:brightness-[100] transition-all duration-300">
                    {cap.icon}
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {cap.title}
                </h3>
                <p className="text-secondaryText text-sm font-sans leading-relaxed mb-6 flex-grow">
                  {cap.desc}
                </p>
                <ul className="space-y-2 border-t border-slate-100 pt-4 text-xs text-secondaryText font-sans">
                  {cap.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <FiCheck className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= TECH MATRIX ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Our Core Technology Stack
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We leverage modern language environments and server architectures to deliver optimal performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="glass-card p-6 border border-slate-100 text-left bg-white space-y-4">
                <h3 className="font-heading font-bold text-dark text-base border-b border-slate-100 pb-2">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-softLight/50 border border-accent/20 text-primary hover:bg-brand-gradient hover:text-white hover:border-transparent transition-all duration-200 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUALITY ASSURANCES & SLA ================= */}
      <section className="py-20 md:py-32 bg-white/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
                Written SLA & Quality Assurances
              </h2>
              <p className="text-secondaryText font-sans leading-relaxed">
                We believe enterprise projects require predictability and accountability. Ascope Tech backs all custom engineering contracts with strict service-level standards:
              </p>
              <div className="space-y-4">
                {[
                  { title: '99.9% Platform Availability', icon: <FiServer className="text-primary" /> },
                  { title: 'SOC2 & HIPAA Compliant Audits', icon: <FiShield className="text-primary" /> },
                  { title: 'Strict PR Code Lint Checks', icon: <FiTerminal className="text-primary" /> }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-softLight flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-heading font-bold text-dark text-sm sm:text-base">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* QA display cards */}
            <div className="lg:col-span-6 space-y-6">
              <div className="glass-card p-6 border border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h4 className="font-heading font-bold text-dark text-base">Code Quality Threshold</h4>
                  <p className="text-xs text-secondaryText font-sans mt-1">We maintain static analysis lint scores of A+.</p>
                </div>
                <span className="text-2xl font-heading font-extrabold text-primary">A+ Grade</span>
              </div>

              <div className="glass-card p-6 border border-slate-100 flex justify-between items-center bg-white">
                <div>
                  <h4 className="font-heading font-bold text-dark text-base">Unit & Integration Tests</h4>
                  <p className="text-xs text-secondaryText font-sans mt-1">Mandatory coverage threshold on core routes.</p>
                </div>
                <span className="text-2xl font-heading font-extrabold text-primary">90%+ Cover</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
            Need Bespoke Technical Integration?
          </h2>
          <p className="text-secondaryText font-sans max-w-2xl mx-auto">
            Discuss your system needs with our engineering leads. Get a complete design, timeline, and architectural estimation.
          </p>
          <div>
            <Link to="/contact" className="btn-primary">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ================= DETAILS MODAL OVERLAY ================= */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 max-h-[90vh] flex flex-col text-left"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-softLight flex items-center justify-center text-primary text-xl">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-dark">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondaryText hover:bg-slate-100 hover:text-dark transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                    Detailed Capability Overview
                  </h4>
                  <p className="text-sm text-secondaryText leading-relaxed font-sans">
                    {selectedService.details}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                    Core Action Milestones
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-secondaryText font-sans">
                    {selectedService.features.map((feat, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <FiCheck className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 border border-slate-200 text-xs font-heading font-bold rounded-lg hover:bg-slate-100 transition-all"
                >
                  Close
                </button>
                <Link
                  to="/contact"
                  className="btn-primary py-2 px-5 text-xs inline-flex items-center gap-2"
                >
                  <span>Book Consultation</span>
                  <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Services

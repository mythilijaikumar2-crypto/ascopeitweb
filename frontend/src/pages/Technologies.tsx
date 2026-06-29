import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCpu,
  FiLayout,
  FiServer,
  FiDatabase,
  FiArrowRight,
  FiShield,
  FiTrendingUp,
  FiTerminal
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'


interface TechItem {
  name: string
  desc: string
  useCase: string
  metrics: { label: string; val: string }[]
}

const Technologies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'cloud' | 'database'>('frontend')

  const tabOptions = [
    { id: 'frontend', name: 'Frontend', icon: <FiLayout className="text-lg" /> },
    { id: 'backend', name: 'Backend', icon: <FiCpu className="text-lg" /> },
    { id: 'cloud', name: 'Cloud & DevOps', icon: <FiServer className="text-lg" /> },
    { id: 'database', name: 'Databases', icon: <FiDatabase className="text-lg" /> }
  ] as const

  const techData: Record<'frontend' | 'backend' | 'cloud' | 'database', TechItem[]> = {
    frontend: [
      {
        name: 'React.js',
        desc: 'Component-driven interface engine. We build highly reusable UI elements, leverage React 19 capabilities, and optimize layouts.',
        useCase: 'Complex dashboards, customer portals, interactive designs.',
        metrics: [{ label: 'Render Uptime', val: '99.9%' }, { label: 'Speed Index', val: 'Sub-second' }]
      },
      {
        name: 'TypeScript',
        desc: 'Strict type validation to identify coding flaws during development, avoiding production exceptions.',
        useCase: 'Full-stack client-to-server data-model contract alignment.',
        metrics: [{ label: 'Safety Coverage', val: '100%' }, { label: 'Logical Errors', val: '0%' }]
      },
      {
        name: 'Tailwind CSS',
        desc: 'Sleek style compilation mapping brand layouts directly to design tokens, ensuring lightweight CSS bundles.',
        useCase: 'Responsive, highly custom design system implementation.',
        metrics: [{ label: 'Style Bloat', val: '0%' }, { label: 'Responsive Speed', val: 'Instantly' }]
      }
    ],
    backend: [
      {
        name: 'Go (Golang)',
        desc: 'Statically typed language compiled to machine code for optimized backend speed and concurrency execution.',
        useCase: 'High-traffic microservices, API aggregators, event streaming.',
        metrics: [{ label: 'Concurrency limit', val: 'Vast' }, { label: 'Memory Footprint', val: '< 15MB' }]
      },
      {
        name: 'Node.js',
        desc: 'Event-driven JavaScript runtime suitable for lightweight REST APIs, GraphQL handlers, and serverless scripts.',
        useCase: 'JSON API endpoints, real-time message sync, webhook handlers.',
        metrics: [{ label: 'Build Velocity', val: 'Fast' }, { label: 'Dev Time', val: 'Reduced' }]
      },
      {
        name: 'Python',
        desc: 'Data analysis and scripting. Used to deploy secure AI workflows and data-processing tasks.',
        useCase: 'Background processing, automated reporting, intelligence modules.',
        metrics: [{ label: 'Data Speed', val: 'Optimal' }, { label: 'Libraries count', val: 'Hundreds' }]
      }
    ],
    cloud: [
      {
        name: 'Kubernetes',
        desc: 'Automating cluster scaling and node failovers across cloud regions for reliable, zero-interruption service delivery.',
        useCase: 'Multi-region enterprise server clustering, auto-scaling grids.',
        metrics: [{ label: 'Uptime SLA', val: '99.99%' }, { label: 'Deploy Speed', val: '< 2 mins' }]
      },
      {
        name: 'AWS & GCP',
        desc: 'Provisioning load balancers, secure VPC networks, and serverless compute pipelines.',
        useCase: 'Secure hosting infrastructure, static media caching, cloud services.',
        metrics: [{ label: 'Availability Zones', val: 'Global' }, { label: 'SLA Level', val: 'Platinum' }]
      },
      {
        name: 'CI/CD Automation',
        desc: 'Continuous linting, automated testing suites, and immediate deployments configured through GitHub Actions.',
        useCase: 'Automating build pipelines to eliminate manual delivery errors.',
        metrics: [{ label: 'Code Checks', val: 'Immediate' }, { label: 'Release cycle', val: 'Agile' }]
      }
    ],
    database: [
      {
        name: 'PostgreSQL',
        desc: 'Relational database model supporting clean schemas, structured indexing, and ACID compliance.',
        useCase: 'Transaction records, identity systems, core data architecture.',
        metrics: [{ label: 'Data Safety', val: 'Strict' }, { label: 'Query Performance', val: '< 10ms' }]
      },
      {
        name: 'Redis',
        desc: 'Memory-cached database utilized to accelerate page load times by caching common API requests.',
        useCase: 'Session management, database query cache buffers.',
        metrics: [{ label: 'Query Latency', val: 'Sub-millisecond' }, { label: 'Throughput', val: '10k+/sec' }]
      },
      {
        name: 'Cloud Firestore',
        desc: 'Scalable NoSQL document store ensuring real-time client sync with clean security configurations.',
        useCase: 'Collaborative workspaces, live telemetry, dynamic page grids.',
        metrics: [{ label: 'Live Sync', val: 'Realtime' }, { label: 'Setup Speed', val: 'Instantly' }]
      }
    ]
  }

  const standards = [
    {
      title: 'Clean Coding & Lint Standards',
      desc: 'All branches must undergo type validation and ESLint/Oxlint rules before they can be merged.',
      icon: <FiTerminal className="text-secondary" />
    },
    {
      title: 'Continuous Infrastructure (IaC)',
      desc: 'We define cloud configs in Terraform to prevent human provisioning errors and support rapid environment cloning.',
      icon: <FiServer className="text-secondary" />
    },
    {
      title: 'SOC2 Security Auditing',
      desc: 'We follow OWASP guidelines to prevent SQL injections, cross-site scripts, and identity leaks.',
      icon: <FiShield className="text-secondary" />
    },
    {
      title: 'Performance-First Design',
      desc: 'Mandatory Core Web Vitals profiling targets score ranges of 90-100 on mobile devices.',
      icon: <FiTrendingUp className="text-secondary" />
    }
  ]

  return (
    <div className="relative w-full">
      {/* Background Decorative Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float"></div>
      <div className="glow-orb w-[450px] h-[450px] bg-accent/20 top-[80vh] -right-48 animate-float-delayed"></div>

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
            <FiCpu />
            Tech Stack Philosophy
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Our Core Technology <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Standards & Frameworks
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            We deploy a strictly curated set of programming tools. We prioritize type safety, compilation speed, and scalability over chasing passing library trends.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= TABS SELECTOR ================= */}
      <section className="py-8 bg-white/40 border-y border-slate-100 backdrop-blur-sm sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {tabOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveTab(opt.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === opt.id
                    ? 'bg-primary text-white shadow-premium'
                    : 'bg-white/60 text-secondaryText border border-slate-200 hover:border-primary/40 hover:text-primary'
                }`}
              >
                {opt.icon}
                <span>{opt.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECH DETAIL GRID ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {techData[activeTab].map((tech, idx) => (
                <div
                  key={idx}
                  className="glass-card p-8 flex flex-col text-left hover:border-accent/40 shadow-sm transition-all duration-300"
                >
                  <h3 className="text-xl font-heading font-extrabold text-primary mb-3">
                    {tech.name}
                  </h3>
                  <p className="text-secondaryText text-sm font-sans leading-relaxed mb-4 flex-grow">
                    {tech.desc}
                  </p>
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] uppercase font-heading font-bold text-slate-400">Primary Adoption Case</span>
                      <p className="text-xs text-dark font-sans font-medium mt-0.5">{tech.useCase}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {tech.metrics.map((metric, mIdx) => (
                        <div key={mIdx}>
                          <span className="text-[9px] uppercase font-heading font-bold text-slate-400">{metric.label}</span>
                          <p className="text-xs font-heading font-extrabold text-secondary mt-0.5">{metric.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= ENGINEERING STANDARDS ================= */}
      <section className="py-20 md:py-32 bg-white/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Engineering Governance
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We define strict checklists to guarantee that our codebase outputs adhere to international standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((std, idx) => (
              <div key={idx} className="glass-card p-8 flex gap-6 text-left relative overflow-hidden group hover:border-accent/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-softLight flex items-center justify-center shrink-0">
                  {std.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-heading font-bold text-dark group-hover:text-primary transition-colors duration-300">
                    {std.title}
                  </h3>
                  <p className="text-secondaryText text-xs sm:text-sm font-sans leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
            Ready to Scope Your Next Engineering Build?
          </h2>
          <p className="text-secondaryText font-sans max-w-2xl mx-auto">
            Let's evaluate your tech stack and define the optimal backend architecture and design system.
          </p>
          <div>
            <Link to="/contact" className="btn-primary flex items-center gap-2 mx-auto w-fit">
              <span>Connect with an Architect</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Technologies

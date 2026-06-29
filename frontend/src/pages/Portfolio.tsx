import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiFolder,
  FiLayout,
  FiSmartphone,
  FiCloud,
  FiArrowRight,
  FiAward
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'


interface ProjectItem {
  title: string
  tagline: string
  desc: string
  category: 'web' | 'mobile' | 'cloud'
  tech: string[]
  metrics: { label: string; val: string }[]
}

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'mobile' | 'cloud'>('all')

  const filterOptions = [
    { id: 'all', name: 'All Projects', icon: <FiFolder className="text-lg" /> },
    { id: 'web', name: 'Web Systems', icon: <FiLayout className="text-lg" /> },
    { id: 'mobile', name: 'Mobile Apps', icon: <FiSmartphone className="text-lg" /> },
    { id: 'cloud', name: 'Cloud & DevOps', icon: <FiCloud className="text-lg" /> }
  ] as const

  const projects: ProjectItem[] = [
    {
      title: 'OmniScale Dashboard',
      tagline: 'Enterprise Administration Portal',
      desc: 'A complete frontend and state restructuring of an enterprise dashboard, focused on resolving Core Web Vitals bottlenecks and data latency.',
      category: 'web',
      tech: ['React.js', 'TypeScript', 'Redis Caching', 'Tailwind CSS'],
      metrics: [{ label: 'Conversions Boost', val: '+24%' }, { label: 'Speed Index', val: 'Sub-second' }]
    },
    {
      title: 'FinVerse Mobile App',
      tagline: 'High-Performance Fintech Application',
      desc: 'Type-safe mobile banking system with automated SQLite local sync caches, biometric authentication wrappers, and SOC2 compliance audits.',
      category: 'mobile',
      tech: ['React Native', 'Swift', 'Node.js', 'PostgreSQL'],
      metrics: [{ label: 'Crash-Free Rate', val: '99.9%' }, { label: 'Security Compliance', val: 'SOC2 Certified' }]
    },
    {
      title: 'CloudCore Clusters',
      tagline: 'Multi-Region Orchestration Network',
      desc: 'Provisioned multi-region Kubernetes node networks with custom auto-scalers, VPC routing tables, and automated Terraform builds.',
      category: 'cloud',
      tech: ['Go (Golang)', 'Kubernetes', 'Terraform', 'AWS Services'],
      metrics: [{ label: 'Guaranteed Uptime', val: '99.99%' }, { label: 'Deploy Execution', val: '< 2 mins' }]
    },
    {
      title: 'HealthSync Ecosystem',
      tagline: 'HIPAA Compliant Patient Telemetry',
      desc: 'Mobile patient portal with live telemetry ingestion pipelines, local SQLite data structures, and secure HIPAA validation filters.',
      category: 'mobile',
      tech: ['Kotlin', 'Swift', 'SQLite', 'Cloud Firestore'],
      metrics: [{ label: 'Security Grade', val: 'A+ Rated' }, { label: 'Active Telemetries', val: '200k+' }]
    },
    {
      title: 'EduPortal LMS',
      tagline: 'High-Concurrency Stream Portal',
      desc: 'Learning management system incorporating video content delivery optimization, dynamic user caching layers, and CI/CD pipelines.',
      category: 'web',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Vercel Node'],
      metrics: [{ label: 'Code Coverage', val: '90%+' }, { label: 'Active Streams', val: '15k / min' }]
    },
    {
      title: 'LogiTrack Nodes',
      tagline: 'Real-Time Logistics Data Engine',
      desc: 'Go backend worker nodes processing automated location trackers, caching coordinate streams, and scheduling container routines.',
      category: 'cloud',
      tech: ['Go (Golang)', 'Python', 'Docker', 'GCP clusters'],
      metrics: [{ label: 'Processing Latency', val: 'Sub-ms' }, { label: 'Jobs Orchestration', val: '500k / day' }]
    }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(proj => proj.category === activeFilter)

  return (
    <div className="relative w-full">
      {/* Background Orbs */}
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
            <FiAward />
            Our Case Studies
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Bespoke Enterprise <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Implementations & Builds
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Explore how we convert raw product briefs into highly structured microservice backends, type-safe mobile apps, and premium design system interfaces.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="py-8 bg-white/40 border-y border-slate-100 backdrop-blur-sm sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  activeFilter === opt.id
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

      {/* ================= PROJECTS GRID ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="glass-card p-8 flex flex-col text-left hover:border-accent/40 shadow-sm hover:shadow-premium-hover transition-all duration-300 relative group"
                >
                  <span className="text-[10px] uppercase font-heading font-extrabold text-primary tracking-widest mb-2 block">
                    {proj.tagline}
                  </span>
                  <h3 className="text-xl font-heading font-extrabold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {proj.title}
                  </h3>
                  <p className="text-secondaryText text-sm font-sans leading-relaxed mb-6 flex-grow">
                    {proj.desc}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-semibold rounded bg-softLight/40 border border-accent/10 text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Metrics details */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mt-auto">
                    {proj.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="text-[9px] uppercase font-heading font-bold text-slate-400 block">
                          {m.label}
                        </span>
                        <span className="font-heading font-extrabold text-secondary text-sm mt-0.5 block">
                          {m.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 md:py-24 bg-white/30 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
            Ready to Partner with Us?
          </h2>
          <p className="text-secondaryText font-sans max-w-2xl mx-auto">
            Bring your software architectural challenges to our senior engineers and map out a clean, secure roadmap.
          </p>
          <div>
            <Link to="/contact" className="btn-primary flex items-center gap-2 mx-auto w-fit">
              <span>Begin Project Scoping</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portfolio

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiSliders,
  FiMail
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'

interface BlogPost {
  title: string
  desc: string
  category: 'frontend' | 'backend' | 'devops' | 'database'
  categoryName: string
  date: string
  readTime: string
  author: string
  initials: string
}

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'devops' | 'database'>('all')

  const categories = [
    { id: 'all', name: 'All Articles', icon: <FiSliders className="text-lg" /> },
    { id: 'frontend', name: 'Frontend', icon: null },
    { id: 'backend', name: 'Backend', icon: null },
    { id: 'devops', name: 'DevOps', icon: null },
    { id: 'database', name: 'Database', icon: null }
  ] as const

  const featuredPost = {
    title: 'Restructuring Microservices: Migration from Monoliths to Go',
    desc: 'An in-depth look at how we refactored a legacy enterprise API server into highly decoupled, type-safe Go microservices, reducing server memory footprints by 80% and query latency below 10ms.',
    category: 'backend',
    categoryName: 'Backend Engineering',
    date: 'June 15, 2026',
    readTime: '12 min read',
    author: 'Alexander Mercer',
    initials: 'AM'
  }

  const posts: BlogPost[] = [
    {
      title: 'Type-Safe Routing in React: Achieving Absolute Interface Safety',
      desc: 'We examine how to define strict routing types using TypeScript schemas to prevent runtime navigation exceptions across complex dashboards.',
      category: 'frontend',
      categoryName: 'Frontend Systems',
      date: 'June 10, 2026',
      readTime: '6 min read',
      author: 'Elena Rostova',
      initials: 'ER'
    },
    {
      title: 'Securing Kubernetes Clusters: SOC2 and VPC Best Practices',
      desc: 'A comprehensive checklist for locking down cloud nodes, setting up secure VPC gateways, and preparing containers to pass SOC2 compliance audits.',
      category: 'devops',
      categoryName: 'DevOps & Infrastructure',
      date: 'May 28, 2026',
      readTime: '8 min read',
      author: 'Sarah Jenkins',
      initials: 'SJ'
    },
    {
      title: 'Redis vs Memcached: Optimizing Caching Layers at Scale',
      desc: 'Benchmarking performance under high-concurrency loops, analyzing memory consumption profiles, and designing key-value cache rings.',
      category: 'database',
      categoryName: 'Databases & Storage',
      date: 'May 14, 2026',
      readTime: '5 min read',
      author: 'Alexander Mercer',
      initials: 'AM'
    },
    {
      title: 'Why We Chose Tailwind Over CSS-in-JS for Enterprise Systems',
      desc: 'Analyzing style compilation bloat, server-side rendering indices, and stylesheet parsing times when building large design tokens systems.',
      category: 'frontend',
      categoryName: 'Frontend Systems',
      date: 'April 22, 2026',
      readTime: '7 min read',
      author: 'Elena Rostova',
      initials: 'ER'
    },
    {
      title: 'Optimizing PostgreSQL Indexing for Sub-10ms Server Responses',
      desc: 'A deep dive into writing database search indexes, creating materialized views, and utilizing PostgreSQL query planners to profile bottlenecks.',
      category: 'database',
      categoryName: 'Databases & Storage',
      date: 'April 05, 2026',
      readTime: '9 min read',
      author: 'Alexander Mercer',
      initials: 'AM'
    }
  ]

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory)

  return (
    <div className="relative w-full">
      {/* Background Decorative Glow Orbs */}
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
            <FiMail />
            Ascope Tech Engineering Blog
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Engineering Articles & <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Systems Deep-Dives
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Read about our latest research, system optimization briefs, and front-end design system methodologies written by our senior developers.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= FEATURED POST ================= */}
      {activeCategory === 'all' && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-12 border border-slate-100 shadow-premium relative overflow-hidden group hover:border-accent/40 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full filter blur-2xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-6 text-left">
                  <div className="flex items-center gap-4 text-xs font-semibold text-primary font-heading uppercase tracking-wider">
                    <span className="px-2 py-0.5 rounded bg-softLight">
                      {featuredPost.categoryName}
                    </span>
                    <span className="text-secondaryText flex items-center gap-1">
                      <FiCalendar /> {featuredPost.date}
                    </span>
                    <span className="text-secondaryText flex items-center gap-1">
                      <FiClock /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-dark group-hover:text-primary transition-colors duration-300">
                    {featuredPost.title}
                  </h2>
                  <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
                    {featuredPost.desc}
                  </p>

                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient text-white font-heading font-extrabold flex items-center justify-center text-xs">
                      {featuredPost.initials}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark text-sm">{featuredPost.author}</h4>
                      <p className="text-xs text-secondaryText">Chief Architect</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex justify-end">
                  <Link
                    to="/contact"
                    className="btn-primary inline-flex items-center gap-2 w-full lg:w-auto text-center justify-center"
                  >
                    <span>Read Article</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= CATEGORY TABS ================= */}
      <section className="py-8 bg-white/40 border-y border-slate-100 backdrop-blur-sm sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  activeCategory === opt.id
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

      {/* ================= ARTICLES GRID ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, idx) => (
                <article
                  key={idx}
                  className="glass-card p-8 flex flex-col text-left hover:border-accent/40 shadow-sm hover:shadow-premium-hover transition-all duration-300 relative group"
                >
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-secondaryText font-heading uppercase tracking-wide mb-4">
                    <span className="px-2 py-0.5 rounded bg-softLight text-primary">
                      {post.categoryName}
                    </span>
                    <span className="flex items-center gap-0.5"><FiClock /> {post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-heading font-extrabold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-secondaryText text-xs sm:text-sm font-sans leading-relaxed mb-6 flex-grow">
                    {post.desc}
                  </p>

                  <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-brand-gradient text-white font-heading font-extrabold flex items-center justify-center text-[10px]">
                      {post.initials}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark text-xs">{post.author}</h4>
                      <span className="text-[10px] text-secondaryText flex items-center gap-1"><FiCalendar /> {post.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= NEWSLETTER SUBSCRIBE PANEL ================= */}
      <section className="py-16 md:py-24 bg-white/30 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-8 md:p-12 border border-slate-100 shadow-premium space-y-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-dark tracking-tight">
              Get Technical Briefings Direct to Your Inbox
            </h2>
            <p className="text-secondaryText font-sans text-sm max-w-xl mx-auto leading-relaxed">
              We send monthly deep-dives on React design tokens, Kubernetes cloud security configurations, and database query profiling algorithms. No marketing spam.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="developer@domain.com"
                aria-label="Email Address"
                className="flex-grow px-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-background"
                required
              />
              <button type="submit" className="btn-primary py-3 px-6 text-sm font-heading font-semibold">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog

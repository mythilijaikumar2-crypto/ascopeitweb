import React from 'react'
import { motion as motionElement } from 'framer-motion'
import {
  FiTarget,
  FiEye,
  FiCpu,
  FiHardDrive,
  FiCheckCircle,
  FiLinkedin,
  FiGithub,
  FiTrendingUp,
  FiAward
} from 'react-icons/fi'
import { fadeIn, staggerContainer, heroContainer, heroItem } from '../animations'

const About: React.FC = () => {
  const values = [
    {
      icon: <FiCpu className="text-3xl text-primary" />,
      title: 'Type-Safe Solidity',
      desc: 'We write strict TypeScript and modular backends to eliminate runtime failures and logical exceptions before they reach users.'
    },
    {
      icon: <FiHardDrive className="text-3xl text-primary" />,
      title: 'Cloud & Cluster Scalability',
      desc: 'Containerized architectures, automated horizontal scaling, and decoupled data layers designed to accommodate rapid enterprise growth.'
    },
    {
      icon: <FiCheckCircle className="text-3xl text-primary" />,
      title: 'Uptime & Reliability',
      desc: 'Continuous automated integration tests, coverage thresholds, and high-availability server patterns designed for zero disruptions.'
    },
    {
      icon: <FiTrendingUp className="text-3xl text-primary" />,
      title: 'Premium UX Execution',
      desc: 'Converting static design systems into fluid, responsive interfaces with optimized Core Web Vitals and clean responsive grids.'
    }
  ]

  const team = [
    {
      name: 'Alexander Mercer',
      role: 'Founder & Chief Architect',
      bio: 'Former principal cloud engineer for corporate scaling infrastructures. Specializes in Go, distributed microservices, and Kubernetes.',
      initials: 'AM'
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Product Engineering',
      bio: 'Design tokens and front-end optimization expert with 10+ years engineering luxury design systems and high-fidelity layouts.',
      initials: 'ER'
    },
    {
      name: 'Sarah Jenkins',
      role: 'Director of Security & QA',
      bio: 'Specialist in penetration testing and static code compliance auditing. Oversees our SOC2 and HIPAA deployment checklists.',
      initials: 'SJ'
    }
  ]

  return (
    <div className="relative w-full">
      {/* Background Decorative Glow Orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float"></div>
      <div className="glow-orb w-[450px] h-[450px] bg-accent/20 top-[100vh] -right-48 animate-float-delayed"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28">
        <motionElement.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <motionElement.div
            variants={heroItem}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-softLight/60 border border-accent/30 text-xs font-semibold text-primary font-heading uppercase tracking-wider"
          >
            <FiAward />
            Corporate Architecture
          </motionElement.div>

          <motionElement.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Empowering Teams with <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              High-Availability Tech
            </span>
          </motionElement.h1>

          <motionElement.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Ascope Tech was founded by engineers to solve a critical industry challenge: the gap between beautiful aesthetics and robust, scalable, type-safe development. We build software architectures that last.
          </motionElement.p>
        </motionElement.div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-16 md:py-24 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motionElement.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-10 flex gap-6 text-left relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-xl bg-softLight flex items-center justify-center shrink-0">
                <FiTarget className="text-3xl text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-bold text-dark">Our Mission</h3>
                <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
                  To build state-of-the-art digital products by combining pixel-perfect layout systems with modular, test-validated backend architectures, resolving engineering debt.
                </p>
              </div>
            </motionElement.div>

            {/* Vision */}
            <motionElement.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 md:p-10 flex gap-6 text-left relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-xl bg-softLight flex items-center justify-center shrink-0">
                <FiEye className="text-3xl text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-heading font-bold text-dark">Our Vision</h3>
                <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
                  To stand as the premier technology integration partner globally, known for setting the industry standard in type-safety, clean modular architectures, and luxury-level client experience.
                </p>
              </div>
            </motionElement.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Our Core Engineering Values
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              We govern every system design and development commit by four robust engineering principles.
            </p>
          </div>

          <motionElement.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((val, idx) => (
              <motionElement.div
                key={idx}
                variants={fadeIn('up', idx * 0.05)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 text-left group hover:border-accent/40 transition-all duration-300 relative focus-within:ring-2 focus-within:ring-accent"
              >
                <div className="w-12 h-12 rounded-xl bg-softLight flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-all duration-300">
                  <div className="group-hover:filter group-hover:brightness-[100] transition-all duration-300">
                    {val.icon}
                  </div>
                </div>
                <h3 className="text-base font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="text-secondaryText text-xs font-sans leading-relaxed">
                  {val.desc}
                </p>
              </motionElement.div>
            ))}
          </motionElement.div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section className="py-20 md:py-32 bg-white/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Engineering Leadership
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans leading-relaxed">
              Meet the technical architects guiding Ascope Tech's delivery roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motionElement.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden group hover:border-accent/40 transition-all duration-300"
              >
                {/* Visual Initials Avatar */}
                <div className="w-20 h-20 rounded-full bg-brand-gradient text-white font-heading font-extrabold text-xl flex items-center justify-center mb-6 shadow-premium transition-transform duration-300 group-hover:scale-105">
                  {member.initials}
                </div>

                <h3 className="text-lg font-heading font-bold text-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-primary font-heading font-semibold uppercase tracking-wider mb-4">
                  {member.role}
                </p>
                <p className="text-secondaryText text-xs font-sans leading-relaxed mb-6 flex-grow">
                  {member.bio}
                </p>

                {/* Social media shortcuts */}
                <div className="flex gap-4 text-secondaryText group-hover:text-primary transition-colors duration-300">
                  <a href="#" className="hover:text-primary transition-colors" aria-label={`${member.name} LinkedIn`}><FiLinkedin size={18} /></a>
                  <a href="#" className="hover:text-primary transition-colors" aria-label={`${member.name} GitHub`}><FiGithub size={18} /></a>
                </div>
              </motionElement.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CULTURE BRIEF ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
                Our Collaborative Culture
              </h2>
              <p className="text-secondaryText font-sans leading-relaxed">
                At Ascope Tech, we operate as a remote-first, highly distributed group of senior developers and designers. We value continuous code quality, clear developer documentation, and collaborative feedback.
              </p>
              <div className="space-y-3">
                {[
                  '100% remote-first engineering workflows',
                  'Bi-weekly internal architecture brown-bags',
                  'Fully peer-reviewed Git branch checkpoints',
                  'Dedicated time for open-source contributions'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-dark font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics display */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              {[
                { title: 'Type Safety standard', val: '100%' },
                { title: 'SOC2 Compliant code', val: 'Verified' },
                { title: 'Average PR turn time', val: '< 3 hours' },
                { title: 'Direct tech lead chat', val: 'Enabled' }
              ].map((metric, idx) => (
                <div key={idx} className="glass-card p-6 border border-slate-100 text-center">
                  <div className="text-2xl font-heading font-extrabold text-primary mb-1">
                    {metric.val}
                  </div>
                  <div className="text-[10px] sm:text-xs font-heading font-medium text-secondaryText uppercase tracking-wider">
                    {metric.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

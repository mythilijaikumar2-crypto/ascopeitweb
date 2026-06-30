import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiDollarSign,
  FiGlobe,
  FiMonitor,
  FiBookOpen,
  FiArrowRight,
  FiBriefcase,
  FiUserCheck,
  FiCpu,
  FiSmile,
  FiMapPin,
  FiClock
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'
import { openRoles, speculativeRole } from '../data/jobsData'

const Careers: React.FC = () => {
  const navigate = useNavigate()

  const perks = [
    {
      icon: <FiGlobe className="text-3xl text-primary" />,
      title: 'Remote-First Autonomy',
      desc: 'Work from anywhere in the world. We track deliverables, code standards, and logic, not clock-in sheets.'
    },
    {
      icon: <FiDollarSign className="text-3xl text-primary" />,
      title: 'Top-Tier Compensation',
      desc: 'We compensate at international enterprise brackets. Transparent performance reviews occur twice a year.'
    },
    {
      icon: <FiBookOpen className="text-3xl text-primary" />,
      title: 'Continuous Growth Allowance',
      desc: '$2,000 USD annual stipend for books, certifications, developer courses, and global technology events.'
    },
    {
      icon: <FiMonitor className="text-3xl text-primary" />,
      title: 'Premium Workstation Setup',
      desc: 'We budget high-spec MacBook Pro hardware, 4K screen monitors, and premium office ergonomic allowances.'
    }
  ]

  const hiringProcess = [
    {
      step: '01',
      title: 'Portfolio Scrutiny',
      desc: 'We evaluate your actual project code and open-source contributions. No automated resume-filtering filters.'
    },
    {
      step: '02',
      title: 'Architecture Discussion',
      desc: 'A 30-minute scoping call with a technical lead. No whiteboard puzzles — we discuss modularity and REST/gRPC designs.'
    },
    {
      step: '03',
      title: 'Paid Practical Case Study',
      desc: 'A practical, 4-hour architecture task representative of our actual project roadmaps. We compensate you fully for your time.'
    },
    {
      step: '04',
      title: 'Founder Call & Offer',
      desc: 'A 30-minute sync to finalize compensation details, review remote processes, and confirm onboarding logistics.'
    }
  ]

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
            <FiBriefcase />
            Careers at Ascope Tech
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Shape the Future of <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Software Architectures
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            We operate as a remote-first, flat-structured engineering team. We prioritize clean code reviews, strict type safety, and continuous learning.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= BENEFITS GRID ================= */}
      <section className="py-16 md:py-24 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Perks & Engineering Culture
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              We design workflows to allow developers to build code efficiently with zero administrative overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 text-left group hover:border-accent/40 transition-all duration-300 relative"
              >
                <div className="w-12 h-12 rounded-xl bg-softLight flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-all duration-300">
                  <div className="group-hover:filter group-hover:brightness-[100] transition-all duration-300">
                    {perk.icon}
                  </div>
                </div>
                <h3 className="text-base font-heading font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-300">
                  {perk.title}
                </h3>
                <p className="text-secondaryText text-xs font-sans leading-relaxed">
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HIRING PROCESS TIMELINE ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Our Interview Process
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              We respect your time. Our selection flow contains zero algorithmic tricks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {hiringProcess.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="space-y-4 text-left group"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-slate-100 text-slate-400 group-hover:border-primary group-hover:text-primary transition-all duration-300 flex items-center justify-center font-heading font-extrabold text-base shadow-sm">
                  {step.step}
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-dark text-base group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-secondaryText text-xs font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPEN POSITIONS GRID CARDS ================= */}
      <section className="py-20 md:py-32 bg-white/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Active Job Listings
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              Click on any role to view the full job description and apply directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openRoles.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-premium hover:border-primary/20 transition-all duration-300 bg-white cursor-pointer group"
                onClick={() => navigate(`/careers/${job.id}`)}
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 rounded bg-softLight text-primary text-[10px] font-bold uppercase tracking-wider font-heading">
                        {job.dept}
                      </span>
                      <h3 className="text-xl font-heading font-extrabold text-dark group-hover:text-primary transition-colors duration-200">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-xs text-secondaryText font-sans font-medium">
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-primary" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="text-primary" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUserCheck className="text-primary" /> Remote
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="text-sm text-secondaryText font-sans leading-relaxed">
                    {job.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                    {/* Responsibilities */}
                    <div className="space-y-3">
                      <h4 className="font-heading font-bold text-dark text-xs uppercase tracking-wider">
                        Skills & Responsibilities
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-secondaryText font-sans">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <FiCpu className="text-primary shrink-0 mt-1" />
                            <span className="leading-normal">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-3">
                      <h4 className="font-heading font-bold text-dark text-xs uppercase tracking-wider">
                        Qualifications & Specs
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-secondaryText font-sans">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <FiSmile className="text-secondary shrink-0 mt-1" />
                            <span className="leading-normal">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Apply CTA */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <Link
                    to={`/careers/${job.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  >
                    <span>View & Apply</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SPECULATIVE CTA ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
            Don't see your specific alignment?
          </h2>
          <p className="text-secondaryText font-sans max-w-2xl mx-auto">
            We are always seeking senior software designers, cloud operators, and product developers. Submit a speculative resume and git index.
          </p>
          <div>
            <Link
              to={`/careers/${speculativeRole.id}`}
              className="btn-primary inline-flex items-center gap-2 mx-auto w-fit"
            >
              <span>Submit Speculative CV</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Careers

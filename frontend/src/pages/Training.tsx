import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiBookOpen,
  FiAward,
  FiCode,
  FiCloud,
  FiCheck,
  FiCheckCircle,
  FiSend
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'
import { api } from '../services/api'

interface Curriculum {
  icon: React.ReactNode
  title: string
  subtitle: string
  duration: string
  topics: string[]
}

const Training: React.FC = () => {
  // Registration form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('frontend')
  const [experience, setExperience] = useState('beginner')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const curriculums: Curriculum[] = [
    {
      icon: <FiCode className="text-2xl text-primary" />,
      title: 'Frontend Architect Matrix',
      subtitle: 'Advanced Client-Side Engineering',
      duration: '8 Weeks',
      topics: [
        'React 19 internals & Fiber scheduling',
        'State structures (Zustand & Context API)',
        'TypeScript declaration files and type safety rules',
        'Browser DOM profiling & Core Web Vitals optimization'
      ]
    },
    {
      icon: <FiAward className="text-2xl text-primary" />,
      title: 'Concurrency Backend Matrix',
      subtitle: 'Enterprise-Grade Microservices',
      duration: '10 Weeks',
      topics: [
        'Go programming, structures, and routines',
        'Relational schema designs (PostgreSQL performance indexes)',
        'gRPC contract mappings and REST APIs',
        'Caching patterns with Redis pipelines'
      ]
    },
    {
      icon: <FiCloud className="text-2xl text-primary" />,
      title: 'Infrastructure & DevOps Matrix',
      subtitle: 'Vastly Scalable Deployments',
      duration: '8 Weeks',
      topics: [
        'Kubernetes pod networking and scaling rules',
        'Docker container packaging and security scans',
        'Infrastructure as Code (Terraform configs)',
        'GitHub Actions automated rollback workflows'
      ]
    }
  ]

  const features = [
    {
      title: 'Practical Case Studies',
      desc: 'Work on actual microservices sandboxes and frontend codebases representing enterprise requirements.'
    },
    {
      title: 'Structured Peer Reviews',
      desc: 'Every branch push goes through detailed, strict PR evaluation matching Ascope Tech standards.'
    },
    {
      title: 'Ecosystem Certification',
      desc: 'Gain certification tokens officially recognized by our global IT enterprise partners.'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) {
      alert('Please fill out all required fields.')
      return
    }
    setIsSubmitting(true)
    try {
      const result = await api.submitTrainingEnrollment({
        name,
        email,
        phone,
        course,
        experience
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert(`Enrollment failed: ${result.message}`)
      }
    } catch (error: any) {
      console.error(error)
      alert(`Error submitting enrollment: ${error.message || error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setCourse('frontend')
    setExperience('beginner')
    setIsSubmitted(false)
  }

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
            <FiBookOpen />
            Enterprise Engineering Bootcamp
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Refine Raw Capability into <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Systems Architecture Mastery
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            We prepare developers for enterprise scale. Study advanced frontend frameworks, high-throughput backend concurrency, and infrastructure design patterns.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= CURRICULUMS SECTION ================= */}
      <section className="py-20 md:py-32 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Advanced Training Curriculums
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              Choose your alignment path and deep-dive into detailed engineering specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {curriculums.map((curr, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 sm:p-8 bg-white border border-slate-100 rounded-2xl shadow-sm text-left hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-softLight flex items-center justify-center">
                      {curr.icon}
                    </div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded bg-softLight">
                      {curr.duration}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-heading font-extrabold text-dark">
                      {curr.title}
                    </h3>
                    <p className="text-xs text-primary font-heading font-semibold uppercase tracking-wider">
                      {curr.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs sm:text-sm text-secondaryText font-sans">
                    {curr.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex gap-2 items-start">
                        <FiCheck className="text-primary shrink-0 mt-1" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= METHODOLOGIES ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Our Training Methodology
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans font-medium">
              We focus strictly on production validation and architectural integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3 hover:border-primary/20 transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-dark text-base">
                  {feat.title}
                </h3>
                <p className="text-secondaryText text-xs sm:text-sm font-sans leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ENQUIRY REGISTRATION FORM ================= */}
      <section className="py-20 md:py-32 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Register Your Interest
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              Submit your alignment details to enquire about upcoming corporate cohort bootcamps.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-premium p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 shadow-sm">
                    <FiCheckCircle className="text-3xl animate-bounce" />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-dark">
                    Registration Received!
                  </h3>
                  <p className="text-sm text-secondaryText leading-relaxed max-w-md mx-auto">
                    Thank you for registering. Our curriculum organizers will contact you with batch timelines and syllabus parameters shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="btn-primary w-full max-w-xs mt-6 mx-auto"
                  >
                    Register Another Interest
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50/20"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Target Track <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50/20"
                      >
                        <option value="frontend">Frontend Architect</option>
                        <option value="backend">Concurrency Backend</option>
                        <option value="devops">DevOps & Infrastructure</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Experience Tier <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-slate-50/20"
                      >
                        <option value="beginner">Junior (0-2 Yrs)</option>
                        <option value="intermediate">Mid-Level (2-5 Yrs)</option>
                        <option value="senior">Senior (5+ Yrs)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <FiSend />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Training

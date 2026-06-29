import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiGlobe,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiArrowRight,
  FiUpload,
  FiX,
  FiCheckCircle,
  FiCpu
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'
import { api } from '../services/api'

interface InternTrack {
  id: string
  title: string
  dept: string
  desc: string
  skills: string[]
}

const Internship: React.FC = () => {
  // Modal states
  const [selectedTrack, setSelectedTrack] = useState<InternTrack | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [github, setGithub] = useState('')
  const [notes, setNotes] = useState('')
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const advantages = [
    {
      icon: <FiUsers className="text-3xl text-primary" />,
      title: 'Architect Mentorship',
      desc: 'Collaborate directly with senior frontend and backend leads. Review modular designs and receive comprehensive code critiques.'
    },
    {
      icon: <FiDollarSign className="text-3xl text-primary" />,
      title: 'Paid Program Engagement',
      desc: 'We respect engineering talent at all experience tiers. Every single internship track is fully compensated at competitive rates.'
    },
    {
      icon: <FiGlobe className="text-3xl text-primary" />,
      title: 'Live Production Commits',
      desc: 'No dummy tasks or dry exercises. You will write actual components and microservices pushed straight to staging and production.'
    }
  ]

  const timelines = [
    {
      stage: 'Month 1',
      title: 'Onboarding & Core Study',
      desc: 'Understand Ascope Tech design system tokens, study modular SOLID code structures, and deploy playground sandboxes.'
    },
    {
      stage: 'Month 2',
      title: 'Feature Construction',
      desc: 'Take ownership of specific tasks inside two-week sprints. Write tests, refine structures, and present code at PR syncs.'
    },
    {
      stage: 'Month 3',
      title: 'Squad Alignment & Autonomy',
      desc: 'Integrate directly into client deliverables. Coordinate APIs, configure deployments, and establish performance targets.'
    }
  ]

  const tracks: InternTrack[] = [
    {
      id: 'frontend-intern',
      title: 'Frontend Engineering Intern',
      dept: 'User Interfaces',
      desc: 'Translate Figma assets into clean HTML structures using React, TypeScript, Tailwind, and Framer Motion micro-interactions.',
      skills: ['React State hooks', 'Tailwind flex/grid designs', 'TypeScript base interfaces']
    },
    {
      id: 'backend-intern',
      title: 'Backend Systems Intern',
      dept: 'Data Engines',
      desc: 'Build secure APIs, optimize query indexing, write transactional tests, and design database schema migrations.',
      skills: ['Go or Node runtime experience', 'Relational database query concepts', 'API validation protocols']
    },
    {
      id: 'infra-intern',
      title: 'Infrastructure & DevOps Intern',
      dept: 'Cloud Architectures',
      desc: 'Learn Kubernetes node management, docker container building, terraform configuration rules, and telemetry setups.',
      skills: ['Basic Linux command scripts', 'Docker file packaging', 'CI/CD pipeline structures']
    }
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !resume || !selectedTrack) {
      alert('Please fill out all required fields and upload your resume.')
      return
    }
    setIsSubmitting(true)
    try {
      // Step 1: Upload resume file and get a fileId from the server
      const uploadResult = await api.uploadFile(resume)
      if (!uploadResult.success || !uploadResult.fileId) {
        alert(`File upload failed: ${uploadResult.message}`)
        return
      }

      // Step 2: Submit internship application with the returned fileId
      const result = await api.submitInternshipApplication({
        trackId: selectedTrack.id,
        trackTitle: selectedTrack.title,
        name: name,
        email: email,
        phone: phone,
        github: github || undefined,
        notes: notes || undefined,
        resumeFileId: uploadResult.fileId
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert(`Internship submission failed: ${result.message}`)
      }
    } catch (error: any) {
      console.error(error)
      alert(`Error submitting application: ${error.message || error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setPhone('')
    setGithub('')
    setNotes('')
    setResume(null)
    setIsSubmitted(false)
    setSelectedTrack(null)
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
            <FiCalendar />
            Paid Program Openings
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Launch Your Code into <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Live Production Products
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Acquire real-world enterprise engineering experience. Collaborate alongside industry-leading technical architects, commit production-grade logic, and accelerate your career.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= PROGRAM PERKS ================= */}
      <section className="py-16 md:py-24 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Why Intern at Ascope Tech?
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              We design our internships to resemble real senior-junior architectural partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 text-left hover:border-accent/40 transition-all duration-300 relative bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-softLight flex items-center justify-center mb-6 group-hover:bg-brand-gradient group-hover:text-white transition-all duration-300">
                  {adv.icon}
                </div>
                <h3 className="text-base font-heading font-bold text-dark mb-3">
                  {adv.title}
                </h3>
                <p className="text-secondaryText text-xs sm:text-sm font-sans leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAM TIMELINE ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark tracking-tight">
              Program Milestones
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans font-medium">
              We map your progress step-by-step to build architectural autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative text-left">
            {timelines.map((time, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-softLight text-primary flex items-center justify-center font-heading font-extrabold text-xs tracking-wider uppercase">
                  {time.stage}
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-dark text-base">
                    {time.title}
                  </h3>
                  <p className="text-secondaryText text-xs sm:text-sm font-sans leading-relaxed">
                    {time.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACTIVE TRACKS ================= */}
      <section className="py-20 md:py-32 bg-white/30 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Active Internship Tracks
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              Select an open track below to apply and launch your portfolio directly to our engineering leads.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-premium hover:border-primary/20 transition-all duration-300 bg-white text-left"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded bg-softLight text-primary text-[10px] font-bold uppercase tracking-wider font-heading">
                      {track.dept}
                    </span>
                    <h3 className="text-lg font-heading font-extrabold text-dark">
                      {track.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-secondaryText font-sans leading-relaxed">
                    {track.desc}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="font-heading font-bold text-dark text-xs uppercase tracking-wider">
                      Required Stack Concepts
                    </h4>
                    <ul className="space-y-2 text-xs text-secondaryText font-sans">
                      {track.skills.map((skill, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <FiCpu className="text-primary shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedTrack(track)}
                    className="btn-primary w-full inline-flex items-center justify-center gap-2"
                  >
                    <span>Apply For Track</span>
                    <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTERN APPLICATION MODAL ================= */}
      <AnimatePresence>
        {selectedTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-primary px-2 py-0.5 rounded bg-softLight font-heading">
                    Internship Application
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-dark mt-1">
                    {selectedTrack.title}
                  </h3>
                </div>
                <button
                  onClick={resetForm}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondaryText hover:bg-slate-100 hover:text-dark transition-colors"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 shadow-sm">
                      <FiCheckCircle className="text-3xl animate-bounce" />
                    </div>
                    <h4 className="text-xl font-heading font-extrabold text-dark">
                      Application Submitted!
                    </h4>
                    <p className="text-sm text-secondaryText leading-relaxed max-w-sm mx-auto">
                      Thank you for applying to the <span className="font-semibold text-primary">{selectedTrack.title}</span> track at Ascope Tech. Our mentoring leads will review your details and get back to you shortly.
                    </p>
                    <button
                      onClick={resetForm}
                      className="btn-primary w-full max-w-xs mt-6 mx-auto"
                    >
                      Close Window
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
                        className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                        />
                      </div>
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
                          className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        GitHub / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="https://github.com/johndoe"
                        className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Upload Resume / CV <span className="text-red-500">*</span>
                      </label>
                      <div className="relative border-2 border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/30 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                        <input
                          type="file"
                          required
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-1">
                          <FiUpload className="text-2xl text-secondaryText group-hover:text-primary transition-colors mx-auto" />
                          <p className="text-xs font-medium text-dark">
                            {resume ? resume.name : 'Click to upload or drag resume file'}
                          </p>
                          <p className="text-[10px] text-secondaryText">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                        Cover Note / Message
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tell us about your learning goals and engineering projects..."
                        className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <FiArrowRight />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Internship

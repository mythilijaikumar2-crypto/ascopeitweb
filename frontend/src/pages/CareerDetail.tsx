import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiGlobe,
  FiUserCheck,
  FiCpu,
  FiSmile,
  FiUpload,
  FiFile,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiBriefcase,
  FiMapPin,
  FiClock
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'
import { api } from '../services/api'
import { getJobById } from '../data/jobsData'

const CareerDetail: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const navigate = useNavigate()

  const job = getJobById(jobId || '')

  // ─── Form state ─────────────────────────────────────────────────────────────
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [github, setGithub] = useState('')
  const [notes, setNotes] = useState('')
  const [resume, setResume] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const MAX_RESUME_BYTES = 2 * 1024 * 1024
  const ALLOWED_EXTS = ['.pdf', '.doc', '.docx']

  // ─── 404 if job not found ────────────────────────────────────────────────────
  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
        <div className="w-20 h-20 rounded-full bg-softLight flex items-center justify-center text-primary text-4xl">
          <FiBriefcase />
        </div>
        <h1 className="text-3xl font-heading font-extrabold text-dark">Position Not Found</h1>
        <p className="text-secondaryText max-w-md">
          This job listing doesn't exist or may have been closed. Browse our active openings.
        </p>
        <Link to="/careers" className="btn-primary inline-flex items-center gap-2">
          <FiArrowLeft />
          <span>Back to Careers</span>
        </Link>
      </div>
    )
  }

  // ─── File change handler ─────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeError(null)
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const ext = '.' + file.name.split('.').pop()?.toLowerCase()

      if (!ALLOWED_EXTS.includes(ext)) {
        setResumeError('Invalid file type. Only PDF, DOC, and DOCX are accepted.')
        setResume(null)
        e.target.value = ''
        return
      }
      if (file.size > MAX_RESUME_BYTES) {
        setResumeError('Resume size should not exceed 2 MB.')
        setResume(null)
        e.target.value = ''
        return
      }
      setResume(file)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  // ─── Submit handler ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!name || !email || !phone) {
      setSubmitError('Please fill out all required fields.')
      return
    }
    if (!resume) {
      setResumeError('Please upload your resume (PDF, DOC, or DOCX, max 2 MB).')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await api.submitCareerApplication({
        jobId: job.id,
        jobTitle: job.title,
        fullName: name,
        email,
        phone,
        github: github || undefined,
        notes: notes || undefined,
        resume
      })

      if (result.success) {
        setIsSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setSubmitError(result.message || 'Application submission failed. Please try again.')
      }
    } catch (error: any) {
      setSubmitError(error.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Success view ─────────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="relative w-full">
        <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float" />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card max-w-lg w-full p-10 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-100 shadow-sm">
              <FiCheckCircle className="text-4xl" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-extrabold text-dark">
                Application Submitted! 🎉
              </h2>
              <p className="text-secondaryText text-sm leading-relaxed">
                Thank you for applying to{' '}
                <span className="font-semibold text-primary">{job.title}</span> at Ascope Tech.
                Our technical team will review your resume and get back to you shortly.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 border border-slate-100">
              <p className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                What happens next?
              </p>
              {[
                'Portfolio & resume review by our engineering team',
                'Architecture discussion call with a technical lead',
                'Paid practical case study (4 hours)',
                'Founder call & offer finalization'
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-secondaryText">
                  <span className="w-5 h-5 rounded-full bg-softLight text-primary text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <Link
              to="/careers"
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              <FiArrowLeft />
              <span>Back to All Openings</span>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* Background orbs */}
      <div className="glow-orb w-[400px] h-[400px] bg-softLight top-10 -left-48 animate-float" />
      <div className="glow-orb w-[350px] h-[350px] bg-accent/20 top-[60vh] -right-40 animate-float-delayed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

        {/* ─── Back Button ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-secondaryText hover:text-primary transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Careers
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ─── Left: Job Info ───────────────────────────────────────────────── */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-3 space-y-8"
          >
            {/* Header */}
            <motion.div variants={heroItem} className="space-y-4">
              <span className="inline-block px-2.5 py-0.5 rounded bg-softLight text-primary text-[10px] font-bold uppercase tracking-wider font-heading">
                {job.dept}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-dark tracking-tight leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-secondaryText font-sans font-medium">
                <span className="flex items-center gap-1.5">
                  <FiMapPin className="text-primary" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="text-primary" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiGlobe className="text-primary" />
                  Remote-First
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={heroItem} className="glass-card p-6 space-y-3">
              <h2 className="font-heading font-bold text-dark text-sm uppercase tracking-wider">
                About This Role
              </h2>
              <p className="text-secondaryText font-sans leading-relaxed">
                {job.desc}
              </p>
            </motion.div>

            {/* Responsibilities */}
            <motion.div variants={heroItem} className="space-y-4">
              <h2 className="font-heading font-bold text-dark text-sm uppercase tracking-wider flex items-center gap-2">
                <FiCpu className="text-primary" />
                Skills & Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-3 items-start group">
                    <span className="w-6 h-6 rounded-full bg-softLight text-primary text-xs flex items-center justify-center font-bold shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-secondaryText font-sans leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div variants={heroItem} className="space-y-4">
              <h2 className="font-heading font-bold text-dark text-sm uppercase tracking-wider flex items-center gap-2">
                <FiSmile className="text-secondary" />
                Qualifications & Specs
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <FiCheckCircle className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-secondaryText font-sans leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Culture callout */}
            <motion.div
              variants={heroItem}
              className="rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-6 space-y-2"
            >
              <p className="font-heading font-bold text-dark text-sm">
                🌍 Remote-First. No Location Requirements.
              </p>
              <p className="text-xs text-secondaryText font-sans leading-relaxed">
                We measure impact by your deliverables and architecture quality — not your timezone or working hours. Collaboration is async-first.
              </p>
            </motion.div>
          </motion.div>

          {/* ─── Right: Application Form ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-28 glass-card p-6 sm:p-8 space-y-6 shadow-premium border border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary font-heading">
                  Apply Now
                </span>
                <h3 className="text-xl font-heading font-extrabold text-dark">
                  Submit Your Application
                </h3>
                <p className="text-xs text-secondaryText font-sans">
                  All fields marked <span className="text-red-500">*</span> are required.
                  Your resume is stored securely.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
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
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 555 000-0000"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                    />
                  </div>
                </div>

                {/* GitHub */}
                <div className="space-y-1">
                  <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                    GitHub / Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="https://github.com/johndoe"
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30"
                  />
                </div>

                {/* Resume Upload */}
                <div className="space-y-1">
                  <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer group ${
                      resumeError
                        ? 'border-red-400 bg-red-50/30'
                        : resume
                        ? 'border-green-400 bg-green-50/30'
                        : 'border-slate-200 bg-slate-50/30 hover:bg-slate-50 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                      {resume ? (
                        <FiFile className="text-3xl text-green-500 mx-auto" />
                      ) : (
                        <FiUpload className="text-3xl text-secondaryText group-hover:text-primary transition-colors mx-auto" />
                      )}
                      <p className="text-xs font-semibold text-dark">
                        {resume ? resume.name : 'Click to upload or drag your resume'}
                      </p>
                      {resume ? (
                        <p className="text-[10px] text-green-600 font-semibold">
                          ✓ {formatFileSize(resume.size)} — ready to submit
                        </p>
                      ) : (
                        <p className="text-[10px] text-secondaryText">
                          PDF, DOC, DOCX — max 2 MB
                        </p>
                      )}
                    </div>
                  </div>
                  {resumeError && (
                    <p className="flex items-center gap-1 text-xs text-red-500 mt-1 font-medium">
                      <FiAlertCircle className="shrink-0" />
                      {resumeError}
                    </p>
                  )}
                </div>

                {/* Cover Note */}
                <div className="space-y-1">
                  <label className="text-xs font-heading font-bold text-dark uppercase tracking-wider">
                    Cover Note
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your engineering background..."
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-slate-50/30 resize-none"
                  />
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                    <FiAlertCircle className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600 font-medium">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-secondaryText text-center font-sans leading-relaxed">
                  By submitting, your resume is stored securely in our database. We never share your data.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CareerDetail

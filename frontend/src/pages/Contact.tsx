import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import {
  FiMail,
  FiCalendar,
  FiGlobe,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiCheckCircle,
  FiPlus,
  FiMinus,
  FiSend
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'
import { api } from '../services/api'

interface ScopingFormData {
  fullName: string
  company: string
  email: string
  scope: string
  budget: string
  brief: string
}

interface FaqItem {
  q: string
  a: string
}

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ScopingFormData>()

  const onSubmit = async (data: ScopingFormData) => {
    const result = await api.submitContact(data)
    if (result.success) {
      setIsSubmitted(true)
    } else {
      alert(`Submission failed: ${result.message}`)
    }
  }

  const faqs: FaqItem[] = [
    {
      q: 'What is your typical scoping timeline?',
      a: 'We review requirements, construct architecture briefs, align on schemas, and provide estimates in less than 3 business days.'
    },
    {
      q: 'How do you handle codebase ownership?',
      a: 'You retain 100% intellectual property ownership from the first commit. Code is pushed directly to your corporate Git repositories.'
    },
    {
      q: 'Do you offer post-launch support SLAs?',
      a: 'Yes. We provide dedicated maintenance plans, 24/7 uptime monitoring, server optimization briefs, and direct Slack channels.'
    },
    {
      q: 'Can you work with our existing cloud configurations?',
      a: 'Yes. We audit legacy Terraform blueprints, secure Kubernetes clusters, and optimize hosting setups across AWS, GCP, and Vercel.'
    }
  ]

  const toggleFaq = (idx: number) => {
    setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx)
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
            <FiMail />
            Let's Scope Your Project
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight leading-tight text-dark"
          >
            Connect with a Senior <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Software Architect
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-base sm:text-lg text-secondaryText max-w-3xl mx-auto font-sans leading-relaxed"
          >
            Discuss your system needs directly with a senior engineering builder. Get a complete design, timeline, and architectural estimation.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= CONTACT DETAILS & FORM ================= */}
      <section className="py-16 md:py-24 bg-white/40 border-y border-slate-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Details */}
            <div className="lg:col-span-4 space-y-8 text-left">
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-dark">
                  Direct Coordinates
                </h3>
                <p className="text-secondaryText text-sm font-sans leading-relaxed">
                  Have architectural scoping questions? Email us or schedule a calendar call directly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-softLight flex items-center justify-center shrink-0">
                    <FiMail className="text-primary text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-heading font-bold text-slate-400">Scoping Email</span>
                    <a href="mailto:hello@ascopetech.com" className="text-sm font-heading font-bold text-dark hover:text-primary block mt-0.5 transition-colors">
                      hello@ascopetech.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-softLight flex items-center justify-center shrink-0">
                    <FiCalendar className="text-primary text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-heading font-bold text-slate-400">Calendar Booking</span>
                    <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-sm font-heading font-bold text-dark hover:text-primary block mt-0.5 transition-colors">
                      calendly.com/ascopetech
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-softLight flex items-center justify-center shrink-0">
                    <FiGlobe className="text-primary text-lg" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-heading font-bold text-slate-400">Corporate HQ</span>
                    <p className="text-sm font-heading font-bold text-dark mt-0.5">
                      Distributed Engineering Network
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-xs uppercase font-heading font-bold text-slate-400">Engineering Index</h4>
                <div className="flex gap-4 text-secondaryText">
                  <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
                  <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter"><FiTwitter size={20} /></a>
                  <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub"><FiGithub size={20} /></a>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-8">
              <div className="glass-card p-8 border border-slate-100 shadow-premium relative min-h-[450px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-left"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-1">
                          <label htmlFor="fullName" className="text-xs font-heading font-bold text-dark">Full Name</label>
                          <input
                            id="fullName"
                            type="text"
                            placeholder="Alex Mercer"
                            {...register('fullName', { required: 'Full Name is required' })}
                            className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-white/70 ${
                              errors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-primary'
                            }`}
                          />
                          {errors.fullName && <span className="text-[10px] text-rose-500">{errors.fullName.message}</span>}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1">
                          <label htmlFor="email" className="text-xs font-heading font-bold text-dark">Email Address</label>
                          <input
                            id="email"
                            type="email"
                            placeholder="alex@company.com"
                            {...register('email', {
                              required: 'Email address is required',
                              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                            })}
                            className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-white/70 ${
                              errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-primary'
                            }`}
                          />
                          {errors.email && <span className="text-[10px] text-rose-500">{errors.email.message}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Company Name */}
                        <div className="space-y-1">
                          <label htmlFor="company" className="text-xs font-heading font-bold text-dark">Company Name</label>
                          <input
                            id="company"
                            type="text"
                            placeholder="OmniScale Inc."
                            {...register('company')}
                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/20 bg-white/70"
                          />
                        </div>

                        {/* Project Scope */}
                        <div className="space-y-1">
                          <label htmlFor="scope" className="text-xs font-heading font-bold text-dark">Project Scope</label>
                          <select
                            id="scope"
                            {...register('scope', { required: 'Please select a project scope' })}
                            className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-white/70 ${
                              errors.scope ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-primary'
                            }`}
                          >
                            <option value="">Select scope...</option>
                            <option value="custom-software">Custom Software</option>
                            <option value="web-app">Web Application</option>
                            <option value="mobile-app">Mobile Engineering</option>
                            <option value="cloud-devops">Cloud & DevOps</option>
                            <option value="security-audit">Security / Speed Audit</option>
                          </select>
                          {errors.scope && <span className="text-[10px] text-rose-500">{errors.scope.message}</span>}
                        </div>

                        {/* Budget Range */}
                        <div className="space-y-1">
                          <label htmlFor="budget" className="text-xs font-heading font-bold text-dark">Budget Range</label>
                          <select
                            id="budget"
                            {...register('budget')}
                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-accent/20 bg-white/70"
                          >
                            <option value="under-10k">Under $10k</option>
                            <option value="10k-50k">$10k - $50k</option>
                            <option value="50k-100k">$50k - $100k</option>
                            <option value="over-100k">Over $100k</option>
                          </select>
                        </div>
                      </div>

                      {/* Project Brief */}
                      <div className="space-y-1">
                        <label htmlFor="brief" className="text-xs font-heading font-bold text-dark">System Requirements Brief</label>
                        <textarea
                          id="brief"
                          rows={4}
                          placeholder="Please detail your application requirements, database scale, integrations, and target deployment timeline..."
                          {...register('brief', {
                            required: 'Project brief is required',
                            minLength: { value: 10, message: 'Minimum 10 characters required' }
                          })}
                          className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 bg-white/70 ${
                            errors.brief ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-primary'
                          }`}
                        />
                        {errors.brief && <span className="text-[10px] text-rose-500">{errors.brief.message}</span>}
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Submitting Scoping Request...</span>
                          ) : (
                            <>
                              <span>Submit Scoping Request</span>
                              <FiSend />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center space-y-6 py-12"
                    >
                      <div className="flex justify-center">
                        <FiCheckCircle className="text-emerald-500 text-6xl" />
                      </div>
                      <h3 className="text-2xl font-heading font-extrabold text-dark">
                        Scoping Submission Success
                      </h3>
                      <p className="text-secondaryText text-sm sm:text-base font-sans max-w-md mx-auto leading-relaxed">
                        Thank you for detailing your requirements. A Senior Software Architect will analyze your brief and respond via email with an architectural roadmap skeleton within 3 business hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQs ACCORDION ================= */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-heading font-extrabold text-dark tracking-tight">
              Scoping FAQs
            </h2>
            <p className="text-secondaryText text-sm sm:text-base font-sans">
              Frequently asked questions regarding our software integration and scoping timelines.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaqIdx === idx

              return (
                <div
                  key={idx}
                  className="glass-card border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isExpanded}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                  >
                    <h3 className="text-base font-heading font-bold text-dark">
                      {faq.q}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-secondaryText shrink-0">
                      {isExpanded ? <FiMinus /> : <FiPlus />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="p-6 border-t border-slate-100 bg-slate-50/20 text-left">
                          <p className="text-sm text-secondaryText font-sans leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

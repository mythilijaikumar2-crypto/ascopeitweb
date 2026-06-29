import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  FiX,
  FiUpload,
  FiCheckCircle
} from 'react-icons/fi'
import { heroContainer, heroItem } from '../animations'
import { api } from '../services/api'

interface JobRole {
  id: string
  title: string
  location: string
  type: string
  dept: string
  desc: string
  responsibilities: string[]
  requirements: string[]
}

const Careers: React.FC = () => {
  // Modal states
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [github, setGithub] = useState('')
  const [notes, setNotes] = useState('')
  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const openRoles: JobRole[] = [
    {
      id: 'go-backend',
      title: 'Senior Go Backend Engineer',
      location: 'Remote',
      type: 'Full-Time',
      dept: 'Backend Systems',
      desc: 'We are seeking a concurrency specialist to design high-throughput Go microservices, manage PostgreSQL indexing, and construct event stream pipelines.',
      responsibilities: [
        'Build modular backend workers utilizing channels and select concurrency models.',
        'Design database schema migrations, views, and optimize queries under 10ms.',
        'Define clean REST and gRPC API contract schemas with TypeScript frontends.'
      ],
      requirements: [
        '5+ years programming backends with Go/Node in production systems.',
        'Solid knowledge of relational database structures and Redis cache pipelines.',
        'Hands-on experience with Docker container building and basic VPC network security.'
      ]
    },
    {
      id: 'react-architect',
      title: 'Lead React Architect',
      location: 'Remote',
      type: 'Full-Time',
      dept: 'Frontend Products',
      desc: 'Join us to design pixel-perfect design system modules, optimize browser execution times, and set up state-management standards across products.',
      responsibilities: [
        'Construct reusable component matrices conversion Figma designs into HTML structures.',
        'Optimize Web Vitals indexes, implementing bundle tree-shaking and component lazy-loading.',
        'Coordinate state structures across client networks utilizing modern context tools.'
      ],
      requirements: [
        '6+ years developing frontend systems with React and TypeScript.',
        'Deep understanding of browser rendering pipelines, DOM reflows, and performance audits.',
        'Prior experience building customizable corporate design systems.'
      ]
    },
    {
      id: 'sre-engineer',
      title: 'Senior Site Reliability Engineer (SRE)',
      location: 'Remote',
      type: 'Full-Time',
      dept: 'Infrastructure',
      desc: 'Configure auto-scaling clusters, manage VPC routers, and help developers deploy packages with automated, zero-error CI/CD pipelines.',
      responsibilities: [
        'Define Terraform architecture blueprints for cluster replications.',
        'Set up automated logging metrics using Prometheus and Grafana alerts.',
        'Manage cloud hosting configurations to optimize server usage and costs.'
      ],
      requirements: [
        '4+ years managing production cloud infrastructure (AWS or GCP).',
        'Expertise in writing Kubernetes manifests and managing ingress controllers.',
        'Familiarity with writing shell automation scripts and setting up GitHub Actions.'
      ]
    }
  ]

  const speculativeRole: JobRole = {
    id: 'speculative',
    title: 'Speculative Engineering Candidate',
    location: 'Remote',
    type: 'Full-Time / Contract',
    dept: 'General Alignment',
    desc: 'Submit your CV and engineering focus to be considered for future engineering positions on our team.',
    responsibilities: [
      'Proactively design robust features in your alignment area.',
      'Maintain premium architecture standards and write modular, dry code.',
      'Collaborate with developers inside a flat remote environment.'
    ],
    requirements: [
      'Proven development achievements in frontend, backend, or DevOps.',
      'Commitment to type safety, clean code reviews, and modular systems.',
      'Ability to collaborate independently inside asynchronous pipelines.'
    ]
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !resume || !selectedJob) {
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

      // Step 2: Submit application with the returned fileId
      const result = await api.submitCareerApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        fullName: name,
        email: email,
        phone: phone,
        github: github || undefined,
        notes: notes || undefined,
        resumeFileId: uploadResult.fileId
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        alert(`Application submission failed: ${result.message}`)
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
    setSelectedJob(null)
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
              Explore our current open positions. Click Apply Now to submit your details and resume.
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
                className="glass-card border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between hover:shadow-premium hover:border-primary/20 transition-all duration-300 bg-white"
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 rounded bg-softLight text-primary text-[10px] font-bold uppercase tracking-wider font-heading">
                        {job.dept}
                      </span>
                      <h3 className="text-xl font-heading font-extrabold text-dark">
                        {job.title}
                      </h3>
                      <div className="flex gap-4 text-xs text-secondaryText font-sans font-medium">
                        <span className="flex items-center gap-1">
                          <FiGlobe /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUserCheck /> {job.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="text-sm text-secondaryText font-sans leading-relaxed">
                    {job.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                    {/* Responsibilities (Skills) */}
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

                    {/* Requirements (Qualifications) */}
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

                {/* Apply Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  >
                    <span>Apply Now</span>
                    <FiArrowRight />
                  </button>
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
            <button
              onClick={() => setSelectedJob(speculativeRole)}
              className="btn-primary inline-flex items-center gap-2 mx-auto w-fit"
            >
              <span>Submit Speculative CV</span>
              <FiArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ================= APPLICATION FORM MODAL ================= */}
      <AnimatePresence>
        {selectedJob && (
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
                    Job Application
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-dark mt-1">
                    {selectedJob.title}
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
                      Thank you for applying to the <span className="font-semibold text-primary">{selectedJob.title}</span> position at Ascope Tech. Our technical team will review your info and get back to you shortly.
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
                        placeholder="Tell us about your engineering experience..."
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
                          <span>Submitting Application...</span>
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

export default Careers

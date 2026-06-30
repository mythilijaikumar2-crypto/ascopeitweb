import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useScroll } from '../hooks/useScroll'
import { motion, AnimatePresence } from 'framer-motion'
import ascopeLogo from '../assets/assopetech.png'
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiLayout,
  FiTrendingUp,
  FiLayers,
  FiTarget
} from 'react-icons/fi'

interface ServiceItem {
  name: string
  desc: string
  path: string
  icon: React.ReactNode
}

export const Navbar: React.FC = () => {
  const { scrolled } = useScroll(20)
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ]

  const services: ServiceItem[] = [
    {
      name: 'Custom Software',
      desc: 'Type-safe enterprise software platforms custom engineered.',
      path: '/services/custom-software',
      icon: <FiCode />
    },
    {
      name: 'Mobile Engineering',
      desc: 'Native and cross-platform mobile apps for iOS & Android.',
      path: '/services/mobile-engineering',
      icon: <FiSmartphone />
    },
    {
      name: 'Cloud & DevOps',
      desc: 'Zero-downtime microservices networks built with Kubernetes.',
      path: '/services/cloud-devops',
      icon: <FiCloud />
    },
    {
      name: 'Design Systems',
      desc: 'Unified, highly customizable Figma component design systems.',
      path: '/services/design-systems',
      icon: <FiLayout />
    },
    {
      name: 'Speed Optimization',
      desc: 'Profiling systems to hit perfect performance scores.',
      path: '/services/speed-optimization',
      icon: <FiTrendingUp />
    },
    {
      name: 'IT Consulting',
      desc: 'Legacy codebase audits, SOC2 preparation, and code scanning.',
      path: '/services/it-consulting',
      icon: <FiLayers />
    },
    {
      name: 'Digital Marketing',
      desc: 'Performance marketing, SEO scaling, and organic acquisition.',
      path: '/services/digital-marketing',
      icon: <FiTarget />
    }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-0' : 'bg-transparent py-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Link to="/" className="flex items-center">
            <motion.img
              src={ascopeLogo}
              alt="Ascope Tech Logo"
              className="h-20 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </Link>
        </motion.div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">

          {/* Animated Nav Item Component */}
          {[
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className="relative group"
            >
              {({ isActive }) => (
                <div className="relative px-3 py-2">
                  {/* Hover background pill */}
                  {!isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-slate-100/0 group-hover:bg-slate-100/70 transition-colors duration-200"
                    />
                  )}

                  {/* Active background pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg bg-softLight/80"
                      style={{ originY: '0px' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Label */}
                  <span
                    className={`relative z-10 font-heading font-semibold text-sm transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-secondaryText group-hover:text-dark'
                    }`}
                  >
                    {label}
                  </span>

                  {/* Active animated underline dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}

          {/* Services Hover Menu — separate since it has a dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavLink to="/services" end className="relative">
              {({ isActive }) => (
                <div className="relative px-3 py-2">
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg bg-softLight/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-1 font-heading font-semibold text-sm transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondaryText group-hover:text-dark'}`}>
                    Services
                    <motion.span
                      animate={{ rotate: showDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown />
                    </motion.span>
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              )}
            </NavLink>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-1 w-[560px] glass-card p-6 grid grid-cols-2 gap-4 shadow-xl border border-white/50 z-50"
                >
                  {services.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setShowDropdown(false)}
                      className={`flex gap-3 p-3 rounded-xl hover:bg-slate-50/60 transition-colors text-left group ${idx === services.length - 1 && services.length % 2 !== 0 ? 'col-span-2' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-softLight flex items-center justify-center shrink-0 text-primary group-hover:bg-brand-gradient group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-dark group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-secondaryText font-sans leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Remaining nav items after Services */}
          {[
            { label: 'Technologies', path: '/technologies' },
            { label: 'Portfolio', path: '/portfolio' },
            { label: 'Blog', path: '/blog' },
            { label: 'Careers', path: '/careers' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className="relative group"
            >
              {({ isActive }) => (
                <div className="relative px-3 py-2">
                  {!isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-slate-100/0 group-hover:bg-slate-100/70 transition-colors duration-200"
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-lg bg-softLight/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 font-heading font-semibold text-sm transition-colors duration-200 ${isActive ? 'text-primary' : 'text-secondaryText group-hover:text-dark'}`}>
                    {label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}

          <div className="ml-4">
            <Link to="/contact" className="btn-primary py-2 px-5 text-sm">
              Get Quote
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="text-dark hover:text-primary p-2 focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-lg py-4 px-6 flex flex-col gap-4 overflow-hidden z-50 text-left"
          >
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-heading font-medium text-base transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-heading font-medium text-base transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
                }`
              }
            >
              About
            </NavLink>

            {/* Mobile Services Accordion */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex justify-between items-center font-heading font-medium text-base text-secondaryText hover:text-primary transition-colors focus:outline-none"
                aria-expanded={mobileServicesOpen}
              >
                <span>Services</span>
                <motion.span
                  animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="pl-4 flex flex-col gap-3 border-l border-slate-100 overflow-hidden"
                  >
                    {services.map((sub, idx) => (
                      <Link
                        key={idx}
                        to={sub.path}
                        onClick={() => {
                          setIsOpen(false)
                          setMobileServicesOpen(false)
                        }}
                        className="text-sm font-sans font-medium text-secondaryText hover:text-primary transition-colors py-1 block"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.filter(l => l.name !== 'Home' && l.name !== 'About' && l.name !== 'Services' && l.name !== 'Contact').map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `font-heading font-medium text-base transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `font-heading font-medium text-base transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
                }`
              }
            >
              Contact
            </NavLink>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center py-2.5 text-sm w-full block"
            >
              Get Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

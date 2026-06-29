import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useScroll } from '../hooks/useScroll'
import { motion, AnimatePresence } from 'framer-motion'
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-2xl font-heading font-extrabold text-primary flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center text-white text-base">A</span>
          <span>Ascope <span className="text-secondary font-normal">Tech</span></span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            About
          </NavLink>

          {/* Services Hover Menu */}
          <div
            className="py-2"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <Link
              to="/services"
              onClick={() => setShowDropdown(false)}
              className="flex items-center gap-1 font-heading font-medium text-sm text-secondaryText hover:text-primary transition-colors focus:outline-none"
              aria-haspopup="true"
              aria-expanded={showDropdown}
            >
              <span>Services</span>
              <motion.span
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown />
              </motion.span>
            </Link>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute left-0 right-0 mx-auto top-full mt-2 w-[560px] glass-card p-6 grid grid-cols-2 gap-4 shadow-xl border border-white/50 z-50"
                >
                  {services.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setShowDropdown(false)}
                      className={`flex gap-3 p-3 rounded-xl hover:bg-slate-50/50 transition-colors text-left group ${idx === services.length - 1 && services.length % 2 !== 0 ? 'col-span-2' : ''}`}
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

          <NavLink
            to="/technologies"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            Technologies
          </NavLink>

          <NavLink
            to="/portfolio"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            Portfolio
          </NavLink>

          <NavLink
            to="/careers"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            Careers
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `font-heading font-medium text-sm transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-secondaryText hover:text-primary'
              }`
            }
          >
            Contact
          </NavLink>

          <Link to="/contact" className="btn-primary py-2 px-5 text-sm">
            Get Quote
          </Link>
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

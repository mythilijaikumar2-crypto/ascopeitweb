import React from 'react'
import { Link } from 'react-router-dom'
import { FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import ascopeLogo from '../assets/assopetech.png'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand block */}
          <div className="space-y-4 text-left">
            <Link to="/" className="flex items-center">
              <img
                src={ascopeLogo}
                alt="Ascope Tech Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-secondaryText font-sans leading-relaxed">
              Engineering premium, highly available custom web applications and design systems for enterprise-scale businesses globally.
            </p>
            <div className="flex gap-4 text-secondaryText">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook"><FiFacebook size={20} /></a>
              <a 
                href="https://www.linkedin.com/company/ascope-tech-private-limited/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-primary transition-colors" 
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram"><FiInstagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="text-left space-y-4">
            <h4 className="font-heading font-bold text-dark text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-secondaryText">
              <li><Link to="/services" className="hover:text-primary transition-colors">Custom Software</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Mobile Engineering</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Cloud Consulting</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="text-left space-y-4">
            <h4 className="font-heading font-bold text-dark text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-secondaryText">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/technologies" className="hover:text-primary transition-colors">Technologies</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/internship" className="hover:text-primary transition-colors">Internship</Link></li>
              <li><Link to="/training" className="hover:text-primary transition-colors">Training</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="text-left space-y-4">
            <h4 className="font-heading font-bold text-dark text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-secondaryText leading-relaxed">
              Subscribe to get modern engineering resources and technology briefs.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary bg-background"
              />
              <button type="submit" className="btn-primary py-2 px-4 text-xs font-semibold uppercase tracking-wider">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondaryText font-sans">
            © {new Date().getFullYear()} Ascope Tech. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-secondaryText font-sans">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

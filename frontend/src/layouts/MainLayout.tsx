import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { pageTransition } from '../animations'

export const MainLayout: React.FC = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      {/* Route-level animations */}
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            className="w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

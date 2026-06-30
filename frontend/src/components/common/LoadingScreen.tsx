import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ascopeLogo from '../../assets/assopetech.png'

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Initializing application...')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Random incremental steps to feel realistic
        const increment = Math.floor(Math.random() * 18) + 8
        return Math.min(prev + increment, 100)
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress < 25) {
      setStatusMessage('Loading brand parameters...')
    } else if (progress >= 25 && progress < 55) {
      setStatusMessage('Compiling design system tokens...')
    } else if (progress >= 55 && progress < 85) {
      setStatusMessage('Synchronizing API modules...')
    } else {
      setStatusMessage('System synchronized.')
    }
  }, [progress])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background px-6">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-[30vh] left-[25vw] w-[300px] h-[300px] rounded-full bg-softLight filter blur-[80px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[30vh] right-[25vw] w-[300px] h-[300px] rounded-full bg-accent/25 filter blur-[80px] opacity-30 animate-pulse pointer-events-none"></div>

      <div className="w-full max-w-sm flex flex-col items-center space-y-8 relative z-10">
        {/* Actual Logo with pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src={ascopeLogo}
            alt="Ascope Tech"
            className="h-20 w-auto object-contain"
          />
        </motion.div>

        {/* Info Text */}
        <div className="w-full text-center space-y-2">
          <p className="text-xs text-secondaryText font-sans transition-all duration-300">
            {statusMessage}
          </p>
        </div>

        {/* Linear Progress Bar */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="w-full h-1 bg-slate-100 rounded-full overflow-hidden relative"
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full bg-brand-gradient"
          />
        </div>

        {/* Counter Display */}
        <span className="text-[10px] font-heading font-extrabold text-primary tracking-widest">
          {progress}%
        </span>
      </div>
    </div>
  )
}

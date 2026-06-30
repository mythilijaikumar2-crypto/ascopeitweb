import type { Variants } from 'framer-motion'

// ─── Fade In (directional) ───────────────────────────────────────────────────
export const fadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
  delay: number = 0
): Variants => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.7,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
})

// ─── Stagger Container ────────────────────────────────────────────────────────
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

// ─── Page Transition (route change) ──────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.25, 0.25, 0.75] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.3, ease: [0.25, 0.25, 0.25, 0.75] },
  },
}

// ─── Hero Section Stagger ─────────────────────────────────────────────────────
export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 25, stiffness: 120 },
  },
}

// ─── Scroll Reveal (whileInView) ─────────────────────────────────────────────
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.25, 0.25, 0.75] },
  },
}

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.25, 0.25, 0.75] },
  },
}

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.25, 0.25, 0.75] },
  },
}

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] },
  },
}

// ─── Card Stagger List ────────────────────────────────────────────────────────
export const cardStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 22, stiffness: 110 },
  },
}

// ─── Shared whileInView viewport config ──────────────────────────────────────
export const viewportOnce = { once: true, amount: 0.2 }

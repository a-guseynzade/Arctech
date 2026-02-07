import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

/**
 * Animation variants for container exit.
 * Uses GPU-composited transform (translateY).
 */
const containerVariants = {
  initial: { y: 0 },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

/**
 * Logo entrance animation.
 */
const logoVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * Progress bar animation.
 * Uses scaleX (GPU-composited) instead of width.
 */
const progressVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
};

/**
 * Preloader Component
 *
 * Full-screen overlay with logo and progress bar.
 * Exit animation slides entire container up as one unit.
 *
 * Performance:
 * - All animations use GPU-composited properties (transform, opacity)
 * - Container exit uses translateY, not layout properties
 * - Progress bar uses scaleX instead of width
 */
export default function Preloader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          className="w-32 md:w-40"
        >
          <img
            src={logo}
            alt="Arctech"
            className="w-full h-auto"
            loading="eager"
          />
        </motion.div>

        {/* Progress Bar — GPU-optimized with scaleX */}
        <div
          className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            variants={progressVariants}
            initial="initial"
            animate="animate"
            className="h-full w-full origin-left bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}

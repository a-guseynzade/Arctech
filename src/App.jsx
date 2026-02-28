import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import Preloader from '@/components/animations/Preloader';
import { usePreloader } from '@/hooks/usePreloader';

/**
 * Root Application Component
 *
 * Architecture:
 * - Preloader is a fixed overlay (z-9999) on top of content
 * - Content (ReactLenis + Routes) is ALWAYS mounted underneath
 * - When preloader exits with translateY(-100%), it reveals content below
 *
 * This overlay pattern is required for AnimatePresence exit to work correctly.
 * Conditional rendering of content breaks the exit animation.
 */
function App() {
  const { isLoading } = usePreloader();

  return (
    <>
      {/* Preloader overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* Content — always mounted, revealed when preloader exits */}
      <ReactLenis
        root
        options={{
          lerp: 0.5,
          duration: 1.5,
          smoothWheel: true,
          wheelMultiplier: 1,
          anchors: { offset: -64 },
        }}
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </ReactLenis>
    </>
  );
}

export default App;

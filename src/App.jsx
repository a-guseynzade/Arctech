import { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, cancelFrame, frame } from 'framer-motion';

import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import Preloader from '@/components/animations/Preloader';
import { usePreloader } from '@/hooks/usePreloader';
import { ActiveSectionProvider } from '@/context/ActiveSectionContext';

function App() {
  const { isLoading } = usePreloader();
  const lenisRef = useRef(null);
  
  /**
   * Unified frame loop: drives Lenis from Framer Motion's scheduler.
   * The `true` flag = priority (run at START of FM's update phase),
   * so Lenis scroll data is fresh before any FM animation reads it.
   */
  useEffect(() => {
    function update(data) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <>
      {/* Preloader overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* Content — always mounted, revealed when preloader exits */}
      <ActiveSectionProvider>
        <ReactLenis
          root
          ref={lenisRef}
          options={{
            lerp: 0.5,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
            anchors: { offset: -64 },
            autoRaf: false,
            autoResize: true,
          }}
        >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </ReactLenis>
      </ActiveSectionProvider>
    </>
  );
}

export default App;

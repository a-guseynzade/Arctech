import { useState, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import MainLayout from '@/components/layout/MainLayout'
import HomePage from '@/pages/HomePage'
import Preloader from '@/components/ui/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Scroll Lock Management
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  useEffect(() => {
    // 2. Loading Logic (Real Asset Detection)
    const startTime = Date.now();
    const MIN_DISPLAY_TIME = 2400; // Matches progress animation (2s) + buffer

    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Check if site is already fully loaded
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }

    // Safety Fallback: Force load after 6 seconds if something hangs
    const fallbackTimer = setTimeout(finishLoading, 6000);

    return () => {
      window.removeEventListener('load', finishLoading);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </ReactLenis>
    </>
  )
}

export default App

import { useEffect, useRef } from 'react';
import { useActiveSection } from '@/context/ActiveSectionContext';

/**
 * High-performance Scroll Spy hook using IntersectionObserver.
 * Zero scroll event listeners.
 * 
 * @param {Array<string>} sectionIds - Array of section IDs to observe (without the '#' prefix)
 * @param {Object} options - IntersectionObserver options
 */
export function useScrollSpy(sectionIds, options = { rootMargin: '-40% 0px -60% 0px' }) {
  const { setActiveHash } = useActiveSection();
  const observer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleIntersect = (entries) => {
      // Find the first intersecting entry
      const intersectingEntry = entries.find(entry => entry.isIntersecting);
      
      if (intersectingEntry) {
        setActiveHash(`#${intersectingEntry.target.id}`);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, options);

    // Observe all valid section elements
    sectionIds.forEach(id => {
      // Handle the "Home" edge case where href is just "#"
      const targetId = id === '' ? 'home' : id; 
      const element = document.getElementById(targetId);
      if (element) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [sectionIds, setActiveHash, options]);
}

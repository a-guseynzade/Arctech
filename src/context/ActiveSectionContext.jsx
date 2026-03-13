import { createContext, useContext, useState } from 'react';

const ActiveSectionContext = createContext(null);

export function ActiveSectionProvider({ children }) {
  const [activeHash, setActiveHash] = useState('');

  return (
    <ActiveSectionContext.Provider value={{ activeHash, setActiveHash }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error('useActiveSection must be used within an ActiveSectionProvider');
  }
  return context;
}

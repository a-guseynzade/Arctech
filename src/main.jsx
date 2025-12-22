import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme="system" storageKey="arctech-theme">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)

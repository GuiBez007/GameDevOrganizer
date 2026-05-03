// Styles import //
import "@/styles/global.css"

// Pages import //
import T01_Home from './pages/T01_Home/T01_Home'

// React import //
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <T01_Home/>
  </StrictMode>,
)

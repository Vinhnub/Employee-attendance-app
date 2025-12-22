import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/viewportHeight.js'
import App from './App.jsx'
import PopupRenderer, { PopupProvider } from './Component/PopUp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PopupProvider>
      <App />
    </PopupProvider>
  </StrictMode>,
)

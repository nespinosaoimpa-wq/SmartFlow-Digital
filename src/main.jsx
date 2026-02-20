import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Removed StrictMode to prevent double-render conflicts with GSAP on mount
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

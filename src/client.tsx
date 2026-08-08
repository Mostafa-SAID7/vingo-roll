import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router'

// Debug logging
console.log('=== Client Starting ===')
console.log('Root element:', document.getElementById('root'))

async function hydrate() {
  try {
    console.log('Creating router...')
    const router = getRouter()
    console.log('Router created:', router)

    const rootElement = document.getElementById('root')
    console.log('Root element found:', !!rootElement)

    if (!rootElement) {
      throw new Error('Could not find root element with id="root"')
    }

    console.log('Creating React root...')
    const root = ReactDOM.createRoot(rootElement)
    
    console.log('Rendering app with RouterProvider...')
    root.render(<RouterProvider router={router} />)
    
    console.log('=== App Rendered Successfully ===')
  } catch (err: any) {
    console.error('Failed to hydrate app:', err)
    const msg = err?.message || String(err)
    const rootElement = document.getElementById('root')
    if (rootElement) {
      rootElement.innerHTML = `<div style="color: red; padding: 20px; font-family: monospace; white-space: pre-wrap;">Error initializing app: ${msg}</div>`
    }
  }
}

// Start immediately
hydrate()

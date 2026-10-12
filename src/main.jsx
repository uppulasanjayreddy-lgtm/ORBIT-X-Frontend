import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LogOut } from 'lucide-react'

import App from './App.jsx'
import Login from './Login.jsx'
import { getCurrentUser, logoutUser } from './api.js'
import './styles.css'

function Application() {
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let active = true

    getCurrentUser()
      .then(currentUser => {
        if (active) setUser(currentUser)
      })
      .catch(() => {
        if (active) setUser(null)
      })
      .finally(() => {
        if (active) setCheckingSession(false)
      })

    return () => {
      active = false
    }
  }, [])

  function login(userData) {
    setUser(userData)
  }

  async function logout() {
    try {
      await logoutUser()
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      setUser(null)
    }
  }

  if (checkingSession) {
    return (
      <main className="login-screen">
        <div className="login-card">
          <h2>Connecting to Mission Control...</h2>
          <p>Checking your secure session.</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return <Login onLogin={login} />
  }

  return (
    <>
      <App />
      <button
        className="orbitx-logout"
        onClick={logout}
        title={`Sign out ${user.name || user.email}`}
        aria-label="Sign out"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </React.StrictMode>
)

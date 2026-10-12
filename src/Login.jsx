import { useState } from 'react'
import {
  Orbit,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Satellite,
  ArrowRight,
  CircleCheck,
} from 'lucide-react'

import { loginUser, registerUser } from './api.js'

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'register') {
        await registerUser({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        })

        setMessage('Account created! You can now sign in.')
        setMode('login')
        setPassword('')
      } else {
        const user = await loginUser({
          email: email.trim().toLowerCase(),
          password,
        })

        onLogin(user)
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.response?.status === 409
          ? 'An account with this email already exists.'
          : err.response?.status === 401
            ? 'Invalid email or password.'
            : 'Unable to connect. Check that the backend is running.')
      )
    } finally {
      setLoading(false)
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setError('')
    setMessage('')
  }

  return (
    <main className="login-screen">
      <div className="login-stars" />
      <div className="login-grid" />

      <header className="login-header">
        <a className="login-brand" href="#home">
          <span className="login-brand-icon">
            <Orbit size={25} />
          </span>
          <span>
            <strong>ORBIT<span>-X</span></strong>
            <small>MISSION CONTROL SYSTEM</small>
          </span>
        </a>

        <div className="login-header-status">
          <span className="login-status-dot" />
          SIMULATION ENVIRONMENT
        </div>
      </header>

      <section className="login-layout">
        <div className="login-visual">
          <div className="login-eyebrow">
            <span /> SPACECRAFT OPERATIONS PLATFORM
          </div>

          <h1>
            Your mission.<br />
            <span>Your universe.</span>
          </h1>

          <p className="login-description">
            Access your mission dashboard, monitor orbital telemetry,
            inspect spacecraft subsystems and manage simulated flight operations.
          </p>

          <div className="login-orbit-art">
            <div className="login-orbit orbit-a" />
            <div className="login-orbit orbit-b" />
            <div className="login-orbit orbit-c" />
            <div className="login-earth">
              <div className="login-earth-glow" />
              <div className="login-earth-land" />
            </div>
            <div className="login-satellite">
              <Satellite size={27} />
            </div>
            <div className="login-orbit-label label-top">
              <span /> ORBITAL TELEMETRY
            </div>
            <div className="login-orbit-label label-bottom">
              LEO · 542 KM
            </div>
          </div>

          <div className="login-feature-row">
            <div>
              <Orbit size={19} />
              <span>
                <b>Live telemetry</b>
                <small>Orbital data monitoring</small>
              </span>
            </div>
            <div>
              <ShieldCheck size={19} />
              <span>
                <b>Mission systems</b>
                <small>Subsystem health</small>
              </span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-icon">
            <LockKeyhole size={23} />
          </div>

          <div className="login-card-heading">
            <div className="login-eyebrow">
              AUTHENTICATION / 01
            </div>
            <h2>
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p>
              {mode === 'login'
                ? 'Sign in to access Mission Control.'
                : 'Register for your ORBIT-X account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <label htmlFor="orbit-name">Full name</label>
                <div className="login-input-wrap">
                  <input
                    id="orbit-name"
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    maxLength={100}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <label htmlFor="orbit-email">Email address</label>
            <div className="login-input-wrap">
              <Mail size={17} />
              <input
                id="orbit-email"
                type="email"
                placeholder="you@orbitx.space"
                autoComplete="username"
                maxLength={255}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-password-label">
              <label htmlFor="orbit-password">Password</label>
              <span>
                <ShieldCheck size={13} />
                {mode === 'login' ? 'SECURE ACCESS' : 'MIN. 8 CHARACTERS'}
              </span>
            </div>

            <div className="login-input-wrap">
              <LockKeyhole size={17} />
              <input
                id="orbit-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                autoComplete={
                  mode === 'login' ? 'current-password' : 'new-password'
                }
                minLength={8}
                maxLength={72}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            {message && (
              <div className="login-success" role="status">
                {message}
              </div>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Sign in to Mission Control'
                  : 'Create account'}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div className="login-demo">
            <div className="login-demo-heading">
              <CircleCheck size={16} />
              <b>
                {mode === 'login'
                  ? 'New to ORBIT-X?'
                  : 'Already registered?'}
              </b>
            </div>

            <p>
              {mode === 'login'
                ? 'Create an account to get started.'
                : 'Return to the sign-in screen.'}
            </p>

            <button
              type="button"
              className="login-submit"
              onClick={() =>
                changeMode(mode === 'login' ? 'register' : 'login')
              }
            >
              {mode === 'login' ? 'Create an account' : 'Back to sign in'}
            </button>
          </div>

          <div className="login-card-footer">
            <ShieldCheck size={14} />
            Educational simulation · No real spacecraft connected
          </div>
        </div>
      </section>

      <footer className="login-footer">
        <span>ORBIT-X FLIGHT SYSTEMS</span>
        <span>MISSION CONTROL SOFTWARE v1.0.0</span>
        <span>© 2026 ORBIT-X</span>
      </footer>
    </main>
  )
}

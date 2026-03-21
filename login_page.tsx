'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('login')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #EEF6FF 0%, #ffffff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ background: 'white', border: '1.5px solid var(--gray-300)', borderRadius: 28, padding: '48px 44px', width: '100%', maxWidth: 460, boxShadow: 'var(--shadow-xl)' }}>

        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5 }}>
            Molar<span style={{ color: 'var(--blue-500)' }}>Jobs</span>
          </span>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 12, padding: 4, marginBottom: 28, gap: 4 }}>
          {['login', 'register'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer', background: tab === t ? 'white' : 'transparent', color: tab === t ? 'var(--blue-700)' : 'var(--gray-500)' }}
            >
              {t === 'login' ? 'Log In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tab === 'register' && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Full Name</label>
              <input type="text" placeholder="Dr. Nino Kapanadze" required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Password</label>
              {tab === 'login' && (
                <Link href="/forgot-password" style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue-500)', textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              )}
            </div>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, width: '100%', padding: '14px 0', borderRadius: 10, border: 'none', background: loading ? 'var(--gray-300)' : 'linear-gradient(135deg, #2D7DD2, #1A56A0)', color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 0', borderRadius: 10, border: '1.5px solid var(--gray-300)', background: 'white', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google
          </button>
          <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 0', borderRadius: 10, border: '1.5px solid var(--gray-300)', background: 'white', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        {/* Bottom link */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: 20 }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'var(--blue-500)', cursor: 'pointer' }}
          >
            {tab === 'login' ? 'Create one for free' : 'Sign in'}
          </button>
        </p>

      </div>
    </div>
  )
}

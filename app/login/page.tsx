'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [tab, setTab]           = useState<'login' | 'register'>('login')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up Supabase auth
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(45,125,210,0.12) 0%, transparent 60%), linear-gradient(180deg, #EEF6FF 0%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>

      {/* Card */}
      <div style={{
        background: 'white',
        border: '1.5px solid var(--gray-300)',
        borderRadius: 28,
        padding: '48px 44px',
        width: '100%',
        maxWidth: 460,
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,125,210,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5 }}>
            Molar<span style={{ color: 'var(--blue-500)' }}>Jobs</span>
          </span>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          background: 'var(--gray-100)',
          borderRadius: 12,
          padding: 4,
          marginBottom: 32,
          gap: 4,
        }}>
          {(['login', 'register'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '10px 0', borderRadius: 9, border: 'none',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === t ? 'white' : 'transparent',
                color: tab === t ? 'var(--blue-700)' : 'var(--gray-500)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {t === 'login' ? 'Log In' : 'Create Account'}
            </button>
          ))}
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5, marginBottom: 6 }}>
          {tab === 'login' ? 'Welcome back' : 'Join MolarJobs'}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 28, lineHeight: 1.6 }}>
          {tab === 'login'
            ? 'Sign in to your account to continue.'
            : 'Create a free account to find jobs or hire talent.'}
        </p>

        {/* Social login */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[
            { label: 'Google', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )},
            { label: 'Facebook', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )},
          ].map(({ label, icon }) => (
            <button
              key={label}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 0', borderRadius: 10,
                border: '1.5px solid var(--gray-300)', background: 'white',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                color: 'var(--gray-700)', cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue-400)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--gray-300)')}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>or continue with email</span>
          <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {tab === 'register' && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Dr. Nino Kapanadze"
                required
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: '1.5px solid var(--gray-300)', outline: 'none',
                  fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                  transition: 'border-color 0.15s', boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: '1.5px solid var(--gray-300)', outline: 'none',
                fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                transition: 'border-color 0.15s', boxSizing: 'border-box',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
              onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>
                Password
              </label>
              {tab === 'login' && (
                <Link href="/forgot-password" style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue-500)', textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder={tab === 'register' ? 'Min. 8 characters' : '••••••••'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10,
                  border: '1.5px solid var(--gray-300)', outline: 'none',
                  fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                  transition: 'border-color 0.15s', boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                  color: 'var(--gray-500)', display: 'flex', alignItems: 'center',
                }}
              >
                {showPass ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {tab === 'register' && (
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { value: 'professional', label: '🦷 I\'m a Professional' },
                { value: 'clinic', label: '🏥 I\'m a Clinic' },
              ].map(opt => (
                <label
                  key={opt.value}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '11px 0', borderRadius: 10,
                    border: '1.5px solid var(--gray-300)', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, color: 'var(--gray-700)',
                    transition: 'all 0.15s',
                  }}
                >
                  <input type="radio" name="account_type" value={opt.value} style={{ accentColor: 'var(--blue-500)' }} />
                  {opt.label}
                </label>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
              background: loading ? 'var(--gray-300)' : 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
              color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 4px 16px rgba(45,125,210,0.35)',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {loading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                {tab === 'login' ? 'Signing in…' : 'Creating account…'}
              </>
            ) : (
              tab === 'login' ? 'Sign In →' : 'Create Account →'
            )}
          </button>
        </form>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: 20 }}>
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setTab(tab === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'var(--blue-500)', cursor: 'pointer' }}
          >
            {tab === 'login' ? 'Create one free' : 'Sign in'}
          </button>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 480px) {
          div[style*="padding: '48px 44px'"] { padding: 32px 24px !important; }
        }
      `}</style>
    </div>
  )
}
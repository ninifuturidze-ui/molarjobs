'use client'

import { useState } from 'react'
import Link from 'next/link'

type Tab = 'login' | 'signup'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--gray-700)',
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1.5px solid var(--gray-300)',
  background: 'white',
  fontFamily: 'inherit',
  fontSize: 14,
  color: 'var(--gray-900)',
  outline: 'none',
  transition: 'border-color 0.15s',
  boxSizing: 'border-box',
}

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<'professional' | 'clinic' | ''>('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: wire up Supabase auth
    // if (tab === 'login') { await supabase.auth.signInWithPassword({ email, password }) }
    // if (tab === 'signup') { await supabase.auth.signUp({ email, password, options: { data: { full_name: name, role } } }) }
    setTimeout(() => setLoading(false), 1500)
  }

  const handleGoogle = () => {
    // TODO: await supabase.auth.signInWithOAuth({ provider: 'google' })
    console.log('Google OAuth')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #EEF6FF 0%, #F3F7FC 60%, #E6F7F7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(45,125,210,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,173,168,0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', maxWidth: 460, position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
              </svg>
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5 }}>
              Molar<span style={{ color: 'var(--blue-500)' }}>Jobs</span>
            </span>
          </Link>
          <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 8 }}>
            Georgia&apos;s dental careers platform
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            boxShadow: '0 20px 60px rgba(12,45,94,0.12)',
            border: '1px solid rgba(209,216,228,0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-300)', background: 'var(--gray-100)' }}>
            {(['login', 'signup'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  border: 'none',
                  background: tab === t ? 'white' : 'transparent',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  color: tab === t ? 'var(--blue-700)' : 'var(--gray-500)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderBottom: tab === t ? '2px solid var(--blue-500)' : '2px solid transparent',
                  letterSpacing: 0.2,
                }}
              >
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div style={{ padding: '32px 36px' }}>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogle}
              style={{
                width: '100%',
                padding: '12px 20px',
                borderRadius: 10,
                border: '1.5px solid var(--gray-300)',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'inherit',
                color: 'var(--gray-700)',
                cursor: 'pointer',
                transition: 'all 0.15s',
                marginBottom: 24,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--blue-400)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--gray-300)')}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.8 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.6-3.2-11.3-7.8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 0.5 }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Name — sign up only */}
              {tab === 'signup' && (
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Nino Kapanadze"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--blue-400)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gray-300)')}
                  />
                </div>
              )}

              {/* Role — sign up only */}
              {tab === 'signup' && (
                <div>
                  <label style={labelStyle}>I am a…</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                      { val: 'professional', emoji: '🦷', title: 'Dental Professional', desc: 'Looking for a job' },
                      { val: 'clinic', emoji: '🏥', title: 'Clinic / Employer', desc: 'Looking to hire' },
                    ].map((opt) => (
                      <div
                        key={opt.val}
                        onClick={() => setRole(opt.val as 'professional' | 'clinic')}
                        style={{
                          padding: '14px 12px',
                          borderRadius: 10,
                          border: `2px solid ${role === opt.val ? 'var(--blue-500)' : 'var(--gray-300)'}`,
                          background: role === opt.val ? 'var(--blue-50)' : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          textAlign: 'center',
                        }}
                      >
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.emoji}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: role === opt.val ? 'var(--blue-700)' : 'var(--gray-700)' }}>
                          {opt.title}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{opt.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <svg
                    width="16" height="16" fill="none" stroke="var(--gray-500)" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 7L2 7" />
                  </svg>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingLeft: 40 }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--blue-400)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gray-300)')}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                  {tab === 'login' && (
                    <Link href="/forgot-password" style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue-500)', textDecoration: 'none' }}>
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <svg
                    width="16" height="16" fill="none" stroke="var(--gray-500)" strokeWidth="2" viewBox="0 0 24 24"
                    style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={tab === 'signup' ? 'Create a strong password' : 'Enter your password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ ...inputStyle, paddingLeft: 40, paddingRight: 44 }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--blue-400)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gray-300)')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)', padding: 4,
                    }}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {tab === 'signup' && (
                  <p style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 5 }}>Minimum 8 characters</p>
                )}
              </div>

              {/* Terms — sign up only */}
              {tab === 'signup' && (
                <p style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.6 }}>
                  By signing up, you agree to our{' '}
                  <Link href="/terms" style={{ color: 'var(--blue-500)', textDecoration: 'none', fontWeight: 600 }}>Terms of Use</Link>
                  {' '}and{' '}
                  <Link href="/privacy" style={{ color: 'var(--blue-500)', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: 10,
                  border: 'none',
                  background: loading ? 'var(--gray-300)' : 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(45,125,210,0.35)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }}
                    />
                    {tab === 'login' ? 'Logging in…' : 'Creating account…'}
                  </>
                ) : tab === 'login' ? (
                  'Log In to MolarJobs'
                ) : (
                  'Create My Account →'
                )}
              </button>
            </form>
          </div>

          {/* Footer switch */}
          <div style={{ padding: '16px 36px 28px', textAlign: 'center', fontSize: 13, color: 'var(--gray-500)' }}>
            {tab === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--blue-500)', fontWeight: 700, fontSize: 13, fontFamily: 'inherit' }}
                >
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--blue-500)', fontWeight: 700, fontSize: 13, fontFamily: 'inherit' }}
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/" style={{ fontSize: 13, color: 'var(--gray-500)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            ← Back to MolarJobs
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: var(--gray-500); opacity: 0.7; }
      `}</style>
    </div>
  )
}
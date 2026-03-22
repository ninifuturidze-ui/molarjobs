'use client'

import { useState, FormEvent, useEffect, useRef } from 'react'
import Link from 'next/link'

// ─── TYPES ───────────────────────────────────────────────────────
type UserType = 'student' | 'clinician' | null
type Step = 'tabs' | 'who-are-you' | 'student-onboard' | 'clinician-onboard' | 'working-rights' | 'form'

// ─── WORKING RIGHTS DATA ─────────────────────────────────────────
const RIGHTS_CARDS = [
  { icon: '💰', title: 'Fair Pay', color: '#16A34A', bg: '#DCFCE7', fact: 'Your salary must be agreed in writing before work begins. Employers cannot reduce it without your written consent.' },
  { icon: '⏱', title: 'Working Hours', color: '#2D7DD2', bg: '#EEF6FF', fact: 'Max 40 hours/week. Overtime must be paid at 125%+ of your normal hourly rate.' },
  { icon: '🌿', title: 'Leave Rights', color: '#9333EA', bg: '#F5F3FF', fact: 'You\'re entitled to at least 24 working days of paid annual leave per year from day one.' },
  { icon: '🤒', title: 'Sick Leave', color: '#E11D48', bg: '#FFF1F2', fact: 'Paid sick leave with a medical certificate. You cannot be dismissed for taking legitimate sick leave.' },
  { icon: '🛡', title: 'Your Contract', color: '#B45309', bg: '#FEF3C7', fact: 'Always get a written contract. Informal "cash in hand" arrangements leave you legally unprotected.' },
]

// ─── SPECIALTIES ─────────────────────────────────────────────────
const SPECIALTIES = [
  'General Dentistry', 'Orthodontics', 'Oral Surgery', 'Periodontics',
  'Endodontics', 'Prosthodontics', 'Pediatric Dentistry', 'Implantology',
  'Cosmetic Dentistry', 'Dental Hygiene', 'Dental Assisting', 'Dental Technology',
]

const CITIES = ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Gori', 'Zugdidi', 'Poti', 'Telavi', 'Other']

// ─── QUIZ QUESTIONS FOR STUDENTS ─────────────────────────────────
const STUDENT_QUESTIONS = [
  {
    id: 'field',
    question: 'What are you studying?',
    emoji: '📚',
    options: ['General Dentistry', 'Dental Hygiene', 'Dental Technology', 'Dental Assisting', 'Orthodontics', 'Other'],
  },
  {
    id: 'year',
    question: 'What year are you in?',
    emoji: '🎓',
    options: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Graduating Soon'],
  },
  {
    id: 'location',
    question: 'Where are you based?',
    emoji: '📍',
    options: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Gori', 'Other'],
  },
  {
    id: 'district',
    question: 'Which district in Tbilisi?',
    emoji: '🗺',
    options: ['Vake', 'Saburtalo', 'Mtatsminda', 'Isani', 'Samgori', 'Gldani', 'Nadzaladevi', 'Didube', 'Chughureti', 'Old Tbilisi'],
    showIf: { id: 'city', value: 'Tbilisi' },
  },
  {
    id: 'goal',
    question: 'What are you looking for?',
    emoji: '🎯',
    options: ['Internship / Practice', 'Part-time Work', 'Full-time After Graduation', 'Just Exploring', 'Networking'],
  },
]

const CLINICIAN_QUESTIONS = [
  {
    id: 'specialty',
    question: 'What is your specialty?',
    emoji: '🦷',
    options: SPECIALTIES,
  },
  {
    id: 'location',
    question: 'Where are you based?',
    emoji: '📍',
    options: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Gori', 'Other'],
  },
   {
    id: 'district',
    question: 'Which district in Tbilisi?',
    emoji: '🗺',
    options: ['Vake', 'Saburtalo', 'Mtatsminda', 'Isani', 'Samgori', 'Gldani', 'Nadzaladevi', 'Didube', 'Chughureti', 'Old Tbilisi'],
    showIf: { id: 'city', value: 'Tbilisi' },
  },
  {
    id: 'goal',
    question: 'What are you looking for?',
    emoji: '🎯',
    options: ['New Clinic Position', 'Part-time Work', 'Contract Work', 'Exploring Options', 'Networking'],
  },
]

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [step, setStep] = useState<Step>('tabs')
  const [userType, setUserType] = useState<UserType>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [rightsIdx, setRightsIdx] = useState(0)
  const [rightsRead, setRightsRead] = useState<Set<number>>(new Set())
  const [animating, setAnimating] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
  }

  const handleTabSwitch = (t: 'login' | 'register') => {
    setTab(t)
    if (t === 'register') setStep('who-are-you')
    else setStep('tabs')
  }

  const handleUserType = (type: UserType) => {
    setUserType(type)
    setCurrentQ(0)
    setAnswers({})
    setStep(type === 'student' ? 'student-onboard' : 'clinician-onboard')
  }

  const questions = userType === 'student' ? STUDENT_QUESTIONS : CLINICIAN_QUESTIONS

  const handleAnswer = (value: string) => {
    if (animating) return
    setAnimating(true)
    const qId = questions[currentQ].id
    const newAnswers = { ...answers, [qId]: value }
    setAnswers(newAnswers)

    setTimeout(() => {
      let nextQ = currentQ + 1
      // Skip district question if city is not Tbilisi
      if (questions[nextQ]?.showIf) {
        const { id, value: required } = questions[nextQ].showIf!
        if (newAnswers[id] !== required) {
          nextQ++
        }
      }
      if (nextQ < questions.length) {
        setCurrentQ(nextQ)
        setAnimating(false)
      } else {
        if (userType === 'student') {
          setStep('working-rights')
          setRightsIdx(0)
          setRightsRead(new Set())
        } else {
          setStep('form')
        }
        setAnimating(false)
      }
    }, 350)
  }

  const handleRightsNext = () => {
    const newRead = new Set(rightsRead)
    newRead.add(rightsIdx)
    setRightsRead(newRead)

    if (rightsIdx < RIGHTS_CARDS.length - 1) {
      setRightsIdx(prev => prev + 1)
    } else {
      setConfetti(true)
      setTimeout(() => {
        setConfetti(false)
        setStep('form')
      }, 1800)
    }
  }

  const allRightsRead = rightsRead.size >= RIGHTS_CARDS.length - 1

  // Progress for onboarding
  const progress = step === 'student-onboard' || step === 'clinician-onboard'
    ? Math.round((currentQ / questions.length) * 100)
    : step === 'working-rights'
    ? Math.round(((rightsIdx + 1) / RIGHTS_CARDS.length) * 100)
    : step === 'form' ? 100 : 0

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EEF6FF 0%, #F5F3FF 50%, #ffffff 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Confetti burst */}
      {confetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-20px',
              width: 10, height: 10,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              background: ['#2D7DD2', '#16A34A', '#F59E0B', '#E11D48', '#9333EA'][Math.floor(Math.random() * 5)],
              animation: `confettiFall ${1 + Math.random() * 1}s ease-in forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }} />
          ))}
        </div>
      )}

      <div style={{
        background: 'white',
        border: '1.5px solid var(--gray-300)',
        borderRadius: 28,
        padding: step === 'form' ? '48px 44px' : '40px 36px',
        width: '100%',
        maxWidth: step === 'working-rights' ? 520 : 480,
        boxShadow: '0 24px 60px rgba(12,45,94,0.14)',
        transition: 'max-width 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Logo — always visible */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: step === 'tabs' || step === 'who-are-you' ? 28 : 20 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 13,
            background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5 }}>
            Molar<span style={{ color: 'var(--blue-500)' }}>Jobs</span>
          </span>
        </div>

        {/* Progress bar for onboarding steps */}
        {(step === 'student-onboard' || step === 'clinician-onboard' || step === 'working-rights') && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ height: 4, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${progress}%`,
                background: step === 'working-rights'
                  ? 'linear-gradient(90deg, #16A34A, #0AADA8)'
                  : 'linear-gradient(90deg, #2D7DD2, #9333EA)',
                borderRadius: 99,
                transition: 'width 0.4s ease',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 }}>
                {step === 'working-rights' ? `Card ${rightsIdx + 1} of ${RIGHTS_CARDS.length}` : `Question ${currentQ + 1} of ${questions.length}`}
              </span>
              <span style={{ fontSize: 11, color: 'var(--blue-500)', fontWeight: 700 }}>{progress}%</span>
            </div>
          </div>
        )}

        {/* ── STEP: TABS (login mode) ── */}
        {step === 'tabs' && (
          <>
            <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 12, padding: 4, marginBottom: 28, gap: 4 }}>
              {(['login', 'register'] as const).map(t => (
                <button key={t} onClick={() => handleTabSwitch(t)} style={{
                  flex: 1, padding: '10px 0', borderRadius: 9, border: 'none',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  background: tab === t ? 'white' : 'transparent',
                  color: tab === t ? 'var(--blue-700)' : 'var(--gray-500)',
                }}>
                  {t === 'login' ? 'Log In' : 'Create Account'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Email Address</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>Password</label>
                  <Link href="/forgot-password" style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue-500)', textDecoration: 'none' }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required
                    style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                    {!showPass ? (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} style={{
                marginTop: 4, width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
                background: loading ? 'var(--gray-300)' : 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}>
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>or continue with</span>
              <div style={{ flex: 1, height: 1, background: 'var(--gray-300)' }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 0', borderRadius: 10, border: '1.5px solid var(--gray-300)', background: 'white', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-3.58-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                Google
              </button>
              <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 0', borderRadius: 10, border: '1.5px solid var(--gray-300)', background: 'white', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: 20 }}>
              Don't have an account?{' '}
              <button onClick={() => handleTabSwitch('register')} style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'var(--blue-500)', cursor: 'pointer' }}>
                Create one for free
              </button>
            </p>
          </>
        )}

        {/* ── STEP: WHO ARE YOU ── */}
        {step === 'who-are-you' && (
          <div style={{ animation: 'slideUp 0.4s ease' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5, marginBottom: 6, textAlign: 'center' }}>
              Welcome! Who are you? 👋
            </h2>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', textAlign: 'center', marginBottom: 28, lineHeight: 1.6 }}>
              Tell us a bit about yourself so we can personalise your experience.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={() => handleUserType('student')} style={{
                padding: '20px 24px', borderRadius: 16, border: '2px solid var(--gray-200)',
                background: 'white', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all 0.2s', fontFamily: 'inherit',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D7DD2'; (e.currentTarget as HTMLElement).style.background = '#EEF6FF' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLElement).style.background = 'white' }}>
                <div style={{ fontSize: 36, lineHeight: 1 }}>🎓</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 3 }}>I'm a Student</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>Currently studying dental sciences</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--gray-300)', fontSize: 20 }}>→</div>
              </button>

              <button onClick={() => handleUserType('clinician')} style={{
                padding: '20px 24px', borderRadius: 16, border: '2px solid var(--gray-200)',
                background: 'white', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all 0.2s', fontFamily: 'inherit',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0AADA8'; (e.currentTarget as HTMLElement).style.background = '#E6F7F7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLElement).style.background = 'white' }}>
                <div style={{ fontSize: 36, lineHeight: 1 }}>🦷</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 3 }}>I'm a Clinician</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>Qualified dental professional</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--gray-300)', fontSize: 20 }}>→</div>
              </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: 24 }}>
              Already have an account?{' '}
              <button onClick={() => { setTab('login'); setStep('tabs') }} style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'var(--blue-500)', cursor: 'pointer' }}>
                Sign in
              </button>
            </p>
          </div>
        )}

        {/* ── STEP: ONBOARDING QUIZ ── */}
        {(step === 'student-onboard' || step === 'clinician-onboard') && (
          <div style={{ animation: animating ? 'slideOut 0.3s ease' : 'slideUp 0.35s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 42, marginBottom: 10, animation: 'bounce 0.5s ease' }}>
                {questions[currentQ]?.emoji}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5, marginBottom: 6 }}>
                {questions[currentQ]?.question}
              </h3>
              {userType === 'student' && (
                <p style={{ fontSize: 12, color: 'var(--blue-500)', fontWeight: 600 }}>
                  ✨ Help us find the best opportunities for you
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {questions[currentQ]?.options.map((opt, i) => {
                const isSelected = answers[questions[currentQ].id] === opt
                return (
                  <button key={opt} onClick={() => handleAnswer(opt)} style={{
                    padding: '12px 14px', borderRadius: 12, border: '2px solid',
                    borderColor: isSelected ? '#2D7DD2' : 'var(--gray-200)',
                    background: isSelected ? '#EEF6FF' : 'white',
                    cursor: 'pointer', textAlign: 'center', fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 600,
                    color: isSelected ? 'var(--blue-700)' : 'var(--gray-700)',
                    transition: 'all 0.15s',
                    animationDelay: `${i * 0.05}s`,
                    animation: 'slideUp 0.3s ease both',
                  }}
                    onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = '#2D7DD2'; (e.currentTarget as HTMLElement).style.background = '#F8FBFF' } }}
                    onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLElement).style.background = 'white' } }}>
                    {opt}
                  </button>
                )
              })}
            </div>

            <button onClick={() => { setStep('who-are-you'); setCurrentQ(0) }} style={{
              marginTop: 20, background: 'none', border: 'none', fontFamily: 'inherit',
              fontSize: 12, color: 'var(--gray-400)', cursor: 'pointer', display: 'block', margin: '20px auto 0',
            }}>← Back</button>
          </div>
        )}

        {/* ── STEP: WORKING RIGHTS (students mandatory) ── */}
        {step === 'working-rights' && (
          <div style={{ animation: 'slideUp 0.4s ease' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#16A34A', marginBottom: 8 }}>
                📋 Know Your Rights
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5, marginBottom: 6 }}>
                Before you start your career…
              </h3>
              <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>
                Every dental professional should know their employment rights. Swipe through — it takes 60 seconds! 🚀
              </p>
            </div>

            {/* Card */}
            <div ref={cardRef} style={{
              background: RIGHTS_CARDS[rightsIdx].bg,
              border: `2px solid ${RIGHTS_CARDS[rightsIdx].color}33`,
              borderRadius: 20,
              padding: '28px 24px',
              marginBottom: 16,
              animation: 'slideUp 0.3s ease',
              minHeight: 180,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12, textAlign: 'center' }}>{RIGHTS_CARDS[rightsIdx].icon}</div>
              <h4 style={{ fontSize: 18, fontWeight: 800, color: RIGHTS_CARDS[rightsIdx].color, textAlign: 'center', marginBottom: 12 }}>
                {RIGHTS_CARDS[rightsIdx].title}
              </h4>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, textAlign: 'center' }}>
                {RIGHTS_CARDS[rightsIdx].fact}
              </p>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
              {RIGHTS_CARDS.map((_, i) => (
                <div key={i} style={{
                  width: rightsIdx === i ? 20 : 6, height: 6, borderRadius: 99,
                  background: rightsRead.has(i) || rightsIdx === i ? '#16A34A' : 'var(--gray-200)',
                  transition: 'all 0.3s ease',
                }} />
              ))}
            </div>

            <button onClick={handleRightsNext} style={{
              width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
              background: rightsIdx === RIGHTS_CARDS.length - 1
                ? 'linear-gradient(135deg, #16A34A, #0AADA8)'
                : 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
              color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s',
            }}>
              {rightsIdx === RIGHTS_CARDS.length - 1 ? '🎉 I know my rights! Continue →' : 'Next →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-400)', marginTop: 10 }}>
              This section is required for all students
            </p>
          </div>
        )}

        {/* ── STEP: FORM (existing register form) ── */}
        {step === 'form' && (
          <div style={{ animation: 'slideUp 0.4s ease' }}>
            {/* Summary of answers */}
            {Object.keys(answers).length > 0 && (
              <div style={{
                background: 'var(--gray-100)', borderRadius: 12, padding: '12px 16px',
                marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap',
              }}>
                {Object.entries(answers).map(([k, v]) => (
                  <span key={k} style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
                    background: 'white', color: 'var(--blue-700)', border: '1px solid var(--blue-100)',
                  }}>
                    {v}
                  </span>
                ))}
                <span style={{ fontSize: 11, color: 'var(--gray-400)', alignSelf: 'center' }}>· personalised for you</span>
              </div>
            )}

            <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
              <button style={{ flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, background: 'white', color: 'var(--blue-700)' }}>
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Full Name</label>
                <input type="text" placeholder="Dr. Nino Kapanadze" required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Email Address</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required
                    style={{ width: '100%', padding: '12px 44px 12px 14px', borderRadius: 10, border: '1.5px solid var(--gray-300)', outline: 'none', fontFamily: 'inherit', fontSize: 14, boxSizing: 'border-box' }} />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                    {!showPass ? (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { value: 'professional', label: "🦷 I'm a Professional" },
                  { value: 'clinic', label: "🏥 I'm a Clinic" },
                ].map(opt => (
                  <label key={opt.value} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '11px 0', borderRadius: 10, border: '1.5px solid var(--gray-300)',
                    cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)',
                  }}>
                    <input type="radio" name="account_type" value={opt.value} style={{ accentColor: 'var(--blue-500)' }} />
                    {opt.label}
                  </label>
                ))}
              </div>

              <button type="submit" disabled={loading} style={{
                marginTop: 4, width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
                background: loading ? 'var(--gray-300)' : 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>

            {/* Clinician: working rights optional */}
            {userType === 'clinician' && (
              <div style={{
                marginTop: 16, padding: '12px 16px', borderRadius: 10,
                background: '#F0FDF4', border: '1px solid #86EFAC',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>📋</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>Know your rights</div>
                  <div style={{ fontSize: 11, color: '#374151' }}>Recommended for all professionals</div>
                </div>
                <button onClick={() => { setStep('working-rights'); setRightsIdx(0); setRightsRead(new Set()) }} style={{
                  padding: '6px 12px', borderRadius: 8, border: 'none',
                  background: '#16A34A', color: 'white', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Read →
                </button>
              </div>
            )}

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: 16 }}>
              Already have an account?{' '}
              <button onClick={() => { setTab('login'); setStep('tabs') }} style={{ background: 'none', border: 'none', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'var(--blue-500)', cursor: 'pointer' }}>
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-12px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        @keyframes confettiFall {
          from { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

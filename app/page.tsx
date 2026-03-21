'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── SHARED BUTTON STYLES ────────────────────────────────────────
const btnPrimary: React.CSSProperties = {
  padding: '9px 20px', borderRadius: 8, border: 'none',
  background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
  fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', gap: 6,
  boxShadow: '0 2px 8px rgba(45,125,210,0.35)',
  transition: 'all 0.2s', textDecoration: 'none',
}

// ─── SAMPLE JOB DATA (replace with Supabase fetch later) ─────────
const SAMPLE_JOBS = [
  { id: '1', title: 'Orthodontist',    clinic: 'Silk Dental Clinic',  type: 'Full-time', salary: '₾3,500/mo', city: 'Tbilisi, Vake',    tags: ['Braces','Invisalign','Pediatric'], initials: 'SD', color: '#2D7DD2' },
  { id: '2', title: 'Dental Assistant',clinic: 'Dental Plus',         type: 'Part-time', salary: '₾1,800/mo', city: 'Tbilisi, Saburtalo',tags: ['Sterilization','X-Ray','Reception'],initials: 'DP', color: '#0AADA8' },
  { id: '3', title: 'Periodontist',    clinic: 'OrthoCare Batumi',    type: 'Full-time', salary: '₾4,200/mo', city: 'Batumi, Center',    tags: ['Implants','Surgery','Laser'],       initials: 'OC', color: '#9333EA' },
]

export default function HomePage() {
  const [popupVisible, setPopupVisible] = useState(true)

  return (
    <div>

      {/* ── HERO ── */}
      <section style={{
        padding: '80px 40px',
        background: 'radial-gradient(ellipse 70% 50% at 60% 20%, rgba(45,125,210,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(10,173,168,0.06) 0%, transparent 60%), linear-gradient(180deg, #EEF6FF 0%, #ffffff 100%)',
        minHeight: '88vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Left content */}
        <div style={{ maxWidth: 580, position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div className="animate-fadeUp" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'white', border: '1px solid #DDEEFF',
            borderRadius: 50, padding: '6px 16px 6px 10px',
            fontSize: 13, fontWeight: 600, color: 'var(--blue-700)',
            marginBottom: 28, boxShadow: 'var(--shadow-sm)',
          }}>
            <div className="animate-pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)' }} />
            Georgia&apos;s #1 Dental Job Platform
          </div>

          <h1 className="animate-fadeUp delay-1" style={{
            fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: -2, color: 'var(--blue-900)',
            marginBottom: 22,
          }}>
            Your Next{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-500)', letterSpacing: -1 }}>
              Dental Career
            </em>{' '}
            Starts Here
          </h1>

          <p className="animate-fadeUp delay-2" style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--gray-500)', maxWidth: 480, marginBottom: 40 }}>
            Connect with top dental clinics across Georgia. Browse verified vacancies, explore locations on the map, and apply in minutes.
          </p>

          {/* Search bar */}
          <div className="animate-fadeUp delay-3" style={{
            background: 'white', border: '1.5px solid var(--gray-300)',
            borderRadius: 14, padding: '6px 6px 6px 20px',
            display: 'flex', alignItems: 'center',
            boxShadow: 'var(--shadow-lg)', marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <svg width="18" height="18" fill="none" stroke="var(--gray-500)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="text" placeholder="Role, specialty, or clinic..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontFamily: 'inherit', fontSize: 15, color: 'var(--gray-900)' }} />
            </div>
            <div style={{ width: 1, height: 26, background: 'var(--gray-300)', margin: '0 14px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <svg width="18" height="18" fill="none" stroke="var(--gray-500)" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <input type="text" placeholder="City — Tbilisi, Batumi..."
                style={{ flex: 1, border: 'none', outline: 'none', background: 'none', fontFamily: 'inherit', fontSize: 15, color: 'var(--gray-900)' }} />
            </div>
            <button style={{ background: 'linear-gradient(135deg,#2D7DD2,#1A56A0)', border: 'none', borderRadius: 10, width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </div>

          {/* Quick search tags */}
          <div className="animate-fadeUp delay-4" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Popular:</span>
            {['Orthodontist', 'Dental Assistant', 'Tbilisi'].map(tag => (
              <button key={tag} style={{ padding: '5px 12px', borderRadius: 50, background: 'white', border: '1px solid var(--gray-300)', fontSize: 13, fontWeight: 500, color: 'var(--blue-700)', cursor: 'pointer' }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Right panel — hidden on mobile via CSS */}
        <div className="hero-right-panel" style={{ position: 'absolute', right: 60, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 16, zIndex: 2 }}>
          {/* Stats card */}
          <div style={{ background: 'white', borderRadius: 20, padding: '24px 28px', boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(209,216,228,0.5)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[['240+','Vacancies'],['180+','Clinics'],['3.5k','Professionals'],['12','Cities']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--blue-700)', display: 'block', letterSpacing: -1 }}>{num}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating job card */}
          {popupVisible ? (
            <div className="animate-float" style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-xl)', border: '1px solid rgba(209,216,228,0.5)', width: 280, position: 'relative' }}>
              <span style={{ position: 'absolute', top: -8, left: 16, background: 'var(--teal)', color: 'white', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 4 }}>NEW</span>
              <button
                onClick={() => setPopupVisible(false)}
                style={{ position: 'absolute', top: 12, right: 12, width: 26, height: 26, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--gray-500)' }}
                aria-label="Close"
              >✕</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, paddingRight: 20 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--blue-700)', fontSize: 15, flexShrink: 0 }}>SD</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue-900)' }}>Orthodontist</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Silk Dental · Tbilisi, Vake</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {['Full-time','Senior','Invisalign'].map(t => (
                  <span key={t} style={{ padding: '3px 9px', borderRadius: 20, background: 'var(--blue-50)', fontSize: 11, fontWeight: 600, color: 'var(--blue-700)' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--blue-700)' }}>₾3,500/mo</span>
                <button style={{ background: 'linear-gradient(135deg,#2D7DD2,#1A56A0)', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Apply Now</button>
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--gray-100)', borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, width: 280 }}>
              <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>Card dismissed</span>
              <button onClick={() => setPopupVisible(true)} style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: 'var(--blue-500)', background: 'none', border: 'none', cursor: 'pointer' }}>Undo</button>
            </div>
          )}
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <div style={{ padding: '32px 40px', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: 1 }}>Trusted by clinics across Georgia</span>
          {[['SD','Silk Dental'],['DP','Dental Plus'],['MC','MedClinic'],['SS','SmileSpace'],['OC','OrthoCare']].map(([init, name]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-100)', borderRadius: 50, padding: '8px 16px 8px 10px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: 'var(--blue-700)' }}>{init}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '90px 40px', background: 'var(--gray-100)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--blue-500)', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>How It Works</span>
          <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: -1.5, color: 'var(--blue-900)', marginBottom: 56 }}>
            Get hired in{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-500)' }}>three steps</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { num: '01', title: 'Create Your Profile', desc: 'Upload your CV, list specialties, and set location and salary preferences. Takes under 5 minutes.' },
              { num: '02', title: 'Search & Explore',    desc: 'Browse by role, salary, or explore the interactive map. Filter by clinic rating, distance, or specialty.' },
              { num: '03', title: 'Apply in One Click',  desc: 'Send your full profile instantly. Track every application from your personal dashboard.' },
            ].map(step => (
              <div key={step.num} style={{ background: 'white', borderRadius: 20, padding: '36px 32px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(209,216,228,0.6)', position: 'relative', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: 20, right: 24, fontSize: 64, fontWeight: 800, color: 'rgba(45,125,210,0.06)', lineHeight: 1 }}>{step.num}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-400)', letterSpacing: 1, marginBottom: 20, display: 'block' }}>STEP {step.num}</span>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST JOBS ── */}
      <section style={{ padding: '90px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--blue-500)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Latest Listings</span>
              <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, letterSpacing: -1.5, color: 'var(--blue-900)' }}>
                Fresh{' '}<em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-500)' }}>vacancies</em>
              </h2>
            </div>
            <Link href="/" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue-500)', textDecoration: 'none' }}>View all 240+ jobs →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {SAMPLE_JOBS.map(job => (
              <div key={job.id} style={{ background: 'white', border: '1.5px solid var(--gray-300)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'all 0.25s', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, color: job.color }}>{job.initials}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: job.type === 'Full-time' ? '#DCFCE7' : '#FEF3C7', color: job.type === 'Full-time' ? '#16A34A' : '#D97706' }}>{job.type}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 4 }}>{job.title}</h3>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 14 }}>{job.clinic}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {job.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue-700)', background: 'var(--blue-50)', borderRadius: 6, padding: '4px 9px' }}>{t}</span>)}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--blue-700)' }}>{job.salary}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{job.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SPLIT ── */}
      <section style={{ padding: '80px 40px', background: 'var(--gray-100)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div style={{ borderRadius: 28, padding: '52px 48px', background: 'linear-gradient(135deg, #2D7DD2 0%, #0C2D5E 100%)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', right: -60, bottom: -60 }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 14, display: 'block' }}>For Professionals</span>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, color: 'white', marginBottom: 12 }}>Ready to find your dream dental role?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 32 }}>Join 3,500+ dental professionals already using MolarJobs.</p>
            <button style={{ padding: '13px 28px', borderRadius: 8, border: 'none', background: 'white', fontSize: 15, fontWeight: 700, color: 'var(--blue-700)', cursor: 'pointer' }}>Create Free Profile →</button>
          </div>
          <div style={{ borderRadius: 28, padding: '52px 48px', background: 'white', border: '1.5px solid var(--gray-300)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--blue-500)', marginBottom: 14, display: 'block' }}>For Clinics</span>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1, color: 'var(--blue-900)', marginBottom: 12 }}>Hiring dental professionals?</h2>
            <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Post vacancies in under 3 minutes','Appear on the interactive map','Receive and manage applications','Get verified clinic badge'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--gray-500)' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--blue-50)', color: 'var(--blue-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button style={{ ...btnPrimary, fontSize: 15, padding: '13px 28px' } as React.CSSProperties}>Register Your Clinic →</button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .hero-right-panel { display: none !important; } }
        @media (max-width: 768px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  )
}
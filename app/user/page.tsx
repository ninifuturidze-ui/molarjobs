'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function UserDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cityParam = searchParams.get('city') || 'Tbilisi'
  const [showLocationModal, setShowLocationModal] = useState(true)
  const [locationMode, setLocationMode] = useState<'none' | 'precise' | 'city'>('none')

  const handlePreciseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationMode('precise')
          setShowLocationModal(false)
        },
        () => {
          setLocationMode('city')
          setShowLocationModal(false)
        }
      )
    } else {
      setLocationMode('city')
      setShowLocationModal(false)
    }
  }

  const handleSkipLocation = () => {
    setLocationMode('city')
    setShowLocationModal(false)
  }

  const goToMap = () => {
    if (locationMode === 'precise') {
      router.push('/map?mode=precise')
    } else {
      router.push(`/map?city=${encodeURIComponent(cityParam)}`)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #EEF6FF 0%, #F5F3FF 50%, #ffffff 100%)',
      padding: '40px 20px',
    }}>

      {/* ── LOCATION MODAL ── */}
      {showLocationModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(12,45,94,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            background: 'white', borderRadius: 24, padding: '36px 32px',
            maxWidth: 420, width: '100%',
            boxShadow: '0 24px 60px rgba(12,45,94,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📍</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 8 }}>
              Enable precise location?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 24 }}>
              We'll sort jobs by distance from your home so you see the closest opportunities first.
            </p>
            <button onClick={handlePreciseLocation} style={{
              width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
              color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              marginBottom: 10, fontFamily: 'inherit',
            }}>
              Allow precise location
            </button>
            <button onClick={handleSkipLocation} style={{
              width: '100%', padding: '14px 0', borderRadius: 12,
              border: '1.5px solid var(--gray-300)',
              background: 'white', color: 'var(--gray-600)',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Use city only ({cityParam})
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '28px 32px',
          boxShadow: '0 4px 20px rgba(12,45,94,0.10)',
          marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            👋
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 4 }}>
              Welcome to MolarJobs!
            </h1>
            <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>
              📍 Showing opportunities near <strong>{cityParam}</strong>
              {locationMode === 'precise' && ' · 🎯 Precise location active'}
            </p>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Jobs Nearby', value: '12', icon: '💼', color: '#2D7DD2' },
            { label: 'Match Score', value: '87%', icon: '🎯', color: '#16A34A' },
            { label: 'Applications', value: '0', icon: '📋', color: '#9333EA' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'white', borderRadius: 16, padding: '20px',
              boxShadow: '0 4px 20px rgba(12,45,94,0.08)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── MAP CTA ── */}
        <div style={{
          background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
          borderRadius: 20, padding: '28px 32px',
          boxShadow: '0 8px 32px rgba(45,125,210,0.3)',
          marginBottom: 20, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
        }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
              🗺 Explore the Job Map
            </h2>
            <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5 }}>
              {locationMode === 'precise'
                ? 'Precise location active — jobs sorted by distance from you'
                : `Showing jobs in ${cityParam}`}
            </p>
          </div>
          <button onClick={goToMap} style={{
            padding: '12px 24px', borderRadius: 12, border: '2px solid white',
            background: 'white', color: '#1A56A0',
            fontSize: 14, fontWeight: 800, cursor: 'pointer',
            whiteSpace: 'nowrap', fontFamily: 'inherit', flexShrink: 0,
          }}>
            Open Map →
          </button>
        </div>

        {/* ── PROFILE COMPLETION ── */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '24px 28px',
          boxShadow: '0 4px 20px rgba(12,45,94,0.08)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--blue-900)' }}>Profile Completion</h3>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#2D7DD2' }}>50%</span>
          </div>
          <div style={{ height: 8, background: 'var(--gray-100)', borderRadius: 99, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #2D7DD2, #9333EA)', borderRadius: 99 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Account created', done: true },
              { label: 'Specialty selected', done: true },
              { label: 'Upload CV', done: false },
              { label: 'Add profile photo', done: false },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: item.done ? '#DCFCE7' : 'var(--gray-100)',
                  border: `2px solid ${item.done ? '#16A34A' : 'var(--gray-300)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: item.done ? '#16A34A' : 'var(--gray-400)',
                }}>
                  {item.done ? '✓' : '○'}
                </div>
                <span style={{ fontSize: 13, color: item.done ? 'var(--gray-700)' : 'var(--gray-400)', fontWeight: item.done ? 600 : 400 }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK LINKS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {[
            { label: 'Browse Jobs', icon: '💼', path: '/map' },
            { label: 'My Applications', icon: '📋', path: '/applications' },
            { label: 'Edit Profile', icon: '👤', path: '/profile' },
            { label: 'Settings', icon: '⚙️', path: '/settings' },
          ].map(link => (
            <button key={link.label} onClick={() => router.push(link.path)} style={{
              background: 'white', borderRadius: 16, padding: '20px',
              boxShadow: '0 4px 20px rgba(12,45,94,0.08)',
              border: '1.5px solid var(--gray-200)',
              cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', gap: 12,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D7DD2'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-200)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
            >
              <span style={{ fontSize: 24 }}>{link.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue-900)' }}>{link.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default function UserPage() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <UserDashboard />
    </Suspense>
  )
}
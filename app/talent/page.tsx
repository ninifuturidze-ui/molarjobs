'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── MOCK DATA (replace with Supabase query when ready) ──────────
const MOCK_PROFILES = [
  {
    id: '1',
    full_name: 'Dr. Nino Kapanadze',
    title: 'Orthodontist',
    city: 'Tbilisi',
    experience_years: 9,
    specialties: ['Invisalign', 'Braces', 'Pediatric Ortho'],
    bio: 'Certified orthodontist with 9 years of experience in both private and public practice. Passionate about creating beautiful, functional smiles using the latest techniques.',
    promotion_tier: 'featured' as const,
    verified: true,
    initials: 'NK',
    color: '#2D7DD2',
    available: true,
  },
  {
    id: '2',
    full_name: 'Giorgi Beridze',
    title: 'Dental Technician',
    city: 'Tbilisi',
    experience_years: 6,
    specialties: ['CAD/CAM', 'Ceramics', 'Implant Prosthetics'],
    bio: 'Skilled dental technician specializing in high-aesthetic ceramic restorations. Experienced with full digital workflows and major CAD/CAM systems.',
    promotion_tier: 'pro' as const,
    verified: true,
    initials: 'GB',
    color: '#0AADA8',
    available: true,
  },
  {
    id: '3',
    full_name: 'Ana Tskitishvili',
    title: 'Dental Hygienist',
    city: 'Batumi',
    experience_years: 4,
    specialties: ['Periodontics', 'Whitening', 'Patient Education'],
    bio: 'Dedicated dental hygienist with a focus on preventive care and patient education. Committed to delivering gentle, thorough care in a calm environment.',
    promotion_tier: 'basic' as const,
    verified: false,
    initials: 'AT',
    color: '#9333EA',
    available: false,
  },
  {
    id: '4',
    full_name: 'Dr. Levan Mchedlishvili',
    title: 'Oral Surgeon',
    city: 'Tbilisi',
    experience_years: 14,
    specialties: ['Implants', 'Bone Grafting', 'Wisdom Teeth', 'Trauma'],
    bio: 'Experienced oral and maxillofacial surgeon. Subspecialty in complex implant rehabilitation and guided bone regeneration. Trained in Germany and Georgia.',
    promotion_tier: 'featured' as const,
    verified: true,
    initials: 'LM',
    color: '#1A56A0',
    available: true,
  },
  {
    id: '5',
    full_name: 'Mariam Jgenti',
    title: 'Dental Assistant',
    city: 'Kutaisi',
    experience_years: 2,
    specialties: ['Chairside Assisting', 'X-Ray', 'Sterilization'],
    bio: 'Enthusiastic dental assistant eager to grow in a supportive practice. Quick learner with strong interpersonal skills and attention to detail.',
    promotion_tier: 'free' as const,
    verified: false,
    initials: 'MJ',
    color: '#F59E0B',
    available: true,
  },
  {
    id: '6',
    full_name: 'Dr. Tornike Abuladze',
    title: 'Prosthodontist',
    city: 'Tbilisi',
    experience_years: 11,
    specialties: ['Full Mouth Rehab', 'Veneers', 'Implant Crowns', 'Smile Design'],
    bio: 'Prosthodontist with over a decade of experience in complex restorative cases. Aesthetic-focused with a meticulous approach to every case.',
    promotion_tier: 'pro' as const,
    verified: true,
    initials: 'TA',
    color: '#16A34A',
    available: false,
  },
]

const TIER_CONFIG = {
  featured: { label: '⭐ Featured',   bg: '#FFF7E6', color: '#B45309', border: '#FCD34D' },
  pro:      { label: '🔵 Pro',        bg: '#EEF6FF', color: '#1A56A0', border: '#BFDBFE' },
  basic:    { label: '🟢 Basic',      bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
  free:     { label: 'Free',          bg: 'var(--gray-100)', color: 'var(--gray-500)', border: 'var(--gray-300)' },
}

const BOOST_PLANS = [
  {
    id: 'basic',
    name: 'Basic Boost',
    price: '₾29',
    period: '/month',
    color: '#16A34A',
    features: ['Appear above free profiles', 'Basic badge on your card', 'Profile analytics'],
  },
  {
    id: 'pro',
    name: 'Pro Boost',
    price: '₾59',
    period: '/month',
    color: '#1A56A0',
    popular: true,
    features: ['Top of category listings', 'Pro badge + verified priority', 'Profile analytics', 'Direct message from clinics', 'CV download enabled'],
  },
  {
    id: 'featured',
    name: 'Featured',
    price: '₾99',
    period: '/month',
    color: '#B45309',
    features: ['Homepage featured slot', 'Gold ⭐ Featured badge', 'All Pro features', 'Priority clinic introductions', 'Dedicated account support'],
  },
]

type Tier = 'featured' | 'pro' | 'basic' | 'free'

export default function TalentPage() {
  const [search, setSearch]         = useState('')
  const [cityFilter, setCityFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [selectedPlan, setSelectedPlan]     = useState<string | null>(null)

  const cities = ['All', ...Array.from(new Set(MOCK_PROFILES.map(p => p.city)))]
  const roles  = ['All', ...Array.from(new Set(MOCK_PROFILES.map(p => p.title)))]

  const filtered = MOCK_PROFILES
    .filter(p => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.full_name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.specialties.some(s => s.toLowerCase().includes(q))
      const matchCity = cityFilter === 'All' || p.city === cityFilter
      const matchRole = roleFilter === 'All' || p.title === roleFilter
      return matchSearch && matchCity && matchRole
    })
    // Sort: featured → pro → basic → free
    .sort((a, b) => {
      const order: Record<Tier, number> = { featured: 0, pro: 1, basic: 2, free: 3 }
      return order[a.promotion_tier as Tier] - order[b.promotion_tier as Tier]
    })

  return (
    <div style={{ background: 'var(--gray-100)', minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
        padding: '60px 40px 50px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
            Talent Board
          </span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: 'white', letterSpacing: -1.5, marginBottom: 12 }}>
            Discover Dental{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-400)' }}>
              Professionals
            </em>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
            Browse verified dentists, hygienists, assistants, and technicians across Georgia. Boost your own profile to get found faster.
          </p>

          {/* Search bar */}
          <div style={{
            background: 'white', border: '1.5px solid var(--gray-300)',
            borderRadius: 12, padding: '6px 6px 6px 18px',
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: 'var(--shadow-lg)', maxWidth: 560,
          }}>
            <svg width="18" height="18" fill="none" stroke="var(--gray-500)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, role, or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'none',
                fontFamily: 'inherit', fontSize: 15, color: 'var(--gray-900)',
              }}
            />
            <button
              onClick={() => setShowBoostModal(true)}
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                border: 'none', borderRadius: 8, padding: '10px 18px',
                fontSize: 13, fontWeight: 700, color: 'white', cursor: 'pointer',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              ⭐ Boost My Profile
            </button>
          </div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--gray-300)', padding: '16px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)' }}>Filter:</span>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                  borderColor: cityFilter === c ? 'var(--blue-500)' : 'var(--gray-300)',
                  background: cityFilter === c ? 'var(--blue-50)' : 'white',
                  color: cityFilter === c ? 'var(--blue-700)' : 'var(--gray-700)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ width: 1, height: 20, background: 'var(--gray-300)' }} />

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                  borderColor: roleFilter === r ? 'var(--teal)' : 'var(--gray-300)',
                  background: roleFilter === r ? 'var(--teal-50)' : 'white',
                  color: roleFilter === r ? 'var(--teal)' : 'var(--gray-700)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROFILE GRID ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px' }}>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 24, fontWeight: 500 }}>
          {filtered.length} professional{filtered.length !== 1 ? 's' : ''} found
          {(cityFilter !== 'All' || roleFilter !== 'All' || search) && ' · Filters active'}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray-500)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>No profiles found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}>
            {filtered.map(profile => {
              const tier = TIER_CONFIG[profile.promotion_tier as Tier]
              const isBoosted = profile.promotion_tier !== 'free'
              return (
                <div
                  key={profile.id}
                  style={{
                    background: 'white',
                    border: `1.5px solid ${isBoosted ? tier.border : 'var(--gray-300)'}`,
                    borderRadius: 20,
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    position: 'relative',
                    boxShadow: isBoosted ? `0 4px 20px ${tier.border}44` : 'var(--shadow-sm)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = isBoosted ? `0 4px 20px ${tier.border}44` : 'var(--shadow-sm)'
                  }}
                >
                  {/* Tier badge */}
                  {isBoosted && (
                    <span style={{
                      position: 'absolute', top: 16, right: 16,
                      fontSize: 11, fontWeight: 700,
                      background: tier.bg, color: tier.color,
                      border: `1px solid ${tier.border}`,
                      borderRadius: 6, padding: '3px 8px',
                    }}>
                      {tier.label}
                    </span>
                  )}

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                      background: `${profile.color}18`,
                      border: `2px solid ${profile.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 800, color: profile.color,
                    }}>
                      {profile.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {profile.full_name}
                        </span>
                        {profile.verified && (
                          <span title="Verified" style={{ fontSize: 14, flexShrink: 0 }}>✅</span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>
                        {profile.title} · {profile.city}
                      </div>
                    </div>
                  </div>

                  {/* Availability pill */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20,
                      background: profile.available ? 'var(--green-50)' : 'var(--rose-50)',
                      color: profile.available ? 'var(--green)' : 'var(--rose)',
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                      {profile.available ? 'Available Now' : 'Not Available'}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>
                      {profile.experience_years} yrs exp
                    </span>
                  </div>

                  {/* Bio */}
                  <p style={{
                    fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.65,
                    display: '-webkit-box', WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {profile.bio}
                  </p>

                  {/* Specialties */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {profile.specialties.map(s => (
                      <span key={s} style={{
                        fontSize: 11, fontWeight: 600,
                        background: 'var(--blue-50)', color: 'var(--blue-700)',
                        borderRadius: 6, padding: '3px 9px',
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button style={{
                      flex: 1, padding: '10px 0', borderRadius: 8,
                      background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                      border: 'none', color: 'white', fontSize: 13, fontWeight: 700,
                      cursor: 'pointer',
                    }}>
                      View Profile
                    </button>
                    <button style={{
                      padding: '10px 14px', borderRadius: 8,
                      border: '1.5px solid var(--gray-300)', background: 'white',
                      color: 'var(--gray-700)', fontSize: 13, cursor: 'pointer',
                    }}
                      title="Save profile"
                    >
                      🔖
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA for professionals */}
        <div style={{
          marginTop: 56,
          borderRadius: 24,
          background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
          padding: '48px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: -0.8, marginBottom: 8 }}>
              Are you a dental professional?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', maxWidth: 480, lineHeight: 1.65 }}>
              Create your profile and let clinics across Georgia find you. Boost it to jump to the top.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowBoostModal(true)}
              style={{
                padding: '13px 24px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                fontSize: 14, fontWeight: 700, color: 'white', cursor: 'pointer',
              }}
            >
              ⭐ Boost My Profile
            </button>
            <button style={{
              padding: '13px 24px', borderRadius: 10,
              border: '1.5px solid rgba(255,255,255,0.3)', background: 'transparent',
              fontSize: 14, fontWeight: 600, color: 'white', cursor: 'pointer',
            }}>
              Create Free Profile
            </button>
          </div>
        </div>
      </div>

      {/* ── BOOST MODAL ── */}
      {showBoostModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(12, 45, 94, 0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowBoostModal(false) }}
        >
          <div style={{
            background: 'white', borderRadius: 24,
            padding: '40px 36px', maxWidth: 760, width: '100%',
            boxShadow: 'var(--shadow-xl)',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.8 }}>
                  Boost Your Profile
                </h2>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 6 }}>
                  Stand out to clinics. Get more views, more messages, more offers.
                </p>
              </div>
              <button
                onClick={() => setShowBoostModal(false)}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none',
                  background: 'var(--gray-100)', cursor: 'pointer',
                  fontSize: 16, color: 'var(--gray-500)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            {/* Plans */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '28px 0' }}>
              {BOOST_PLANS.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    border: `2px solid ${selectedPlan === plan.id ? plan.color : 'var(--gray-300)'}`,
                    borderRadius: 16, padding: '24px 20px', cursor: 'pointer',
                    position: 'relative', transition: 'all 0.2s',
                    background: selectedPlan === plan.id ? `${plan.color}08` : 'white',
                  }}
                >
                  {plan.popular && (
                    <span style={{
                      position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                      background: plan.color, color: 'white', fontSize: 11, fontWeight: 700,
                      padding: '3px 12px', borderRadius: 20, whiteSpace: 'nowrap',
                    }}>
                      Most Popular
                    </span>
                  )}
                  <div style={{ fontSize: 28, fontWeight: 800, color: plan.color, letterSpacing: -1 }}>
                    {plan.price}
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--gray-500)' }}>{plan.period}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue-900)', margin: '8px 0 14px' }}>
                    {plan.name}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--gray-600)' }}>
                        <span style={{ color: plan.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              disabled={!selectedPlan}
              style={{
                width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                background: selectedPlan
                  ? `linear-gradient(135deg, ${BOOST_PLANS.find(p => p.id === selectedPlan)?.color}, ${BOOST_PLANS.find(p => p.id === selectedPlan)?.color}CC)`
                  : 'var(--gray-300)',
                color: 'white', fontSize: 15, fontWeight: 700,
                cursor: selectedPlan ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {selectedPlan
                ? `Continue with ${BOOST_PLANS.find(p => p.id === selectedPlan)?.name} →`
                : 'Select a plan to continue'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: 12 }}>
              Cancel anytime · Secure payment · Instant activation
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
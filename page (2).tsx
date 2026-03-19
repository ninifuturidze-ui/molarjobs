'use client'

import { useState } from 'react'

// ─── MOCK DATA ───────────────────────────────────────────────────
const MOCK_REVIEWS = [
  {
    id: '1',
    reviewer_name: 'Nino K.',
    reviewer_type: 'worker' as const,
    target_type: 'clinic' as const,
    target_id: 'c1',
    target_name: 'Silk Dental Clinic',
    target_city: 'Tbilisi, Vake',
    target_initials: 'SD',
    target_color: '#2D7DD2',
    rating: 5,
    text: 'Absolutely the best dental employer I have worked for in Georgia. Modern equipment, fair salaries paid on time, and a management team that genuinely listens to staff. The clinic invests in continuing education and sent me to a hands-on implant course in Warsaw. Highly recommend to any professional looking for a long-term home.',
    rating_management: 5,
    rating_equipment: 5,
    rating_salary: 4,
    rating_worklife: 5,
    verified_worker: true,
    helpful_count: 34,
    clinic_reply: 'Thank you for these kind words! We are proud to support our team's professional development. We hope to grow together for many more years.',
    created_at: '2025-11-15',
    position: 'Senior Orthodontist',
    tenure: '3 years',
  },
  {
    id: '2',
    reviewer_name: 'Giorgi B.',
    reviewer_type: 'worker' as const,
    target_type: 'clinic' as const,
    target_id: 'c2',
    target_name: 'Dental Plus',
    target_city: 'Tbilisi, Saburtalo',
    target_initials: 'DP',
    target_color: '#0AADA8',
    rating: 4,
    text: 'Good working environment with a friendly team. The location is convenient and patient flow is steady. I would have given 5 stars but salary negotiation was a bit rigid. Equipment is up to date and the lab turnaround is fast — a big plus for my prosthetics work.',
    rating_management: 4,
    rating_equipment: 5,
    rating_salary: 3,
    rating_worklife: 4,
    verified_worker: true,
    helpful_count: 18,
    clinic_reply: null,
    created_at: '2025-10-28',
    position: 'Dental Technician',
    tenure: '1.5 years',
  },
  {
    id: '3',
    reviewer_name: 'Patient – Tamar M.',
    reviewer_type: 'patient' as const,
    target_type: 'clinic' as const,
    target_id: 'c1',
    target_name: 'Silk Dental Clinic',
    target_city: 'Tbilisi, Vake',
    target_initials: 'SD',
    target_color: '#2D7DD2',
    rating: 5,
    text: 'I had a full smile makeover here — eight veneers, whitening, and gum recontouring. The result exceeded my expectations completely. The team is warm, professional, and never made me feel rushed. Pricing is transparent and they offered a flexible payment plan. I have recommended this clinic to five friends already.',
    rating_management: null,
    rating_equipment: null,
    rating_salary: null,
    rating_worklife: null,
    verified_worker: false,
    helpful_count: 42,
    clinic_reply: 'Thank you so much, Tamar! Smile makeovers are our passion and it is wonderful to hear you love your results. See you at your next check-up!',
    created_at: '2025-12-03',
    position: null,
    tenure: null,
  },
  {
    id: '4',
    reviewer_name: 'Luka T.',
    reviewer_type: 'worker' as const,
    target_type: 'clinic' as const,
    target_id: 'c3',
    target_name: 'OrthoCare Batumi',
    target_city: 'Batumi, Center',
    target_initials: 'OC',
    target_color: '#9333EA',
    rating: 3,
    text: 'Mixed experience. The clinical side is well organised and the owner is knowledgeable. However, the admin systems are outdated and scheduling can be chaotic during peak tourist season. Work-life balance suffers in summer. Salary is competitive for Batumi. Good stepping stone but I moved on after a year.',
    rating_management: 2,
    rating_equipment: 4,
    rating_salary: 4,
    rating_worklife: 2,
    verified_worker: true,
    helpful_count: 11,
    clinic_reply: null,
    created_at: '2025-09-10',
    position: 'General Dentist',
    tenure: '1 year',
  },
  {
    id: '5',
    reviewer_name: 'Ana T.',
    reviewer_type: 'worker' as const,
    target_type: 'clinic' as const,
    target_id: 'c4',
    target_name: 'MedClinic Tbilisi',
    target_city: 'Tbilisi, Didube',
    target_initials: 'MC',
    target_color: '#16A34A',
    rating: 5,
    text: 'I joined as a hygienist fresh out of university and the team mentored me every step of the way. The head dentist takes time to explain complex cases and there is a real culture of learning here. Flexible shift patterns work well around my studies. Cannot ask for more from a first position.',
    rating_management: 5,
    rating_equipment: 4,
    rating_salary: 4,
    rating_worklife: 5,
    verified_worker: true,
    helpful_count: 27,
    clinic_reply: 'We love having enthusiastic early-career professionals like you on the team, Ana. Looking forward to watching you grow!',
    created_at: '2025-11-30',
    position: 'Dental Hygienist',
    tenure: '8 months',
  },
  {
    id: '6',
    reviewer_name: 'Patient – Davit R.',
    reviewer_type: 'patient' as const,
    target_type: 'clinic' as const,
    target_id: 'c3',
    target_name: 'OrthoCare Batumi',
    target_city: 'Batumi, Center',
    target_initials: 'OC',
    target_color: '#9333EA',
    rating: 4,
    text: 'Visited for an implant consultation while on holiday in Batumi. The specialist was thorough and honest — told me I needed bone grafting first, explained the timeline clearly, and gave me a detailed quote. I appreciated the honesty rather than just booking me in for money. Waiting room could be improved.',
    rating_management: null,
    rating_equipment: null,
    rating_salary: null,
    rating_worklife: null,
    verified_worker: false,
    helpful_count: 9,
    clinic_reply: null,
    created_at: '2025-08-22',
    position: null,
    tenure: null,
  },
]

const CLINICS = [
  { id: 'all', name: 'All Clinics' },
  { id: 'c1', name: 'Silk Dental Clinic' },
  { id: 'c2', name: 'Dental Plus' },
  { id: 'c3', name: 'OrthoCare Batumi' },
  { id: 'c4', name: 'MedClinic Tbilisi' },
]

function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(star => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= value ? '#F59E0B' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function SubRating({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, color: 'var(--gray-500)', width: 90, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 5, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${(value / 5) * 100}%`,
          background: value >= 4 ? 'var(--green)' : value >= 3 ? '#F59E0B' : 'var(--rose)',
          borderRadius: 99,
          transition: 'width 0.6s ease',
        }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-700)', width: 20, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

export default function ReviewsPage() {
  const [filterClinic, setFilterClinic]   = useState('all')
  const [filterType, setFilterType]       = useState<'all' | 'worker' | 'patient'>('all')
  const [filterRating, setFilterRating]   = useState(0)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [helpfulClicked, setHelpfulClicked] = useState<Set<string>>(new Set())
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())

  // Form state
  const [formClinic, setFormClinic]     = useState('')
  const [formType, setFormType]         = useState<'worker' | 'patient'>('worker')
  const [formRating, setFormRating]     = useState(0)
  const [formHover, setFormHover]       = useState(0)
  const [formText, setFormText]         = useState('')
  const [formName, setFormName]         = useState('')
  const [formPosition, setFormPosition] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const filtered = MOCK_REVIEWS.filter(r => {
    if (filterClinic !== 'all' && r.target_id !== filterClinic) return false
    if (filterType   !== 'all' && r.reviewer_type !== filterType) return false
    if (filterRating > 0       && r.rating < filterRating)        return false
    return true
  })

  const avgRating = (MOCK_REVIEWS.reduce((a, r) => a + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1)
  const ratingCounts = [5, 4, 3, 2, 1].map(n => ({
    star: n,
    count: MOCK_REVIEWS.filter(r => r.rating === n).length,
  }))

  const toggleHelpful = (id: string) => {
    setHelpfulClicked(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleReply = (id: string) => {
    setExpandedReplies(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div style={{ background: 'var(--gray-100)', minHeight: '100vh' }}>

      {/* ── PAGE HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
        padding: '60px 40px 50px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
            Reviews
          </span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: 'white', letterSpacing: -1.5, marginBottom: 12 }}>
            Real Voices from{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-400)' }}>
              Professionals & Patients
            </em>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.7, marginBottom: 32 }}>
            Honest, verified reviews of dental clinics across Georgia — from workers who know them and patients who've been treated there.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Reviews', value: MOCK_REVIEWS.length.toString() },
              { label: 'Avg. Rating', value: `${avgRating} / 5` },
              { label: 'Verified Workers', value: MOCK_REVIEWS.filter(r => r.verified_worker).length.toString() },
              { label: 'Clinics Reviewed', value: '4' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.1)', borderRadius: 12,
                padding: '14px 22px', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: -0.5 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 40px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>

        {/* LEFT — filters + cards */}
        <div>
          {/* Filter bar */}
          <div style={{ background: 'white', borderRadius: 14, padding: '16px 20px', border: '1px solid var(--gray-300)', marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', flexShrink: 0 }}>Filter:</span>

            {/* Clinic filter */}
            <select
              value={filterClinic}
              onChange={e => setFilterClinic(e.target.value)}
              style={{
                padding: '7px 12px', borderRadius: 8, border: '1.5px solid var(--gray-300)',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)',
                background: 'white', cursor: 'pointer', outline: 'none',
              }}
            >
              {CLINICS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>

            {/* Type filter */}
            <div style={{ display: 'flex', gap: 6 }}>
              {(['all', 'worker', 'patient'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  style={{
                    padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                    borderColor: filterType === t ? 'var(--blue-500)' : 'var(--gray-300)',
                    background: filterType === t ? 'var(--blue-50)' : 'white',
                    color: filterType === t ? 'var(--blue-700)' : 'var(--gray-700)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {t === 'all' ? 'All' : t === 'worker' ? '👩‍⚕️ Staff' : '🦷 Patient'}
                </button>
              ))}
            </div>

            {/* Min rating */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>Min:</span>
              {[0, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setFilterRating(n)}
                  style={{
                    padding: '5px 10px', borderRadius: 8, border: '1.5px solid',
                    borderColor: filterRating === n ? '#F59E0B' : 'var(--gray-300)',
                    background: filterRating === n ? '#FFFBEB' : 'white',
                    color: filterRating === n ? '#B45309' : 'var(--gray-700)',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  {n === 0 ? 'Any' : `${n}★+`}
                </button>
              ))}
            </div>

            {/* Write review button */}
            <button
              onClick={() => setShowWriteModal(true)}
              style={{
                marginLeft: 'auto', padding: '8px 18px', borderRadius: 8, border: 'none',
                background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                fontSize: 13, fontWeight: 700, color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              }}
            >
              ✍️ Write a Review
            </button>
          </div>

          {/* Result count */}
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 20, fontWeight: 500 }}>
            {filtered.length} review{filtered.length !== 1 ? 's' : ''} found
            {(filterClinic !== 'all' || filterType !== 'all' || filterRating > 0) && ' · Filters active'}
          </p>

          {/* Review cards */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--gray-500)', background: 'white', borderRadius: 20, border: '1px solid var(--gray-300)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>No reviews match</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map(review => (
                <div
                  key={review.id}
                  style={{
                    background: 'white',
                    border: '1.5px solid var(--gray-300)',
                    borderRadius: 20,
                    padding: 28,
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'box-shadow 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)'}
                >
                  {/* Card header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>

                    {/* Reviewer info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: review.reviewer_type === 'worker' ? 'var(--blue-50)' : 'var(--teal-50)',
                        border: `2px solid ${review.reviewer_type === 'worker' ? 'var(--blue-100)' : '#B2EDED'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18,
                      }}>
                        {review.reviewer_type === 'worker' ? '👩‍⚕️' : '🦷'}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue-900)' }}>{review.reviewer_name}</span>
                          {review.verified_worker && (
                            <span style={{
                              fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                              background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC',
                            }}>
                              ✓ Verified Staff
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 2 }}>
                          {review.reviewer_type === 'worker'
                            ? `${review.position} · ${review.tenure}`
                            : 'Patient review'}
                          {' · '}
                          {new Date(review.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    {/* Clinic target */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9,
                        background: `${review.target_color}18`,
                        border: `1.5px solid ${review.target_color}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 800, color: review.target_color,
                      }}>
                        {review.target_initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-900)' }}>{review.target_name}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{review.target_city}</div>
                      </div>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <StarRating value={review.rating} size={18} />
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#F59E0B' }}>{review.rating}.0</span>
                  </div>

                  {/* Review text */}
                  <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.75, marginBottom: 16 }}>
                    {review.text}
                  </p>

                  {/* Sub-ratings (worker only) */}
                  {review.reviewer_type === 'worker' && review.rating_management !== null && (
                    <div style={{
                      background: 'var(--gray-100)', borderRadius: 12, padding: '14px 16px',
                      marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8,
                    }}>
                      <SubRating label="Management" value={review.rating_management!} />
                      <SubRating label="Equipment" value={review.rating_equipment!} />
                      <SubRating label="Salary" value={review.rating_salary!} />
                      <SubRating label="Work-Life" value={review.rating_worklife!} />
                    </div>
                  )}

                  {/* Footer actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--gray-100)', paddingTop: 14 }}>
                    <button
                      onClick={() => toggleHelpful(review.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px', borderRadius: 8,
                        border: `1.5px solid ${helpfulClicked.has(review.id) ? 'var(--blue-400)' : 'var(--gray-300)'}`,
                        background: helpfulClicked.has(review.id) ? 'var(--blue-50)' : 'white',
                        fontSize: 12, fontWeight: 600,
                        color: helpfulClicked.has(review.id) ? 'var(--blue-700)' : 'var(--gray-500)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      👍 Helpful ({review.helpful_count + (helpfulClicked.has(review.id) ? 1 : 0)})
                    </button>

                    {review.clinic_reply && (
                      <button
                        onClick={() => toggleReply(review.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                          padding: '6px 12px', borderRadius: 8,
                          border: '1.5px solid var(--gray-300)', background: 'white',
                          fontSize: 12, fontWeight: 600, color: 'var(--gray-500)',
                          cursor: 'pointer',
                        }}
                      >
                        💬 Clinic Reply {expandedReplies.has(review.id) ? '▲' : '▼'}
                      </button>
                    )}

                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--gray-500)' }}>
                      Report
                    </span>
                  </div>

                  {/* Clinic reply */}
                  {review.clinic_reply && expandedReplies.has(review.id) && (
                    <div style={{
                      marginTop: 14, padding: '14px 16px', borderRadius: 12,
                      background: 'var(--blue-50)', border: '1.5px solid var(--blue-100)',
                      borderLeft: '3px solid var(--blue-500)',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue-700)', marginBottom: 6 }}>
                        🏥 {review.target_name} replied:
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--blue-900)', lineHeight: 1.65 }}>
                        {review.clinic_reply}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Rating breakdown */}
          <div style={{ background: 'white', border: '1.5px solid var(--gray-300)', borderRadius: 20, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 4 }}>Overall Rating</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ fontSize: 52, fontWeight: 800, color: '#F59E0B', letterSpacing: -2 }}>{avgRating}</span>
              <div>
                <StarRating value={Math.round(parseFloat(avgRating))} size={20} />
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 4 }}>{MOCK_REVIEWS.length} reviews</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ratingCounts.map(({ star, count }) => (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', width: 16 }}>{star}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <div style={{ flex: 1, height: 6, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(count / MOCK_REVIEWS.length) * 100}%`,
                      background: '#F59E0B', borderRadius: 99,
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--gray-500)', width: 16, textAlign: 'right' }}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ background: 'white', border: '1.5px solid var(--gray-300)', borderRadius: 20, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 16 }}>At a Glance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Staff Reviews', value: MOCK_REVIEWS.filter(r => r.reviewer_type === 'worker').length, icon: '👩‍⚕️', color: 'var(--blue-700)' },
                { label: 'Patient Reviews', value: MOCK_REVIEWS.filter(r => r.reviewer_type === 'patient').length, icon: '🦷', color: 'var(--teal)' },
                { label: 'With Clinic Replies', value: MOCK_REVIEWS.filter(r => r.clinic_reply).length, icon: '💬', color: 'var(--green)' },
                { label: '5-Star Reviews', value: MOCK_REVIEWS.filter(r => r.rating === 5).length, icon: '⭐', color: '#B45309' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: 'var(--gray-600)', flex: 1 }}>{item.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            borderRadius: 20, padding: '24px 20px',
            background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'white', marginBottom: 8 }}>
              Worked at a clinic?
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 16 }}>
              Help other dental professionals make informed decisions. Share your honest experience.
            </p>
            <button
              onClick={() => setShowWriteModal(true)}
              style={{
                width: '100%', padding: '11px', borderRadius: 8, border: 'none',
                background: 'white', fontSize: 13, fontWeight: 700,
                color: 'var(--blue-700)', cursor: 'pointer',
              }}
            >
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* ── WRITE REVIEW MODAL ── */}
      {showWriteModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 500,
            background: 'rgba(12, 45, 94, 0.6)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          }}
          onClick={e => { if (e.target === e.currentTarget) { setShowWriteModal(false); setFormSubmitted(false) } }}
        >
          <div style={{
            background: 'white', borderRadius: 24, padding: '40px 36px',
            maxWidth: 560, width: '100%', boxShadow: 'var(--shadow-xl)',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 10 }}>Thank you!</h2>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.65, marginBottom: 28 }}>
                  Your review has been submitted and will appear after a quick verification.
                </p>
                <button
                  onClick={() => { setShowWriteModal(false); setFormSubmitted(false) }}
                  style={{
                    padding: '12px 28px', borderRadius: 10, border: 'none',
                    background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                    color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Modal header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5 }}>Write a Review</h2>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>Share your honest experience with the community.</p>
                  </div>
                  <button
                    onClick={() => setShowWriteModal(false)}
                    style={{
                      width: 34, height: 34, borderRadius: '50%', border: 'none',
                      background: 'var(--gray-100)', cursor: 'pointer',
                      fontSize: 14, color: 'var(--gray-500)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Reviewer type */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 8 }}>
                      I am reviewing as a…
                    </label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {(['worker', 'patient'] as const).map(t => (
                        <button
                          key={t}
                          onClick={() => setFormType(t)}
                          style={{
                            flex: 1, padding: '11px', borderRadius: 10,
                            border: `2px solid ${formType === t ? 'var(--blue-500)' : 'var(--gray-300)'}`,
                            background: formType === t ? 'var(--blue-50)' : 'white',
                            fontSize: 13, fontWeight: 700,
                            color: formType === t ? 'var(--blue-700)' : 'var(--gray-500)',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                        >
                          {t === 'worker' ? '👩‍⚕️ Dental Professional' : '🦷 Patient'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clinic */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                      Clinic *
                    </label>
                    <select
                      value={formClinic}
                      onChange={e => setFormClinic(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1.5px solid var(--gray-300)', outline: 'none',
                        fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                        background: 'white', boxSizing: 'border-box',
                      }}
                    >
                      <option value="">Select a clinic…</option>
                      {CLINICS.filter(c => c.id !== 'all').map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                      Your Name (or initials) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nino K."
                      value={formName}
                      onChange={e => setFormName(e.target.value)}
                      required
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1.5px solid var(--gray-300)', outline: 'none',
                        fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                        boxSizing: 'border-box', transition: 'border-color 0.15s',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>

                  {/* Position (worker only) */}
                  {formType === 'worker' && (
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                        Your Position *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dental Hygienist"
                        value={formPosition}
                        onChange={e => setFormPosition(e.target.value)}
                        style={{
                          width: '100%', padding: '12px 14px', borderRadius: 10,
                          border: '1.5px solid var(--gray-300)', outline: 'none',
                          fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                          boxSizing: 'border-box', transition: 'border-color 0.15s',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                      />
                    </div>
                  )}

                  {/* Star rating */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 8 }}>
                      Overall Rating *
                    </label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setFormRating(star)}
                          onMouseEnter={() => setFormHover(star)}
                          onMouseLeave={() => setFormHover(0)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, transition: 'transform 0.1s', transform: formHover >= star || formRating >= star ? 'scale(1.2)' : 'scale(1)' }}
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill={formHover >= star || formRating >= star ? '#F59E0B' : '#E5E7EB'}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </button>
                      ))}
                      {formRating > 0 && (
                        <span style={{ marginLeft: 8, fontSize: 13, color: '#B45309', fontWeight: 700, alignSelf: 'center' }}>
                          {['','Poor','Fair','Good','Very Good','Excellent'][formRating]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Review text */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', display: 'block', marginBottom: 6 }}>
                      Your Review * <span style={{ fontWeight: 400, color: 'var(--gray-500)' }}>({formText.length}/500)</span>
                    </label>
                    <textarea
                      placeholder="Share your experience in detail — what was great, what could improve, and any advice for others…"
                      value={formText}
                      onChange={e => setFormText(e.target.value.slice(0, 500))}
                      rows={4}
                      required
                      style={{
                        width: '100%', padding: '12px 14px', borderRadius: 10,
                        border: '1.5px solid var(--gray-300)', outline: 'none',
                        fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
                        resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.15s',
                      }}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    disabled={!formRating || !formText || !formName || !formClinic}
                    onClick={() => {
                      if (formRating && formText && formName && formClinic) setFormSubmitted(true)
                    }}
                    style={{
                      width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                      background: (formRating && formText && formName && formClinic)
                        ? 'linear-gradient(135deg, #2D7DD2, #1A56A0)'
                        : 'var(--gray-300)',
                      color: 'white', fontFamily: 'inherit', fontSize: 15, fontWeight: 700,
                      cursor: (formRating && formText && formName && formClinic) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s',
                      boxShadow: (formRating && formText && formName && formClinic) ? '0 4px 16px rgba(45,125,210,0.35)' : 'none',
                    }}
                  >
                    Submit Review →
                  </button>
                  <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-500)', marginTop: -8 }}>
                    Reviews are moderated and posted within 24 hours.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: '1fr 300px'"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="padding: '40px 40px'"] { padding: 20px !important; }
          div[style*="padding: '60px 40px'"] { padding: 36px 20px 32px !important; }
        }
      `}</style>
    </div>
  )
}

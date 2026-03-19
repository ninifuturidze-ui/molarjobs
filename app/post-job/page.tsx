'use client'

import { useState, useRef } from 'react'

// ─── CONSTANTS ───────────────────────────────────────────────────
const CITIES = ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Gori', 'Zugdidi', 'Poti', 'Telavi']

const SPECIALTIES = [
  'General Dentistry', 'Orthodontics', 'Oral Surgery', 'Periodontics',
  'Endodontics', 'Prosthodontics', 'Pediatric Dentistry', 'Implantology',
  'Cosmetic Dentistry', 'Dental Hygiene', 'Dental Assisting', 'Dental Technology',
  'Radiology', 'CAD/CAM', 'Invisalign', 'Laser Dentistry',
]

const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₾49',
    period: '/30 days',
    color: '#16A34A',
    features: ['Listed in search results', 'Standard visibility', 'Up to 50 applications', 'Email support'],
  },
  {
    id: 'featured',
    name: 'Featured',
    price: '₾99',
    period: '/30 days',
    color: '#2D7DD2',
    popular: true,
    features: ['Top of search results', 'Featured badge', 'Unlimited applications', 'Homepage spotlight', 'Priority support'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₾179',
    period: '/30 days',
    color: '#B45309',
    features: ['Everything in Featured', 'Gold ⭐ badge', 'Social media promotion', 'Dedicated account manager', 'Candidate shortlisting'],
  },
]

const STEPS = ['Job Details', 'Clinic Info', 'Preview', 'Publish']

type FormData = {
  // Job details
  title: string
  jobType: string
  salaryMin: string
  salaryMax: string
  salaryType: string
  description: string
  specialties: string[]
  experience: string
  // Clinic info
  clinicName: string
  city: string
  district: string
  address: string
  phone: string
  email: string
  website: string
  logo: File | null
  logoPreview: string
  // Pricing
  plan: string
}

export default function PostJobPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormData>({
    title: '',
    jobType: 'full-time',
    salaryMin: '',
    salaryMax: '',
    salaryType: 'monthly',
    description: '',
    specialties: [],
    experience: '',
    clinicName: '',
    city: '',
    district: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo: null,
    logoPreview: '',
    plan: '',
  })

  const update = (field: keyof FormData, value: FormData[keyof FormData]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleSpecialty = (s: string) => {
    setForm(prev => ({
      ...prev,
      specialties: prev.specialties.includes(s)
        ? prev.specialties.filter(x => x !== s)
        : [...prev.specialties, s],
    }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      update('logoPreview', reader.result as string)
      update('logo', file)
    }
    reader.readAsDataURL(file)
  }

  const canProceed = () => {
    if (step === 0) return form.title && form.description && form.specialties.length > 0
    if (step === 1) return form.clinicName && form.city && form.email
    if (step === 2) return true
    if (step === 3) return !!form.plan
    return true
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: 10,
    border: '1.5px solid var(--gray-300)', outline: 'none',
    fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
    background: 'white', boxSizing: 'border-box', transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: 'var(--gray-700)',
    display: 'block', marginBottom: 6,
  }

  return (
    <div style={{ background: 'var(--gray-100)', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
        padding: '48px 40px 40px',
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
            For Clinics
          </span>
          <h1 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: 'white', letterSpacing: -1.2, marginBottom: 10 }}>
            Post a{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-400)' }}>
              Job Vacancy
            </em>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 32, lineHeight: 1.7 }}>
            Reach thousands of dental professionals across Georgia. Takes under 5 minutes.
          </p>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: i < step ? 'var(--teal)' : i === step ? 'white' : 'rgba(255,255,255,0.2)',
                    border: `2px solid ${i <= step ? 'white' : 'rgba(255,255,255,0.3)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800,
                    color: i < step ? 'white' : i === step ? 'var(--blue-900)' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s',
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span style={{
                    fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                    color: i === step ? 'white' : 'rgba(255,255,255,0.5)',
                  }}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 2, margin: '0 12px',
                    background: i < step ? 'var(--teal)' : 'rgba(255,255,255,0.2)',
                    transition: 'background 0.3s',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FORM CARD ── */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 40px 60px' }}>
        {submitted ? (
          // ── SUCCESS ──
          <div style={{
            background: 'white', borderRadius: 24, padding: '64px 40px',
            textAlign: 'center', border: '1.5px solid var(--gray-300)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.8, marginBottom: 10 }}>
              Your job is live!
            </h2>
            <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 32px' }}>
              Your vacancy has been published and is now visible to dental professionals across Georgia.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setSubmitted(false); setStep(0); setForm({ title: '', jobType: 'full-time', salaryMin: '', salaryMax: '', salaryType: 'monthly', description: '', specialties: [], experience: '', clinicName: '', city: '', district: '', address: '', phone: '', email: '', website: '', logo: null, logoPreview: '', plan: '' }) }}
                style={{
                  padding: '13px 28px', borderRadius: 10, border: 'none',
                  background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                  color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Post Another Job
              </button>
              <button style={{
                padding: '13px 28px', borderRadius: 10,
                border: '1.5px solid var(--gray-300)', background: 'white',
                color: 'var(--gray-700)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>
                View My Listings
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            background: 'white', borderRadius: 24,
            border: '1.5px solid var(--gray-300)', boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
          }}>

            {/* ── STEP 0: JOB DETAILS ── */}
            {step === 0 && (
              <div style={{ padding: '40px 40px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 4 }}>Job Details</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 32 }}>Tell candidates about the role.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  {/* Title */}
                  <div>
                    <label style={labelStyle}>Job Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Orthodontist, Dental Assistant"
                      value={form.title}
                      onChange={e => update('title', e.target.value)}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>

                  {/* Job type + Experience */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Job Type *</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {[['full-time', 'Full-time'], ['part-time', 'Part-time'], ['contract', 'Contract']].map(([val, lbl]) => (
                          <button
                            key={val}
                            onClick={() => update('jobType', val)}
                            style={{
                              flex: 1, padding: '10px 0', borderRadius: 8, border: '1.5px solid',
                              borderColor: form.jobType === val ? 'var(--blue-500)' : 'var(--gray-300)',
                              background: form.jobType === val ? 'var(--blue-50)' : 'white',
                              color: form.jobType === val ? 'var(--blue-700)' : 'var(--gray-600)',
                              fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                            }}
                          >
                            {lbl}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Experience Required</label>
                      <select
                        value={form.experience}
                        onChange={e => update('experience', e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        <option value="">Any level</option>
                        <option value="entry">Entry level (0–2 yrs)</option>
                        <option value="mid">Mid level (3–5 yrs)</option>
                        <option value="senior">Senior (6–10 yrs)</option>
                        <option value="expert">Expert (10+ yrs)</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary */}
                  <div>
                    <label style={labelStyle}>Salary Range</label>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input
                        type="number"
                        placeholder="Min ₾"
                        value={form.salaryMin}
                        onChange={e => update('salaryMin', e.target.value)}
                        style={{ ...inputStyle, width: 'auto', flex: 1 }}
                        onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                      />
                      <span style={{ color: 'var(--gray-500)', fontWeight: 600, flexShrink: 0 }}>—</span>
                      <input
                        type="number"
                        placeholder="Max ₾"
                        value={form.salaryMax}
                        onChange={e => update('salaryMax', e.target.value)}
                        style={{ ...inputStyle, width: 'auto', flex: 1 }}
                        onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                      />
                      <select
                        value={form.salaryType}
                        onChange={e => update('salaryType', e.target.value)}
                        style={{ ...inputStyle, width: 'auto', flexShrink: 0 }}
                      >
                        <option value="monthly">/month</option>
                        <option value="daily">/day</option>
                        <option value="hourly">/hour</option>
                      </select>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <label style={labelStyle}>Required Specialties * <span style={{ fontWeight: 400, color: 'var(--gray-500)' }}>({form.specialties.length} selected)</span></label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {SPECIALTIES.map(s => (
                        <button
                          key={s}
                          onClick={() => toggleSpecialty(s)}
                          style={{
                            padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                            borderColor: form.specialties.includes(s) ? 'var(--blue-500)' : 'var(--gray-300)',
                            background: form.specialties.includes(s) ? 'var(--blue-50)' : 'white',
                            color: form.specialties.includes(s) ? 'var(--blue-700)' : 'var(--gray-600)',
                            fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                          }}
                        >
                          {form.specialties.includes(s) ? '✓ ' : ''}{s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label style={labelStyle}>Job Description * <span style={{ fontWeight: 400, color: 'var(--gray-500)' }}>({form.description.length}/1500)</span></label>
                    <textarea
                      placeholder="Describe the role, responsibilities, requirements, and what makes your clinic a great place to work..."
                      value={form.description}
                      onChange={e => update('description', e.target.value.slice(0, 1500))}
                      rows={6}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1: CLINIC INFO ── */}
            {step === 1 && (
              <div style={{ padding: '40px 40px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 4 }}>Clinic Information</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 32 }}>Help candidates learn about your practice.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  {/* Logo upload */}
                  <div>
                    <label style={labelStyle}>Clinic Logo</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          width: 80, height: 80, borderRadius: 16, flexShrink: 0,
                          border: '2px dashed var(--gray-300)', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden', background: 'var(--gray-100)',
                          transition: 'border-color 0.15s',
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--blue-400)')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--gray-300)')}
                      >
                        {form.logoPreview ? (
                          <img src={form.logoPreview} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 24 }}>📷</div>
                            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>Upload</div>
                          </div>
                        )}
                      </div>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
                      <div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          style={{
                            padding: '9px 18px', borderRadius: 8,
                            border: '1.5px solid var(--gray-300)', background: 'white',
                            fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer',
                            display: 'block', marginBottom: 6,
                          }}
                        >
                          {form.logoPreview ? 'Change Logo' : 'Upload Logo'}
                        </button>
                        <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>PNG, JPG up to 2MB. Recommended: 400×400px</p>
                      </div>
                    </div>
                  </div>

                  {/* Clinic name */}
                  <div>
                    <label style={labelStyle}>Clinic Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Silk Dental Clinic"
                      value={form.clinicName}
                      onChange={e => update('clinicName', e.target.value)}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>

                  {/* City + District */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>City *</label>
                      <select
                        value={form.city}
                        onChange={e => update('city', e.target.value)}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        <option value="">Select city…</option>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>District / Neighbourhood</label>
                      <input
                        type="text"
                        placeholder="e.g. Vake, Saburtalo"
                        value={form.district}
                        onChange={e => update('district', e.target.value)}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label style={labelStyle}>Full Address</label>
                    <input
                      type="text"
                      placeholder="Street address"
                      value={form.address}
                      onChange={e => update('address', e.target.value)}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>

                  {/* Contact */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Contact Email *</label>
                      <input
                        type="email"
                        placeholder="hr@yourclinic.ge"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+995 555 000 000"
                        value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                      />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label style={labelStyle}>Website</label>
                    <input
                      type="url"
                      placeholder="https://yourclinic.ge"
                      value={form.website}
                      onChange={e => update('website', e.target.value)}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--blue-500)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--gray-300)')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: PREVIEW ── */}
            {step === 2 && (
              <div style={{ padding: '40px 40px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 4 }}>Preview</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 28 }}>This is how your listing will appear to candidates.</p>

                {/* Job card preview */}
                <div style={{
                  border: '2px solid var(--blue-100)', borderRadius: 20,
                  padding: 28, background: 'white', boxShadow: 'var(--shadow-md)',
                  marginBottom: 28,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                        background: form.logoPreview ? 'transparent' : 'var(--blue-50)',
                        border: '1.5px solid var(--blue-100)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                        fontWeight: 800, fontSize: 16, color: 'var(--blue-700)',
                      }}>
                        {form.logoPreview
                          ? <img src={form.logoPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                          : (form.clinicName?.slice(0, 2).toUpperCase() || 'CL')}
                      </div>
                      <div>
                        <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--blue-900)' }}>
                          {form.title || 'Job Title'}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>
                          {form.clinicName || 'Clinic Name'} · {form.city || 'City'}{form.district ? `, ${form.district}` : ''}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
                      background: form.jobType === 'full-time' ? '#DCFCE7' : '#FEF3C7',
                      color: form.jobType === 'full-time' ? '#16A34A' : '#D97706',
                    }}>
                      {form.jobType === 'full-time' ? 'Full-time' : form.jobType === 'part-time' ? 'Part-time' : 'Contract'}
                    </span>
                  </div>

                  {form.specialties.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                      {form.specialties.slice(0, 5).map(s => (
                        <span key={s} style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue-700)', background: 'var(--blue-50)', borderRadius: 6, padding: '3px 9px' }}>{s}</span>
                      ))}
                      {form.specialties.length > 5 && (
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-500)', background: 'var(--gray-100)', borderRadius: 6, padding: '3px 9px' }}>+{form.specialties.length - 5} more</span>
                      )}
                    </div>
                  )}

                  {form.description && (
                    <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: 16,
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {form.description}
                    </p>
                  )}

                  <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--blue-700)' }}>
                      {form.salaryMin && form.salaryMax
                        ? `₾${form.salaryMin}–₾${form.salaryMax}/${form.salaryType === 'monthly' ? 'mo' : form.salaryType === 'daily' ? 'day' : 'hr'}`
                        : form.salaryMin ? `From ₾${form.salaryMin}` : 'Salary negotiable'}
                    </span>
                    <button style={{
                      padding: '9px 20px', borderRadius: 8, border: 'none',
                      background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
                      color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    }}>
                      Apply Now
                    </button>
                  </div>
                </div>

                {/* Summary checklist */}
                <div style={{ background: 'var(--gray-100)', borderRadius: 14, padding: '20px 24px' }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 12 }}>Listing Summary</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { label: 'Job Title', value: form.title },
                      { label: 'Clinic', value: form.clinicName },
                      { label: 'Location', value: [form.city, form.district].filter(Boolean).join(', ') },
                      { label: 'Job Type', value: form.jobType },
                      { label: 'Specialties', value: form.specialties.length > 0 ? `${form.specialties.length} selected` : null },
                      { label: 'Contact', value: form.email },
                    ].map(item => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: 'var(--gray-500)' }}>{item.label}</span>
                        <span style={{
                          fontWeight: 600,
                          color: item.value ? 'var(--blue-900)' : 'var(--rose)',
                        }}>
                          {item.value || '⚠ Missing'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: PRICING ── */}
            {step === 3 && (
              <div style={{ padding: '40px 40px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 4 }}>Choose a Plan</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 32 }}>Select how you want your listing to appear.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                  {PRICING_PLANS.map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => update('plan', plan.id)}
                      style={{
                        border: `2px solid ${form.plan === plan.id ? plan.color : 'var(--gray-300)'}`,
                        borderRadius: 16, padding: '24px 20px', cursor: 'pointer',
                        position: 'relative', transition: 'all 0.2s',
                        background: form.plan === plan.id ? `${plan.color}08` : 'white',
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
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-500)' }}>{plan.period}</span>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue-900)', margin: '8px 0 14px' }}>
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

                <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 20 }}>🔒</span>
                  <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5 }}>
                    Secure payment powered by Stripe. Cancel anytime. Your listing goes live immediately after payment.
                  </p>
                </div>
              </div>
            )}

            {/* ── NAVIGATION ── */}
            <div style={{
              padding: '20px 40px', borderTop: '1px solid var(--gray-100)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--gray-100)',
            }}>
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{
                  padding: '11px 24px', borderRadius: 8,
                  border: '1.5px solid var(--gray-300)', background: 'white',
                  fontSize: 14, fontWeight: 600, color: 'var(--gray-700)',
                  cursor: step === 0 ? 'not-allowed' : 'pointer',
                  opacity: step === 0 ? 0.4 : 1,
                }}
              >
                ← Back
              </button>

              <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                Step {step + 1} of {STEPS.length}
              </span>

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => canProceed() && setStep(s => s + 1)}
                  disabled={!canProceed()}
                  style={{
                    padding: '11px 28px', borderRadius: 8, border: 'none',
                    background: canProceed() ? 'linear-gradient(135deg, #2D7DD2, #1A56A0)' : 'var(--gray-300)',
                    color: 'white', fontSize: 14, fontWeight: 700,
                    cursor: canProceed() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    boxShadow: canProceed() ? '0 4px 16px rgba(45,125,210,0.3)' : 'none',
                  }}
                >
                  {step === 2 ? 'Continue to Payment →' : 'Next Step →'}
                </button>
              ) : (
                <button
                  onClick={() => form.plan && setSubmitted(true)}
                  disabled={!form.plan}
                  style={{
                    padding: '11px 28px', borderRadius: 8, border: 'none',
                    background: form.plan ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'var(--gray-300)',
                    color: 'white', fontSize: 14, fontWeight: 700,
                    cursor: form.plan ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  💳 Pay & Publish →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="padding: '40px 40px'"] { padding: 24px 20px !important; }
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

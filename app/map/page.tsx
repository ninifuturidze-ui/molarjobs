'use client'

import { useState, useEffect, useRef } from 'react'

// ─── MOCK JOB DATA WITH COORDINATES ─────────────────────────────
const JOBS = [
  {
    id: '1',
    title: 'Orthodontist',
    clinic: 'Silk Dental Clinic',
    type: 'full-time',
    salary: '₾3,500/mo',
    city: 'Tbilisi',
    district: 'Vake',
    specialty: 'Orthodontics',
    lat: 41.7151,
    lng: 44.7731,
    initials: 'SD',
    color: '#2D7DD2',
    tags: ['Invisalign', 'Braces'],
  },
  {
    id: '2',
    title: 'Dental Assistant',
    clinic: 'Dental Plus',
    type: 'part-time',
    salary: '₾1,800/mo',
    city: 'Tbilisi',
    district: 'Saburtalo',
    specialty: 'General Dentistry',
    lat: 41.7225,
    lng: 44.7572,
    initials: 'DP',
    color: '#0AADA8',
    tags: ['X-Ray', 'Sterilization'],
  },
  {
    id: '3',
    title: 'Periodontist',
    clinic: 'OrthoCare Batumi',
    type: 'full-time',
    salary: '₾4,200/mo',
    city: 'Batumi',
    district: 'Center',
    specialty: 'Periodontics',
    lat: 41.6417,
    lng: 41.6367,
    initials: 'OC',
    color: '#9333EA',
    tags: ['Implants', 'Surgery'],
  },
  {
    id: '4',
    title: 'General Dentist',
    clinic: 'MedClinic Tbilisi',
    type: 'full-time',
    salary: '₾2,800/mo',
    city: 'Tbilisi',
    district: 'Didube',
    specialty: 'General Dentistry',
    lat: 41.7389,
    lng: 44.7700,
    initials: 'MC',
    color: '#16A34A',
    tags: ['Fillings', 'Extractions'],
  },
  {
    id: '5',
    title: 'Dental Hygienist',
    clinic: 'SmileSpace',
    type: 'part-time',
    salary: '₾1,600/mo',
    city: 'Kutaisi',
    district: 'Center',
    specialty: 'Dental Hygiene',
    lat: 42.2679,
    lng: 42.7181,
    initials: 'SS',
    color: '#F59E0B',
    tags: ['Whitening', 'Periodontics'],
  },
  {
    id: '6',
    title: 'Oral Surgeon',
    clinic: 'Tbilisi Dental Center',
    type: 'full-time',
    salary: '₾5,000/mo',
    city: 'Tbilisi',
    district: 'Isani',
    specialty: 'Oral Surgery',
    lat: 41.6938,
    lng: 44.8015,
    initials: 'TD',
    color: '#E11D48',
    tags: ['Implants', 'Bone Grafting'],
  },
  {
    id: '7',
    title: 'Prosthodontist',
    clinic: 'Gori Dental',
    type: 'full-time',
    salary: '₾3,000/mo',
    city: 'Gori',
    district: 'Center',
    specialty: 'Prosthodontics',
    lat: 41.9851,
    lng: 44.1134,
    initials: 'GD',
    color: '#1A56A0',
    tags: ['Veneers', 'Crowns'],
  },
]

type Job = typeof JOBS[0]

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])
  const [selected, setSelected] = useState<Job | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'full-time' | 'part-time'>('all')
  const [search, setSearch] = useState('')
  const [mapReady, setMapReady] = useState(false)
  const selectedRef = useRef<Job | null>(null)

  const filtered = JOBS.filter(j => {
    if (filterType !== 'all' && j.type !== filterType) return false
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) &&
        !j.clinic.toLowerCase().includes(search.toLowerCase()) &&
        !j.city.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  // Load Leaflet dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => setMapReady(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(script)
    }
  }, [])

  // Init map
  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L
    if (!L || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [41.9, 43.5],
      zoom: 7,
      zoomControl: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      maxZoom: 18,
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    mapInstanceRef.current = map
  }, [mapReady])

  // Update markers when filter/search changes
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const L = (window as any).L
    if (!L) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = mapInstanceRef.current as any

    // Remove old markers
    markersRef.current.forEach((m: unknown) => (m as any).remove())
    markersRef.current = []

    filtered.forEach(job => {
      const isSelected = selectedRef.current?.id === job.id
      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            background: ${job.color};
            color: white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            width: ${isSelected ? 44 : 36}px;
            height: ${isSelected ? 44 : 36}px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px ${job.color}66;
            border: 3px solid white;
            transition: all 0.2s;
            cursor: pointer;
          ">
            <span style="transform: rotate(45deg); font-size: ${isSelected ? 13 : 11}px; font-weight: 800; font-family: sans-serif;">
              ${job.initials}
            </span>
          </div>
        `,
        iconSize: [isSelected ? 44 : 36, isSelected ? 44 : 36],
        iconAnchor: [isSelected ? 22 : 18, isSelected ? 44 : 36],
      })

      const marker = L.marker([job.lat, job.lng], { icon })
        .addTo(map)
        .on('click', () => {
          selectedRef.current = job
          setSelected(job)
          map.panTo([job.lat, job.lng], { animate: true })
        })

      markersRef.current.push(marker)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, filtered.length, filterType, search])

  const handleJobClick = (job: Job) => {
    selectedRef.current = job
    setSelected(job)
    if (mapInstanceRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(mapInstanceRef.current as any).flyTo([job.lat, job.lng], 13, { animate: true, duration: 1 })
    }
  }

  return (
    <div style={{ position: 'relative', height: 'calc(100vh - 68px)', overflow: 'hidden' }}>

      {/* ── FULL SCREEN MAP ── */}
      <div ref={mapRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Loading state */}
      {!mapReady && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          background: 'var(--gray-100)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ fontSize: 36 }}>🗺</div>
          <p style={{ fontSize: 14, color: 'var(--gray-500)', fontWeight: 600 }}>Loading map…</p>
        </div>
      )}

      {/* ── TOP SEARCH + FILTER BAR ── */}
      <div style={{
        position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, display: 'flex', gap: 10, alignItems: 'center',
        background: 'white', borderRadius: 14, padding: '8px 8px 8px 16px',
        boxShadow: '0 8px 32px rgba(12,45,94,0.18)',
        border: '1.5px solid var(--gray-300)',
        width: 'min(560px, calc(100vw - 40px))',
      }}>
        <svg width="16" height="16" fill="none" stroke="var(--gray-500)" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search jobs, clinics, cities…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'none',
            fontFamily: 'inherit', fontSize: 14, color: 'var(--gray-900)',
          }}
        />
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {(['all', 'full-time', 'part-time'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: '7px 12px', borderRadius: 8, border: '1.5px solid',
                borderColor: filterType === t ? 'var(--blue-500)' : 'var(--gray-300)',
                background: filterType === t ? 'var(--blue-900)' : 'white',
                color: filterType === t ? 'white' : 'var(--gray-600)',
                fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {t === 'all' ? 'All' : t === 'full-time' ? 'Full-time' : 'Part-time'}
            </button>
          ))}
        </div>
      </div>

      {/* ── JOB COUNT BADGE ── */}
      <div style={{
        position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'var(--blue-900)', color: 'white',
        borderRadius: 20, padding: '5px 14px',
        fontSize: 12, fontWeight: 700,
        boxShadow: '0 4px 12px rgba(12,45,94,0.25)',
      }}>
        {filtered.length} job{filtered.length !== 1 ? 's' : ''} on map
      </div>

      {/* ── LEFT JOB LIST ── */}
      <div style={{
        position: 'absolute', top: 20, left: 20, bottom: 20,
        zIndex: 100, width: 300,
        display: 'flex', flexDirection: 'column', gap: 10,
        overflowY: 'auto',
        paddingRight: 4,
      }}
        className="map-job-list"
      >
        {filtered.length === 0 ? (
          <div style={{
            background: 'white', borderRadius: 16, padding: '24px 20px',
            textAlign: 'center', boxShadow: '0 4px 20px rgba(12,45,94,0.12)',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>No jobs match your filters</p>
          </div>
        ) : (
          filtered.map(job => (
            <div
              key={job.id}
              onClick={() => handleJobClick(job)}
              style={{
                background: 'white',
                borderRadius: 16,
                padding: '16px 18px',
                cursor: 'pointer',
                border: `2px solid ${selected?.id === job.id ? job.color : 'transparent'}`,
                boxShadow: selected?.id === job.id
                  ? `0 4px 20px ${job.color}33`
                  : '0 4px 20px rgba(12,45,94,0.10)',
                transition: 'all 0.2s',
                transform: selected?.id === job.id ? 'translateX(4px)' : 'none',
              }}
              onMouseEnter={e => {
                if (selected?.id !== job.id) {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(12,45,94,0.16)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateX(2px)'
                }
              }}
              onMouseLeave={e => {
                if (selected?.id !== job.id) {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(12,45,94,0.10)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                  background: `${job.color}18`,
                  border: `1.5px solid ${job.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, color: job.color,
                }}>
                  {job.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 2 }}>
                    {job.title}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {job.clinic}
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                      background: job.type === 'full-time' ? '#DCFCE7' : '#FEF3C7',
                      color: job.type === 'full-time' ? '#16A34A' : '#D97706',
                    }}>
                      {job.type === 'full-time' ? 'Full-time' : 'Part-time'}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>📍 {job.city}</span>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: job.color, flexShrink: 0 }}>
                  {job.salary}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── SELECTED JOB CARD (bottom center) ── */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'white', borderRadius: 20,
          padding: '20px 24px',
          boxShadow: '0 12px 48px rgba(12,45,94,0.22)',
          border: `2px solid ${selected.color}33`,
          width: 'min(480px, calc(100vw - 360px))',
          display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, flexShrink: 0,
            background: `${selected.color}18`,
            border: `2px solid ${selected.color}33`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 800, color: selected.color,
          }}>
            {selected.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 2 }}>
              {selected.title}
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 8 }}>
              {selected.clinic} · {selected.city}, {selected.district}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {selected.tags.map(t => (
                <span key={t} style={{
                  fontSize: 11, fontWeight: 600,
                  background: 'var(--blue-50)', color: 'var(--blue-700)',
                  borderRadius: 6, padding: '3px 8px',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: selected.color, textAlign: 'right' }}>
              {selected.salary}
            </div>
            <button style={{
              padding: '9px 18px', borderRadius: 8, border: 'none',
              background: `linear-gradient(135deg, ${selected.color}, ${selected.color}CC)`,
              color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              Apply Now →
            </button>
          </div>
          <button
            onClick={() => setSelected(null)}
            style={{
              position: 'absolute', top: 10, right: 10,
              width: 24, height: 24, borderRadius: '50%',
              background: 'var(--gray-100)', border: 'none',
              cursor: 'pointer', fontSize: 11, color: 'var(--gray-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        .map-job-list::-webkit-scrollbar { width: 4px; }
        .map-job-list::-webkit-scrollbar-track { background: transparent; }
        .map-job-list::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 99px; }
        .leaflet-container { font-family: inherit; }
        @media (max-width: 768px) {
          .map-job-list { display: none !important; }
        }
      `}</style>
    </div>
  )
}

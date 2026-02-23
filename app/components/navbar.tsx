'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',        label: 'Find Jobs' },
  { href: '/talent',  label: 'Talent Board' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/events',  label: 'Events' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang]         = useState<'en' | 'ka'>('en')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          background: 'rgba(255,255,255,0.93)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(209,216,228,0.7)',
          padding: '0 40px', height: 68,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          transition: 'box-shadow 0.2s',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/>
            </svg>
          </div>
          <span style={{ fontSize: 19, fontWeight: 800, color: 'var(--blue-900)', letterSpacing: -0.5 }}>
            Molar<span style={{ color: 'var(--blue-500)' }}>Jobs</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 4, listStyle: 'none', margin: 0 }} className="desktop-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  padding: '7px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  color: pathname === link.href ? 'var(--blue-700)' : 'var(--gray-700)',
                  background: pathname === link.href ? 'var(--blue-50)' : 'transparent',
                  textDecoration: 'none', display: 'block', transition: 'all 0.15s',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Language toggle */}
          <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 8, padding: 3, gap: 2 }}>
            {(['en', 'ka'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '5px 12px', borderRadius: 6, border: 'none',
                  fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: lang === l ? 'white' : 'transparent',
                  color: lang === l ? 'var(--blue-700)' : 'var(--gray-500)',
                  boxShadow: lang === l ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {l === 'en' ? 'EN' : 'ქარ'}
              </button>
            ))}
          </div>

          {/* Auth buttons */}
          <Link
            href="/login"
            className="desktop-links"
            style={{
              padding: '9px 20px', borderRadius: 8,
              border: '1.5px solid var(--gray-300)', background: 'transparent',
              fontSize: 14, fontWeight: 600, color: 'var(--gray-700)', textDecoration: 'none',
            }}
          >
            Log In
          </Link>
          <Link
            href="/post-job"
            style={{
              padding: '9px 20px', borderRadius: 8, border: 'none',
              background: 'linear-gradient(135deg, #2D7DD2, #1A56A0)',
              fontSize: 14, fontWeight: 700, color: 'white', textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(45,125,210,0.3)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            Post a Job
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer',
              background: 'none', border: 'none', padding: 6,
            }}
            aria-label="Open menu"
          >
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--gray-700)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--gray-700)', borderRadius: 2, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--gray-700)', borderRadius: 2, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 190,
          background: 'white', borderBottom: '1px solid var(--gray-300)',
          padding: '16px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: 'var(--shadow-md)',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '12px 16px', borderRadius: 8, fontSize: 15, fontWeight: 500,
                color: pathname === link.href ? 'var(--blue-700)' : 'var(--gray-700)',
                background: pathname === link.href ? 'var(--blue-50)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'var(--gray-300)', margin: '8px 0' }} />
          <Link href="/login" onClick={() => setMenuOpen(false)} style={{ padding: '13px 16px', borderRadius: 8, border: '1.5px solid var(--gray-300)', textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'var(--gray-700)', textDecoration: 'none' }}>Log In</Link>
          <Link href="/post-job" onClick={() => setMenuOpen(false)} style={{ padding: '13px 16px', borderRadius: 8, background: 'linear-gradient(135deg,#2D7DD2,#1A56A0)', textAlign: 'center', fontSize: 15, fontWeight: 700, color: 'white', textDecoration: 'none' }}>Post a Job</Link>
        </div>
      )}

      {/* Spacer so content isn't hidden under fixed nav */}
      <div style={{ height: 68 }} />

      <style>{`
        @media (max-width: 768px) {
          .desktop-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
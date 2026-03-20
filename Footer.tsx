'use client'
// app/components/Footer.tsx

import Link from 'next/link'
import { useT } from '../LanguageContext'

export default function Footer() {
  const t = useT()

  const footerLinks = {
    [t('footer_col_seekers')]: [
      { label: t('footer_browse_jobs'),  href: '/' },
      { label: t('footer_talent_board'), href: '/talent' },
      { label: t('footer_map_view'),     href: '/#map' },
      { label: t('footer_salary_guide'), href: '/salary' },
    ],
    [t('footer_col_clinics')]: [
      { label: t('footer_post_job'),  href: '/post-job' },
      { label: t('footer_register'),  href: '/register' },
      { label: t('footer_pricing'),   href: '/pricing' },
      { label: t('footer_verify'),    href: '/verify' },
    ],
    [t('footer_col_company')]: [
      { label: t('footer_about'),   href: '/about' },
      { label: t('footer_contact'), href: '/contact' },
      { label: t('footer_privacy'), href: '/privacy' },
      { label: t('footer_terms'),   href: '/terms' },
    ],
  }

  return (
    <footer style={{ background: 'var(--blue-900)', padding: '48px 40px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: -0.5 }}>
              Molar<span style={{ color: 'var(--blue-400)' }}>Jobs</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginTop: 10, maxWidth: 240, lineHeight: 1.6 }}>
              {t('footer_tagline')}
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>
                {title}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} MolarJobs. {t('footer_rights')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            <span>🇬🇪</span>
            <span>{t('footer_made_for')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

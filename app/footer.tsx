import Link from 'next/link'

const footerLinks = {
  'For Job Seekers': [
    { label: 'Browse Jobs',   href: '/' },
    { label: 'Talent Board',  href: '/talent' },
    { label: 'Map View',      href: '/#map' },
    { label: 'Salary Guide',  href: '/salary' },
  ],
  'For Clinics': [
    { label: 'Post a Job',     href: '/post-job' },
    { label: 'Register Clinic',href: '/register' },
    { label: 'Pricing',        href: '/pricing' },
    { label: 'Verification',   href: '/verify' },
  ],
  Company: [
    { label: 'About',          href: '/about' },
    { label: 'Contact',        href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use',   href: '/terms' },
  ],
}

export default function Footer() {
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
              Georgia's dedicated platform for dental professionals and clinics.
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
            © {new Date().getFullYear()} MolarJobs. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            <span>🇬🇪</span>
            <span>Made for Georgia</span>
          </div>
        </div>

      </div>
    </footer>
  )
} 
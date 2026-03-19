'use client'

import { useState } from 'react'

// ─── DATA ────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'salary',
    icon: '💰',
    color: '#16A34A',
    bg: '#DCFCE7',
    border: '#86EFAC',
    title: 'Minimum Wage & Salary Rights',
    summary: 'Every dental professional has the right to fair, agreed compensation — paid on time and in full.',
    items: [
      {
        q: 'Is there a national minimum wage in Georgia?',
        a: 'Georgia does not currently set a statutory national minimum wage for private sector employees. However, your salary must be agreed upon in writing in your employment contract before you start work. Once agreed, your employer cannot reduce it without your written consent.',
      },
      {
        q: 'When must my salary be paid?',
        a: 'Under Georgian labour law, wages must be paid at least once a month on the date specified in your contract. If your employer delays payment without justification, you are entitled to demand immediate payment and may claim compensation for the delay.',
      },
      {
        q: 'Can my employer pay me less than what is in my contract?',
        a: 'No. Your employer cannot unilaterally reduce your salary below the agreed amount in your contract. Any change to your salary requires your written agreement. If you are pressured to sign a lower-pay amendment, you have the right to refuse.',
      },
      {
        q: 'Am I entitled to a pay slip?',
        a: 'Yes. Your employer must provide you with documentation of your salary payment, including any deductions made (such as income tax or pension contributions). If deductions are made without explanation, you have the right to a written breakdown.',
      },
      {
        q: 'What if I am paid "informally" (cash in hand)?',
        a: 'Informal pay arrangements leave you unprotected. Without a formal contract and bank transfer records, it is difficult to prove your agreed salary if a dispute arises. You have the right to request a formal written contract and official salary payments at any time.',
      },
    ],
  },
  {
    id: 'hours',
    icon: '⏱',
    color: '#2D7DD2',
    bg: '#EEF6FF',
    border: '#BFDBFE',
    title: 'Working Hours & Overtime',
    summary: 'Georgian law limits how many hours you can be required to work and sets rules for overtime compensation.',
    items: [
      {
        q: 'What is the standard maximum working week?',
        a: 'The standard working week in Georgia is 40 hours, typically spread over 5 days. Your contract may specify fewer hours. You cannot be required to regularly work more than 40 hours per week without your agreement and additional compensation.',
      },
      {
        q: 'How is overtime defined and compensated?',
        a: 'Any work beyond the agreed hours in your contract is considered overtime. Georgian labour law requires that overtime be compensated at a rate of at least 125% of your standard hourly rate — meaning at least 25% extra on top of your normal pay. Your contract may offer a higher rate.',
      },
      {
        q: 'Can my employer force me to work overtime?',
        a: 'In most cases, no. Overtime generally requires your consent unless there is a genuine emergency situation. Even in emergencies, the total working time including overtime cannot exceed 60 hours per week or 48 hours averaged over any 17-week period.',
      },
      {
        q: 'Am I entitled to rest breaks during the day?',
        a: 'Yes. If your working day exceeds 6 hours, you are entitled to at least one rest break of no less than 30 minutes. This break does not need to be paid unless your contract says otherwise, but it cannot be denied to you.',
      },
      {
        q: 'What rest period am I entitled to between shifts?',
        a: 'You are entitled to a minimum of 12 consecutive hours of rest between the end of one working day and the start of the next. You are also entitled to at least 24 consecutive hours of rest per week (typically a full day off).',
      },
      {
        q: 'Do the same rules apply to part-time dental professionals?',
        a: 'Yes. Part-time workers have the same rights as full-time workers on a proportional basis. If your agreed hours are 20 per week, any work beyond that is overtime and must be compensated accordingly.',
      },
    ],
  },
  {
    id: 'leave',
    icon: '🌿',
    color: '#9333EA',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    title: 'Leave & Vacation Rights',
    summary: 'You are legally entitled to paid annual leave, sick leave, and other types of statutory leave.',
    items: [
      {
        q: 'How many days of paid annual leave am I entitled to?',
        a: 'Under Georgian labour law, every employee is entitled to at least 24 working days of paid annual leave per year. Some contracts or collective agreements may provide more. You begin accruing leave from your first day of employment.',
      },
      {
        q: 'When can I take my annual leave?',
        a: 'You can take your leave at a time agreed with your employer, but your employer cannot refuse to let you take any leave at all. At least 14 consecutive days of your annual leave should ideally be taken in one block if you wish. Unused leave should be paid out if your employment ends.',
      },
      {
        q: 'Am I entitled to sick leave?',
        a: 'Yes. Georgian law provides for paid sick leave. If you are unwell and have a medical certificate, your employer must provide sick pay. The amount and duration depends on your contract and employer policy, but you cannot be dismissed simply for taking legitimate sick leave.',
      },
      {
        q: 'What maternity and paternity leave am I entitled to?',
        a: 'Female employees are entitled to 183 calendar days of maternity leave (or 200 days in the case of complications or multiple births), with a portion paid by the state. Fathers and adopting parents are also entitled to paternity leave of up to 5 calendar days, paid by the employer.',
      },
      {
        q: 'Can I take unpaid leave?',
        a: 'Yes. You are entitled to request up to 15 calendar days of unpaid leave per year in addition to your paid leave. Your employer cannot refuse this. Additional unpaid leave beyond 15 days requires employer agreement.',
      },
      {
        q: 'What happens to my leave if I resign or am dismissed?',
        a: 'Any accrued but unused paid annual leave must be compensated in your final pay. Your employer cannot simply cancel untaken leave when your employment ends — you are entitled to be paid for it.',
      },
    ],
  },
]

const QUICK_FACTS = [
  { icon: '📅', label: 'Annual Leave', value: '24 working days' },
  { icon: '⏰', label: 'Max Work Week', value: '40 hours' },
  { icon: '💸', label: 'Overtime Rate', value: '125%+ of hourly rate' },
  { icon: '🤒', label: 'Sick Leave', value: 'Paid with medical certificate' },
]

export default function WorkingRightsPage() {
  const [openSection, setOpenSection] = useState<string | null>('salary')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div style={{ background: 'var(--gray-100)', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
        padding: '60px 40px 50px',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
            Know Your Rights
          </span>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: 'white', letterSpacing: -1.5, marginBottom: 12 }}>
            Working Rights for{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--blue-400)' }}>
              Dental Professionals
            </em>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 580, lineHeight: 1.75, marginBottom: 36 }}>
            A plain-language guide to your employment rights under Georgian labour law — covering salary, working hours, and leave entitlements.
          </p>

          {/* Quick facts */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {QUICK_FACTS.map(fact => (
              <div key={fact.label} style={{
                background: 'rgba(255,255,255,0.1)', borderRadius: 12,
                padding: '14px 20px', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 22 }}>{fact.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{fact.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginTop: 2 }}>{fact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DISCLAIMER ── */}
      <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FCD34D' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 40px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> This guide is for general information only and does not constitute legal advice. Georgian labour law may change. For specific situations, consult a qualified labour lawyer or the relevant Georgian government authority.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 40px 60px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SECTIONS.map(section => {
            const isOpen = openSection === section.id
            return (
              <div
                key={section.id}
                style={{
                  background: 'white',
                  border: `1.5px solid ${isOpen ? section.border : 'var(--gray-300)'}`,
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: isOpen ? `0 4px 24px ${section.border}66` : 'var(--shadow-sm)',
                  transition: 'box-shadow 0.3s, border-color 0.3s',
                }}
              >
                {/* Section header */}
                <button
                  onClick={() => setOpenSection(isOpen ? null : section.id)}
                  style={{
                    width: '100%', padding: '24px 28px',
                    display: 'flex', alignItems: 'center', gap: 16,
                    background: isOpen ? section.bg : 'white',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: isOpen ? 'white' : section.bg,
                    border: `1.5px solid ${section.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, transition: 'all 0.2s',
                  }}>
                    {section.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--blue-900)', marginBottom: 4 }}>
                      {section.title}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.5 }}>
                      {section.summary}
                    </div>
                  </div>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: isOpen ? section.color : 'var(--gray-100)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, color: isOpen ? 'white' : 'var(--gray-500)',
                    transition: 'all 0.2s',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ▾
                  </div>
                </button>

                {/* Section body */}
                {isOpen && (
                  <div style={{ borderTop: `1px solid ${section.border}` }}>
                    <div style={{ padding: '8px 0' }}>
                      {section.items.map((item, idx) => {
                        const key = `${section.id}-${idx}`
                        const itemOpen = openItems.has(key)
                        return (
                          <div
                            key={key}
                            style={{
                              borderBottom: idx < section.items.length - 1 ? '1px solid var(--gray-100)' : 'none',
                            }}
                          >
                            <button
                              onClick={() => toggleItem(key)}
                              style={{
                                width: '100%', padding: '18px 28px',
                                display: 'flex', alignItems: 'center', gap: 14,
                                background: itemOpen ? `${section.bg}80` : 'transparent',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                transition: 'background 0.15s',
                              }}
                            >
                              <div style={{
                                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                                background: itemOpen ? section.color : 'var(--gray-100)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 11, fontWeight: 800,
                                color: itemOpen ? 'white' : 'var(--gray-500)',
                                transition: 'all 0.2s',
                              }}>
                                {itemOpen ? '−' : '+'}
                              </div>
                              <span style={{
                                fontSize: 14, fontWeight: 700,
                                color: itemOpen ? section.color : 'var(--blue-900)',
                                flex: 1, transition: 'color 0.15s',
                              }}>
                                {item.q}
                              </span>
                            </button>

                            {itemOpen && (
                              <div style={{
                                padding: '4px 28px 20px 66px',
                                background: `${section.bg}80`,
                              }}>
                                <p style={{
                                  fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.8,
                                  borderLeft: `3px solid ${section.color}`,
                                  paddingLeft: 16,
                                }}>
                                  {item.a}
                                </p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── NEED HELP CTA ── */}
        <div style={{
          marginTop: 40, borderRadius: 24,
          background: 'linear-gradient(135deg, var(--blue-900) 0%, #1A56A0 100%)',
          padding: '44px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: -0.5, marginBottom: 8 }}>
              Have a workplace issue?
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 420, lineHeight: 1.7 }}>
              If you believe your rights are being violated, you can contact the Social Service Agency of Georgia or seek advice from a labour lawyer.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href="https://ssa.gov.ge"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 22px', borderRadius: 10, border: 'none',
                background: 'white', fontSize: 13, fontWeight: 700,
                color: 'var(--blue-700)', cursor: 'pointer', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}
            >
              🏛 SSA Georgia
            </a>
            <button style={{
              padding: '12px 22px', borderRadius: 10,
              border: '1.5px solid rgba(255,255,255,0.3)', background: 'transparent',
              fontSize: 13, fontWeight: 600, color: 'white', cursor: 'pointer',
            }}>
              📞 Contact Us
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="padding: '60px 40px'"] { padding: 36px 20px 32px !important; }
          div[style*="padding: '40px 40px 60px'"] { padding: 24px 20px 40px !important; }
          button[style*="padding: '24px 28px'"] { padding: 18px 20px !important; }
        }
      `}</style>
    </div>
  )
}

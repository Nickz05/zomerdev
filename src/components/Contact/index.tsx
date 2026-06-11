import { useState } from 'react'
import { IconMail, IconMapPin, IconBuilding, IconBrandLinkedin, IconBrandInstagram, IconBrandTiktok, IconCheck, IconArrowRight } from '@tabler/icons-react'
import { useInView } from '../../hooks/useInView'
import SectionLabel from '../SectionLabel'
import profilePic from '../../../assets/images/profile-pic.jpg'
import { useLanguage } from '../../contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const { ref: sectionRef, inView } = useInView()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [subject, setSubject] = useState('gesprek')

  const anim = (delay: number) => ({
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(18px)',
      transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    data.set('onderwerp', subject)

    const errs: Record<string, string> = {}
    if (!data.get('naam')) errs.naam = t.contact.errorName
    if (!data.get('email')) errs.email = t.contact.errorEmail
    if (!data.get('bericht')) errs.bericht = t.contact.errorMessage
    if (Object.keys(errs).length) { setErrors(errs); return }

    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xblyvlko', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-[clamp(72px,11vw,120px)] px-6 bg-navy overflow-hidden"
      style={{ scrollMarginTop: '64px' }}
    >
      {/* Background dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Animated gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #FBA728 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
            animation: 'float-orb 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #FBA728 0%, transparent 70%)',
            bottom: '-10%',
            left: '10%',
            animation: 'float-orb 12s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-12 -left-8 font-display font-bold leading-none text-white/[0.025]"
        style={{ fontSize: 'clamp(160px, 20vw, 280px)' }}
      >
        →
      </div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-[5fr_7fr] gap-12 md:gap-20 items-start">

        {/* Left */}
        <div className="flex flex-col gap-7">

          <div {...anim(0)}>
            <SectionLabel light>{t.contact.label}</SectionLabel>
            <h2 className="font-display mt-3 text-[clamp(34px,5vw,56px)] font-bold text-white tracking-[-0.035em] leading-[1.04]">
              {t.contact.heading1}<br />
              <span className="italic text-gold">{t.contact.heading2}</span>
            </h2>
          </div>

          <div {...anim(80)}>
            <p className="text-white/50 text-[15px] leading-[1.8]">
              {t.contact.sub}
            </p>
          </div>

          <div {...anim(180)}>
            <ul className="flex flex-col gap-2.5">
              {[
                { icon: <IconMail size={14} stroke={1.6} />, text: 'info@zomerdev.com', href: 'mailto:info@zomerdev.com' },
                { icon: <IconMapPin size={14} stroke={1.6} />, text: 'Wassenaar, Nederland' },
                { icon: <IconBuilding size={14} stroke={1.6} />, text: 'KVK 98115561' },
              ].map((item) => (
                <li key={item.text}>
                  {item.href ? (
                    <a href={item.href} className="group flex items-center gap-3 text-white/50 hover:text-white/90 transition-colors duration-150 text-[13px]">
                      <span className="w-7 h-7 rounded-[6px] bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                        {item.icon}
                      </span>
                      {item.text}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-white/50 text-[13px]">
                      <span className="w-7 h-7 rounded-[6px] bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div {...anim(230)}>
            <div className="text-[11px] font-mono text-white/30 tracking-[0.1em] uppercase mb-3">{t.contact.trustLabel}</div>
            <div className="flex flex-col gap-2">
              {["'t Hertenhuisje · Wassenaar", "mdd b.v. · Den Haag"].map((name) => (
                <div key={name} className="flex items-center gap-2.5 text-white/45 text-[13px]">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  {name}
                </div>
              ))}
            </div>
          </div>

          <div {...anim(280)} className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
            <div className="flex items-center gap-3">
              <img
                src={profilePic}
                alt="Nick Zomer"
                className="w-9 h-9 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                style={{ objectPosition: '50% 18%' }}
              />
              <div>
                <div className="text-white text-[12px] font-semibold leading-tight">Nick Zomer</div>
                <div className="text-white/35 text-[10px] font-mono mt-0.5 tracking-wide">{t.contact.founderRole}</div>
              </div>
            </div>
            <div className="flex gap-1.5">
              {[
                { href: 'https://linkedin.com/company/zomerdev', label: 'LinkedIn', icon: <IconBrandLinkedin size={14} stroke={1.5} /> },
                { href: 'https://instagram.com/zomerdev', label: 'Instagram', icon: <IconBrandInstagram size={14} stroke={1.5} /> },
                { href: 'https://tiktok.com/@zomerdev', label: 'TikTok', icon: <IconBrandTiktok size={14} stroke={1.5} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-7 h-7 rounded-[6px] bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form card */}
        <div {...anim(100)}>
          <div className="relative bg-white dark:bg-[rgba(10,20,35,0.75)] dark:backdrop-blur-xl rounded-[20px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.35)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.7)] border border-transparent dark:border-white/[0.1]">
            <div className="h-[3px] w-full bg-gradient-to-r from-gold via-[#fdd07a] to-gold" />
            <div className="p-8 md:p-10">
              {status === 'sent' ? (
                <div className="flex flex-col items-center text-center gap-5 py-12">
                  <div className="w-16 h-16 rounded-full bg-[var(--mint-bg)] flex items-center justify-center">
                    <IconCheck size={30} className="text-[var(--mint-dot)]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="font-display text-[24px] font-bold text-gray-900 dark:text-white tracking-[-0.02em]">{t.contact.successTitle}</div>
                    <p className="text-[var(--text-muted)] text-[14px] mt-2 leading-relaxed max-w-[260px] mx-auto">
                      {t.contact.successSub}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                  <div className="mb-1">
                    <div className="font-display text-[22px] font-bold text-gray-900 dark:text-white tracking-[-0.02em]">{t.contact.formTitle}</div>
                    <div className="text-[var(--text-faint)] text-[13px] mt-1">{t.contact.formSub}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-[var(--text-faint)] tracking-[0.14em] uppercase mb-2.5">{t.contact.subjectLabel}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {t.contact.subjects.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSubject(s.id)}
                          className={`text-[12px] font-medium px-3 py-2.5 rounded-[var(--radius-sm)] border text-left transition-all duration-150 ${
                            subject === s.id
                              ? 'bg-navy text-white border-navy shadow-sm'
                              : 'bg-[#F6F8FC] dark:bg-white/[0.06] text-[#5A6B85] dark:text-white/50 border-[#E6E9F0] dark:border-white/[0.1] hover:border-navy dark:hover:border-white/30 hover:text-navy dark:hover:text-white'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <FloatingInput id="naam" name="naam" label={t.contact.fieldName} error={errors.naam} />
                  <FloatingInput id="email" name="email" label={t.contact.fieldEmail} type="email" error={errors.email} />

                  <div className="relative">
                    <textarea
                      name="bericht"
                      id="bericht"
                      placeholder=" "
                      rows={4}
                      className="peer w-full bg-[#F6F8FC] dark:bg-white/[0.07] border border-[#E6E9F0] dark:border-white/[0.12] rounded-[var(--radius-sm)] px-4 pt-6 pb-3 text-navy dark:text-[var(--text)] text-[15px] transition-all duration-150 focus:outline-none focus:border-navy dark:focus:border-gold focus:shadow-[0_0_0_3px_rgba(15,35,56,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(251,167,40,0.14)] resize-none aria-invalid:border-red-400"
                      aria-invalid={!!errors.bericht}
                    />
                    <label htmlFor="bericht" className="absolute left-4 top-[18px] text-[var(--text-faint)] text-[14px] transition-all duration-150 pointer-events-none peer-focus:top-[9px] peer-focus:text-[10px] peer-focus:tracking-[0.1em] peer-focus:uppercase peer-focus:text-navy dark:peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.1em] peer-[:not(:placeholder-shown)]:uppercase">
                      {t.contact.fieldMessage}
                    </label>
                    {errors.bericht && <p className="text-red-500 text-[11px] mt-1">{errors.bericht}</p>}
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-[12px] bg-red-50 border border-red-200 rounded-[var(--radius-sm)] px-4 py-2.5">
                      {t.contact.errorGeneral}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group w-full bg-navy text-white font-semibold text-[14px] py-4 rounded-[var(--radius-sm)] hover:bg-[var(--navy-700)] disabled:opacity-60 transition-all duration-150 flex items-center justify-center gap-2.5"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        {t.contact.submitSending}
                      </>
                    ) : (
                      <>
                        {t.contact.submitIdle}
                        <IconArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function FloatingInput({
  id, name, label, type = 'text', error,
}: {
  id: string; name: string; label: string; type?: string; error?: string
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={id}
        placeholder=" "
        className="peer w-full bg-[#F6F8FC] dark:bg-white/[0.07] border border-[#E6E9F0] dark:border-white/[0.12] rounded-[var(--radius-sm)] px-4 pt-6 pb-2.5 text-navy dark:text-[var(--text)] text-[15px] transition-all duration-150 focus:outline-none focus:border-navy dark:focus:border-gold focus:shadow-[0_0_0_3px_rgba(15,35,56,0.08)] dark:focus:shadow-[0_0_0_3px_rgba(251,167,40,0.14)] aria-invalid:border-red-400"
        aria-invalid={!!error}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-[18px] text-[#94A3B8] dark:text-white/30 text-[14px] transition-all duration-150 pointer-events-none peer-focus:top-[9px] peer-focus:text-[10px] peer-focus:tracking-[0.1em] peer-focus:uppercase peer-focus:text-navy dark:peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-[0.1em] peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  )
}

import { useState } from 'react'
import { Lock } from 'lucide-react'

const PASSPHRASE = 'revcap2025'
const STORAGE_KEY = 'rc_auth'

interface PasswordGateProps {
  children: React.ReactNode
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === PASSPHRASE } catch { return false }
  })
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  if (unlocked) return <>{children}</>

  const attempt = () => {
    if (input === PASSPHRASE) {
      try { localStorage.setItem(STORAGE_KEY, PASSPHRASE) } catch {}
      setUnlocked(true)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setTimeout(() => setError(false), 2000)
      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-midnight-green flex items-center justify-center px-6 relative overflow-hidden">

      {/* Orbs */}
      <div className="orb orb-a pointer-events-none fixed w-[600px] h-[600px] -top-40 -right-40 opacity-20"
        style={{ background: 'radial-gradient(circle, #095256 0%, transparent 70%)' }} />
      <div className="orb orb-b pointer-events-none fixed w-[500px] h-[500px] bottom-0 -left-40 opacity-15"
        style={{ background: 'radial-gradient(circle, #732f37 0%, transparent 70%)' }} />

      {/* Subtle radial gradient behind card */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div style={{
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(55,93,138,0.12) 0%, transparent 70%)',
        }} />
      </div>

      <div
        className="w-full max-w-sm relative z-10"
        style={{ animation: shaking ? 'shake 0.4s ease' : 'none' }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <a href="/">
            <img src="/Logo.svg" alt="revCap" className="h-10 w-auto object-contain opacity-90" />
          </a>
        </div>

        {/* Gate card */}
        <div className="rounded-2xl border border-dutch-white/10 backdrop-blur-sm p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(239,223,187,0.06) 0%, rgba(9,82,86,0.08) 100%)' }}>

          <div className="w-10 h-10 rounded-full border border-dutch-white/10 flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(239,223,187,0.05)' }}>
            <Lock className="w-4 h-4 text-dutch-white/30" />
          </div>

          <h1 className="font-heading text-2xl font-normal tracking-tight mb-3"
            style={{
              background: 'linear-gradient(135deg, #efdfbb 30%, rgba(239,223,187,0.55) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            Are you sure you're<br />supposed to be here?
          </h1>

          <p className="text-dutch-white/35 text-sm font-body font-light mb-8 leading-relaxed">
            This dashboard is for revCap internal use only.
          </p>

          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            placeholder="Enter passphrase"
            autoFocus
            className="w-full border border-dutch-white/10 rounded-xl px-4 py-3 text-dutch-white placeholder-dutch-white/20 text-sm font-body text-center tracking-widest focus:outline-none focus:border-dutch-white/25 transition-colors mb-3"
            style={{ background: 'rgba(239,223,187,0.04)' }}
          />

          {error && (
            <p className="text-wine text-xs font-heading font-bold uppercase tracking-wide mb-3">
              Wrong passphrase. Try again.
            </p>
          )}

          <button
            onClick={attempt}
            className="w-full text-dutch-white font-heading font-bold text-xs uppercase tracking-widest py-3 rounded-xl transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #732f37 0%, #8c3942 100%)' }}
          >
            Enter
          </button>
        </div>

        <p className="text-dutch-white/20 text-xs text-center mt-6 font-body font-light tracking-wide">
          revCap · Soft Launch Operations
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </div>
  )
}
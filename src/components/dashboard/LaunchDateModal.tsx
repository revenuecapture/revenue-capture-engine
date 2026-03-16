import { useState } from 'react'

interface LaunchDateModalProps {
  onConfirm: (date: string) => Promise<void>
}

export function LaunchDateModal({ onConfirm }: LaunchDateModalProps) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [saving, setSaving] = useState(false)

  const handleConfirm = async () => {
    if (!date) return
    setSaving(true)
    await onConfirm(date)
    setSaving(false)
  }

  const formatPreview = (d: string) => {
    if (!d) return ''
    const start = new Date(d)
    const end = new Date(start)
    end.setDate(start.getDate() + 29)
    return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} → ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(4,39,42,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: 'linear-gradient(145deg, rgba(9,82,86,0.7) 0%, rgba(4,39,42,0.98) 100%)',
          border: '1px solid rgba(239,223,187,0.15)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
        }}>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Logo.svg" alt="revCap" className="h-8 w-auto object-contain opacity-80" />
        </div>

        {/* Heading */}
        <h2 className="font-heading font-bold text-2xl text-dutch-white text-center mb-2 tracking-tight">
          When does your soft launch start?
        </h2>
        <p className="text-dutch-white/45 text-sm text-center font-body mb-8 leading-relaxed">
          This sets your 30-day window. Week counts, pipeline tracking,
          and the current-week highlight all auto-compute from this date.
        </p>

        {/* Date input */}
        <div className="mb-4">
          <label className="block text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-2">
            Launch date
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-dutch-white font-body text-sm focus:outline-none transition-all"
            style={{
              background: 'rgba(239,223,187,0.07)',
              border: '1px solid rgba(239,223,187,0.18)',
              colorScheme: 'dark',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(239,223,187,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(239,223,187,0.18)'}
          />
        </div>

        {/* Preview */}
        {date && (
          <div className="rounded-xl px-4 py-3 mb-6"
            style={{ background: 'rgba(239,223,187,0.05)', border: '1px solid rgba(239,223,187,0.08)' }}>
            <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/30 mb-1">
              30-day window
            </p>
            <p className="text-dutch-white/70 text-sm font-body">{formatPreview(date)}</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleConfirm}
          disabled={!date || saving}
          className="w-full py-3.5 rounded-xl font-heading font-bold text-sm uppercase tracking-widest transition-all"
          style={{
            background: saving || !date
              ? 'rgba(115,47,55,0.3)'
              : 'linear-gradient(135deg, #732f37 0%, #9a4a53 100%)',
            color: saving || !date ? 'rgba(239,223,187,0.3)' : '#efdfbb',
            border: '1px solid rgba(115,47,55,0.4)',
            cursor: saving || !date ? 'not-allowed' : 'pointer',
          }}>
          {saving ? 'Saving…' : 'Set launch date →'}
        </button>

        <p className="text-dutch-white/20 text-[11px] text-center font-body mt-4">
          Syncs for everyone. You can't change this later without help.
        </p>
      </div>
    </div>
  )
}

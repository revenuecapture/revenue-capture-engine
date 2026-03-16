import { Prospect, CADENCE_DAYS, DAY_IS_GAP } from '@/types/dashboard'
import { cn } from '@/lib/utils'

interface CadenceTabProps {
  prospects: Prospect[]
  cadenceStates: Record<string, string>
  onCycle: (prospectId: string, day: string) => void
}

const CELL_STYLES: Record<string, { background: string; color: string; border: string }> = {
  sent:    { background: 'rgba(55,93,138,0.35)',  color: '#93b8e8', border: 'rgba(55,93,138,0.5)'  },
  called:  { background: 'rgba(115,47,55,0.35)',  color: '#efdfbb', border: 'rgba(115,47,55,0.5)'  },
  replied: { background: 'rgba(45,122,79,0.35)',  color: '#86efac', border: 'rgba(45,122,79,0.5)'  },
}

const CELL_LABELS: Record<string, string> = { sent: 'E', called: 'C', replied: 'R' }

export function CadenceTab({ prospects, cadenceStates, onCycle }: CadenceTabProps) {
  return (
    <div className="rounded-xl border border-dutch-white/10 p-6"
      style={{ background: 'linear-gradient(145deg, rgba(9,82,86,0.6) 0%, rgba(4,39,42,0.8) 100%)', backdropFilter: 'blur(8px)' }}>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40">14-day touchpoint cadence</p>
        <div className="flex gap-4 text-[11px] text-dutch-white/40 font-body">
          {[
            { label: 'Email (E)', bg: 'rgba(55,93,138,0.35)',  border: 'rgba(55,93,138,0.5)'  },
            { label: 'Call (C)',  bg: 'rgba(115,47,55,0.35)',  border: 'rgba(115,47,55,0.5)'  },
            { label: 'Replied (R)',bg:'rgba(45,122,79,0.35)',  border: 'rgba(45,122,79,0.5)'  },
            { label: 'Gap',       bg: 'transparent',           border: 'rgba(239,223,187,0.12)'},
          ].map(({ label, bg, border }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: bg, border: `1px solid ${border}` }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      {prospects.length === 0 ? (
        <p className="text-sm text-dutch-white/25 text-center py-10 font-body">Add prospects in the Prospect Tracker tab to track their cadence.</p>
      ) : (
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `130px repeat(${CADENCE_DAYS.length}, 1fr)` }}>
          <div />
          {CADENCE_DAYS.map(day => (
            <div key={day} className="text-center text-[10px] font-heading font-bold text-dutch-white/30 pb-2 tracking-wide">{day}</div>
          ))}
          {prospects.slice(0, 8).map(p => (
            <div key={p.id} className="contents">
              <div className="flex items-center pr-3 text-[11px] text-dutch-white/50 overflow-hidden whitespace-nowrap text-ellipsis min-h-[30px] font-body">
                {p.company || '—'}
              </div>
              {CADENCE_DAYS.map(day => {
                const isGap = !!DAY_IS_GAP[day]
                const key = `${p.id}-${day}`
                const state = cadenceStates[key] || (isGap ? 'gap' : '')
                const cellStyle = state && CELL_STYLES[state]
                  ? { background: CELL_STYLES[state].background, color: CELL_STYLES[state].color, border: `1px solid ${CELL_STYLES[state].border}` }
                  : isGap
                  ? { background: 'transparent', border: '1px solid transparent' }
                  : { background: 'rgba(239,223,187,0.04)', border: '1px solid rgba(239,223,187,0.06)' }

                return (
                  <div key={`${p.id}-${day}`}
                    title={`${p.company || '—'} — ${day}`}
                    onClick={isGap ? undefined : () => onCycle(p.id, day)}
                    className={cn(
                      'aspect-square rounded-lg flex items-center justify-center text-[9px] font-heading font-bold transition-all',
                      !isGap && 'cursor-pointer hover:opacity-80'
                    )}
                    style={cellStyle}>
                    {isGap
                      ? <span style={{ color: 'rgba(239,223,187,0.12)', fontSize: 14 }}>·</span>
                      : (CELL_LABELS[state] || '')}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
      <p className="text-[10px] text-dutch-white/20 mt-5 font-body">
        Click a cell to cycle: blank → E (email sent) → C (call made) → R (replied). D3/D6/D11 are intentional gaps.
      </p>
    </div>
  )
}

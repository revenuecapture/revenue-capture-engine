import { Prospect, SEGMENTS, ProspectStatus } from '@/types/dashboard'
import { StatusBadge } from './StatusBadge'
import { cn } from '@/lib/utils'
import { Trash2, Plus } from 'lucide-react'

interface ProspectTrackerProps {
  prospects: Prospect[]
  prospectCurrentDay: (p: Prospect) => number
  onAdd: () => void
  onDelete: (id: string) => void
  onUpdate: (id: string, field: keyof Prospect, value: string | number) => void
  onCycleStatus: (id: string) => void
}

export function ProspectTracker({ prospects, prospectCurrentDay, onAdd, onDelete, onUpdate, onCycleStatus }: ProspectTrackerProps) {
  const inputCls = "w-full bg-transparent border-b border-transparent text-dutch-white placeholder-dutch-white/20 text-sm font-body outline-none transition-colors py-0.5"
  const inputStyle = { borderBottomColor: 'transparent' }

  return (
    <div className="rounded-xl border border-dutch-white/10 p-6"
      style={{ background: 'linear-gradient(145deg, rgba(9,82,86,0.6) 0%, rgba(4,39,42,0.8) 100%)', backdropFilter: 'blur(8px)' }}>

      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40">Prospects</p>
        <div className="flex gap-4 flex-wrap text-[11px] text-dutch-white/40 font-body">
          {[
            { label: 'New',       bg: 'rgba(55,93,138,0.3)',    border: 'rgba(55,93,138,0.5)'   },
            { label: 'In touch',  bg: 'rgba(239,223,187,0.12)', border: 'rgba(239,223,187,0.2)' },
            { label: 'Replied',   bg: 'rgba(9,82,86,0.5)',      border: 'rgba(9,82,86,0.7)'     },
            { label: 'Meeting',   bg: 'rgba(115,47,55,0.3)',    border: 'rgba(115,47,55,0.5)'   },
            { label: 'Converted', bg: 'rgba(45,122,79,0.3)',    border: 'rgba(45,122,79,0.5)'   },
            { label: 'Lost',      bg: 'rgba(239,223,187,0.05)', border: 'rgba(239,223,187,0.1)' },
          ].map(({ label, bg, border }) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: bg, border: `1px solid ${border}` }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[780px]">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(239,223,187,0.08)' }}>
              {['Company','Contact','Segment','Pipeline day','Status','Deal (£/mo)','Notes',''].map(h => (
                <th key={h} className="text-left text-[10px] font-heading font-bold uppercase tracking-wider text-dutch-white/30 pb-3 pr-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prospects.map(p => {
              const day = prospectCurrentDay(p)
              return (
                <tr key={p.id} className="group transition-colors" style={{ borderBottom: '1px solid rgba(239,223,187,0.04)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,223,187,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <td className="py-2.5 pr-3">
                    <input value={p.company} placeholder="LexiGrade Ltd"
                      onChange={e => onUpdate(p.id, 'company', e.target.value)}
                      className={inputCls} style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = 'rgba(239,223,187,0.25)'}
                      onBlur={e => e.target.style.borderBottomColor = 'transparent'} />
                  </td>
                  <td className="py-2.5 pr-3">
                    <input value={p.contact} placeholder="Founder name"
                      onChange={e => onUpdate(p.id, 'contact', e.target.value)}
                      className={inputCls} style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = 'rgba(239,223,187,0.25)'}
                      onBlur={e => e.target.style.borderBottomColor = 'transparent'} />
                  </td>
                  <td className="py-2.5 pr-3">
                    <select value={p.segment} onChange={e => onUpdate(p.id, 'segment', e.target.value)}
                      className="bg-transparent text-dutch-white/60 text-sm font-body outline-none cursor-pointer">
                      {SEGMENTS.map(s => <option key={s} value={s} style={{ background: '#04272a', color: '#efdfbb' }}>{s}</option>)}
                    </select>
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold whitespace-nowrap"
                      style={day > 0
                        ? { background: 'rgba(55,93,138,0.25)', color: '#93b8e8', border: '1px solid rgba(55,93,138,0.35)' }
                        : { background: 'rgba(239,223,187,0.05)', color: 'rgba(239,223,187,0.3)', border: '1px solid rgba(239,223,187,0.08)' }}>
                      {day > 0 ? `Day ${day}` : 'Not started'}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <StatusBadge status={p.status as ProspectStatus} onClick={() => onCycleStatus(p.id)} />
                  </td>
                  <td className="py-2.5 pr-3">
                    <input type="number" value={p.deal_value || 999} min={0}
                      onChange={e => onUpdate(p.id, 'deal_value', parseFloat(e.target.value) || 0)}
                      className={cn(inputCls, 'w-20')} style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = 'rgba(239,223,187,0.25)'}
                      onBlur={e => e.target.style.borderBottomColor = 'transparent'} />
                  </td>
                  <td className="py-2.5 pr-3">
                    <input value={p.notes} placeholder="Quick note…"
                      onChange={e => onUpdate(p.id, 'notes', e.target.value)}
                      className={inputCls} style={inputStyle}
                      onFocus={e => e.target.style.borderBottomColor = 'rgba(239,223,187,0.25)'}
                      onBlur={e => e.target.style.borderBottomColor = 'transparent'} />
                  </td>
                  <td className="py-2.5">
                    <button onClick={() => onDelete(p.id)}
                      className="text-dutch-white/15 hover:text-[#e07070] transition-colors p-1 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <button onClick={onAdd}
        className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl text-dutch-white/40 hover:text-dutch-white/70 transition-all text-xs font-heading font-bold uppercase tracking-wide"
        style={{ border: '1px dashed rgba(239,223,187,0.15)' }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,223,187,0.3)'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,223,187,0.03)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,223,187,0.15)'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}>
        <Plus className="w-3.5 h-3.5" /> Add prospect
      </button>
    </div>
  )
}

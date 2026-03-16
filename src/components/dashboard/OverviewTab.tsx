import { KpiCard } from './KpiCard'
import { StatusBadge } from './StatusBadge'
import { Prospect, MAX_WEEKS, LEADS_PER_WEEK } from '@/types/dashboard'
import { cn } from '@/lib/utils'

interface OverviewTabProps {
  prospects: Prospect[]
  stats: { total: number; inTouch: number; replied: number; meetings: number; converted: number; touchpoints: number }
  projections: { meetings: number; proposals: number; closes: number }
  projectedMRR: number
  actualMRR: number
  dashState: { rate_mql: number; rate_sql: number; rate_conv: number; session_notes: string; launch_start: string | null }
  currentWeekAuto: () => number
  prospectsInWeek: (week: number) => Prospect[]
  getWeekBounds: (week: number) => { weekStart: Date; weekEnd: Date }
  onRateChange: (field: 'rate_mql' | 'rate_sql' | 'rate_conv', value: number) => void
  onNotesChange: (value: string) => void
  prospectCurrentDay: (p: Prospect) => number
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 whitespace-nowrap">{children}</p>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(239,223,187,0.2) 0%, transparent 100%)' }} />
  </div>
)

/* Card gradient themes */
const CARD_WINE    = { background: 'linear-gradient(145deg, rgba(115,47,55,0.35) 0%, rgba(4,39,42,0.9) 60%)', border: 'rgba(115,47,55,0.4)' }
const CARD_BLUE    = { background: 'linear-gradient(145deg, rgba(55,93,138,0.35) 0%, rgba(4,39,42,0.9) 60%)', border: 'rgba(55,93,138,0.4)' }
const CARD_TEAL    = { background: 'linear-gradient(145deg, rgba(9,82,86,0.6)   0%, rgba(4,39,42,0.9) 60%)', border: 'rgba(9,82,86,0.5)'   }
const CARD_NEUTRAL = { background: 'linear-gradient(145deg, rgba(239,223,187,0.08) 0%, rgba(4,39,42,0.9) 60%)', border: 'rgba(239,223,187,0.1)' }

const Card = ({ children, theme = CARD_TEAL, className }: { children: React.ReactNode; theme?: typeof CARD_TEAL; className?: string }) => (
  <div className={cn('rounded-xl p-5 backdrop-blur-sm', className)}
    style={{ background: theme.background, border: `1px solid ${theme.border}` }}>
    {children}
  </div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-4">{children}</p>
)



export function OverviewTab({
  prospects, stats, projections, projectedMRR, actualMRR, dashState,
  currentWeekAuto, prospectsInWeek, getWeekBounds, onRateChange, onNotesChange, prospectCurrentDay,
}: OverviewTabProps) {
  const currentWeek = currentWeekAuto()
  const bw = (n: number, base: number) =>
    base === 0 ? '0%' : `${Math.max(4, Math.round((n / base) * 100))}%`

  const FunnelRow = ({ label, count, total, gradient }: {
    label: string; count: number; total: number; gradient: string
  }) => (
    <div className="flex items-center gap-3 mb-2.5">
      <span className="text-xs text-dutch-white/50 w-20 text-right flex-shrink-0 font-body">{label}</span>
      <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="h-full rounded-lg flex items-center px-2.5 transition-all duration-700"
          style={{ width: bw(count, total), background: gradient }}>
          <span className="text-[10px] font-heading font-bold text-dutch-white">{count}</span>
        </div>
      </div>
      <span className="text-[11px] text-dutch-white/35 w-9 text-right flex-shrink-0">
        {total > 0 ? `${Math.round((count / total) * 100)}%` : '—'}
      </span>
    </div>
  )

  const RateRow = ({ label, sublabel, field, value, result, resultLabel }: {
    label: string; sublabel: string; field: 'rate_mql' | 'rate_sql' | 'rate_conv'; value: number; result: number; resultLabel: string
  }) => (
    <div className="flex items-center justify-between gap-4 py-3" style={{ borderBottom: '1px solid rgba(239,223,187,0.06)' }}>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-dutch-white/80 font-body">{label}</p>
        <p className="text-[11px] text-dutch-white/35 font-body mt-0.5">{sublabel}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5"
          style={{ background: 'rgba(239,223,187,0.07)', border: '1px solid rgba(239,223,187,0.12)' }}>
          <input
            type="number" value={value} min={0} max={100}
            onChange={e => onRateChange(field, parseFloat(e.target.value) || 0)}
            className="w-8 text-right font-heading font-bold text-sm text-dutch-white bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ MozAppearance: 'textfield' as never }}
          />
          <span className="text-dutch-white/40 text-xs font-body">%</span>
        </div>
        <div className="text-right w-20">
          <span className="font-heading font-bold text-emerald-300 text-sm">{result}</span>
          <span className="text-dutch-white/30 text-[11px] font-body ml-1">{resultLabel}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">

      {/* KPIs — alternating wine / blue / teal gradients */}
      <div>
        <SectionLabel>30-day snapshot</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiCard label="Total leads" value={stats.total} meta="Target: 30"
            delta={stats.total === 0 ? '—' : `${stats.total - 30 >= 0 ? '+' : ''}${stats.total - 30} vs target`}
            deltaType={stats.total === 0 ? 'neutral' : stats.total >= 30 ? 'on' : 'under'}
            gradient="linear-gradient(145deg, rgba(115,47,55,0.5) 0%, rgba(4,39,42,0.95) 60%)"
            borderColor="rgba(115,47,55,0.45)" />
          <KpiCard label="Meetings booked" value={stats.meetings} meta="Target: 5"
            delta={stats.meetings === 0 ? '—' : `${stats.meetings - 5 >= 0 ? '+' : ''}${stats.meetings - 5} vs target`}
            deltaType={stats.meetings === 0 ? 'neutral' : stats.meetings >= 5 ? 'on' : 'under'}
            gradient="linear-gradient(145deg, rgba(55,93,138,0.5) 0%, rgba(4,39,42,0.95) 60%)"
            borderColor="rgba(55,93,138,0.45)" />
          <KpiCard label="Touchpoints sent" value={stats.touchpoints} meta="14-day cadence"
            gradient="linear-gradient(145deg, rgba(9,82,86,0.6) 0%, rgba(4,39,42,0.95) 60%)"
            borderColor="rgba(9,82,86,0.5)" />
          <KpiCard label="Reply rate"
            value={stats.total > 0 ? `${Math.round((stats.replied / stats.total) * 100)}%` : '—'}
            meta={`${stats.replied} replies`}
            gradient="linear-gradient(145deg, rgba(115,47,55,0.35) 0%, rgba(55,93,138,0.3) 50%, rgba(4,39,42,0.95) 100%)"
            borderColor="rgba(184,154,90,0.35)" />
          <KpiCard label="Converted" value={stats.converted} meta="Target: 1"
            delta={stats.converted === 0 ? '—' : stats.converted >= 1 ? 'Target hit!' : 'In progress'}
            deltaType={stats.converted >= 1 ? 'on' : 'neutral'}
            gradient="linear-gradient(145deg, rgba(45,122,79,0.45) 0%, rgba(4,39,42,0.95) 60%)"
            borderColor="rgba(45,122,79,0.4)" />
        </div>
      </div>

      {/* Pipeline + Weekly */}
      <div>
        <SectionLabel>Pipeline &amp; targets</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Wine-accented funnel card */}
          <Card theme={CARD_WINE}>
            <CardTitle>Pipeline funnel</CardTitle>
            <FunnelRow label="Cold leads" count={stats.total}     total={stats.total} gradient="linear-gradient(90deg, #732f37, #9a4a53)" />
            <FunnelRow label="In touch"   count={stats.inTouch}   total={stats.total} gradient="linear-gradient(90deg, #375d8a, #4a78b0)" />
            <FunnelRow label="Replied"    count={stats.replied}   total={stats.total} gradient="linear-gradient(90deg, #2d5a7a, #3d7aaa)" />
            <FunnelRow label="Meetings"   count={stats.meetings}  total={stats.total} gradient="linear-gradient(90deg, #095256, #0d7278)" />
            <FunnelRow label="Converted"  count={stats.converted} total={stats.total} gradient="linear-gradient(90deg, #1a5c3a, #2d7a4f)" />

            <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(239,223,187,0.08)' }}>
              <div className="flex items-start justify-between mb-1">
                <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/30">
                  Forecasting assumptions
                </p>
                <p className="text-[10px] text-dutch-white/25 font-body text-right">Projected closes</p>
              </div>
              <p className="text-[11px] text-dutch-white/30 font-body mb-4">
                Adjust these to match your actual close rates as data comes in.
              </p>
              <RateRow
                label="Leads who book a meeting"
                sublabel={`Out of ${Math.max(stats.total, 30)} leads, how many take a call?`}
                field="rate_mql" value={dashState.rate_mql} result={projections.meetings}
                resultLabel="meetings" />
              <RateRow
                label="Meetings that reach proposal"
                sublabel="Of those calls, how many progress to a proposal?"
                field="rate_sql" value={dashState.rate_sql} result={projections.proposals}
                resultLabel="proposals" />
              <RateRow
                label="Proposals that close"
                sublabel="Of those proposals, how many sign up?"
                field="rate_conv" value={dashState.rate_conv} result={projections.closes}
                resultLabel="closes" />
            </div>
          </Card>

          {/* Blue-accented weekly card */}
          <Card theme={CARD_BLUE}>
            <CardTitle>Weekly lead counts</CardTitle>
            <div className="space-y-3 mb-5">
              {Array.from({ length: MAX_WEEKS }, (_, i) => i + 1).map(w => {
                const isCur = w === currentWeek
                const count = prospectsInWeek(w).length
                const { weekStart } = getWeekBounds(w)
                const dateLabel = weekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                return (
                  <div key={w} className={cn('flex items-center gap-3 transition-opacity', !isCur && 'opacity-35')}>
                    <span className="text-xs text-dutch-white/60 w-10 flex-shrink-0 font-heading font-bold">Wk {w}</span>
                    <span className="text-[10px] text-dutch-white/35 w-12 flex-shrink-0 font-body">{dateLabel}</span>
                    <div className="flex gap-1.5 flex-1">
                      {Array.from({ length: LEADS_PER_WEEK }, (_, d) => (
                        <div key={d} className="w-5 h-5 rounded-full transition-all"
                          style={d < count
                            ? { background: 'linear-gradient(135deg, #375d8a, #4a78b0)', boxShadow: '0 0 6px rgba(55,93,138,0.5)' }
                            : { background: 'transparent', border: isCur ? '1.5px solid rgba(55,93,138,0.5)' : '1.5px solid rgba(239,223,187,0.18)' }
                          } />
                      ))}
                    </div>
                    <span className={cn('text-xs font-heading font-bold w-8 text-right',
                      count >= LEADS_PER_WEEK ? 'text-emerald-300' : count > 0 ? 'text-dutch-white/70' : 'text-dutch-white/30')}>
                      {count}/7
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="pt-4" style={{ borderTop: '1px solid rgba(239,223,187,0.08)' }}>
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-2.5">Session notes</p>
              <textarea value={dashState.session_notes} onChange={e => onNotesChange(e.target.value)}
                placeholder="Blockers, patterns, what messaging worked…"
                className="w-full min-h-[90px] rounded-lg px-3 py-2.5 text-sm text-dutch-white/90 placeholder-dutch-white/20 font-body resize-y focus:outline-none transition-all"
                style={{ background: 'rgba(239,223,187,0.06)', border: '1px solid rgba(239,223,187,0.12)' }}
                onFocus={e => e.target.style.borderColor = 'rgba(239,223,187,0.28)'}
                onBlur={e => e.target.style.borderColor = 'rgba(239,223,187,0.12)'}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Prospect overview */}
      <div>
        <SectionLabel>Prospect status overview</SectionLabel>
        <Card theme={CARD_NEUTRAL}>
          {prospects.length === 0 ? (
            <p className="text-sm text-dutch-white/25 text-center py-8 font-body">Add prospects in the Prospect Tracker tab.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(239,223,187,0.1)' }}>
                    {['Company','Contact','Segment','Pipeline day','Status','Deal (£/mo)','Notes'].map(h => (
                      <th key={h} className="text-left text-[10px] font-heading font-bold uppercase tracking-wider text-dutch-white/30 pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prospects.map(p => {
                    const day = prospectCurrentDay(p)
                    return (
                      <tr key={p.id} className="transition-colors" style={{ borderBottom: '1px solid rgba(239,223,187,0.05)' }}>
                        <td className="py-3 pr-4 font-heading font-bold text-dutch-white">{p.company || '—'}</td>
                        <td className="py-3 pr-4 text-dutch-white/55 font-body">{p.contact || '—'}</td>
                        <td className="py-3 pr-4 text-dutch-white/55 font-body">{p.segment}</td>
                        <td className="py-3 pr-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold"
                            style={day > 0
                              ? { background: 'rgba(55,93,138,0.3)', color: '#93b8e8', border: '1px solid rgba(55,93,138,0.4)' }
                              : { background: 'rgba(239,223,187,0.05)', color: 'rgba(239,223,187,0.3)', border: '1px solid rgba(239,223,187,0.1)' }}>
                            {day > 0 ? `Day ${day}` : 'Not started'}
                          </span>
                        </td>
                        <td className="py-3 pr-4"><StatusBadge status={p.status} /></td>
                        <td className="py-3 pr-4 text-dutch-white/55 font-body">£{(p.deal_value || 999).toLocaleString()}</td>
                        <td className="py-3 text-dutch-white/35 text-xs font-body">{p.notes || '—'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

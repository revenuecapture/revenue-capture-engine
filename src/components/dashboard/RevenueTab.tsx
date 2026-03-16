import { Prospect, GBP_TO_PKR } from '@/types/dashboard'
import { StatusBadge } from './StatusBadge'

interface RevenueTabProps {
  prospects: Prospect[]
  projections: { meetings: number; proposals: number; closes: number }
  projectedMRR: number
  actualMRR: number
  stats: { total: number }
}

const cardStyle = {
  background: 'linear-gradient(145deg, rgba(9,82,86,0.6) 0%, rgba(4,39,42,0.8) 100%)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(239,223,187,0.1)',
}

const RevRow = ({ label, value, valueStyle = {}, large = false }: {
  label: string; value: string; valueStyle?: React.CSSProperties; large?: boolean
}) => (
  <div className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid rgba(239,223,187,0.05)' }}>
    <span className="text-sm text-dutch-white/45 font-body">{label}</span>
    <span className={`font-heading font-bold ${large ? 'text-xl' : 'text-sm'} text-dutch-white`} style={valueStyle}>{value}</span>
  </div>
)

export function RevenueTab({ prospects, projections, projectedMRR, actualMRR, stats }: RevenueTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <div className="rounded-xl p-6" style={cardStyle}>
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-5">Projected pipeline</p>
        <RevRow label="Prospects in pipeline" value={String(stats.total)} />
        <RevRow label="Projected meetings"     value={String(projections.meetings)} />
        <RevRow label="Projected proposals"    value={String(projections.proposals)} />
        <RevRow label="Projected closes"       value={String(projections.closes)} />

        <div className="mt-3 pt-1">
          {/* Best case MRR — gradient text highlight */}
          <div className="rounded-xl p-4 mt-3 mb-2" style={{ background: 'linear-gradient(135deg, rgba(45,122,79,0.2) 0%, rgba(9,82,86,0.3) 100%)', border: '1px solid rgba(45,122,79,0.25)' }}>
            <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-1">Best case MRR</p>
            <p className="font-heading font-bold text-3xl tracking-tight"
              style={{ background: 'linear-gradient(135deg, #efdfbb 0%, #86efac 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              £{projectedMRR.toLocaleString()}
            </p>
            <p className="text-xs text-dutch-white/35 mt-1 font-body">
              Rs. {projectedMRR > 0 ? Math.round(projectedMRR * GBP_TO_PKR).toLocaleString() : '—'}
            </p>
          </div>

          {actualMRR > 0 && (
            <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg, rgba(45,122,79,0.3) 0%, rgba(45,122,79,0.15) 100%)', border: '1px solid rgba(45,122,79,0.35)' }}>
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-1">Confirmed MRR</p>
              <p className="font-heading font-bold text-2xl text-emerald-300">£{actualMRR.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl p-6" style={cardStyle}>
        <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/40 mb-5">Per-prospect deal values</p>
        {prospects.length === 0 ? (
          <p className="text-sm text-dutch-white/25 text-center py-10 font-body">No prospects yet.</p>
        ) : (
          <>
            <div>
              {prospects.map(p => (
                <div key={p.id} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid rgba(239,223,187,0.05)' }}>
                  <div className="flex items-center gap-2.5">
                    <StatusBadge status={p.status} />
                    <span className="font-heading font-bold text-dutch-white text-sm">{p.company || '—'}</span>
                  </div>
                  <span className="font-heading font-bold text-sm" style={{ color: '#93b8e8' }}>
                    £{(p.deal_value || 999).toLocaleString()}/mo
                  </span>
                </div>
              ))}
            </div>
            {actualMRR > 0 && (
              <div className="flex justify-between pt-4 mt-3" style={{ borderTop: '1px solid rgba(239,223,187,0.08)' }}>
                <span className="font-heading font-bold text-dutch-white">Confirmed MRR</span>
                <span className="font-heading font-bold text-emerald-300">£{actualMRR.toLocaleString()}/mo</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

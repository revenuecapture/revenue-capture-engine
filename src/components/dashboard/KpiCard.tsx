interface KpiCardProps {
  label: string
  value: string | number
  meta?: string
  delta?: string
  deltaType?: 'on' | 'under' | 'neutral'
  gradient: string
  borderColor: string
}

export function KpiCard({ label, value, meta, delta, deltaType = 'neutral', gradient, borderColor }: KpiCardProps) {
  const deltaClass = deltaType === 'on' ? 'text-emerald-300' : deltaType === 'under' ? 'text-[#e07070]' : 'text-dutch-white/25'
  return (
    <div className="relative rounded-xl overflow-hidden p-5 h-full"
      style={{ background: gradient, border: `1px solid ${borderColor}` }}>
      <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-dutch-white/50 mb-3">{label}</p>
      <p className="font-heading text-[44px] font-bold tracking-tight leading-none mb-1 text-dutch-white drop-shadow-sm">{value}</p>
      {meta && <p className="text-[11px] text-dutch-white/40 mt-1.5">{meta}</p>}
      {delta && <p className={`text-[11px] font-heading font-bold mt-1 ${deltaClass}`}>{delta}</p>}
    </div>
  )
}

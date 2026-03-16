import { ProspectStatus, STATUS_LABELS } from '@/types/dashboard'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: ProspectStatus
  onClick?: () => void
  className?: string
}

const STATUS_STYLES: Record<ProspectStatus, string> = {
  new:       'bg-federal-blue/20 text-blue-300 border-federal-blue/30 hover:bg-federal-blue/30',
  touch:     'bg-dutch-white/10 text-dutch-white/70 border-dutch-white/20 hover:bg-dutch-white/15',
  reply:     'bg-midnight-green/60 text-emerald-300 border-emerald-700/40 hover:bg-midnight-green/80',
  meeting:   'bg-wine/20 text-dutch-white border-wine/40 hover:bg-wine/30',
  converted: 'bg-emerald-900/40 text-emerald-300 border-emerald-600/30 hover:bg-emerald-900/60',
  lost:      'bg-dutch-white/5 text-dutch-white/30 border-dutch-white/10 hover:bg-dutch-white/10',
}

export function StatusBadge({ status, onClick, className }: StatusBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wide border transition-all',
        onClick ? 'cursor-pointer' : 'cursor-default',
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </button>
  )
}

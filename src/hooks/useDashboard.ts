import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import {
  Prospect, CadenceEntry, DashboardState, ProspectStatus,
  STATUSES, CADENCE_DAYS, DAY_IS_GAP, DAY_NUMBER, MAX_WEEKS,
} from '@/types/dashboard'
import { toast } from '@/hooks/use-toast'

export function useDashboard() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [cadenceStates, setCadenceStates] = useState<Record<string, string>>({})
  const [dashState, setDashState] = useState<DashboardState>({
    id: 1, current_week: 1, launch_start: null,
    rate_mql: 17, rate_sql: 60, rate_conv: 33,
    session_notes: '', updated_at: '',
  })
  const [loading, setLoading] = useState(true)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prospectSaveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const cadenceSaveTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  // ── Load ──
  const loadAll = useCallback(async () => {
    const [{ data: pData }, { data: cData }, { data: sData }] = await Promise.all([
      supabase.from('prospects').select('*').order('created_at'),
      supabase.from('cadence_states').select('*'),
      supabase.from('dashboard_state').select('*').eq('id', 1).single(),
    ])
    if (pData) setProspects(pData)
    if (cData) {
      const map: Record<string, string> = {}
      cData.forEach((r: CadenceEntry) => { map[`${r.prospect_id}-${r.day_key}`] = r.state })
      setCadenceStates(map)
    }
    if (sData) setDashState(sData)
    setLoading(false)
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  // ── Save state — never auto-set launch_start ──
  const saveState = useCallback(async (updates: Partial<DashboardState>) => {
    const merged = { ...dashState, ...updates, id: 1 }
    setDashState(merged)
    const { error } = await supabase.from('dashboard_state').upsert(merged)
    if (error) toast({ title: 'Save failed', description: error.message, variant: 'destructive' })
  }, [dashState])

  const scheduleStateSave = useCallback((updates: Partial<DashboardState>) => {
    setDashState(prev => ({ ...prev, ...updates }))
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => saveState(updates), 1200)
  }, [saveState])

  // ── Set launch date (called from modal) ──
  const setLaunchDate = useCallback(async (date: string) => {
    await saveState({ launch_start: date })
    toast({ title: 'Launch date set', description: `Soft launch tracking starts ${date}.` })
  }, [saveState])

  // ── Prospects CRUD ──
  const addProspect = useCallback(async () => {
    const { data, error } = await supabase
      .from('prospects')
      .insert({ company: '', contact: '', segment: 'SaaS', status: 'new', notes: '', deal_value: 999, linkedin_url: '' })
      .select().single()
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return }
    if (data) setProspects(prev => [...prev, data])
  }, [])

  const deleteProspect = useCallback(async (id: string) => {
    await supabase.from('prospects').delete().eq('id', id)
    setProspects(prev => prev.filter(p => p.id !== id))
  }, [])

  const updateProspect = useCallback((id: string, field: keyof Prospect, value: string | number) => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p))
    if (prospectSaveTimers.current[id]) clearTimeout(prospectSaveTimers.current[id])
    prospectSaveTimers.current[id] = setTimeout(async () => {
      const { error } = await supabase.from('prospects').update({ [field]: value }).eq('id', id)
      if (error) toast({ title: 'Save failed', description: error.message, variant: 'destructive' })
    }, 900)
  }, [])

  const cycleStatus = useCallback(async (id: string) => {
    const prospect = prospects.find(p => p.id === id)
    if (!prospect) return
    const next = STATUSES[(STATUSES.indexOf(prospect.status) + 1) % STATUSES.length]
    setProspects(prev => prev.map(p => p.id === id ? { ...p, status: next as ProspectStatus } : p))
    await supabase.from('prospects').update({ status: next }).eq('id', id)
    return { prospect, next }
  }, [prospects])

  // ── Cadence ──
  const cycleCadence = useCallback(async (prospectId: string, day: string) => {
    const CYCLE = ['', 'sent', 'called', 'replied']
    const key = `${prospectId}-${day}`
    const cur = cadenceStates[key] || ''
    const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length]
    setCadenceStates(prev => ({ ...prev, [key]: next }))
    if (cadenceSaveTimers.current[key]) clearTimeout(cadenceSaveTimers.current[key])
    cadenceSaveTimers.current[key] = setTimeout(async () => {
      await supabase.from('cadence_states').upsert(
        { prospect_id: prospectId, day_key: day, state: next },
        { onConflict: 'prospect_id,day_key' }
      )
    }, 600)
  }, [cadenceStates])

  // ── Computed values ──
  const prospectCurrentDay = useCallback((p: Prospect) => {
    let max = 0
    CADENCE_DAYS.forEach(dk => {
      const s = cadenceStates[`${p.id}-${dk}`]
      if (s && s !== '' && s !== 'gap') max = Math.max(max, DAY_NUMBER[dk] || 0)
    })
    return max
  }, [cadenceStates])

  const touchpoints = Object.values(cadenceStates).filter(v => v && v !== 'gap').length

  const getWeekBounds = useCallback((weekNum: number) => {
    const start = dashState.launch_start ? new Date(dashState.launch_start) : new Date()
    start.setHours(0, 0, 0, 0)
    const weekStart = new Date(start)
    weekStart.setDate(start.getDate() + (weekNum - 1) * 7)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 7)
    return { weekStart, weekEnd }
  }, [dashState.launch_start])

  const prospectsInWeek = useCallback((weekNum: number) => {
    const { weekStart, weekEnd } = getWeekBounds(weekNum)
    return prospects.filter(p => {
      const created = new Date(p.created_at)
      return created >= weekStart && created < weekEnd
    })
  }, [prospects, getWeekBounds])

  // Auto-compute current week from today vs launch_start
  const currentWeekAuto = useCallback(() => {
    if (!dashState.launch_start) return 1
    const start = new Date(dashState.launch_start)
    start.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const daysDiff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return Math.min(Math.max(Math.floor(daysDiff / 7) + 1, 1), MAX_WEEKS)
  }, [dashState.launch_start])

  const stats = {
    total: prospects.length,
    inTouch: prospects.filter(p => ['touch', 'reply', 'meeting', 'converted'].includes(p.status)).length,
    replied: prospects.filter(p => ['reply', 'meeting', 'converted'].includes(p.status)).length,
    meetings: prospects.filter(p => ['meeting', 'converted'].includes(p.status)).length,
    converted: prospects.filter(p => p.status === 'converted').length,
    touchpoints,
  }

  const projections = {
    meetings: Math.round(Math.max(stats.total, 30) * dashState.rate_mql / 100),
    proposals: Math.round(Math.round(Math.max(stats.total, 30) * dashState.rate_mql / 100) * dashState.rate_sql / 100),
    closes: Math.round(Math.round(Math.round(Math.max(stats.total, 30) * dashState.rate_mql / 100) * dashState.rate_sql / 100) * dashState.rate_conv / 100),
  }

  const active = prospects.filter(p => p.status !== 'lost')
  const avgDeal = active.length > 0 ? active.reduce((s, p) => s + (p.deal_value || 999), 0) / active.length : 999
  const actualMRR = prospects.filter(p => p.status === 'converted').reduce((s, p) => s + (p.deal_value || 999), 0)
  const projectedMRR = projections.closes * Math.round(avgDeal)

  return {
    prospects, cadenceStates, dashState, loading,
    stats, projections, projectedMRR, actualMRR,
    currentWeekAuto, setLaunchDate,
    addProspect, deleteProspect, updateProspect, cycleStatus, cycleCadence,
    scheduleStateSave, prospectCurrentDay, prospectsInWeek, getWeekBounds,
  }
}

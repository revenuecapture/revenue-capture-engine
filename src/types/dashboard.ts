export type ProspectStatus = 'new' | 'touch' | 'reply' | 'meeting' | 'converted' | 'lost'
export type CadenceState = 'sent' | 'called' | 'replied' | ''

export interface Prospect {
  id: string
  company: string
  contact: string
  segment: string
  status: ProspectStatus
  deal_value: number
  notes: string
  linkedin_url: string
  created_at: string
  updated_at: string
}

export interface CadenceEntry {
  id: string
  prospect_id: string
  day_key: string
  state: CadenceState
  updated_at: string
}

export interface DashboardState {
  id: number
  current_week: number
  launch_start: string | null
  rate_mql: number
  rate_sql: number
  rate_conv: number
  session_notes: string
  updated_at: string
}

export const STATUSES: ProspectStatus[] = ['new', 'touch', 'reply', 'meeting', 'converted', 'lost']

export const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: 'New',
  touch: 'In touch',
  reply: 'Replied',
  meeting: 'Meeting',
  converted: 'Converted',
  lost: 'Lost',
}

export const SEGMENTS = ['SaaS', 'LMS', 'Curriculum', 'CPD', 'EdTech', 'Other']

export const CADENCE_DAYS = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D8', 'D9', 'D11', 'D14']

export const DAY_IS_GAP: Record<string, boolean> = { D3: true, D6: true, D11: true }

export const DAY_NUMBER: Record<string, number> = {
  D1: 1, D2: 2, D3: 3, D4: 4, D5: 5,
  D6: 6, D8: 8, D9: 9, D11: 11, D14: 14,
}

export const GBP_TO_PKR = 351
export const MAX_WEEKS = 4
export const LEADS_PER_WEEK = 7

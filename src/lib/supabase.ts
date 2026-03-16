import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://mblreslxhijipbscujtp.supabase.co'
const SUPABASE_KEY = 'sb_publishable_UFKWXX0cfupAwVZK0fJVDQ_qIw_UOPi'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sizrkgwtaqpkseyrjxty.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpenJrZ3d0YXFwa3NleXJqeHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNzQ3ODEsImV4cCI6MjA2ODc1MDc4MX0.jwpmEdBorVW3k2WHfzjXUYly-yIC6ezmo-al8gfkbRw'
// Ensure to replace the above URL and key with your actual Supabase project details'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

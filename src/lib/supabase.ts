
import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if the required environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL and/or anonymous key missing. Make sure you have the following environment variables set:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  )
}

// Create a Supabase client with default values if env vars are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey)

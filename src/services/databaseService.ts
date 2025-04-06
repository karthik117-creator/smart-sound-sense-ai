
import { supabase } from '@/lib/supabase'
import { SoundRule, UserPreference, CallerRule, LocationRule, TimeRule, SoundMode } from '@/types/database.types'

export async function getUserPreference(userId: string): Promise<UserPreference | null> {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()
    
  if (error) {
    console.error('Error fetching user preferences:', error)
    return null
  }
  
  return data
}

export async function updateUserPreference(preference: Partial<UserPreference> & { user_id: string }): Promise<boolean> {
  const { error } = await supabase
    .from('user_preferences')
    .upsert(preference)
    
  if (error) {
    console.error('Error updating user preferences:', error)
    return false
  }
  
  return true
}

export async function getSoundRules(userId: string): Promise<SoundRule[]> {
  const { data, error } = await supabase
    .from('sound_rules')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching sound rules:', error)
    return []
  }
  
  return data || []
}

export async function createSoundRule(rule: Omit<SoundRule, 'id' | 'created_at'>): Promise<SoundRule | null> {
  const { data, error } = await supabase
    .from('sound_rules')
    .insert({
      ...rule,
      created_at: new Date().toISOString()
    })
    .select()
    .single()
    
  if (error) {
    console.error('Error creating sound rule:', error)
    return null
  }
  
  return data
}

export async function updateSoundRule(id: string, updates: Partial<SoundRule>): Promise<boolean> {
  const { error } = await supabase
    .from('sound_rules')
    .update(updates)
    .eq('id', id)
    
  if (error) {
    console.error('Error updating sound rule:', error)
    return false
  }
  
  return true
}

export async function deleteSoundRule(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('sound_rules')
    .delete()
    .eq('id', id)
    
  if (error) {
    console.error('Error deleting sound rule:', error)
    return false
  }
  
  return true
}

export async function getTimeRules(userId: string): Promise<TimeRule[]> {
  const { data, error } = await supabase
    .from('time_rules')
    .select('*')
    .eq('user_id', userId)
    
  if (error) {
    console.error('Error fetching time rules:', error)
    return []
  }
  
  return data || []
}

export async function getLocationRules(userId: string): Promise<LocationRule[]> {
  const { data, error } = await supabase
    .from('location_rules')
    .select('*')
    .eq('user_id', userId)
    
  if (error) {
    console.error('Error fetching location rules:', error)
    return []
  }
  
  return data || []
}

export async function getCallerRules(userId: string): Promise<CallerRule[]> {
  const { data, error } = await supabase
    .from('caller_rules')
    .select('*')
    .eq('user_id', userId)
    
  if (error) {
    console.error('Error fetching caller rules:', error)
    return []
  }
  
  return data || []
}

export async function getCurrentModeForUser(userId: string): Promise<SoundMode> {
  // Default to normal if we can't determine
  let currentMode: SoundMode = 'normal'
  
  try {
    // First check for active user preference
    const userPref = await getUserPreference(userId)
    if (userPref) {
      currentMode = userPref.default_mode
    }
    
    // Check if there are any active rules that should override
    const now = new Date()
    const timeStr = now.toTimeString().slice(0, 5) // Get HH:MM
    const dayOfWeek = now.getDay() // 0-6, 0 = Sunday
    
    // Check time-based rules
    const timeRules = await getTimeRules(userId)
    for (const rule of timeRules) {
      if (rule.days.includes(dayOfWeek)) {
        if (isTimeInRange(timeStr, rule.start_time, rule.end_time)) {
          currentMode = rule.sound_mode
          break
        }
      }
    }
    
    // More complex rules (location, caller) would be checked here
    // but would require more data from the device
  } catch (error) {
    console.error("Error determining current mode:", error)
  }
  
  return currentMode
}

function isTimeInRange(current: string, start: string, end: string): boolean {
  if (start <= end) {
    return current >= start && current <= end
  } else {
    // Handles overnight ranges (e.g., 22:00 to 06:00)
    return current >= start || current <= end
  }
}

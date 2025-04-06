
export type SoundMode = 'silent' | 'vibrate' | 'normal'

export interface Profile {
  id: string
  created_at: string
  updated_at?: string
  avatar_url?: string
  display_name?: string
}

export interface SoundRule {
  id: string
  user_id: string
  created_at: string
  name: string
  active: boolean
  type: 'time' | 'location' | 'caller' | 'ai'
  sound_mode: SoundMode
  conditions: any // Specific conditions based on rule type
}

export interface UserPreference {
  id: string
  user_id: string
  default_mode: SoundMode
  emergency_contacts: string[]
  allow_learning: boolean
  notifications_enabled: boolean
}

export interface CallerRule {
  id: string
  user_id: string
  contact_name: string
  phone_number: string
  sound_mode: SoundMode
  priority: number
}

export interface LocationRule {
  id: string
  user_id: string
  location_name: string
  latitude: number
  longitude: number
  radius: number  // in meters
  sound_mode: SoundMode
}

export interface TimeRule {
  id: string
  user_id: string
  start_time: string  // HH:MM format
  end_time: string    // HH:MM format
  days: number[]      // 0-6, 0 = Sunday
  sound_mode: SoundMode
}


import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { SoundMode } from '@/types/database.types'

export function useAIPrediction() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  
  const predictSoundMode = async (): Promise<{
    predictedMode: SoundMode;
    confidence: number;
  } | null> => {
    if (!user) {
      setError("User not authenticated")
      return null
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const now = new Date()
      
      const payload = {
        user_id: user.id,
        current_time: now.toISOString(),
        day_of_week: now.getDay(),
        // We would add more context data here in a real implementation
      }
      
      const { data, error } = await supabase.functions.invoke('predict-sound-mode', {
        body: JSON.stringify(payload)
      })
      
      if (error) throw new Error(error.message)
      
      return {
        predictedMode: data.predicted_mode as SoundMode,
        confidence: data.confidence
      }
    } catch (err: any) {
      setError(err.message || "Failed to predict sound mode")
      return null
    } finally {
      setLoading(false)
    }
  }
  
  return {
    predictSoundMode,
    loading,
    error
  }
}

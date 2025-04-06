
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (
    bucket: string, 
    filePath: string, 
    file: File,
    options = { upsert: true }
  ) => {
    setUploading(true)
    setError(null)
    
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, options)
        
      if (error) throw error
      
      return { path: filePath, success: true }
    } catch (err: any) {
      setError(err.message || "Error uploading file")
      return { path: null, success: false, error: err }
    } finally {
      setUploading(false)
    }
  }
  
  const getPublicUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }
  
  const downloadFile = async (bucket: string, path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path)
        
      if (error) throw error
      
      return { data, success: true }
    } catch (err: any) {
      setError(err.message || "Error downloading file")
      return { data: null, success: false, error: err }
    }
  }
  
  return {
    uploadFile,
    getPublicUrl,
    downloadFile,
    uploading,
    error
  }
}


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from '@/hooks/use-toast'
import SoundModeSelector from '@/components/sound-modes/SoundModeSelector'
import AutoRulesSection from '@/components/auto-rules/AutoRulesSection'
import CurrentStats from '@/components/stats/CurrentStats'
import NextEventPreview from '@/components/stats/NextEventPreview'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeMode, setActiveMode] = useState<'silent' | 'vibrate' | 'normal'>('normal')
  const [avatar, setAvatar] = useState<string | null>(null)
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        // Get user profile
        const { data } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', user.id)
          .single()
        
        if (data?.avatar_url) {
          const { data: avatarData } = await supabase.storage
            .from('avatars')
            .download(data.avatar_url)
          
          if (avatarData) {
            const url = URL.createObjectURL(avatarData)
            setAvatar(url)
          }
        }
      }
      
      setLoading(false)
    }
    
    getUser()
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth')
      }
    })
    
    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [navigate])
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    })
    navigate('/auth')
  }
  
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return
    
    const file = e.target.files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/${Date.now()}.${fileExt}`
    
    setLoading(true)
    
    try {
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })
        
      if (uploadError) throw uploadError
      
      // Update the user's profile with the avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id, 
          avatar_url: filePath,
          updated_at: new Date().toISOString()
        })
        
      if (updateError) throw updateError
      
      // Set the avatar URL for the UI
      const url = URL.createObjectURL(file)
      setAvatar(url)
      
      toast({
        title: "Success",
        description: "Avatar updated successfully!"
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload avatar",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    )
  }
  
  if (!user) {
    navigate('/auth')
    return null
  }
  
  return (
    <Layout>
      <div className="space-y-8 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Avatar className="h-16 w-16 border-2 border-primary cursor-pointer">
                <AvatarImage src={avatar || undefined} />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <input 
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={loading}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-xs text-white">
                Change
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.email}</h2>
              <p className="text-muted-foreground text-sm">Manage your sound profile</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline">Sign out</Button>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <CurrentStats activeMode={activeMode} />
            <NextEventPreview />
          </div>
          
          <SoundModeSelector />
          
          <AutoRulesSection />
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

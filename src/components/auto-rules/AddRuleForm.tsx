
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'
import { createSoundRule } from '@/services/databaseService'
import { useAuth } from '@/contexts/AuthContext'
import { SoundMode } from '@/types/database.types'

interface AddRuleFormProps {
  open: boolean
  onClose: () => void
  onRuleAdded: () => void
}

const AddRuleForm: React.FC<AddRuleFormProps> = ({ open, onClose, onRuleAdded }) => {
  const { user } = useAuth()
  const [ruleName, setRuleName] = useState('')
  const [ruleType, setRuleType] = useState<'time' | 'location' | 'caller' | 'ai'>('time')
  const [soundMode, setSoundMode] = useState<SoundMode>('silent')
  const [active, setActive] = useState(true)
  
  // Time-specific fields
  const [startTime, setStartTime] = useState('22:00')
  const [endTime, setEndTime] = useState('07:00')
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]) // All days selected by default
  
  // Location-specific fields
  const [locationName, setLocationName] = useState('')
  
  // Caller-specific fields
  const [callerName, setCallerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const resetForm = () => {
    setRuleName('')
    setRuleType('time')
    setSoundMode('silent')
    setActive(true)
    setStartTime('22:00')
    setEndTime('07:00')
    setSelectedDays([0, 1, 2, 3, 4, 5, 6])
    setLocationName('')
    setCallerName('')
    setPhoneNumber('')
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create rules",
        variant: "destructive"
      })
      return
    }
    
    if (!ruleName) {
      toast({
        title: "Error",
        description: "Please provide a name for this rule",
        variant: "destructive"
      })
      return
    }
    
    try {
      let conditions: any = {}
      
      switch (ruleType) {
        case 'time':
          if (!startTime || !endTime) {
            toast({
              title: "Error",
              description: "Please provide start and end times",
              variant: "destructive"
            })
            return
          }
          if (selectedDays.length === 0) {
            toast({
              title: "Error",
              description: "Please select at least one day",
              variant: "destructive"
            })
            return
          }
          conditions = { startTime, endTime, days: selectedDays }
          break
          
        case 'location':
          if (!locationName) {
            toast({
              title: "Error",
              description: "Please provide a location name",
              variant: "destructive"
            })
            return
          }
          conditions = { locationName }
          break
          
        case 'caller':
          if (!callerName || !phoneNumber) {
            toast({
              title: "Error",
              description: "Please provide caller name and phone number",
              variant: "destructive"
            })
            return
          }
          conditions = { callerName, phoneNumber }
          break
      }
      
      const rule = await createSoundRule({
        user_id: user.id,
        name: ruleName,
        type: ruleType,
        sound_mode: soundMode,
        active,
        conditions
      })
      
      if (rule) {
        toast({
          title: "Success",
          description: `Rule "${ruleName}" has been created`
        })
        resetForm()
        onRuleAdded()
        onClose()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create rule",
        variant: "destructive"
      })
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Rule</DialogTitle>
          <DialogDescription>
            Set up a new automatic sound mode rule
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input 
              id="name" 
              value={ruleName} 
              onChange={(e) => setRuleName(e.target.value)}
              placeholder="e.g., Sleep Mode" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Rule Type</Label>
            <Select value={ruleType} onValueChange={(value: 'time' | 'location' | 'caller' | 'ai') => setRuleType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select rule type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">Time-based</SelectItem>
                <SelectItem value="location">Location-based</SelectItem>
                <SelectItem value="caller">Caller-based</SelectItem>
                <SelectItem value="ai">AI-powered</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mode">Sound Mode</Label>
            <Select value={soundMode} onValueChange={(value: SoundMode) => setSoundMode(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sound mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="silent">Silent</SelectItem>
                <SelectItem value="vibrate">Vibrate</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {ruleType === 'time' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input 
                    id="startTime" 
                    type="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input 
                    id="endTime" 
                    type="time" 
                    value={endTime} 
                    onChange={(e) => setEndTime(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Days</Label>
                <div className="flex flex-wrap gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <Button 
                      key={index}
                      type="button"
                      variant={selectedDays.includes(index) ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        if (selectedDays.includes(index)) {
                          setSelectedDays(selectedDays.filter(d => d !== index))
                        } else {
                          setSelectedDays([...selectedDays, index])
                        }
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {ruleType === 'location' && (
            <div className="space-y-2">
              <Label htmlFor="location">Location Name</Label>
              <Input 
                id="location" 
                value={locationName} 
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g., Office, Home" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Location detection will be implemented in a future update
              </p>
            </div>
          )}
          
          {ruleType === 'caller' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="callerName">Caller Name</Label>
                <Input 
                  id="callerName" 
                  value={callerName} 
                  onChange={(e) => setCallerName(e.target.value)}
                  placeholder="e.g., Mom, Boss" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1234567890" 
                />
              </div>
            </>
          )}
          
          {ruleType === 'ai' && (
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                AI-powered rules analyze your usage patterns over time to automatically adjust sound modes based on your behavior.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This feature requires usage data and will become more accurate over time.
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch 
                id="active"
                checked={active}
                onCheckedChange={setActive}
              />
              <Label htmlFor="active">Rule Active</Label>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="outline" onClick={() => {
              resetForm()
              onClose()
            }}>
              Cancel
            </Button>
            <Button type="submit">Create Rule</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddRuleForm

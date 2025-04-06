
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { VolumeX, Vibrate, Volume2, Clock, MapPin } from 'lucide-react';

type SoundModeType = 'silent' | 'vibrate' | 'normal';

const modeIcons = {
  silent: VolumeX,
  vibrate: Vibrate,
  normal: Volume2,
};

const modeColors = {
  silent: 'text-destructive',
  vibrate: 'text-soundSwitch-purple',
  normal: 'text-soundSwitch-teal',
};

const CurrentStats: React.FC<{ activeMode: SoundModeType }> = ({ activeMode }) => {
  const Icon = modeIcons[activeMode];
  
  return (
    <Card className="bg-gradient-to-r from-soundSwitch-purple/10 to-soundSwitch-teal/10 border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-medium text-muted-foreground text-sm">Current Mode</h3>
            <p className="text-2xl font-bold capitalize">{activeMode}</p>
          </div>
          <div className={`w-12 h-12 rounded-full bg-accent flex items-center justify-center ${modeColors[activeMode]}`}>
            <Icon size={24} />
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm">Until 7:00 AM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span className="text-sm">Home</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStats;

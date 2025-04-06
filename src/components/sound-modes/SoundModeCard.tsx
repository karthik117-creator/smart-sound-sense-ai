
import React from 'react';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX, Vibrate } from 'lucide-react';

type SoundModeType = 'silent' | 'vibrate' | 'normal';

interface SoundModeCardProps {
  mode: SoundModeType;
  active: boolean;
  onClick: () => void;
}

const modeConfig = {
  silent: {
    title: 'Silent',
    description: 'No sounds or vibrations',
    icon: VolumeX,
    iconColor: 'text-destructive'
  },
  vibrate: {
    title: 'Vibrate',
    description: 'Vibration only',
    icon: Vibrate,
    iconColor: 'text-soundSwitch-purple'
  },
  normal: {
    title: 'Normal',
    description: 'Sound and vibration',
    icon: Volume2,
    iconColor: 'text-soundSwitch-teal'
  }
};

const SoundModeCard: React.FC<SoundModeCardProps> = ({ mode, active, onClick }) => {
  const { title, description, icon: Icon, iconColor } = modeConfig[mode];

  return (
    <div 
      className={cn(
        'sound-mode-card cursor-pointer',
        active && 'sound-mode-active'
      )}
      onClick={onClick}
    >
      <div className={cn(
        'sound-mode-icon-container',
        active && 'sound-mode-icon-active'
      )}>
        <Icon size={24} className={cn(iconColor)} />
      </div>
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <p className="text-sm text-center text-muted-foreground">{description}</p>
    </div>
  );
};

export default SoundModeCard;

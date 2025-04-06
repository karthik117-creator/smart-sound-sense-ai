
import React from 'react';
import SoundModeCard from './SoundModeCard';
import { toast } from '@/components/ui/use-toast';

type SoundModeType = 'silent' | 'vibrate' | 'normal';

const SoundModeSelector: React.FC = () => {
  const [activeMode, setActiveMode] = React.useState<SoundModeType>('normal');

  const handleModeChange = (mode: SoundModeType) => {
    setActiveMode(mode);
    toast({
      title: `Sound mode changed to ${mode}`,
      description: `Your phone will now be in ${mode} mode`,
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Sound Mode</h2>
      <div className="grid grid-cols-3 gap-4">
        <SoundModeCard 
          mode="silent" 
          active={activeMode === 'silent'} 
          onClick={() => handleModeChange('silent')} 
        />
        <SoundModeCard 
          mode="vibrate" 
          active={activeMode === 'vibrate'} 
          onClick={() => handleModeChange('vibrate')} 
        />
        <SoundModeCard 
          mode="normal" 
          active={activeMode === 'normal'} 
          onClick={() => handleModeChange('normal')} 
        />
      </div>
    </div>
  );
};

export default SoundModeSelector;

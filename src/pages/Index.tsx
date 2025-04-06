
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SoundModeSelector from '@/components/sound-modes/SoundModeSelector';
import AutoRulesSection from '@/components/auto-rules/AutoRulesSection';
import CurrentStats from '@/components/stats/CurrentStats';
import NextEventPreview from '@/components/stats/NextEventPreview';

type SoundModeType = 'silent' | 'vibrate' | 'normal';

const Index: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SoundModeType>('normal');

  return (
    <Layout>
      <div className="space-y-6 py-4 animate-fade-in">
        <div className="space-y-4">
          <CurrentStats activeMode={activeMode} />
          <NextEventPreview />
        </div>
        
        <SoundModeSelector />
        
        <AutoRulesSection />
      </div>
    </Layout>
  );
};

export default Index;

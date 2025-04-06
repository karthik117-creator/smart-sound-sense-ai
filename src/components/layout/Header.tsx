
import React from 'react';
import { Bell, Settings, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b py-4 px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-soundSwitch-purple flex items-center justify-center">
            <Bell size={16} className="text-white" />
          </div>
          <h1 className="text-lg font-bold">Smart Sound Switch</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Clock size={20} />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

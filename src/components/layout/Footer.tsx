
import React from 'react';
import { Home, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 w-full border-t bg-background/80 backdrop-blur-md py-2 px-6">
      <nav className="flex justify-around max-w-7xl mx-auto">
        <Button variant="ghost" className="flex flex-col items-center gap-1" size="sm">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1" size="sm">
          <MapPin size={20} />
          <span className="text-xs">Places</span>
        </Button>
        <Button variant="ghost" className="flex flex-col items-center gap-1" size="sm">
          <User size={20} />
          <span className="text-xs">Profile</span>
        </Button>
      </nav>
    </footer>
  );
};

export default Footer;

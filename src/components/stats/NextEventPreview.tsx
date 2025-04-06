
import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Calendar, Vibrate } from 'lucide-react';

const NextEventPreview: React.FC = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar size={20} className="text-muted-foreground" />
          <div>
            <CardTitle className="text-sm font-medium">Next Event: Meeting</CardTitle>
            <CardDescription className="text-xs">Will switch to vibrate at 9:00 AM</CardDescription>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-soundSwitch-purple">
          <Vibrate size={16} />
        </div>
      </CardContent>
    </Card>
  );
};

export default NextEventPreview;

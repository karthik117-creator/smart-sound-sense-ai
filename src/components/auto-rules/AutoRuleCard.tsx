
import React from 'react';
import { Clock, MapPin, Phone, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export type RuleType = 'time' | 'location' | 'caller' | 'smart';

interface AutoRuleCardProps {
  type: RuleType;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const ruleIcons = {
  time: Clock,
  location: MapPin,
  caller: Phone,
  smart: BrainCircuit,
};

const ruleColors = {
  time: 'bg-blue-100 text-blue-600',
  location: 'bg-green-100 text-green-600',
  caller: 'bg-amber-100 text-amber-600',
  smart: 'bg-purple-100 text-purple-600',
};

const AutoRuleCard: React.FC<AutoRuleCardProps> = ({
  type,
  title,
  description,
  enabled,
  onToggle,
}) => {
  const Icon = ruleIcons[type];
  const iconColorClass = ruleColors[type];

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-2">
          <div className={cn('p-2 rounded-full', iconColorClass)}>
            <Icon size={16} />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <Switch checked={enabled} onCheckedChange={onToggle} />
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default AutoRuleCard;

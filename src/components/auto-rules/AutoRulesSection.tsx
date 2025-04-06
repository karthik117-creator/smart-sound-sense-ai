
import React from 'react';
import AutoRuleCard, { RuleType } from './AutoRuleCard';
import { toast } from '@/components/ui/use-toast';

interface Rule {
  id: string;
  type: RuleType;
  title: string;
  description: string;
  enabled: boolean;
}

const AutoRulesSection: React.FC = () => {
  const [rules, setRules] = React.useState<Rule[]>([
    {
      id: '1',
      type: 'time',
      title: 'Night Mode',
      description: 'Automatically switch to silent mode from 11PM-6AM',
      enabled: true,
    },
    {
      id: '2',
      type: 'location',
      title: 'At Work',
      description: 'Switch to vibrate when at office or school',
      enabled: false,
    },
    {
      id: '3',
      type: 'caller',
      title: 'Priority Callers',
      description: 'Allow calls from family even in silent mode',
      enabled: true,
    },
    {
      id: '4',
      type: 'smart',
      title: 'Smart Mode',
      description: 'Learn from your behavior and adapt automatically',
      enabled: false,
    },
  ]);

  const handleToggle = (id: string, enabled: boolean) => {
    setRules(
      rules.map((rule) => 
        rule.id === id ? { ...rule, enabled } : rule
      )
    );
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: enabled ? `${rule.title} Enabled` : `${rule.title} Disabled`,
        description: enabled 
          ? `Smart Sound Switch will now ${rule.description.toLowerCase()}` 
          : `This rule is now disabled`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-2xl font-bold">Automatic Rules</h2>
      <div className="space-y-4">
        {rules.map((rule) => (
          <AutoRuleCard
            key={rule.id}
            type={rule.type}
            title={rule.title}
            description={rule.description}
            enabled={rule.enabled}
            onToggle={(enabled) => handleToggle(rule.id, enabled)}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoRulesSection;

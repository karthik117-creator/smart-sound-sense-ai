
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SoundModeSelector from '@/components/sound-modes/SoundModeSelector';
import AutoRulesSection from '@/components/auto-rules/AutoRulesSection';
import CurrentStats from '@/components/stats/CurrentStats';
import NextEventPreview from '@/components/stats/NextEventPreview';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect already logged in users to the dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="space-y-8 py-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Smart Sound Switch AI</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Intelligently manage your phone's sound mode based on your context and preferences.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
        
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border shadow">
              <h2 className="text-xl font-semibold mb-4">Smart Context Detection</h2>
              <p className="text-muted-foreground">
                The app automatically detects your context - meetings, sleep time, important calls - and adjusts your sound profile accordingly.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border shadow">
              <h2 className="text-xl font-semibold mb-4">Customizable Rules</h2>
              <p className="text-muted-foreground">
                Create your own rules based on time, location, and caller identity to ensure you're never disturbed when it matters.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border shadow">
              <h2 className="text-xl font-semibold mb-4">AI-Driven Learning</h2>
              <p className="text-muted-foreground">
                Our app learns from your behavior patterns to make increasingly accurate sound mode predictions.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border shadow">
              <h2 className="text-xl font-semibold mb-4">Emergency Override</h2>
              <p className="text-muted-foreground">
                Important calls from designated contacts will always get through, even in silent mode.
              </p>
            </div>
          </div>
          
          <div className="text-center pt-4">
            <Button asChild size="lg">
              <Link to="/auth">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

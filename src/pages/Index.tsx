
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (error && error.message.includes('not configured')) {
          setSupabaseConfigured(false);
        } else {
          // Redirect to the dashboard if Supabase is configured
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error testing Supabase connection:', error);
        setSupabaseConfigured(false);
      }
    };

    testConnection();
  }, [navigate]);

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Supabase not configured</AlertTitle>
          <AlertDescription>
            Authentication and data storage require Supabase integration. Please click the Supabase button in the top right corner to configure it.
          </AlertDescription>
        </Alert>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/signin')}>Go to Sign In</Button>
          <Button onClick={() => navigate('/signup')} variant="outline">Go to Sign Up</Button>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;

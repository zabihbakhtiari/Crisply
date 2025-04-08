
import { useState, useEffect } from 'react';
import { supabase, NotificationSetting } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './use-toast';

export const useNotificationSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchSettings();
    } else {
      setSettings([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      
      if (!user) throw new Error('No user logged in');
      
      // First check if settings exist
      const response = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      const data = response?.data;
      const error = response?.error;
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        // Handle the data
        setSettings(Array.isArray(data) ? data : [data] as NotificationSetting[]);
      } else {
        // Create default notification settings if none exist
        const defaultSettings = [
          { user_id: user.id, type: 'email', enabled: true },
          { user_id: user.id, type: 'push', enabled: true },
          { user_id: user.id, type: 'mentions', enabled: true },
          { user_id: user.id, type: 'reminders', enabled: false },
          { user_id: user.id, type: 'updates', enabled: true },
        ];
        
        const insertResponse = await supabase
          .from('notification_settings')
          .insert(defaultSettings)
          .select();
        
        const createdSettings = insertResponse?.data;
        const createError = insertResponse?.error;
        
        if (createError) throw createError;
        
        setSettings(Array.isArray(createdSettings) ? createdSettings : [createdSettings] as NotificationSetting[]);
      }
    } catch (error: any) {
      console.error('Error fetching notification settings:', error);
      toast({
        title: "Error fetching settings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (type: string, enabled: boolean) => {
    try {
      setLoading(true);
      
      if (!user) throw new Error('No user logged in');
      
      // Use proper method chaining with explicit Promise handling
      const response = await supabase
        .from('notification_settings')
        .update({ enabled })
        .eq('user_id', user.id)
        .eq('type', type);
      
      const error = response?.error;
      
      if (error) throw error;
      
      // Update the local state
      setSettings(prevSettings => 
        prevSettings.map(setting => 
          setting.type === type ? { ...setting, enabled } : setting
        )
      );
      
      toast({
        title: "Setting updated",
        description: `${type} notifications ${enabled ? 'enabled' : 'disabled'}`,
      });
    } catch (error: any) {
      console.error('Error updating notification setting:', error);
      toast({
        title: "Error updating setting",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    loading,
    updateSetting,
    refreshSettings: fetchSettings,
  };
};


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
      
      if (!user) {
        setLoading(false);
        return;
      }
      
      // First check if settings exist
      const { data, error } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Handle the data
        setSettings(data as NotificationSetting[]);
      } else {
        // Create default notification settings if none exist
        const defaultSettings = [
          { user_id: user.id, type: 'email', enabled: true },
          { user_id: user.id, type: 'push', enabled: true },
          { user_id: user.id, type: 'mentions', enabled: true },
          { user_id: user.id, type: 'reminders', enabled: false },
          { user_id: user.id, type: 'updates', enabled: true },
        ];
        
        const { data: createdSettings, error: createError } = await supabase
          .from('notification_settings')
          .insert(defaultSettings)
          .select();
        
        if (createError) throw createError;
        
        if (createdSettings) {
          setSettings(Array.isArray(createdSettings) ? createdSettings : [createdSettings] as NotificationSetting[]);
        }
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
      
      // First find the specific setting by type
      const settingToUpdate = settings.find(s => s.type === type);
      
      if (!settingToUpdate) {
        throw new Error(`Setting type '${type}' not found`);
      }
      
      // Update notification settings
      const { error } = await supabase
        .from('notification_settings')
        .update({ enabled })
        .eq('user_id', user.id)
        .eq('type', type);
      
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

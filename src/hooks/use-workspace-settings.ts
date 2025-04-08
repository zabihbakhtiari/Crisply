
import { useState, useEffect } from 'react';
import { supabase, WorkspaceSetting } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './use-toast';

export const useWorkspaceSettings = () => {
  const { user } = useAuth();
  const [workspaceSettings, setWorkspaceSettings] = useState<WorkspaceSetting | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchWorkspaceSettings();
    } else {
      setWorkspaceSettings(null);
      setLoading(false);
    }
  }, [user]);

  const fetchWorkspaceSettings = async () => {
    try {
      setLoading(true);
      
      if (!user) throw new Error('No user logged in');
      
      const response = await supabase
        .from('workspace_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      const data = response?.data;
      const error = response?.error;
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setWorkspaceSettings(data as WorkspaceSetting);
      } else {
        // Create default workspace settings if none exist
        const defaultSettings = {
          user_id: user.id,
          workspace_name: 'My Workspace',
          workspace_url: 'my-workspace',
        };
        
        const insertResponse = await supabase
          .from('workspace_settings')
          .insert([defaultSettings])
          .select();
        
        const createdSettings = insertResponse?.data;
        const createError = insertResponse?.error;
        
        if (createError) throw createError;
        
        const settings = Array.isArray(createdSettings) && createdSettings.length > 0 
          ? createdSettings[0] 
          : createdSettings;
          
        setWorkspaceSettings(settings as WorkspaceSetting);
      }
    } catch (error: any) {
      console.error('Error fetching workspace settings:', error);
      toast({
        title: "Error fetching workspace settings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateWorkspaceSettings = async (updates: Partial<WorkspaceSetting>) => {
    try {
      setLoading(true);
      
      if (!user) throw new Error('No user logged in');
      
      // Fixed the chaining of methods
      const response = await supabase
        .from('workspace_settings')
        .update(updates)
        .eq('user_id', user.id);
      
      const error = response?.error;
      
      if (error) throw error;
      
      // Update the local state
      setWorkspaceSettings(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Workspace settings updated",
        description: "Your workspace settings have been updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating workspace settings:', error);
      toast({
        title: "Error updating workspace settings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    workspaceSettings,
    loading,
    updateWorkspaceSettings,
    refreshWorkspaceSettings: fetchWorkspaceSettings,
  };
};

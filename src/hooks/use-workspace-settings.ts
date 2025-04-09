
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
      
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('workspace_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
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
        
        const { data: createdSettings, error: createError } = await supabase
          .from('workspace_settings')
          .insert([defaultSettings])
          .select();
        
        if (createError) throw createError;
        
        if (createdSettings && Array.isArray(createdSettings) && createdSettings.length > 0) {
          setWorkspaceSettings(createdSettings[0] as WorkspaceSetting);
        }
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
      
      // Update workspace settings
      const { error } = await supabase
        .from('workspace_settings')
        .update(updates)
        .eq('user_id', user.id);
      
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

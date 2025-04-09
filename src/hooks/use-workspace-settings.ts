
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, WorkspaceSetting, TABLES } from '@/lib/supabase';
import { useToast } from './use-toast';

export const useWorkspaceSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchWorkspaceSettings = async (): Promise<WorkspaceSetting | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from(TABLES.WORKSPACE_SETTINGS)
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching workspace settings:', error);
      throw new Error(error.message);
    }

    return data as WorkspaceSetting || null;
  };

  const createDefaultWorkspace = async (): Promise<WorkspaceSetting> => {
    if (!user) throw new Error('User not authenticated');

    const newWorkspace = {
      user_id: user.id,
      workspace_name: 'My Workspace',
      workspace_url: 'my-workspace',
    };

    const { error } = await supabase
      .from(TABLES.WORKSPACE_SETTINGS)
      .upsert([newWorkspace as any]);

    if (error) {
      console.error('Error creating default workspace:', error);
      throw new Error(error.message);
    }

    // Fetch the created workspace to return it
    const { data, error: fetchError } = await supabase
      .from(TABLES.WORKSPACE_SETTINGS)
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching created workspace:', fetchError);
      throw new Error(fetchError.message);
    }

    return data as WorkspaceSetting;
  };

  const updateWorkspaceSettings = async (settings: Partial<WorkspaceSetting>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from(TABLES.WORKSPACE_SETTINGS)
      .update(settings as any)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating workspace settings:', error);
      throw new Error(error.message);
    }
  };

  const workspaceSettingsQuery = useQuery({
    queryKey: ['workspace-settings', user?.id],
    queryFn: fetchWorkspaceSettings,
    enabled: !!user,
  });

  const createDefaultWorkspaceMutation = useMutation({
    mutationFn: createDefaultWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-settings', user?.id] });
      toast({
        title: 'Workspace created',
        description: 'Your default workspace has been created.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating workspace',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateWorkspaceSettingsMutation = useMutation({
    mutationFn: updateWorkspaceSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace-settings', user?.id] });
      toast({
        title: 'Workspace updated',
        description: 'Your workspace settings have been updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating workspace',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    workspaceSettings: workspaceSettingsQuery.data,
    isLoading: workspaceSettingsQuery.isLoading,
    error: workspaceSettingsQuery.error,
    createDefaultWorkspace: createDefaultWorkspaceMutation.mutate,
    updateWorkspaceSettings: updateWorkspaceSettingsMutation.mutate,
    isCreating: createDefaultWorkspaceMutation.isPending,
    isUpdating: updateWorkspaceSettingsMutation.isPending,
  };
};

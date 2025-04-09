
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, NotificationSetting, TABLES } from '@/lib/supabase';
import { useToast } from './use-toast';

export const useNotificationSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchNotificationSettings = async (): Promise<NotificationSetting[]> => {
    if (!user) return [];

    const { data, error } = await supabase
      .from(TABLES.NOTIFICATION_SETTINGS)
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching notification settings:', error);
      throw new Error(error.message);
    }

    return data as NotificationSetting[];
  };

  const createDefaultSettings = async (): Promise<NotificationSetting[]> => {
    if (!user) throw new Error('User not authenticated');

    // Default notification types
    const defaultTypes = ['email', 'push', 'in_app'];
    
    const newSettings = defaultTypes.map(type => ({
      user_id: user.id,
      type,
      enabled: true,
    }));

    const { error } = await supabase
      .from(TABLES.NOTIFICATION_SETTINGS)
      .upsert(newSettings as any);

    if (error) {
      console.error('Error creating default notification settings:', error);
      throw new Error(error.message);
    }

    // Fetch the created settings to return them
    return fetchNotificationSettings();
  };

  const updateNotificationSetting = async (
    settingId: string,
    enabled: boolean
  ): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from(TABLES.NOTIFICATION_SETTINGS)
      .update({ enabled } as any)
      .eq('id', settingId);

    if (error) {
      console.error('Error updating notification setting:', error);
      throw new Error(error.message);
    }
  };

  const notificationSettingsQuery = useQuery({
    queryKey: ['notification-settings', user?.id],
    queryFn: fetchNotificationSettings,
    enabled: !!user,
  });

  const createDefaultSettingsMutation = useMutation({
    mutationFn: createDefaultSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings', user?.id] });
      toast({
        title: 'Notification settings created',
        description: 'Default notification settings have been created.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating notification settings',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateNotificationSettingMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: string; enabled: boolean }) =>
      updateNotificationSetting(id, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings', user?.id] });
      toast({
        title: 'Notification setting updated',
        description: 'Your notification preference has been updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating notification setting',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    notificationSettings: notificationSettingsQuery.data || [],
    isLoading: notificationSettingsQuery.isLoading,
    error: notificationSettingsQuery.error,
    createDefaultSettings: createDefaultSettingsMutation.mutate,
    updateNotificationSetting: updateNotificationSettingMutation.mutate,
    isCreating: createDefaultSettingsMutation.isPending,
    isUpdating: updateNotificationSettingMutation.isPending,
  };
};

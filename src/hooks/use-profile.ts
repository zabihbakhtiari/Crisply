
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, UserProfile, TABLES } from '@/lib/supabase';
import { useToast } from './use-toast';

export const useProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchProfile = async (): Promise<UserProfile | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from(TABLES.PROFILES)
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw new Error(error.message);
    }

    return data as UserProfile;
  };

  const createProfile = async (profile: Partial<UserProfile>): Promise<UserProfile> => {
    if (!user) throw new Error('User not authenticated');

    const newProfile = {
      user_id: user.id,
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      email: user.email || '',
      ...profile
    };

    const { error } = await supabase
      .from(TABLES.PROFILES)
      .upsert([newProfile as any]);

    if (error) {
      console.error('Error creating profile:', error);
      throw new Error(error.message);
    }

    // Fetch the created profile to return it
    const { data: createdProfile, error: fetchError } = await supabase
      .from(TABLES.PROFILES)
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching created profile:', fetchError);
      throw new Error(fetchError.message);
    }

    return createdProfile as UserProfile;
  };

  const updateProfile = async (profile: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from(TABLES.PROFILES)
      .update(profile as any)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      throw new Error(error.message);
    }
  };

  const profileQuery = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: fetchProfile,
    enabled: !!user,
  });

  const createProfileMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: 'Profile created',
        description: 'Your profile has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating profile',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    createProfile: createProfileMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    isCreating: createProfileMutation.isPending,
    isUpdating: updateProfileMutation.isPending,
  };
};

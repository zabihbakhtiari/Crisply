
import { createClient } from '@supabase/supabase-js';
import { supabase as integratedSupabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Type definitions for consistent interface
export type UserProfile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
};

export type NotificationSetting = {
  id: string;
  user_id: string;
  type: string;
  enabled: boolean;
};

export type WorkspaceSetting = {
  id: string;
  user_id: string;
  workspace_name: string;
  workspace_url: string;
};

// Use the integrated Supabase client
export const supabase = integratedSupabase;

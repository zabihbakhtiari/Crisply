
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
// These will be available via the Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if required environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not defined.");
  console.info("Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment.");
  console.info("You can integrate Supabase by clicking the Supabase button in the top right corner.");
}

// Standard mock response
const mockResponse = {
  data: null,
  error: null,
  status: 200,
  statusText: "OK",
  count: null,
};

// Create a mock client or real client depending on environment variables
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signUp: () => Promise.resolve({ error: { message: "Supabase is not configured" } }),
        signInWithPassword: () => Promise.resolve({ error: { message: "Supabase is not configured" } }),
        signOut: () => Promise.resolve({}),
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: (table: string) => {
        return {
          select: (columns: string = '*') => {
            return {
              eq: (column: string, value: any) => {
                return {
                  single: () => Promise.resolve({ ...mockResponse }),
                };
              },
              single: () => Promise.resolve({ ...mockResponse }),
            };
          },
          insert: (values: any) => {
            return {
              select: (columns: string = '*') => Promise.resolve({ ...mockResponse })
            };
          },
          update: (values: any) => {
            return {
              eq: (column: string, value: any) => {
                return {
                  eq: (column2: string, value2: any) => Promise.resolve({ ...mockResponse }),
                };
              },
            };
          },
          delete: () => {
            return {
              eq: (column: string, value: any) => Promise.resolve({ ...mockResponse }),
            };
          },
        };
      },
    };

// Types
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

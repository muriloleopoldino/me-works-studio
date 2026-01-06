import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if configuration is valid
export const isConfigured =
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder.supabase.co');

if (!isConfigured) {
  console.warn('Supabase is not configured properly. Check your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
);

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  project_type: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  created_at: string;
  updated_at?: string;
};


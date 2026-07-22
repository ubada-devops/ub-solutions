import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl.trim() !== '' && 
  supabaseUrl !== 'placeholder-url' &&
  supabaseAnonKey && 
  supabaseAnonKey.trim() !== '' &&
  supabaseAnonKey !== 'placeholder-anon-key'
);

const activeUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder-project.supabase.co';
const activeKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key';

export const supabase = createClient(activeUrl, activeKey);
export default supabase;

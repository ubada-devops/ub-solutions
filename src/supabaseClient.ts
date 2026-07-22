import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lvsisjfkwxwygwyymkkb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2c2lzamZrd3h3eWd3eXlta2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3NDMzOTQsImV4cCI6MjEwMDMxOTM5NH0.lBHTOZj2qveOrfAAJ1y7uoBnnjbpMFtBSiRFyMNf0VA';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;

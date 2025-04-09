// Supabase configuration
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_PUBLIC_KEY';

// Initialize Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Export for use in other files
export { supabase };
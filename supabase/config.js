// Supabase configuration
const supabaseUrl = 'DB_URL = postgresql://postgres.smzezqtlqndrbesykjoo:RiskGuard AI@aws-0-us-east-2.pooler.supabase.com:5432/postgres';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';

// Initialize Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Export for use in other files
export { supabase };
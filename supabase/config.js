import { createClient } from '@supabase/supabase-js';

// ✅ Use the correct REST API URL and anon key
const supabaseUrl = 'https://smzezqtlqndrbesykjoo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtemV6cXRscW5kcmJlc3lram9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNDE0MDAsImV4cCI6MjA1NzcxNzQwMH0.RCzrsJ9dnvPaDiOa1g8zDqBo9WaiqZLdDtabm9fMBtw';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

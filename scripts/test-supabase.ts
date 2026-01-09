
import { createClient } from '@supabase/supabase-js';

// Hardcoded for testing
const supabaseUrl = 'https://svforitlkrigifbradagr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bG9yaXRpa25qZGZicmFkYWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NDQ2ODEsImV4cCI6MjA4MDQyMDY4MX0.JoxT8dfGpbU_9f6evVeqeZzC-0ykVb9nmEcV-P1eIiE';

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 10) + '...');

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    }
});

async function testConnection() {
    try {
        console.log('Fetching leads...');
        const { data, error, status, statusText } = await supabase
            .from('leads')
            .select('*')
            .limit(5);

        if (error) {
            console.error('❌ Supabase Error:', error);
            console.error('Status:', status, statusText);
        } else {
            console.log('✅ Success! Leads found:', data?.length);
            if (data && data.length > 0) {
                console.log('First lead:', data[0]);
            } else {
                console.log('No leads found in table.');
            }
        }
    } catch (err) {
        console.error('❌ Unexpected Error:', err);
    }
}

testConnection();

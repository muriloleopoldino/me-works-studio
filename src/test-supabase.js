import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file from root
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
// console.log('Key:', supabaseKey); // Don't log key

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log('Attempting to insert test lead...');

    const testLead = {
        name: 'Test Script User',
        email: 'test-script@example.com',
        phone: '11999999999',
        project_type: 'site-institucional',
        message: 'This is a test message from the diagnostic script.',
        status: 'new'
    };

    const { data, error } = await supabase
        .from('leads')
        .insert(testLead)
        .select();

    if (error) {
        console.error('❌ Insert Error:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ Insert Success:', data);
    }
}

testInsert();

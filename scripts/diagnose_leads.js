import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

// Load env vars manually since we are running this as a standalone script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../.env');

console.log('Loading .env from:', envPath);
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const supabaseUrl = envConfig.VITE_SUPABASE_URL;
const supabaseKey = envConfig.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

console.log('✅ Supabase URL found:', supabaseUrl);
console.log('✅ Supabase Key found (length):', supabaseKey.length);

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
    console.log('\n🔄 Attempting to insert test lead...');

    const testLead = {
        name: 'Test Lead Antigravity',
        email: 'test.antigravity@example.com',
        phone: '11999999999',
        project_type: 'outro',
        message: 'This is a diagnostic test insert from Antigravity script.',
        status: 'new'
    };

    const { data, error } = await supabase
        .from('leads')
        .insert(testLead)
        .select()
        .single();

    if (error) {
        console.error('❌ INSERT FAILED:', error);
        console.error('Error Details:', JSON.stringify(error, null, 2));
    } else {
        console.log('✅ INSERT SUCCESS!');
        console.log('Created Lead ID:', data.id);

        // Optional: Clean up
        console.log('\n🔄 Cleaning up test lead...');
        const { error: deleteError } = await supabase
            .from('leads')
            .delete()
            .eq('id', data.id);

        if (deleteError) {
            console.warn('⚠️ Failed to delete test lead (expected if RLS blocks delete):', deleteError.message);
        } else {
            console.log('✅ Test lead deleted.');
        }
    }
}

testInsert().catch(err => console.error('Unexpected script error:', err));

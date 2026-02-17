import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('Creating tasks table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS tasks (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          completed BOOLEAN DEFAULT false,
          completed_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    }).then(({ error }) => {
      if (error) throw error;
    });

    console.log('Creating trackers table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS trackers (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          count INTEGER DEFAULT 0,
          updated_at TIMESTAMP DEFAULT NOW()
        );
      `
    }).then(({ error }) => {
      if (error) throw error;
    });

    console.log('Creating progress_history table...');
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS progress_history (
          id BIGSERIAL PRIMARY KEY,
          task_name TEXT NOT NULL,
          completed BOOLEAN NOT NULL,
          recorded_at TIMESTAMP DEFAULT NOW()
        );
      `
    }).then(({ error }) => {
      if (error) throw error;
    });

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST() {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { error: 'Missing Supabase credentials' },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Check if tables exist by trying to select from them
    const { error: tasksCheckError } = await supabase
      .from('tasks')
      .select('id')
      .limit(1);

    const { error: trackersCheckError } = await supabase
      .from('trackers')
      .select('id')
      .limit(1);

    // If tables don't exist, they will have 'PGRST116' error code
    // In that case, the user needs to manually create tables in Supabase or use the SQL script
    // For now, we'll just try to initialize trackers if they don't exist

    if (!trackersCheckError || trackersCheckError.code === 'PGRST116') {
      // Try to upsert default trackers
      try {
        await supabase.from('trackers').upsert([
          { name: 'pomodoro', count: 0 },
          { name: 'water', count: 0 },
          { name: 'exercise', count: 0 }
        ]);
      } catch (e) {
        // Trackers table might not exist yet
        console.log('Trackers table not yet initialized');
      }
    }

    // Seed default tasks if none exist
    if (!tasksCheckError || tasksCheckError.code === 'PGRST116') {
      try {
        const defaultTasks = [
          { name: 'Major Project: Define scope & architecture', category: 'college', completed: false },
          { name: 'Major Project: Assign modules to team', category: 'college', completed: false },
          { name: 'Midsem: Subject-wise revision plan', category: 'college', completed: false },
          { name: 'Midsem: Solve past papers', category: 'college', completed: false },
          { name: 'Client Engine #1: Requirements doc', category: 'ai', completed: false },
          { name: 'Client Engine #1: Build RAG pipeline', category: 'ai', completed: false },
          { name: 'SOB: Explore codebase & find issue', category: 'extra', completed: false },
          { name: 'Java: OOP concepts practice', category: 'extra', completed: false },
          { name: 'LeetCode: Arrays & Strings (2 easy)', category: 'place', completed: false },
          { name: 'Resume: Draft & polish', category: 'place', completed: false }
        ];

        const { data: existingTasks } = await supabase
          .from('tasks')
          .select('id')
          .limit(1);

        if (!existingTasks || existingTasks.length === 0) {
          await supabase.from('tasks').insert(defaultTasks);
        }
      } catch (e) {
        console.log('Could not seed tasks:', e);
      }
    }

    return Response.json({ success: true, message: 'Database initialized' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return Response.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing Supabase config' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Response.json(data || []);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return Response.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing Supabase config' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.category) {
      return Response.json(
        { error: 'Task name and category are required' },
        { status: 400 }
      );
    }

    const validCategories = ['college', 'ai', 'extra', 'place'];
    if (!validCategories.includes(body.category)) {
      return Response.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const taskData = {
      name: body.name.trim(),
      category: body.category,
      completed: false,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error('Error creating task:', error);
    return Response.json({ error: 'Failed to create task' }, { status: 500 });
  }
}

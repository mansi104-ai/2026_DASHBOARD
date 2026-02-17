import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing Supabase config' }, { status: 500 });
  }

  const { id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('tasks')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', parseInt(id))
      .select()
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error('Error updating task:', error);
    return Response.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing Supabase config' }, { status: 500 });
  }

  const { id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', parseInt(id));

    if (error) throw error;

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return Response.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}

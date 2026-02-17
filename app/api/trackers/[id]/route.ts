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
      .from('trackers')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('name', id)
      .select()
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error('Error updating tracker:', error);
    return Response.json({ error: 'Failed to update tracker' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing Supabase config' }, { status: 500 });
  }

  const { id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase
      .from('trackers')
      .select('*')
      .eq('name', id)
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error('Error fetching tracker:', error);
    return Response.json({ error: 'Failed to fetch tracker' }, { status: 500 });
  }
}

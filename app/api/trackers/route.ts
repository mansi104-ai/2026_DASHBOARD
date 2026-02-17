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
      .from('trackers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return Response.json(data || []);
  } catch (error) {
    console.error('Error fetching trackers:', error);
    return Response.json({ error: 'Failed to fetch trackers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ error: 'Missing Supabase config' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from('trackers')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    console.error('Error creating tracker:', error);
    return Response.json({ error: 'Failed to create tracker' }, { status: 500 });
  }
}

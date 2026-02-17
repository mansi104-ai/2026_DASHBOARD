import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultTasks = [
  // College Tasks
  { name: 'Major Project: Define scope & architecture', category: 'college', completed: false },
  { name: 'Major Project: Assign modules to team', category: 'college', completed: false },
  { name: 'Midsem: Subject-wise revision plan', category: 'college', completed: false },
  { name: 'Midsem: Solve past papers', category: 'college', completed: false },
  { name: 'Recommender: Algorithm research', category: 'college', completed: false },
  { name: 'Recommender: Build slides', category: 'college', completed: false },
  { name: 'Project: Code review and testing', category: 'college', completed: false },
  { name: 'Project: Documentation', category: 'college', completed: false },

  // AI Growth Tasks
  { name: 'Client Engine #1: Requirements doc', category: 'ai', completed: false },
  { name: 'Client Engine #1: Build RAG pipeline', category: 'ai', completed: false },
  { name: 'Client Engine #2: Architecture design', category: 'ai', completed: false },
  { name: 'Personal Agent #1: Build', category: 'ai', completed: false },
  { name: 'Deep Learning: LSTM theory', category: 'ai', completed: false },
  { name: 'Deep Learning: LSTM code project', category: 'ai', completed: false },
  { name: 'Write Medium blog post', category: 'ai', completed: false },
  { name: 'Review AI papers', category: 'ai', completed: false },

  // Additional Skills
  { name: 'SOB: Explore codebase & find issue', category: 'extra', completed: false },
  { name: 'SOB: Write first contribution', category: 'extra', completed: false },
  { name: 'Java: OOP concepts practice', category: 'extra', completed: false },
  { name: 'Java: Collections deep dive', category: 'extra', completed: false },
  { name: 'Go: REST API project', category: 'extra', completed: false },
  { name: 'Python: Data processing', category: 'extra', completed: false },
  { name: 'OpenClaw: Config setup', category: 'extra', completed: false },
  { name: 'Linux: System administration basics', category: 'extra', completed: false },

  // Placements
  { name: 'LeetCode: Arrays & Strings (2 easy)', category: 'place', completed: false },
  { name: 'LeetCode: Trees & Graphs (2 medium)', category: 'place', completed: false },
  { name: 'LeetCode: Dynamic Programming (1 hard)', category: 'place', completed: false },
  { name: 'Core: OS fundamentals', category: 'place', completed: false },
  { name: 'Core: DBMS & SQL', category: 'place', completed: false },
  { name: 'Core: Computer Networks', category: 'place', completed: false },
  { name: 'Resume: Draft & polish', category: 'place', completed: false },
  { name: 'Codeforces: Rated contest', category: 'place', completed: false }
];

async function seedDatabase() {
  try {
    console.log('Seeding default tasks...');
    
    // Check if tasks already exist
    const { data: existingTasks } = await supabase
      .from('tasks')
      .select('id')
      .limit(1);

    if (existingTasks && existingTasks.length > 0) {
      console.log('Tasks already exist, skipping seed');
      return;
    }

    // Insert all tasks
    const { error } = await supabase
      .from('tasks')
      .insert(defaultTasks);

    if (error) throw error;

    console.log('✓ Successfully seeded', defaultTasks.length, 'tasks');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();

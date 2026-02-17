# Engineer OS Progress Tracker — Setup Guide

This is a fully functional progress tracking app built with Next.js and Supabase. Track your tasks across 4 areas, use the Pomodoro timer, and monitor quick trackers for habits.

## Prerequisites

- Supabase account and project set up
- Environment variables configured

## Database Setup

### Option 1: Automatic Setup (Recommended)

The app will attempt to initialize the database automatically on first load:

1. Visit the app in your browser
2. The `/api/init` endpoint will run automatically
3. Default tasks will be seeded if tables don't exist

### Option 2: Manual SQL Setup

If automatic setup doesn't work, run the SQL script in your Supabase SQL Editor:

```sql
-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create trackers table
CREATE TABLE IF NOT EXISTS trackers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create progress_history table
CREATE TABLE IF NOT EXISTS progress_history (
  id BIGSERIAL PRIMARY KEY,
  task_name TEXT NOT NULL,
  completed BOOLEAN NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Initialize tracker entries
INSERT INTO trackers (name, count) 
VALUES 
  ('pomodoro', 0),
  ('water', 0),
  ('exercise', 0)
ON CONFLICT (name) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_progress_history_task_name ON progress_history(task_name);
```

### Option 3: Seed Default Tasks

If you want to populate the database with example tasks, run:

```bash
npm run seed
# or
pnpm seed
```

This script is defined in `package.json` and uses the seed file in `scripts/seed-tasks.mjs`.

## Environment Variables

Make sure these are set in your Vercel project or `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

## Features

### Dashboard Overview
- **Stat Cards**: Shows completion percentage for each area (College, AI Growth, Additional, Placements)
- **Milestones**: Track major semester milestones with visual progress
- **Pomodoro Timer**: 25-minute work sessions with break time tracking
- **Quick Trackers**: Track Pomodoro sessions, water intake, and exercise

### Task Management
- **Area-based Organization**: Tasks organized into 4 main areas
- **Category Filtering**: Filter tasks by area or view all
- **Task Completion**: Click checkbox to mark tasks done with timestamp tracking
- **Real-time Sync**: All changes automatically sync to Supabase

### Data Persistence
- All tasks, trackers, and progress are saved to Supabase
- Data persists across browser sessions
- Changes are instant and reflected throughout the app

## Architecture

```
app/
├── page.tsx                 # Main page with app initialization
├── layout.tsx              # Root layout with metadata
├── globals.css             # Tailwind styles
├── api/
│   ├── init/               # Database initialization
│   ├── tasks/              # Task CRUD operations
│   └── trackers/           # Tracker CRUD operations
components/
├── engineer-os/
│   ├── header.tsx          # Header with clock
│   ├── stat-cards.tsx      # Area completion cards
│   ├── task-areas.tsx      # Task sections by area
│   ├── task-item.tsx       # Individual task component
│   ├── milestones.tsx      # Semester milestones
│   ├── pomodoro-timer.tsx  # Pomodoro timer
│   └── quick-trackers.tsx  # Habit trackers
scripts/
├── create-schema.sql       # Database schema
└── seed-tasks.mjs          # Task seeding script
```

## Customization

### Adding New Tasks
You can add tasks through:
1. The UI (manually in the database)
2. The seed script (`scripts/seed-tasks.mjs`)
3. Direct Supabase dashboard

### Modifying Categories
Edit the area definitions in `components/engineer-os/stat-cards.tsx` and `components/engineer-os/task-areas.tsx`

### Adjusting Pomodoro Timing
Edit the timer values in `components/engineer-os/pomodoro-timer.tsx`:
- Work session: `25 * 60` (25 minutes)
- Break: `5 * 60` (5 minutes)

## Troubleshooting

### Tables Not Found
If you see "PGRST116" errors, the tables don't exist yet:
1. Run the SQL script manually in Supabase
2. Or visit `/api/init` to trigger initialization

### No Tasks Showing
1. Check that the tasks table exists in Supabase
2. Run the seed script to populate default tasks
3. Check browser console for API errors

### Data Not Saving
1. Verify environment variables are set correctly
2. Check Supabase is accessible
3. Look for errors in the browser console and server logs

## Deployment

Deploy to Vercel by pushing to GitHub or importing the repository. Make sure to add the environment variables in Vercel project settings.

## Notes

- Single-user design (no authentication)
- All progress saved to Supabase automatically
- Responsive design works on desktop and mobile
- Dark theme with accent colors for different areas

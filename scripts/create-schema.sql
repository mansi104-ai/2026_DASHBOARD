-- Create tasks table for tracking Engineer OS tasks
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create trackers table for tracking counts (pomodoro, water, exercise, etc.)
CREATE TABLE IF NOT EXISTS trackers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create progress_history table for tracking progress over time
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);
CREATE INDEX IF NOT EXISTS idx_progress_history_task_name ON progress_history(task_name);

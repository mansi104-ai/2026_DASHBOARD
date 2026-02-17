'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/engineer-os/header';
import StatCards from '@/components/engineer-os/stat-cards';
import TaskAreas from '@/components/engineer-os/task-areas';
import QuickTrackers from '@/components/engineer-os/quick-trackers';
import PomodoroTimer from '@/components/engineer-os/pomodoro-timer';
import Milestones from '@/components/engineer-os/milestones';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [trackers, setTrackers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize database if needed
        await fetch('/api/init', { method: 'POST' });
        
        // Load initial data
        const [tasksRes, trackersRes] = await Promise.all([
          fetch('/api/tasks'),
          fetch('/api/trackers')
        ]);

        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          setTasks(tasksData);
        }

        if (trackersRes.ok) {
          const trackersData = await trackersRes.json();
          setTrackers(trackersData);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Initializing Engineer OS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-7">
        <Header />
        <StatCards tasks={tasks} />
        <Milestones />
        <PomodoroTimer tasks={tasks} />
        <QuickTrackers trackers={trackers} />
        <TaskAreas tasks={tasks} onTasksChange={setTasks} />
      </div>
    </div>
  );
}

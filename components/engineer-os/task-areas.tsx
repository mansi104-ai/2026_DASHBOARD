'use client';

import { useState } from 'react';
import TaskItem from './task-item';
import AddTaskModal from './add-task-modal';

const areas = [
  {
    key: 'college',
    icon: '🎓',
    title: 'AREA 1 — College',
    tagline: 'Last semester. Ship the project, ace the exams, present the idea. Leave a legacy.',
    color: 'orange-400',
    borderColor: 'border-orange-500/20'
  },
  {
    key: 'ai',
    icon: '🤖',
    title: 'AREA 2 — AI Growth',
    tagline: 'Build cutting-edge AI systems, learn deep learning, ship projects that matter.',
    color: 'cyan-400',
    borderColor: 'border-cyan-500/20'
  },
  {
    key: 'extra',
    icon: '⚙️',
    title: 'AREA 3 — Additional',
    tagline: 'Diversify skills. Master languages, systems, and open-source contributions.',
    color: 'purple-400',
    borderColor: 'border-purple-500/20'
  },
  {
    key: 'place',
    icon: '💼',
    title: 'AREA 4 — Placements',
    tagline: 'LeetCode, fundamentals, resume, competitive programming. Get the offer.',
    color: 'yellow-400',
    borderColor: 'border-yellow-500/20'
  }
];

export default function TaskAreas({
  tasks,
  onTasksChange
}: {
  tasks: any[];
  onTasksChange: (tasks: any[]) => void;
}) {
  const [filterArea, setFilterArea] = useState<string | null>(null);
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({
    college: true,
    ai: true,
    extra: true,
    place: true
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAreaForAdd, setSelectedAreaForAdd] = useState('college');

  const toggleArea = (area: string) => {
    setExpandedAreas(prev => ({
      ...prev,
      [area]: !prev[area]
    }));
  };

  const handleAddTask = async (taskName: string, category: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, category })
      });

      if (response.ok) {
        const newTask = await response.json();
        onTasksChange([...tasks, newTask]);
      }
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  };

  const handleToggleTask = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTask = {
      ...task,
      completed: !task.completed,
      completed_at: !task.completed ? new Date().toISOString() : null
    };

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      });

      if (response.ok) {
        const updated = await response.json();
        onTasksChange(tasks.map(t => t.id === taskId ? updated : t));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const colorMap: Record<string, string> = {
    'orange-400': '#fb923c',
    'cyan-400': '#22d3ee',
    'purple-400': '#c084fc',
    'yellow-400': '#facc15'
  };

  const visibleAreas = filterArea ? areas.filter(a => a.key === filterArea) : areas;
  const visibleTasks = filterArea
    ? tasks.filter(t => t.category === filterArea)
    : tasks;

  return (
    <div>
      {/* Add Task Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            setSelectedAreaForAdd(filterArea || 'college');
            setIsAddModalOpen(true);
          }}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded font-mono text-xs font-bold text-white transition"
        >
          + ADD TASK
        </button>
      </div>

      {/* Area Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterArea(null)}
          className={`px-4 py-2 rounded font-mono text-xs font-bold tracking-widest transition-all ${
            filterArea === null
              ? 'bg-slate-600 text-white'
              : 'border border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300'
          }`}
        >
          ALL AREAS
        </button>
        {areas.map(area => (
          <button
            key={area.key}
            onClick={() => setFilterArea(area.key)}
            style={
              filterArea === area.key
                ? {
                    backgroundColor: colorMap[area.color],
                    color: '#0f172a'
                  }
                : undefined
            }
            className={`px-4 py-2 rounded font-mono text-xs font-bold tracking-widest transition-all ${
              filterArea === area.key
                ? ''
                : `border border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300`
            }`}
          >
            {area.icon} {area.title.split('—')[1].trim()}
          </button>
        ))}
      </div>

      {/* Area Sections */}
      <div className="space-y-6">
        {visibleAreas.map(area => {
          const areaTasks = visibleTasks.filter(t => t.category === area.key);
          const isExpanded = expandedAreas[area.key];

          return (
            <div key={area.key} className="space-y-2">
              <button
                onClick={() => toggleArea(area.key)}
                className={`w-full flex items-center gap-3 p-4 bg-slate-800/50 border ${area.borderColor} rounded-lg hover:shadow-lg hover:shadow-slate-900/50 transition-all text-left`}
              >
                <span className="text-2xl">{area.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-lg" style={{ color: colorMap[area.color] }}>
                    {area.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">{area.tagline}</p>
                </div>
                <span className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                  ▾
                </span>
              </button>

              {isExpanded && (
                <div className="space-y-2 pl-2">
                  {areaTasks.length === 0 ? (
                    <p className="text-xs text-slate-500 p-4">No tasks in this area</p>
                  ) : (
                    areaTasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => handleToggleTask(task.id)}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        defaultArea={selectedAreaForAdd}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}

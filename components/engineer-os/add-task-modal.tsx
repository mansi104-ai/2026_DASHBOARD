'use client';

import { useState } from 'react';

interface AddTaskModalProps {
  isOpen: boolean;
  defaultArea?: string;
  onClose: () => void;
  onAdd: (taskName: string, category: string) => Promise<void>;
}

export default function AddTaskModal({
  isOpen,
  defaultArea = 'college',
  onClose,
  onAdd
}: AddTaskModalProps) {
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState(defaultArea);
  const [isLoading, setIsLoading] = useState(false);

  const areas = [
    { key: 'college', label: 'College', icon: '🎓' },
    { key: 'ai', label: 'AI Growth', icon: '🤖' },
    { key: 'extra', label: 'Additional', icon: '⚙️' },
    { key: 'place', label: 'Placements', icon: '💼' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    setIsLoading(true);
    try {
      await onAdd(taskName.trim(), category);
      setTaskName('');
      setCategory(defaultArea);
      onClose();
    } catch (error) {
      console.error('Failed to add task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-4">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., Complete project documentation"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition"
              autoFocus
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Area
            </label>
            <div className="grid grid-cols-2 gap-2">
              {areas.map(area => (
                <button
                  key={area.key}
                  type="button"
                  onClick={() => setCategory(area.key)}
                  className={`p-2 rounded border text-sm font-medium transition ${
                    category === area.key
                      ? 'bg-slate-700 border-slate-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <span className="mr-1">{area.icon}</span>
                  {area.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-slate-600 rounded text-slate-300 hover:text-slate-200 hover:border-slate-500 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!taskName.trim() || isLoading}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

export default function QuickTrackers({ trackers }: { trackers: any[] }) {
  const [counts, setCounts] = useState<Record<string, number>>({
    pomodoro: 0,
    water: 0,
    exercise: 0
  });

  const trackerConfigs = [
    {
      id: 'pomodoro',
      label: 'POMODORO SESSIONS',
      icon: '⏱️',
      max: 16,
      color: 'bg-cyan-400',
      buttons: [
        { label: '+1', value: 1 },
        { label: '+4', value: 4 },
        { label: '-1', value: -1, variant: 'danger' }
      ]
    },
    {
      id: 'water',
      label: 'WATER INTAKE',
      icon: '💧',
      max: 8,
      color: 'bg-blue-400',
      buttons: [
        { label: '+1 cup', value: 1 },
        { label: '+4 cups', value: 4 },
        { label: '-1', value: -1, variant: 'danger' }
      ]
    },
    {
      id: 'exercise',
      label: 'EXERCISE MINS',
      icon: '🏃',
      max: 120,
      color: 'bg-green-400',
      buttons: [
        { label: '+15m', value: 15 },
        { label: '+30m', value: 30 },
        { label: '-15m', value: -15, variant: 'danger' }
      ]
    }
  ];

  const handleUpdate = async (trackerId: string, delta: number) => {
    const newCount = Math.max(0, (counts[trackerId] || 0) + delta);
    setCounts(prev => ({ ...prev, [trackerId]: newCount }));

    try {
      await fetch(`/api/trackers/${trackerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: newCount })
      });
    } catch (error) {
      console.error('Failed to update tracker:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {trackerConfigs.map((config) => {
        const count = counts[config.id] || 0;
        const percentage = Math.min(100, (count / config.max) * 100);

        return (
          <div key={config.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="font-mono text-xs text-slate-500 mb-2 tracking-widest">
              {config.label}
            </div>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-3xl font-black text-white">{count}</span>
              <span className="text-sm text-slate-400">/ {config.max}</span>
            </div>
            <div className="bg-slate-700/50 rounded h-1 mb-4 overflow-hidden">
              <div
                className={`${config.color} h-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex gap-2">
              {config.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUpdate(config.id, btn.value)}
                  className={`flex-1 font-mono text-xs py-2 px-2 rounded border transition-all ${
                    btn.variant === 'danger'
                      ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { useState } from 'react';

const milestoneData = [
  { label: 'SOB Environment Setup', date: 'Week 1' },
  { label: 'SOB PR #1 Submitted', date: 'Mar 10' },
  { label: 'Client Engine #1 MVP', date: 'Mar 20' },
  { label: 'Midsem Exams Done', date: 'Mar end' },
  { label: 'Major Project v1', date: 'Apr 15' },
  { label: 'Resume Finalized', date: 'Apr 20' },
  { label: 'LeetCode 200 solved', date: 'Apr 30' },
  { label: 'Graduation + Offer', date: 'May' }
];

export default function Milestones() {
  const [completed, setCompleted] = useState<number[]>([0]);

  const toggleMilestone = async (index: number) => {
    setCompleted(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 mb-8">
      <div className="font-semibold text-sm mb-5 flex items-center gap-2">
        <div className="w-1 h-3 bg-yellow-400 rounded-full"></div>
        Semester Milestones — Click to mark done
      </div>

      <div className="relative flex justify-between">
        {/* Connecting line */}
        <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-slate-700" />

        {/* Milestones */}
        <div className="relative flex justify-between w-full">
          {milestoneData.map((milestone, index) => {
            const isDone = completed.includes(index);
            const isActive = index === 0 || (index > 0 && completed.includes(index - 1));

            return (
              <button
                key={index}
                onClick={() => toggleMilestone(index)}
                className="flex flex-col items-center z-10 group"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                    isDone
                      ? 'bg-green-500 border-green-500 text-white'
                      : isActive
                        ? 'bg-cyan-400 border-cyan-400 text-slate-900 animate-pulse'
                        : 'bg-slate-800 border-slate-600 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : isActive ? '→' : index + 1}
                </div>
                <div className="text-xs text-slate-400 mt-2.5 max-w-16 text-center leading-tight group-hover:text-slate-300 transition-colors">
                  {milestone.label}
                </div>
                <div className="font-mono text-xs text-slate-500 mt-1">{milestone.date}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

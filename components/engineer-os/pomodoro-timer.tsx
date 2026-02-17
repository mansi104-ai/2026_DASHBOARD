'use client';

import { useEffect, useState } from 'react';

export default function PomodoroTimer({ tasks }: { tasks: any[] }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [selectedTask, setSelectedTask] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setIsRunning(false);
            setSessionsToday(prev => prev + 1);
            setTimeLeft(5 * 60); // Break time
            return 5 * 60;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const focusPhase = timeLeft > 5 * 60 ? 'WORK' : 'BREAK';
  const totalFocusMinutes = Math.floor((sessionsToday * 25) / 60);
  const totalFocusSecs = (sessionsToday * 25) % 60;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Timer */}
        <div className="flex flex-col items-center justify-center">
          <div className="font-mono text-5xl font-bold text-cyan-400 mb-2 tracking-tighter">
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs text-slate-400 mb-4 tracking-widest font-mono">
            {focusPhase === 'WORK' ? 'TIME TO FOCUS' : 'TAKE A BREAK'}
          </div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={start}
              disabled={isRunning}
              className="px-3 py-1.5 bg-cyan-500 text-slate-900 font-mono text-xs font-bold rounded hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              START
            </button>
            <button
              onClick={pause}
              className="px-3 py-1.5 border border-slate-600 text-slate-300 font-mono text-xs font-bold rounded hover:bg-slate-700"
            >
              PAUSE
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 border border-red-500/30 text-red-400 font-mono text-xs font-bold rounded hover:bg-red-500/10"
            >
              RESET
            </button>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full border border-cyan-400 ${
                  i < sessionsToday % 4 ? 'bg-cyan-400' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-sm mb-2">🧠 How to enter flow state — right now</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Flow doesn't require motivation. It requires <strong className="text-cyan-400">a single point of contact</strong>. Pick one task below, start the timer, put your phone in another room, and open only that task.
            The first 90 seconds are the hardest. After that, your brain takes over. <strong className="text-cyan-400">Start. Not soon. Now.</strong>
            Every session you complete here adds to your streak — and streaks compound into identity.
          </p>
          <div className="font-mono text-xs text-slate-400">
            TODAY: <span className="text-cyan-400 font-bold">{sessionsToday}</span> sessions done · TOTAL FOCUS: <span className="text-cyan-400 font-bold">{totalFocusMinutes}h {totalFocusSecs}m</span>
          </div>
        </div>

        {/* Task Selector */}
        <div className="flex flex-col justify-center">
          <label className="font-mono text-xs text-slate-400 mb-2 tracking-widest">CURRENTLY WORKING ON</label>
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-sm text-slate-100 focus:border-cyan-400 outline-none transition-colors"
          >
            <option value="">— pick a task to focus on —</option>
            {tasks.map((task, idx) => (
              <option key={idx} value={task.name}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

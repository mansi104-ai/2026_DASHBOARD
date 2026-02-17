'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [time, setTime] = useState('--:--:--');
  const [date, setDate] = useState('--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit'
      });
      setTime(timeStr);
      setDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between mb-7 pb-5 border-b border-slate-700">
      <div>
        <div className="text-3xl font-black tracking-tight">
          Engineer <span className="text-cyan-400">OS</span>
        </div>
        <div className="text-xs text-slate-500 tracking-widest mt-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mr-1"></span>
          FINAL SEMESTER · FULL TASK BREAKDOWN · POWERED BY FOCUS
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-2xl font-bold text-cyan-400">{time}</div>
        <div className="font-mono text-xs text-slate-500 tracking-wider mt-1">{date}</div>
      </div>
    </div>
  );
}

'use client';

export default function TaskItem({
  task,
  onToggle
}: {
  task: any;
  onToggle: () => void;
}) {
  const categoryColors: Record<string, string> = {
    college: 'border-orange-500/20',
    ai: 'border-cyan-500/20',
    extra: 'border-purple-500/20',
    place: 'border-yellow-500/20'
  };

  const checkColors: Record<string, string> = {
    college: 'border-orange-400 bg-orange-400/10',
    ai: 'border-cyan-400 bg-cyan-400/10',
    extra: 'border-purple-400 bg-purple-400/10',
    place: 'border-yellow-400 bg-yellow-400/10'
  };

  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-start gap-3 p-3 bg-slate-800/30 border ${categoryColors[task.category]} rounded-lg hover:bg-slate-700/30 transition-all text-left group ${
        task.completed ? 'opacity-40' : ''
      }`}
    >
      <div
        className={`flex-shrink-0 w-5 h-5 mt-0.5 border-2 rounded flex items-center justify-center ${
          task.completed
            ? checkColors[task.category]
            : 'border-slate-600 group-hover:border-slate-500'
        }`}
      >
        {task.completed && <span className="text-xs font-bold text-slate-200">✓</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium transition-all ${
            task.completed
              ? 'line-through text-slate-500'
              : 'text-slate-100 group-hover:text-slate-50'
          }`}
        >
          {task.name}
        </p>
      </div>
      {task.completed_at && (
        <div className="text-xs text-slate-500 flex-shrink-0">
          {new Date(task.completed_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </div>
      )}
    </button>
  );
}

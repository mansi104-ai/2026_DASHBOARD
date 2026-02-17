'use client';

const areas = [
  {
    key: 'college',
    icon: '🎓',
    title: 'AREA 1 — College',
    subtitle: 'Major proj · Midsem · Recommender',
    color: 'from-orange-400 to-orange-500',
    borderColor: 'border-orange-500/20',
    barColor: 'bg-orange-400',
    textColor: 'text-orange-400'
  },
  {
    key: 'ai',
    icon: '🤖',
    title: 'AREA 2 — AI Growth',
    subtitle: 'Engines · Agents · DL · Blogs',
    color: 'from-cyan-400 to-cyan-500',
    borderColor: 'border-cyan-500/20',
    barColor: 'bg-cyan-400',
    textColor: 'text-cyan-400'
  },
  {
    key: 'extra',
    icon: '⚙️',
    title: 'AREA 3 — Additional',
    subtitle: 'SOB · Java · Go · Python · OpenClaw',
    color: 'from-purple-400 to-purple-500',
    borderColor: 'border-purple-500/20',
    barColor: 'bg-purple-400',
    textColor: 'text-purple-400'
  },
  {
    key: 'place',
    icon: '💼',
    title: 'AREA 4 — Placements',
    subtitle: 'LC · Fundamentals · Resume · CF',
    color: 'from-yellow-400 to-yellow-500',
    borderColor: 'border-yellow-500/20',
    barColor: 'bg-yellow-400',
    textColor: 'text-yellow-400'
  }
];

export default function StatCards({ tasks }: { tasks: any[] }) {
  const getAreaStats = (area: string) => {
    const areaTasks = tasks.filter(t => t.category === area);
    const completed = areaTasks.filter(t => t.completed).length;
    const total = areaTasks.length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, percentage };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {areas.map((area) => {
        const { completed, total, percentage } = getAreaStats(area.key);
        return (
          <div
            key={area.key}
            className={`bg-slate-800/50 border ${area.borderColor} rounded-lg p-4 hover:shadow-lg hover:shadow-slate-900/50 transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{area.icon}</span>
              <span className={`font-mono text-xs font-bold ${area.textColor}`}>
                {percentage}%
              </span>
            </div>
            <h3 className={`text-sm font-bold ${area.textColor} mb-1`}>{area.title}</h3>
            <p className="text-xs text-slate-400 mb-3">{area.subtitle}</p>
            <div className="bg-slate-700/50 rounded h-1.5 mb-3 overflow-hidden">
              <div
                className={`${area.barColor} h-full transition-all duration-700`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="font-mono text-xs text-slate-500">
              {completed} / {total} tasks done
            </p>
          </div>
        );
      })}
    </div>
  );
}

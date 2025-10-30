function StatsCard({ icon, label, value, color }) {
  try {
    const colorConfig = {
      purple: { gradient: 'from-purple-500 to-indigo-500', shadow: 'shadow-purple-500/30' },
      blue: { gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/30' },
      green: { gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/30' },
      pink: { gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/30' }
    };

    const config = colorConfig[color] || colorConfig.purple;

    return (
      <div className="card hover:scale-105" data-name="stats-card" data-file="components/StatsCard.js">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-xl ${config.shadow}`}>
            <div className={`icon-${icon} text-2xl text-white`}></div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-secondary)] mb-1">{label}</p>
            <p className="text-3xl font-bold capitalize">{value}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('StatsCard component error:', error);
    return null;
  }
}
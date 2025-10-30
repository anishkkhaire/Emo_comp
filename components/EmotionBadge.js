function EmotionBadge({ emotion }) {
  try {
    const emotionColors = {
      joy: { bg: 'bg-gradient-to-r from-yellow-400 to-orange-400', text: 'text-white', icon: 'smile' },
      sadness: { bg: 'bg-gradient-to-r from-blue-400 to-cyan-400', text: 'text-white', icon: 'cloud-rain' },
      anger: { bg: 'bg-gradient-to-r from-red-400 to-pink-400', text: 'text-white', icon: 'flame' },
      fear: { bg: 'bg-gradient-to-r from-purple-400 to-indigo-400', text: 'text-white', icon: 'alert-triangle' },
      surprise: { bg: 'bg-gradient-to-r from-pink-400 to-rose-400', text: 'text-white', icon: 'sparkles' },
      neutral: { bg: 'bg-gradient-to-r from-gray-400 to-slate-400', text: 'text-white', icon: 'minus' }
    };

    const config = emotionColors[emotion.label.toLowerCase()] || emotionColors.neutral;
    
    return (
      <div className="flex items-center gap-2 mb-2 animate-fade-in" data-name="emotion-badge" data-file="components/EmotionBadge.js">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} shadow-lg`}>
          <div className={`icon-${config.icon} text-base ${config.text}`}></div>
          <span className={`text-sm font-semibold ${config.text} capitalize`}>
            {emotion.label}
          </span>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EmotionBadge component error:', error);
    return null;
  }
}
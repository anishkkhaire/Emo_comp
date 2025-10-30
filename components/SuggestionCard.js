function SuggestionCard({ emotion, onClose }) {
  try {
    const suggestions = {
      sadness: [
        { icon: 'book-open', text: 'Try journaling your thoughts', action: 'journaling' },
        { icon: 'phone', text: 'Call a friend or loved one', action: 'social' },
        { icon: 'sun', text: 'Get some fresh air', action: 'outdoor' }
      ],
      anger: [
        { icon: 'wind', text: 'Take 5 deep breaths', action: 'breathing' },
        { icon: 'footprints', text: 'Go for a short walk', action: 'walk' },
        { icon: 'music', text: 'Listen to calming music', action: 'music' }
      ],
      fear: [
        { icon: 'shield', text: 'Ground yourself: 5 things you see', action: 'grounding' },
        { icon: 'message-circle', text: 'Talk to someone you trust', action: 'talk' },
        { icon: 'coffee', text: 'Have a warm beverage', action: 'comfort' }
      ]
    };

    const emotionSuggestions = suggestions[emotion] || suggestions.sadness;

    return (
      <div className="card mt-4 animate-slide-up" data-name="suggestion-card" data-file="components/SuggestionCard.js">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Try these activities</h3>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <div className="icon-x text-lg"></div>
          </button>
        </div>
        
        <div className="space-y-3">
          {emotionSuggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-[var(--background-color)] rounded-xl hover:shadow-md cursor-pointer transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] bg-opacity-10 flex items-center justify-center shadow-sm">
                <div className={`icon-${suggestion.icon} text-xl text-[var(--primary-color)]`}></div>
              </div>
              <span className="text-sm font-medium">{suggestion.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('SuggestionCard component error:', error);
    return null;
  }
}
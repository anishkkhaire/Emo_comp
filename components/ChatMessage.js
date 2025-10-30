function ChatMessage({ message, onEdit, isEditing, setIsEditing }) {
  try {
    const isUser = message.sender === 'user';
    const [editText, setEditText] = React.useState(message.text);
    
    const handleSaveEdit = () => {
      if (editText.trim() && editText !== message.text) {
        onEdit(message.id, editText.trim());
      } else {
        setIsEditing(false);
      }
    };

    const handleCancelEdit = () => {
      setEditText(message.text);
      setIsEditing(false);
    };
    
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up group`} data-name="chat-message" data-file="components/ChatMessage.js">
        <div className={`max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
          {!isUser && message.emotion && (
            <EmotionBadge emotion={message.emotion} />
          )}
          
          <div className={`message-bubble relative ${
            isUser 
              ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white' 
              : 'bg-white border-2 border-[var(--border-color)] text-[var(--text-primary)]'
          }`}>
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                  rows="3"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-base leading-relaxed whitespace-pre-wrap">{message.text}</p>
                {isUser && onEdit && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="icon-pencil text-sm"></div>
                  </button>
                )}
              </>
            )}
          </div>
          
          <p className="text-xs text-white/50 mt-2 px-3">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ChatMessage component error:', error);
    return null;
  }
}
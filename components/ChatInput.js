function ChatInput({ onSend, currentEmotion }) {
  try {
    const [input, setInput] = React.useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim()) {
        onSend(input);
        setInput('');
      }
    };

    return (
      <div className="border-t-2 border-white/20 bg-transparent px-6 py-4" data-name="chat-input" data-file="components/ChatInput.js">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share how you're feeling..."
            className="flex-1 text-base px-5 py-3.5 bg-white/90 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 shadow-lg"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 px-8"
          >
            <span className="font-semibold">Send</span>
            <div className="icon-send text-xl"></div>
          </button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('ChatInput component error:', error);
    return null;
  }
}
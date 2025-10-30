function TypingIndicator() {
  try {
    return (
      <div className="flex justify-start animate-slide-up" data-name="typing-indicator" data-file="components/TypingIndicator.js">
        <div className="bg-white border-2 border-[var(--border-color)] rounded-3xl px-6 py-4 shadow-lg">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TypingIndicator component error:', error);
    return null;
  }
}
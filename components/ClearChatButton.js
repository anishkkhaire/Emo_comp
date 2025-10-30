function ClearChatButton({ onClear, disabled }) {
  try {
    return (
      <button
        onClick={onClear}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        data-name="clear-chat-button"
        data-file="components/ClearChatButton.js"
      >
        <div className="icon-trash-2 text-lg"></div>
        <span className="text-sm font-medium">Clear Chat</span>
      </button>
    );
  } catch (error) {
    console.error('ClearChatButton component error:', error);
    return null;
  }
}
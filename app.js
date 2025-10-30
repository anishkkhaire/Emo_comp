class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [messages, setMessages] = React.useState([]);
    const [isTyping, setIsTyping] = React.useState(false);
    const [currentEmotion, setCurrentEmotion] = React.useState(null);
    const [editingMessageId, setEditingMessageId] = React.useState(null);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
      scrollToBottom();
    }, [messages]);

    const handleClearChat = () => {
      setMessages([]);
      setCurrentEmotion(null);
    };

    const handleEditMessage = async (messageId, newText) => {
      const messageIndex = messages.findIndex(m => m.id === messageId);
      if (messageIndex === -1) return;

      const updatedMessages = messages.slice(0, messageIndex + 1);
      updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], text: newText };
      setMessages(updatedMessages);
      setEditingMessageId(null);
      setIsTyping(true);

      const emotion = await detectEmotion(newText);
      setCurrentEmotion(emotion);
      await saveEmotionLog(emotion);

      const chatHistory = updatedMessages.slice(0, -1).map(m => ({
        role: m.sender === 'user' ? 'user' : 'ai',
        content: m.text
      }));

      const aiResponse = await getAIResponse(newText, emotion, chatHistory);
      setIsTyping(false);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        emotion: emotion
      };
      
      setMessages([...updatedMessages, aiMessage]);
    };

    const handleSendMessage = async (text) => {
      const userMessage = {
        id: Date.now(),
        text,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);

      const emotion = await detectEmotion(text);
      setCurrentEmotion(emotion);
      
      await saveEmotionLog(emotion);

      const chatHistory = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'ai',
        content: m.text
      }));

      const aiResponse = await getAIResponse(text, emotion, chatHistory);
      
      setIsTyping(false);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        emotion: emotion
      };
      
      setMessages(prev => [...prev, aiMessage]);
    };

    const saveEmotionLog = async (emotion) => {
      try {
        const log = {
          emotion: emotion.label,
          confidence: emotion.score,
          timestamp: new Date().toISOString()
        };
        await trickleCreateObject('emotion_log', log);
      } catch (error) {
        console.error('Failed to save emotion log:', error);
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <LampContainer moodColor={currentEmotion?.label || 'neutral'} />
        </div>
        
        <div className="relative z-10">
          <Header />
        </div>
        
        <div className="flex-1 flex flex-col px-4 py-4 relative z-20">
          <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col min-h-0">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  {currentEmotion && <EmotionBadge emotion={currentEmotion} />}
                </div>
                <ClearChatButton onClear={handleClearChat} disabled={messages.length === 0} />
              </div>
              
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-16 animate-fade-in">
                  <div className="w-24 h-24 rounded-3xl gradient-bg mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-pulse">
                    <div className="icon-heart text-5xl text-white"></div>
                  </div>
                  <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">Welcome to Eunoia</h2>
                  <p className="text-lg text-[var(--text-secondary)] mb-8">Your empathetic AI companion</p>
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="card hover:scale-105 cursor-pointer">
                      <p className="text-sm text-[var(--text-secondary)]">💭 Share your thoughts and feelings</p>
                    </div>
                    <div className="card hover:scale-105 cursor-pointer">
                      <p className="text-sm text-[var(--text-secondary)]">🎯 Track your emotional wellbeing</p>
                    </div>
                    <div className="card hover:scale-105 cursor-pointer">
                      <p className="text-sm text-[var(--text-secondary)]">✨ Get personalized insights</p>
                    </div>
                  </div>
                </div>
              )}
              
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                  onEdit={message.sender === 'user' ? handleEditMessage : null}
                  isEditing={editingMessageId === message.id}
                  setIsEditing={(isEditing) => setEditingMessageId(isEditing ? message.id : null)}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              
                <div ref={messagesEndRef} />
              </div>
              
              <ChatInput onSend={handleSendMessage} currentEmotion={currentEmotion} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
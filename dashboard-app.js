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

function DashboardApp() {
  try {
    const [emotionData, setEmotionData] = React.useState([]);
    const [stats, setStats] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadEmotionData();
    }, []);

    const loadEmotionData = async () => {
      try {
        const result = await trickleListObjects('emotion_log', 100, true);
        setEmotionData(result.items);
        calculateStats(result.items);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load emotion data:', error);
        setLoading(false);
      }
    };

    const calculateStats = (data) => {
      if (data.length === 0) {
        setStats(null);
        return;
      }

      const emotions = data.map(d => d.objectData.emotion);
      const emotionCounts = {};
      emotions.forEach(e => {
        emotionCounts[e] = (emotionCounts[e] || 0) + 1;
      });

      const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => 
        emotionCounts[a] > emotionCounts[b] ? a : b
      );

      const avgConfidence = data.reduce((sum, d) => sum + d.objectData.confidence, 0) / data.length;

      setStats({
        totalCheckins: data.length,
        dominantEmotion,
        avgConfidence: Math.round(avgConfidence * 100),
        streak: calculateStreak(data)
      });
    };

    const calculateStreak = (data) => {
      if (data.length === 0) return 0;
      
      const dates = data.map(d => new Date(d.objectData.timestamp).toDateString());
      const uniqueDates = [...new Set(dates)];
      return uniqueDates.length;
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="icon-loader text-4xl text-[var(--primary-color)] animate-spin mb-4"></div>
            <p className="text-[var(--text-secondary)]">Loading your emotional journey...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col animate-fade-in" data-name="dashboard-app" data-file="dashboard-app.js">
        <Header />
        
        <main className="flex-1 px-6 py-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] bg-clip-text text-transparent">Your Emotional Dashboard</h1>
              <p className="text-[var(--text-secondary)] text-lg">Track your wellbeing journey</p>
            </div>
            
            {!stats ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 rounded-3xl gradient-bg mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/50 opacity-50">
                  <div className="icon-message-circle text-5xl text-white"></div>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-[var(--text-secondary)]">No data yet</h2>
                <p className="text-[var(--text-secondary)] mb-6">Start chatting with Eunoia to see your emotional insights here</p>
                <a href="index.html" className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="icon-message-circle text-xl"></div>
                  <span>Start Chatting</span>
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <StatsCard icon="heart" label="Total Check-ins" value={stats.totalCheckins} color="purple" />
                  <StatsCard icon="smile" label="Dominant Emotion" value={stats.dominantEmotion} color="blue" />
                  <StatsCard icon="trending-up" label="Avg Confidence" value={`${stats.avgConfidence}%`} color="green" />
                  <StatsCard icon="calendar" label="Active Days" value={stats.streak} color="pink" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <MoodChart data={emotionData} />
                  </div>
                  
                  <div>
                    <ReflectionCard emotionData={emotionData} />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <DashboardApp />
  </ErrorBoundary>
);

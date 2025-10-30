function ReflectionCard({ emotionData }) {
  try {
    const [reflection, setReflection] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const generateReflection = async () => {
      if (emotionData.length === 0) {
        return;
      }

      setLoading(true);
      try {
        const recentEmotions = emotionData.slice(0, 10).map(d => d.objectData.emotion);
        const systemPrompt = `You are an empathetic reflection writer. Based on the user's recent emotions, write a brief, encouraging reflection (2-3 sentences).`;
        const userPrompt = `Recent emotions: ${recentEmotions.join(', ')}. Write a supportive reflection.`;
        
        const response = await invokeAIAgent(systemPrompt, userPrompt);
        setReflection(response);
      } catch (error) {
        console.error('Reflection generation error:', error);
        setReflection('Keep tracking your emotions to see personalized insights.');
      }
      setLoading(false);
    };

    React.useEffect(() => {
      generateReflection();
    }, [emotionData]);

    if (emotionData.length === 0) {
      return null;
    }

    return (
      <div className="card" data-name="reflection-card" data-file="components/ReflectionCard.js">
        <div className="flex items-center gap-2 mb-4">
          <div className="icon-sparkles text-xl text-[var(--primary-color)]"></div>
          <h3 className="text-xl font-bold">Daily Reflection</h3>
        </div>
        
        {loading ? (
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <div className="icon-loader text-lg animate-spin"></div>
            <span className="text-sm">Generating reflection...</span>
          </div>
        ) : (
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {reflection}
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error('ReflectionCard component error:', error);
    return null;
  }
}
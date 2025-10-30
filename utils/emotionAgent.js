async function detectEmotion(text) {
  try {
    const systemPrompt = `You are an emotion detection AI. Analyze the user's text and determine their primary emotion.
    
Return ONLY a JSON object in this exact format (no markdown, no code blocks):
{"label": "emotion_name", "score": confidence_value}

Valid emotions: joy, sadness, anger, fear, surprise, neutral
Score should be between 0 and 1.`;

    const userPrompt = `Analyze this text: "${text}"`;
    
    let response = await invokeAIAgent(systemPrompt, userPrompt);
    response = response.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const emotion = JSON.parse(response);
    return {
      label: emotion.label || 'neutral',
      score: emotion.score || 0.7
    };
  } catch (error) {
    console.error('Emotion detection error:', error);
    return { label: 'neutral', score: 0.5 };
  }
}
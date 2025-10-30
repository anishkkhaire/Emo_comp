async function getAIResponse(userMessage, emotion, chatHistory) {
  try {
    const emotionContext = emotion ? `The user is feeling ${emotion.label} (confidence: ${Math.round(emotion.score * 100)}%).` : '';
    
    const systemPrompt = `You are Eunoia, an empathetic AI companion who helps users process emotions calmly and positively.

${emotionContext}

Guidelines:
- Use gentle, warm, and natural language
- Show genuine empathy and understanding
- Ask thoughtful follow-up questions
- Suggest 1 small helpful action when appropriate
- Keep responses concise (2-3 sentences)
- Never be dismissive or judgmental

Chat history:
${JSON.stringify(chatHistory)}`;

    const userPrompt = userMessage;
    
    const response = await invokeAIAgent(systemPrompt, userPrompt);
    return response;
  } catch (error) {
    console.error('Chat agent error:', error);
    return "I'm here to listen. Could you tell me more about what you're experiencing?";
  }
}
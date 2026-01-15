const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const neuronAI = async (message, history = []) => {
  // Check if API key exists
  if (!API_KEY) {
    console.error("❌ GEMINI API KEY MISSING!");
    console.error("Add VITE_GEMINI_API_KEY to your .env file");
    return "⚠️ API key not configured. Please add VITE_GEMINI_API_KEY to .env file";
  }

  console.log("🔑 API Key found:", API_KEY.substring(0, 10) + "...");

  // Build conversation context
  const context = history
    .slice(-6)
    .map((m) => `${m.senderId === "ai" ? "AI" : "User"}: ${m.text}`)
    .join("\n");

  const prompt = `You are NeuronAI, an intelligent assistant inside a chat app called Synapse.
Be concise, helpful, friendly, and professional.

Conversation so far:
${context}

User: ${message}`;

  console.log("📤 Sending to Gemini API...");

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        }),
      }
    );

    console.log("📥 Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ API Error Response:", errorText);
      
      if (res.status === 403) {
        return "⚠️ API key is invalid. Please check your VITE_GEMINI_API_KEY";
      }
      if (res.status === 429) {
        return "⚠️ Too many requests. Please wait a moment and try again.";
      }
      
      return `⚠️ API error (${res.status}). Please try again.`;
    }

    const data = await res.json();
    console.log("✅ API Response received:", data);

    const aiResponse = 
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try again.";

    console.log("🤖 AI Response:", aiResponse);
    return aiResponse;

  } catch (error) {
    console.error("❌ NeuronAI Error:", error);
    return "⚠️ Network error. Please check your connection and try again.";
  }
};

export default neuronAI;

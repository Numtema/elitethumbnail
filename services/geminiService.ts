
import { GoogleGenAI, Type, Modality } from "@google/genai";

export class GeminiService {
  private static getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  static async generateThumbnail(prompt: string): Promise<string> {
    const ai = this.getAI();
    const systemPrompt = `Create a viral YouTube thumbnail visual for: "${prompt}". 
    Style: High contrast, vibrant colors, "MrBeast" style expressions or high-action cinematic scenes, 
    clutter-free composition, professional lighting, 4K quality. NO TEXT in the image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: systemPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (!part?.inlineData) throw new Error("No image generated");
    
    return `data:image/png;base64,${part.inlineData.data}`;
  }

  static async generateVideoTeaser(prompt: string): Promise<string> {
    const ai = this.getAI();
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic YouTube video intro/teaser about: ${prompt}. Dynamic movement, vibrant colors, professional grade.`,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 8000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
    return uri ? `${uri}&key=${process.env.API_KEY}` : "";
  }

  static async getStrategyAdvice(message: string): Promise<string> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "You are 'Elite Channel Strategist', a world-class YouTube growth expert. Help users optimize titles, thumbnails, and viral concepts."
      }
    });
    return response.text || "No response received.";
  }

  static connectStrategyLive(callbacks: {
    onopen: () => void;
    onmessage: (msg: any) => void;
    onerror: (err: any) => void;
    onclose: () => void;
  }) {
    const ai = this.getAI();
    return ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks,
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
        },
        systemInstruction: "You are the Elite Strategy Coach. Speak with energy and insight about YouTube trends and viral growth."
      }
    });
  }
}

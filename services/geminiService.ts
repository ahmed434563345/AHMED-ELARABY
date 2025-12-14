import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Edits a shoe image based on a text prompt using Gemini 2.5 Flash Image.
 * 
 * @param imageBase64 The base64 string of the original image (without data:image/... prefix)
 * @param prompt The user's text instruction (e.g., "Make the shoes neon green")
 * @returns The base64 string of the generated image
 */
export const editShoeImage = async (imageBase64: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG for simplicity, can be dynamic
              data: imageBase64,
            },
          },
          {
            text: `Edit this shoe image based on the following instruction. Maintain the shape and perspective of the shoe strictly. Instruction: ${prompt}`,
          },
        ],
      },
      // Note: responseMimeType is not supported for Nano Banana models
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error("No image data returned from Gemini.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

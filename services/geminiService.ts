
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment
// Note: process.env.API_KEY is updated dynamically when the user selects a key via window.aistudio.openSelectKey()

function fileToGenerativePart(base64: string, mimeType: string) {
  return {
    inlineData: {
      data: base64,
      mimeType,
    },
  };
}

export async function generateStyledImage(
  base64ImageData: string,
  prompt: string
): Promise<string> {
  try {
    if (!process.env.API_KEY) {
        throw new Error("API Key not found. Please connect your account.");
    }

    // Initialize client INSIDE the function to use the latest API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Switch to Nano Banana (Flash Image) model as requested
    const model = 'gemini-2.5-flash-image';
    const imageParts = [];

    const base64Match = base64ImageData.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!base64Match) {
      throw new Error("Invalid base64 image data");
    }

    const mimeType = base64Match[1];
    const base64Data = base64Match[2];
    
    imageParts.push(fileToGenerativePart(base64Data, mimeType));

    const result = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                ...imageParts,
                { text: prompt },
            ],
        },
        // Removed responseModalities constraint for 2.5 flash image compatibility
    });

    const response = result;
    
    // Check if we have candidates
    if (!response.candidates || response.candidates.length === 0) {
        throw new Error("No candidates returned from the API.");
    }

    // Iterate through parts to find the image (Flash Image might return text + image)
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("No image data found in the response. The model may have returned text only.");

  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        // Pass through the specific error message
        throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
}

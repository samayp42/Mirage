
import { Style, Gender } from './types';

// ============================================================================
// 1. CORE INSTRUCTIONS (Direct & High Impact)
// ============================================================================

// We use a "Sandwich" technique: 
// [Identity Instruction] + [Scene Description] + [Technical Photography Specs]

const IDENTITY_INSTRUCTION = `
CRITICAL INSTRUCTION:
1. USE THE FACE FROM THE INPUT IMAGE. This is the specific person you must generate.
2. PRESERVE IDENTITY 100%: Keep their eyes, nose, mouth, glasses (if any), and facial structure exactly as they are.
3. INTEGRATION (MOST IMPORTANT): The input face must NOT look pasted. You MUST re-light the face to match the scene's lighting temperature, color, and shadows.
4. NO FILTERS: Do not smooth the skin. Keep visible pores and texture.
`;

const PHOTOREALISM_SPECS = `
STYLE: Raw High-End Editorial Photography.
CAMERA: Canon R5, 85mm Portrait Lens, f/1.8 aperture.
QUALITY: 8k Resolution, Highly Detailed, Volumetric Lighting, Ray Tracing.
NEGATIVE PROMPT: Cartoon, illustration, painting, drawing, bad photoshop, pasted face, floating head, mismatched lighting, smooth skin, airbrushed, low resolution.
`;

// ============================================================================
// DYNAMIC PROMPT BUILDER
// ============================================================================

export const buildDynamicPrompt = (styleId: string, gender: Gender, basePrompt: string): string => {
  
  // --- ADULT STYLES ---

  if (styleId === 'adult-bollywood') {
    const outfit = gender === 'male' 
      ? "a sharp Black Velvet Bollywood Designer Tuxedo with sequins" 
      : "a glamorous High-Fashion Red Carpet Gown with heavy diamond jewelry";
    
    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
The subject is a famous Bollywood Actor on the Red Carpet at a Paparazzi event with flashing cameras.
They are wearing ${outfit}.
Framing: Medium Shot (Waist Up) - The face must be the clear focus.
Background: A dark night event filled with hundreds of camera flashes (bokeh).

LIGHTING MATCH (CRITICAL):
The lighting is DIRECT FLASH PHOTOGRAPHY (High Contrast).
The subject's face MUST have bright, sharp specular highlights on the forehead and cheeks from the flashes.
The skin tone should look raw and textured (visible pores), matching the cool white temperature of the camera flashes.
Do NOT apply soft beauty filters. It must look like a raw paparazzi photo.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  if (styleId === 'adult-royal') {
    const outfit = gender === 'male' 
      ? "a magnificent Ivory and Gold Sherwani with a royal turban and pearl necklace" 
      : "a luxurious Red Banarasi Silk Lehenga with heavy gold Kundan jewelry";

    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
The subject is Indian Royalty standing in the archway of an ancient Sandstone Palace in Jaipur.
They are wearing ${outfit}.
Framing: Medium Shot (Waist Up).
Background: Intricate stone carvings, blurred slightly (bokeh).

LIGHTING MATCH (CRITICAL):
The time is GOLDEN HOUR (Sunset).
The light hitting the face MUST be WARM GOLD/ORANGE.
Do NOT generate a pale or white face. The skin MUST absorb the warm ambient light of the palace.
Soft, directional sunlight illuminating the side of the face.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  if (styleId === 'adult-vintage') {
    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
A vintage 1920s Silver Screen Portrait.
The subject is wearing ${gender === 'male' ? 'a sharp three-piece suit with a pocket watch' : 'a vintage flapper dress with a feather headband'}.
Framing: Classic Hollywood Close-Up.

LIGHTING MATCH (CRITICAL):
BLACK AND WHITE PHOTOGRAPHY.
High Contrast "Film Noir" lighting.
Add authentic FILM GRAIN to the skin texture.
The face must look like it was photographed on silver nitrate film in 1924. No modern smoothness.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  // --- KID STYLES ---

  if (styleId === 'kid-1') { // School of Magic
     return `
${IDENTITY_INSTRUCTION}

THE SCENE:
The child is a wizard student at a Magical School.
They are wearing Black Wizard Robes with a Gryffindor-style scarf.
They are holding a magic wand emitting golden sparks.
Background: The Great Hall with floating candles and a starry night ceiling.

LIGHTING MATCH (CRITICAL):
The lighting is WARM and FLICKERING (Candlelight).
The child's face MUST be illuminated by the golden glow of the wand and candles.
Reflections of the sparks should be visible in their eyes/glasses.

${PHOTOREALISM_SPECS}
     `.trim();
  }

  if (styleId === 'kid-2') { // Royal Dynasty
     return `
${IDENTITY_INSTRUCTION}

THE SCENE:
The child is a Little Indian Prince/Princess standing in a grand palace courtyard.
They are wearing a miniature Royal Sherwani/Lehenga.
Background: Decorated Elephants and White Horses.
Framing: Medium Shot (Knees Up).

LIGHTING MATCH (CRITICAL):
Bright, sunny, natural daylight (National Geographic style).
Vibrant colors.
The face should have natural sun shadows (no flat lighting).

${PHOTOREALISM_SPECS}
     `.trim();
  }

  if (styleId === 'kid-3') { // Toon
    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
The child is a 3D Animated Character in a Pixar-style movie.
They are wearing an "Adventure Explorer" outfit (like the movie Up).
Background: A colorful jungle or sky.

STYLE OVERRIDE:
Generate a 3D RENDER (Octane Render, Redshift).
Keep the child's EXACT glasses and facial features, but stylized as 3D geometry.
Skin texture should look like "Subsurface Scattering" (slightly waxy/gummy like a high-end toy).
Big expressive eyes.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  // --- COUPLE STYLES ---

  if (styleId === 'couple-1') { // Grand Palace
    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
A Royal Wedding Portrait of a Couple.
Subject A (Male) is wearing a Gold Sherwani. Subject B (Female) is wearing a Red Lehenga.
They are standing close together looking at the camera.
Framing: Medium Shot (Waist Up) - CRITICAL for facial detail.

LIGHTING MATCH (CRITICAL):
Golden Hour Backlighting.
Both faces must have a WARM GLOW.
Ensure the skin tones of both subjects match the warm environment.
No "cut out" look. Shadows from one person should fall naturally.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  if (styleId === 'couple-2') { // Floral
    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
A Romantic Couple portrait in a Rose Garden.
They are wearing formal evening wear (Suit and Gown).
Background: A wall of thousands of pink and white roses.
Framing: Close-Up Portrait (Chest Up).

LIGHTING MATCH (CRITICAL):
Soft, diffuse, overcast daylight (Beauty Light).
Skin tones should be soft, pastel, and rosy.
No harsh shadows.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  if (styleId === 'couple-3') { // Midnight
    return `
${IDENTITY_INSTRUCTION}

THE SCENE:
A Couple at a High-End Rooftop Night Party.
They are wearing Black Tie attire.
Background: Blurred city lights (Bokeh) at night.

LIGHTING MATCH (CRITICAL):
Direct Flash Photography.
The center of the image (faces) is bright. The edges are dark (Vignette).
Skin should look glossy and high-contrast.

${PHOTOREALISM_SPECS}
    `.trim();
  }

  // Default Fallback
  return `
${IDENTITY_INSTRUCTION}
Generate a high-fidelity photo of this person.
${PHOTOREALISM_SPECS}
  `.trim();
};

// ============================================================================
// STYLE DEFINITIONS
// ============================================================================

export const ADULT_STYLES: Style[] = [
  {
    id: 'adult-bollywood',
    name: 'Bollywood Awards',
    description: 'Red Carpet Paparazzi Event',
    prompt: "", 
    previewImageUrl: 'https://media.istockphoto.com/id/2161772958/photo/red-carpet-entrance-with-golden-stanchions-velvet-ropes-and-white-flashlights.jpg?s=612x612&w=0&k=20&c=4aKG-d2MIz8o-7fvifaGvZNlSf6td7qR3FYHIs-jWFk=', 
  },
  {
    id: 'adult-royal',
    name: 'Royal Majesty',
    description: 'Indian Palace & Heritage',
    prompt: "", 
    previewImageUrl: 'https://i.pinimg.com/236x/30/a2/90/30a2900a3868f45124bb56f295211dce.jpg', 
  },
  {
    id: 'adult-vintage',
    name: 'Vintage Gala',
    description: '1920s Great Gatsby Party',
    prompt: "", 
    previewImageUrl: 'https://static.wixstatic.com/media/db977a_d458dfc7f0b14fa3ab034e4d3bc1ef3f~mv2.jpg/v1/fill/w_571,h_987,al_c,q_85,enc_auto/db977a_d458dfc7f0b14fa3ab034e4d3bc1ef3f~mv2.jpg', 
  },
];

export const KID_STYLES: Style[] = [
  {
    id: 'kid-1',
    name: 'School of Magic',
    description: 'Wizard Robes & Spells',
    prompt: "", 
    previewImageUrl: 'https://thumbs.dreamstime.com/b/beautiful-woman-blue-wizard-robes-casts-spells-atop-mountain-under-starlit-sky-standing-peak-her-wand-long-blonde-338107478.jpg', 
  },
  {
    id: 'kid-2',
    name: 'Royal Dynasty',
    description: 'Palace, Elephants & Horses',
    prompt: "",
    previewImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLUyimalHJiSzxWMQN4Eu686BxkFQJEOViw&s', 
  },
  {
    id: 'kid-3',
    name: 'Toon Adventure',
    description: '3D Pixar-Style Explorer',
    prompt: "",
    previewImageUrl: 'https://img.freepik.com/premium-photo/cute-boy-pixar-style-cartoon-3d-illustration-generative-ai_776674-582329.jpg', 
  },
];

export const COUPLE_STYLES: Style[] = [
  {
    id: 'couple-1',
    name: 'Grand Palace Union',
    description: 'Royal Wedding Ceremony',
    prompt: "",
    previewImageUrl: 'https://images.unsplash.com/photo-1583934555026-373ad43728cc?q=80&w=800&auto=format&fit=crop', 
  },
  {
    id: 'couple-2',
    name: 'Floral Symphony',
    description: 'Romantic Rose Garden',
    prompt: "",
    previewImageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', 
  },
  {
    id: 'couple-3',
    name: 'Midnight Reception',
    description: 'City Chic Night Party',
    prompt: "",
    previewImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', 
  },
];

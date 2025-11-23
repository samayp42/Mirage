
import { Style, Gender } from './types';

// ============================================================================
// CORE PROMPT ENGINEERING - THE "SECRET SAUCE"
// ============================================================================

const CORE_REALISM_INSTRUCTION = `
CRITICAL INSTRUCTION: PHOTOMETRIC IDENTITY PRESERVATION & RELIGHTING.
1. FACE FIDELITY (100%): You must strictly preserve the user's facial features, facial structure, expression, and GLASSES (if worn). Do not replace the face.
2. ANTI-SMOOTHING: Do NOT smoothen the skin. Do NOT use "AI glow". The skin MUST show natural texture, pores, and slight imperfections. It should look like a raw camera file, not a digital painting.
3. PHOTOMETRIC INTEGRATION: Do not just "paste" the face. You MUST relight the face to match the scene's specific lighting (color temperature, direction, and intensity). The skin must reflect the ambient colors of the environment.
4. TRANSFORMATION: Change the clothing, background, and hair style completely to match the theme, but keep the face authentic.
5. NEGATIVE PROMPT (STRICT): NO TEXT, NO WATERMARKS, NO SIGNATURES, NO LOGOS, NO TYPOGRAPHY, NO LETTERS. The final image must be purely visual.
`;

// ============================================================================
// ADULT STYLES (Gender Specific)
// ============================================================================

export const ADULT_STYLES: Style[] = [
  {
    id: 'adult-bollywood',
    name: 'Bollywood Awards',
    description: 'Red Carpet Paparazzi Event',
    prompt: "", // Placeholder, handled dynamically
    previewImageUrl: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'adult-royal',
    name: 'Royal Majesty',
    description: 'Indian Palace & Heritage',
    prompt: "", // Placeholder, handled dynamically
    previewImageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'adult-vintage',
    name: 'Vintage Gala',
    description: '1920s Great Gatsby Party',
    prompt: "", // Placeholder, handled dynamically
    previewImageUrl: 'https://images.unsplash.com/photo-1569930784237-ea65a2f40a83?q=80&w=600&auto=format&fit=crop',
  },
];

// ============================================================================
// KID STYLES (Gender Specific Logic via buildDynamicPrompt)
// ============================================================================

export const KID_STYLES: Style[] = [
  {
    id: 'kid-1',
    name: 'The Dark Knight',
    description: 'Gotham City Vigilante',
    prompt: "", 
    previewImageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'kid-2',
    name: 'Royal Dynasty',
    description: 'Palace, Elephants & Horses',
    prompt: "",
    previewImageUrl: 'https://images.unsplash.com/photo-1557409518-691ebcd96038?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'kid-3',
    name: 'Toon Adventure',
    description: '3D Pixar-Style Explorer',
    prompt: "",
    previewImageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
  },
];

// ============================================================================
// COUPLE STYLES
// ============================================================================

export const COUPLE_STYLES: Style[] = [
  {
    id: 'couple-1',
    name: 'Grand Palace Union',
    description: 'Royal Wedding Ceremony',
    prompt: "Cinematic wide shot of this couple standing in a majestic palace courtyard. CRITICAL: Preserve both faces and glasses 100%. Outfits: Matching royal wedding attire (Sherwani and Lehenga). Lighting: Soft, diffuse overcast sky light. Integration: The faces must match the color temperature of the stone architecture (neutral/warm). Composition: Symmetrical, Wes Anderson style architecture but photorealistic. Details: Intricate jewelry glinting. Ultra-realistic wedding photography. NO TEXT.",
    previewImageUrl: 'https://images.unsplash.com/photo-1605218457354-ee22aa129118?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'couple-2',
    name: 'Floral Symphony',
    description: 'Romantic Rose Garden',
    prompt: "Ethereal romantic portrait of this couple amidst an infinite wall of pastel roses. CRITICAL: Keep faces and glasses 100% unchanged. Lighting: Softbox studio lighting creating a gentle halo effect (rim light) around their hair. Integration: The skin should have a soft pastel pink color cast from the flowers. Soft focus background, sharp focus on eyes. Atmosphere: Dreamy, high-key photography, Vogue Wedding style. NO TEXT.",
    previewImageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'couple-3',
    name: 'Midnight Reception',
    description: 'City Chic Night Party',
    prompt: "Paparazzi style flash photography of this couple at a night reception. CRITICAL: Keep faces and glasses 100%. Lighting: Direct on-camera flash. Integration: Hard shadows behind the subjects, high contrast on the faces, slightly overexposed highlights on the forehead/cheeks (flash look). Background: Dark luxury banquet hall with city bokeh. Vibe: Candid, energetic, high society. Texture: ISO 800 film grain, raw night look. NO TEXT.",
    previewImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
  },
];

// ============================================================================
// PROMPT DICTIONARY (Combined)
// ============================================================================

const GENDER_SPECIFIC_PROMPTS = {
  // ADULTS
  'adult-bollywood': {
    male: `
      SUBJECT: Male A-List Superstar at the Filmfare Awards Red Carpet.
      EXPRESSION: Confident, charismatic "Superstar" smile. Looking at the cameras.
      OUTFIT: A modern, high-fashion Black Velvet Indo-Western Tuxedo with subtle sequins and a bowtie.
      SCENE: The Red Carpet event with blurred photographers and camera flashes in the background (Bokeh).
      LIGHTING: "Paparazzi Flash" lighting. High contrast, sharp details, cool-toned rim light from the flashes, but the face is perfectly illuminated.
      TEXTURE: 8k Vanity Fair Portrait style. Sharp, glossy, highly detailed skin texture.
      VIBE: Fame, luxury, celebrity status, cinematic, award-winning night. NO TEXT.
    `,
    female: `
      SUBJECT: Female Bollywood Icon at the Cannes/Filmfare Red Carpet.
      EXPRESSION: Radiant, confident smile. Posing for the photographers.
      OUTFIT: A spectacular, floor-length Designer Gown or Modern Saree (Manish Malhotra style) with diamonds.
      SCENE: The Red Carpet with velvet ropes and a sea of blurred camera flashes in the background.
      LIGHTING: "Star Quality" lighting. Soft, flattering front light with sparkling highlights in the eyes and jewelry.
      TEXTURE: Vogue Magazine cover quality. Ultra-realistic skin texture, not plastic.
      VIBE: Glamorous, high-fashion, wealthy, iconic, center of attention. NO TEXT.
    `
  },
  'adult-royal': {
    male: `
      SUBJECT: Indian Maharaja (Royal Prince) portrait.
      EXPRESSION: A regal, proud, but welcoming and celebratory smile.
      OUTFIT: A magnificent Ivory and Gold Sherwani with intricate embroidery. Wearing a royal turban (Pagdi) and pearls.
      SCENE: A grand Udaipur palace courtyard (heritage architecture) with marigold decorations in the blurred background.
      LIGHTING: Golden Hour Sunlight. The face is illuminated by warm, soft sunlight from the side, creating a rich glow. No dark shadows on the face.
      TEXTURE: Ultra-realistic National Geographic style portrait. Rugged, authentic skin texture. No digital smoothing.
      VIBE: Aristocratic, heritage, wealthy, celebratory, majestic. NO TEXT.
    `,
    female: `
      SUBJECT: Indian Maharani (Royal Princess) portrait.
      EXPRESSION: Graceful, elegant, and smiling gently with joy.
      OUTFIT: A luxurious Red or Royal Blue Banarasi Silk Lehenga with heavy gold Zari work. Wearing traditional Kundan jewelry (Maang Tikka, heavy necklace).
      SCENE: A palace balcony overlooking a lake during a festival. Flowers and decorations in the background.
      LIGHTING: Soft natural daylight hitting the face perfectly. A warm, ambient glow surrounds the subject.
      TEXTURE: Detailed portrait photography. Natural complexion with visible texture. Avoid the "wax figure" look.
      VIBE: Graceful, traditional, regal, ethereal beauty, festive. NO TEXT.
    `
  },
  'adult-vintage': {
    male: `
      SUBJECT: 1920s Vintage Gentleman (Great Gatsby style) at a high-society party.
      EXPRESSION: A charming, gentlemanly smile.
      EYE CONTACT: LOOKING DIRECTLY AT THE CAMERA (The Lens).
      POSE: Standing with confidence. HANDS EMPTY (No items).
      OUTFIT: A sharp, bespoke tuxedo or 3-piece charcoal suit with a bow tie. Slicked-back classic hair.
      SCENE: An opulent Art Deco ballroom with gold geometric patterns and warm ambient lights.
      LIGHTING: Warm, glowing interior lighting. Soft illumination on the face.
      TEXTURE: Analog film photography (Kodak Portra). Slight grain. Natural skin texture is mandatory. No digital gloss.
      VIBE: Classy, dapper, old-money aesthetic, celebratory, golden era. NO TEXT.
    `,
    female: `
      SUBJECT: 1920s Vintage Glamour Icon at a soirée.
      EXPRESSION: A delightful, beaming smile. Full of life and joy.
      EYE CONTACT: LOOKING DIRECTLY AT THE CAMERA (The Lens).
      POSE: Standing elegantly, perhaps one hand on hip or gesturing welcomingly. HANDS EMPTY.
      OUTFIT: An embellished beaded evening gown (Art Deco pattern), pearl strands, and a sparkling headband.
      SCENE: A lavish roaring 20s party with golden streamers and balloons in the background.
      LIGHTING: Soft glamour glow (Vaseline lens effect style but sharp on eyes). Warm gold tones.
      TEXTURE: Vintage film texture. The face should look candid and natural, not computer generated.
      VIBE: Jazz age, opulent, party, nostalgic, high society, fun. NO TEXT.
    `
  },
  // KIDS - Modified for Batman & Royal Themes
  'kid-1': {
    male: `
      SUBJECT: Little Boy as THE DARK KNIGHT (BATMAN).
      CRITICAL: OUTFIT MUST BE A BLACK BATMAN SUIT. NO BLUE, NO RED, NO S LOGO.
      OUTFIT: Full black tactical armored Batsuit with a black cape and the Batman symbol on chest.
      HEADGEAR: Wearing the Batman Cowl (Mask) that covers the ears/forehead but LEAVES THE FACE (Eyes, Glasses, Nose, Mouth) VISIBLE.
      FACE FIDELITY: 100% IDENTITY MATCH. The visible face must look exactly like the input child.
      SCENE: Gotham City rooftop at night with rain and gargoyles.
      LIGHTING: Dramatic, moody, cinematic noir lighting.
      STYLE: Christopher Nolan movie poster, 8k, raw texture, ultra-realistic. NO TEXT.
    `,
    female: `
      SUBJECT: Little Girl as BATGIRL (The Dark Knight style).
      CRITICAL: OUTFIT MUST BE BLACK. NO SUPERMAN COLORS.
      OUTFIT: Black tactical armored Bat-suit with a black cape and yellow bat symbol.
      HEADGEAR: Wearing a Bat-mask/Cowl that frames the face but keeps the identity 100% visible.
      FACE FIDELITY: 100% IDENTITY MATCH. The face (Eyes, Glasses, Nose, Mouth) must be exactly the input child.
      SCENE: Gotham City rooftop at night with city bokeh.
      LIGHTING: Dramatic, moody, cinematic noir lighting.
      STYLE: Gritty, realistic, raw 8k photography. NO TEXT.
    `
  },
  'kid-2': {
    male: `
      SUBJECT: Wide Angle Full Body Shot of a Little Boy as a Royal Indian Prince.
      CRITICAL: EYES MUST BE WIDE OPEN. LOOKING DIRECTLY AT THE CAMERA.
      FACE: 100% Fidelity. Keep the exact facial features and GLASSES if worn.
      OUTFIT: A magnificent golden Sherwani with a small royal turban and sword.
      SCENE: Grand Palace Courtyard with a decorated ELEPHANT and WHITE HORSES in the background.
      LIGHTING: Bright, sunny daylight. High dynamic range.
      EXPRESSION: Happy, regal, confident.
      STYLE: National Geographic Hyper-Realistic Photography. 8k Resolution. NO TEXT.
    `,
    female: `
      SUBJECT: Wide Angle Full Body Shot of a Little Girl as a Royal Indian Princess.
      CRITICAL: EYES MUST BE WIDE OPEN. LOOKING DIRECTLY AT THE CAMERA.
      FACE: 100% Fidelity. Keep the exact facial features and GLASSES if worn.
      OUTFIT: A beautiful pink/red Silk Lehenga with jewelry.
      SCENE: Grand Palace Courtyard with PEACOCKS and a decorated ELEPHANT in the background.
      LIGHTING: Bright, sunny daylight. High dynamic range.
      EXPRESSION: Happy, regal, confident.
      STYLE: National Geographic Hyper-Realistic Photography. 8k Resolution. NO TEXT.
    `
  },
  'kid-3': {
    male: `
      SUBJECT: 3D Pixar-style Character Render of this boy.
      FIDELITY: DIGITAL TWIN. The 3D character must look EXACTLY like the photo provided. Same glasses, same face shape, same eye color.
      INSTRUCTION: Do not generate a generic character. "Mesh" the input face onto the 3D model.
      OUTFIT: Fun adventure explorer outfit.
      SCENE: A bright, colorful animated forest.
      LIGHTING: Soft, studio 3D lighting (Octane render).
      STYLE: High-end 3D animation. NO TEXT.
    `,
    female: `
      SUBJECT: 3D Pixar-style Character Render of this girl.
      FIDELITY: DIGITAL TWIN. The 3D character must look EXACTLY like the photo provided. Same glasses, same face shape, same eye color.
      INSTRUCTION: Do not generate a generic character. "Mesh" the input face onto the 3D model.
      OUTFIT: Fun adventure explorer outfit.
      SCENE: A bright, colorful animated forest.
      LIGHTING: Soft, studio 3D lighting (Octane render).
      STYLE: High-end 3D animation. NO TEXT.
    `
  }
};

// ============================================================================
// PROMPT BUILDER
// ============================================================================

export function buildDynamicPrompt(styleId: string, gender: Gender, basePrompt: string): string {
  // 1. Check if we have a specialized prompt for this style ID and gender
  const specificPrompts = GENDER_SPECIFIC_PROMPTS as any;
  if (specificPrompts[styleId] && specificPrompts[styleId][gender]) {
    const specificInstruction = specificPrompts[styleId][gender];
    return `${CORE_REALISM_INSTRUCTION}\n\n${specificInstruction}`;
  }

  // 2. Fallback for Couple styles (which generally use the 'prompt' field)
  return `${CORE_REALISM_INSTRUCTION}\n\nINSTRUCTION: ${basePrompt}`;
}

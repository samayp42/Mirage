
export type AppState = 'welcome' | 'style_select' | 'capture' | 'generating' | 'result' | 'download' | 'api_key_selection' | 'gallery';

export type Category = 'adult' | 'child' | 'couple';

export type Gender = 'female' | 'male';

export interface Style {
  id: string;
  name: string;
  description: string;
  prompt: string; // Base prompt or fallback
  previewImageUrl: string;
}

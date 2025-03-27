// stores/recipeStreamStore.ts
import { create } from 'zustand';
import { RecipeResponse } from '@/types/ai';

interface RecipeStreamState {
  streamingText: string;
  finalRecipe: RecipeResponse | null;
  error: Error | null;
  isStreaming: boolean;

  addChunk: (chunk: string) => void;
  setFinalRecipe: (recipe: RecipeResponse) => void;
  setError: (error: Error | null) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  reset: () => void;
}

export const useRecipeStreamStore = create<RecipeStreamState>((set) => ({
  streamingText: '',
  finalRecipe: null,
  error: null,
  isStreaming: false,

  addChunk: (chunk) =>
    set((state) => ({
      streamingText: state.streamingText + chunk,
    })),

  setFinalRecipe: (recipe) => set({ finalRecipe: recipe }),

  setError: (error) => set({ error }),

  setIsStreaming: (isStreaming) => set({ isStreaming }),

  reset: () =>
    set({
      streamingText: '',
      finalRecipe: null,
      error: null,
      isStreaming: false,
    }),
}));

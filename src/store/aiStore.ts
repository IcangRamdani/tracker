import { create } from 'zustand';

export interface AIAnalysis {
  projectName: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewardPotential: string;
  scamRisk: 'low' | 'medium' | 'high';
  recommendedActions: string[];
}

export interface AIScore {
  projectName: string;
  score: number;
  recommendation: 'skip' | 'medium' | 'worth-it';
  reasoning: string;
}

interface AIState {
  analyses: AIAnalysis[];
  scores: AIScore[];
  loading: boolean;
  addAnalysis: (analysis: AIAnalysis) => void;
  addScore: (score: AIScore) => void;
  setLoading: (loading: boolean) => void;
  clearAnalyses: () => void;
}

export const useAIStore = create<AIState>((set) => ({
  analyses: [],
  scores: [],
  loading: false,
  addAnalysis: (analysis) => set((state) => ({ analyses: [...state.analyses, analysis] })),
  addScore: (score) => set((state) => ({ scores: [...state.scores, score] })),
  setLoading: (loading) => set({ loading }),
  clearAnalyses: () => set({ analyses: [], scores: [] }),
}));

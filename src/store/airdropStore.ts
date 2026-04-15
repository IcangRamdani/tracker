import { create } from 'zustand';

export interface Airdrop {
  id: string;
  userId: string;
  name: string;
  category: 'testnet' | 'retroactive' | 'social' | 'nft';
  status: 'not-started' | 'ongoing' | 'completed' | 'claimable' | 'expired';
  priority: 'high' | 'medium' | 'low';
  rewardEstimate: string;
  deadline: Date;
  sourceLink: string;
  tags: string[];
  notes: string;
  createdAt: Date;
  walletAddress?: string;
}

interface AirdropState {
  airdrops: Airdrop[];
  setAirdrops: (airdrops: Airdrop[]) => void;
  addAirdrop: (airdrop: Airdrop) => void;
  updateAirdrop: (id: string, airdrop: Partial<Airdrop>) => void;
  deleteAirdrop: (id: string) => void;
  getAirdropById: (id: string) => Airdrop | undefined;
}

export const useAirdropStore = create<AirdropState>((set, get) => ({
  airdrops: [],
  setAirdrops: (airdrops) => set({ airdrops }),
  addAirdrop: (airdrop) => set((state) => ({ airdrops: [...state.airdrops, airdrop] })),
  updateAirdrop: (id, airdrop) =>
    set((state) => ({
      airdrops: state.airdrops.map((a) => (a.id === id ? { ...a, ...airdrop } : a)),
    })),
  deleteAirdrop: (id) =>
    set((state) => ({
      airdrops: state.airdrops.filter((a) => a.id !== id),
    })),
  getAirdropById: (id) => get().airdrops.find((a) => a.id === id),
}));

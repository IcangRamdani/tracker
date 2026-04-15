import { create } from 'zustand';

export interface Claim {
  id: string;
  airdropId: string;
  status: 'not-eligible' | 'eligible' | 'claimed';
  token?: string;
  amount?: string;
  valueUSD?: number;
  claimDate?: Date;
  createdAt: Date;
}

interface ClaimState {
  claims: Claim[];
  setClaims: (claims: Claim[]) => void;
  addClaim: (claim: Claim) => void;
  updateClaim: (id: string, claim: Partial<Claim>) => void;
  deleteClaim: (id: string) => void;
  getClaimsByAirdrop: (airdropId: string) => Claim | undefined;
  getTotalProfit: () => number;
}

export const useClaimStore = create<ClaimState>((set, get) => ({
  claims: [],
  setClaims: (claims) => set({ claims }),
  addClaim: (claim) => set((state) => ({ claims: [...state.claims, claim] })),
  updateClaim: (id, claim) =>
    set((state) => ({
      claims: state.claims.map((c) => (c.id === id ? { ...c, ...claim } : c)),
    })),
  deleteClaim: (id) =>
    set((state) => ({
      claims: state.claims.filter((c) => c.id !== id),
    })),
  getClaimsByAirdrop: (airdropId) => get().claims.find((c) => c.airdropId === airdropId),
  getTotalProfit: () => {
    const totalUSD = get().claims.reduce((sum, claim) => sum + (claim.valueUSD || 0), 0);
    return totalUSD;
  },
}));

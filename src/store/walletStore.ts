import { create } from 'zustand';

export interface Wallet {
  id: string;
  userId: string;
  address: string;
  network: 'ethereum' | 'polygon' | 'arbitrum' | 'optimism' | 'solana' | 'base' | 'other';
  label: string;
  createdAt: Date;
}

interface WalletState {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: Wallet) => void;
  updateWallet: (id: string, wallet: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  getWalletsByUser: (userId: string) => Wallet[];
}

export const useWalletStore = create<WalletState>((set, get) => ({
  wallets: [],
  setWallets: (wallets) => set({ wallets }),
  addWallet: (wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
  updateWallet: (id, wallet) =>
    set((state) => ({
      wallets: state.wallets.map((w) => (w.id === id ? { ...w, ...wallet } : w)),
    })),
  deleteWallet: (id) =>
    set((state) => ({
      wallets: state.wallets.filter((w) => w.id !== id),
    })),
  getWalletsByUser: (userId) => get().wallets.filter((w) => w.userId === userId),
}));

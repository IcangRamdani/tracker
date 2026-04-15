import { create } from 'zustand';

export interface ActivityLog {
  id: string;
  userId: string;
  airdropId: string;
  action: 'swap' | 'bridge' | 'stake' | 'mint' | 'quest' | 'claim';
  description: string;
  createdAt: Date;
}

interface ActivityLogState {
  logs: ActivityLog[];
  setLogs: (logs: ActivityLog[]) => void;
  addLog: (log: ActivityLog) => void;
  getLogsByUser: (userId: string) => ActivityLog[];
  getRecentLogs: (userId: string, limit?: number) => ActivityLog[];
}

export const useActivityLogStore = create<ActivityLogState>((set, get) => ({
  logs: [],
  setLogs: (logs) => set({ logs }),
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  getLogsByUser: (userId) => get().logs.filter((l) => l.userId === userId),
  getRecentLogs: (userId, limit = 10) =>
    get()
      .logs.filter((l) => l.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit),
}));

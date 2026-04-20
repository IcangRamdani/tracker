'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DailyQuest {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  completedAt?: Date;
}

interface QuestState {
  dailyLoginStreak: number;
  lastLoginDate: string | null;
  dailyQuests: DailyQuest[];
  totalPoints: number;
  
  // Actions
  checkDailyLogin: () => void;
  completeQuest: (questId: string) => void;
  resetDailyQuests: () => void;
  addPoints: (points: number) => void;
}

const defaultDailyQuests: DailyQuest[] = [
  {
    id: 'login',
    title: 'Login Harian',
    description: 'Masuk ke aplikasi setiap hari',
    reward: 10,
    completed: false,
  },
  {
    id: 'check-airdrops',
    title: 'Periksa Airdrop',
    description: 'Lihat daftar airdrop yang tersedia',
    reward: 5,
    completed: false,
  },
  {
    id: 'add-wallet',
    title: 'Tambah Wallet',
    description: 'Tambahkan alamat wallet baru',
    reward: 15,
    completed: false,
  },
  {
    id: 'log-activity',
    title: 'Catat Aktivitas',
    description: 'Catat aktivitas farming hari ini',
    reward: 10,
    completed: false,
  },
  {
    id: 'check-analytics',
    title: 'Cek Analytics',
    description: 'Lihat performa farming kamu',
    reward: 5,
    completed: false,
  },
];

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      dailyLoginStreak: 0,
      lastLoginDate: null,
      dailyQuests: [...defaultDailyQuests],
      totalPoints: 0,

      checkDailyLogin: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastLoginDate, dailyLoginStreak } = get();
        
        if (lastLoginDate !== today) {
          // Check if it's consecutive day
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newStreak = 1;
          if (lastLoginDate === yesterdayStr) {
            newStreak = dailyLoginStreak + 1;
          }
          
          set({
            lastLoginDate: today,
            dailyLoginStreak: newStreak,
            dailyQuests: [...defaultDailyQuests],
          });
        }
      },

      completeQuest: (questId: string) => {
        const { dailyQuests, totalPoints } = get();
        const quest = dailyQuests.find(q => q.id === questId);
        
        if (quest && !quest.completed) {
          const updatedQuests = dailyQuests.map(q =>
            q.id === questId
              ? { ...q, completed: true, completedAt: new Date() }
              : q
          );
          
          set({
            dailyQuests: updatedQuests,
            totalPoints: totalPoints + quest.reward,
          });
        }
      },

      resetDailyQuests: () => {
        set({
          dailyQuests: [...defaultDailyQuests],
        });
      },

      addPoints: (points: number) => {
        const { totalPoints } = get();
        set({ totalPoints: totalPoints + points });
      },
    }),
    {
      name: 'quest-storage',
    }
  )
);
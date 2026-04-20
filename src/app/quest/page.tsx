'use client';

import React from 'react';
import QuestDaily from '@/components/QuestDaily';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Flame, 
  Trophy, 
  Star, 
  Zap,
  Target,
  Calendar,
  Award
} from 'lucide-react';
import { useQuestStore } from '@/store/questStore';

export default function QuestPage() {
  const { dailyLoginStreak, totalPoints, lastLoginDate } = useQuestStore();

  const getStreakLevel = () => {
    if (dailyLoginStreak >= 30) return { level: 'Legend', color: 'text-yellow-400', icon: Award };
    if (dailyLoginStreak >= 14) return { level: 'Expert', color: 'text-purple-400', icon: Star };
    if (dailyLoginStreak >= 7) return { level: 'Pro', color: 'text-blue-400', icon: Trophy };
    if (dailyLoginStreak >= 3) return { level: 'Active', color: 'text-green-400', icon: Target };
    return { level: 'Beginner', color: 'text-slate-400', icon: Flame };
  };

  const streakLevel = getStreakLevel();
  const LevelIcon = streakLevel.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white">
          Quest Harian
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Selesaikan quest harian untuk mendapatkan points dan meningkatkan streak!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Streak Hari Ini</p>
                <p className="text-2xl font-bold text-white">{dailyLoginStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-white">{totalPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <LevelIcon className={`w-6 h-6 ${streakLevel.color}`} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Level Streak</p>
                <p className={`text-2xl font-bold ${streakLevel.color}`}>{streakLevel.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Login Terakhir</p>
                <p className="text-lg font-bold text-white">
                  {lastLoginDate ? new Date(lastLoginDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short'
                  }) : '-'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streak Bonus Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Bonus Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { days: '3+ hari', bonus: '+10', color: 'bg-green-500/20' },
              { days: '7+ hari', bonus: '+20', color: 'bg-blue-500/20' },
              { days: '14+ hari', bonus: '+30', color: 'bg-purple-500/20' },
              { days: '30+ hari', bonus: '+50', color: 'bg-yellow-500/20' },
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-lg ${item.color} text-center`}>
                <p className="text-slate-400 text-xs">{item.days}</p>
                <p className="text-white font-bold">{item.bonus}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quest Daily Component */}
      <QuestDaily />
    </div>
  );
}
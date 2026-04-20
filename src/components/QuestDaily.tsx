'use client';

import React, { useEffect } from 'react';
import { useQuestStore } from '@/store/questStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Circle, 
  Gift, 
  Star,
  Zap
} from 'lucide-react';

interface QuestDailyProps {
  onQuestComplete?: (questId: string) => void;
}

export default function QuestDaily({ onQuestComplete }: QuestDailyProps) {
  const { 
    dailyLoginStreak, 
    lastLoginDate, 
    dailyQuests, 
    totalPoints,
    checkDailyLogin,
    completeQuest 
  } = useQuestStore();

  useEffect(() => {
    checkDailyLogin();
  }, []);

  const completedCount = dailyQuests.filter(q => q.completed).length;
  const totalQuests = dailyQuests.length;
  const progressPercentage = (completedCount / totalQuests) * 100;

  const handleQuestClick = (questId: string) => {
    if (!dailyQuests.find(q => q.id === questId)?.completed) {
      completeQuest(questId);
      onQuestComplete?.(questId);
    }
  };

  const getStreakBonus = () => {
    if (dailyLoginStreak >= 30) return 50;
    if (dailyLoginStreak >= 14) return 30;
    if (dailyLoginStreak >= 7) return 20;
    if (dailyLoginStreak >= 3) return 10;
    return 0;
  };

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        {/* Streak Card */}
        <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-xs font-medium">Streak</p>
                <p className="text-2xl font-bold text-white">{dailyLoginStreak}</p>
                <p className="text-orange-400/70 text-xs">hari</p>
              </div>
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* Points Card */}
        <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-xs font-medium">Points</p>
                <p className="text-2xl font-bold text-white">{totalPoints}</p>
                <p className="text-yellow-400/70 text-xs">total</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-xs font-medium">Progress</p>
                <p className="text-2xl font-bold text-white">{completedCount}/{totalQuests}</p>
                <p className="text-blue-400/70 text-xs">quest</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Daily Quest Progress</span>
            <span className="text-cyan-400 font-bold">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {getStreakBonus() > 0 && (
            <div className="mt-2 flex items-center gap-2 text-xs text-orange-400">
              <Zap className="w-3 h-3" />
              <span>Bonus streak: +{getStreakBonus()} points!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quest List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            Daily Quests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {dailyQuests.map((quest) => (
            <div
              key={quest.id}
              onClick={() => handleQuestClick(quest.id)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                quest.completed
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
                <div>
                  <p className={`font-medium ${quest.completed ? 'text-green-400' : 'text-white'}`}>
                    {quest.title}
                  </p>
                  <p className="text-slate-400 text-xs">{quest.description}</p>
                </div>
              </div>
              <Badge className={quest.completed 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-purple-500/20 text-purple-400'
              }>
                +{quest.reward} pts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Streak Info */}
      {dailyLoginStreak > 0 && (
        <div className="text-center text-slate-400 text-sm">
          <p>🔥 {dailyLoginStreak} hari streak! Terus lanjutkan!</p>
        </div>
      )}
    </div>
  );
}
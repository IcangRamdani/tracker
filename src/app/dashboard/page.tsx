'use client';

import React, { useState, useEffect } from 'react';
import { useAirdropStore, type Airdrop } from '@/store/airdropStore';
import { useTaskStore } from '@/store/taskStore';
import { useClaimStore } from '@/store/claimStore';
import { useActivityLogStore } from '@/store/activityLogStore';
import { useAuthStore } from '@/store/authStore';
import { useQuestStore } from '@/store/questStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import QuestDaily from '@/components/QuestDaily';
import { TrendingUp, Target, CheckCircle, AlertCircle, Zap, DollarSign, Flame, Gift, Activity } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { airdrops } = useAirdropStore();
  const { tasks } = useTaskStore();
  const { claims } = useClaimStore();
  const { logs } = useActivityLogStore();
  const { user } = useAuthStore();
  const { dailyLoginStreak, totalPoints, dailyQuests } = useQuestStore();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    ongoing: 0,
    claimable: 0,
    expired: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    if (airdrops.length > 0) {
      const completed = airdrops.filter((a) => a.status === 'completed').length;
      const ongoing = airdrops.filter((a) => a.status === 'ongoing').length;
      const claimable = airdrops.filter((a) => a.status === 'claimable').length;
      const expired = airdrops.filter((a) => a.status === 'expired').length;
      const totalProfit = claims.reduce((sum, claim) => sum + (claim.valueUSD || 0), 0);

      setStats({
        total: airdrops.length,
        completed,
        ongoing,
        claimable,
        expired,
        totalProfit,
      });
    }
  }, [airdrops, claims]);

  const recentLogs = logs.slice(0, 5).reverse();
  const completedQuests = dailyQuests.filter(q => q.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white">
            Beranda
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Selamat datang kembali!</p>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-slate-400">Streak</p>
              <p className="text-lg font-bold text-orange-400">{dailyLoginStreak} hari</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
            <Gift className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-xs text-slate-400">Points</p>
              <p className="text-lg font-bold text-yellow-400">{totalPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quest Progress Mini */}
      <Card className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Quest Harian</span>
              <Badge className="bg-purple-500/20 text-purple-400">{completedQuests}/{dailyQuests.length}</Badge>
            </div>
            <Link href="/quest" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Lihat semua →
            </Link>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500"
              style={{ width: `${(completedQuests / dailyQuests.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            icon: Target,
            label: 'Total Airdrop',
            value: stats.total,
            color: 'blue',
          },
          {
            icon: CheckCircle,
            label: 'Selesai',
            value: stats.completed,
            color: 'green',
          },
          {
            icon: Zap,
            label: 'Berlangsung',
            value: stats.ongoing,
            color: 'yellow',
          },
          {
            icon: AlertCircle,
            label: 'Bisa Klaim',
            value: stats.claimable,
            color: 'purple',
          },
          {
            icon: AlertCircle,
            label: 'Kedaluwarsa',
            value: stats.expired,
            color: 'red',
          },
          {
            icon: DollarSign,
            label: 'Profit',
            value: `$${stats.totalProfit.toFixed(0)}`,
            color: 'cyan',
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          const colorClasses = {
            blue: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/20',
            green: 'from-green-500/20 to-green-600/10 text-green-400 border-green-500/20',
            yellow: 'from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/20',
            purple: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20',
            red: 'from-red-500/20 to-red-600/10 text-red-400 border-red-500/20',
            cyan: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/20',
          };

          return (
            <Card key={idx} className={`hover:scale-105 transition-all duration-300 hover:shadow-lg bg-slate-800/50 backdrop-blur-sm border-slate-700/50`}>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[card.color as keyof typeof colorClasses].split(' ').slice(0, 2).join(' ')} mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </div>
            <CardDescription>Aksi terbaru dari akun kamu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors border border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                      <div>
                        <p className="text-white capitalize font-medium">{log.action}</p>
                        <p className="text-slate-400 text-sm">{log.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                      {new Date(log.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Belum ada aktivitas</p>
                  <p className="text-slate-500 text-sm">Mulai dengan menambahkan airdrop!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <CardTitle>Ringkasan</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-700/30">
                <span className="text-slate-400">Tingkat Penyelesaian</span>
                <span className="font-bold text-green-400">
                  {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-700/30">
                <span className="text-slate-400">Rata-rata Reward</span>
                <span className="font-bold text-white">
                  {stats.total > 0 ? `$${(stats.totalProfit / stats.total).toFixed(2)}` : '$0'}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-700/30">
                <span className="text-slate-400">Task Selesai</span>
                <span className="font-bold text-white">
                  {tasks.filter((t) => t.completed).length}/{tasks.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-slate-700/30">
                <span className="text-slate-400">Quest Harian</span>
                <span className="font-bold text-purple-400">
                  {completedQuests}/{dailyQuests.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

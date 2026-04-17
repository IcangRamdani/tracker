'use client';

import React, { useState, useEffect } from 'react';
import { useAirdropStore, type Airdrop } from '@/store/airdropStore';
import { useTaskStore } from '@/store/taskStore';
import { useClaimStore } from '@/store/claimStore';
import { useActivityLogStore } from '@/store/activityLogStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, CheckCircle, AlertCircle, Zap, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const { airdrops } = useAirdropStore();
  const { tasks } = useTaskStore();
  const { claims } = useClaimStore();
  const { logs } = useActivityLogStore();
  const { user } = useAuthStore();
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white animate-pulse">Dashboard</h1>
        <p className="text-slate-400 mt-2 text-lg">Welcome back, {user?.email}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: Target,
            label: 'Total Airdrops',
            value: stats.total,
            color: 'blue',
          },
          {
            icon: CheckCircle,
            label: 'Completed',
            value: stats.completed,
            color: 'green',
          },
          {
            icon: Zap,
            label: 'Ongoing',
            value: stats.ongoing,
            color: 'yellow',
          },
          {
            icon: AlertCircle,
            label: 'Claimable',
            value: stats.claimable,
            color: 'purple',
          },
          {
            icon: AlertCircle,
            label: 'Expired',
            value: stats.expired,
            color: 'red',
          },
          {
            icon: DollarSign,
            label: 'Total Profit',
            value: `$${stats.totalProfit.toFixed(2)}`,
            color: 'cyan',
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          const colorClasses = {
            blue: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/20',
            green: 'bg-gradient-to-br from-green-500/20 to-green-600/10 text-green-400 border-green-500/20',
            yellow: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 text-yellow-400 border-yellow-500/20',
            purple: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20',
            red: 'bg-gradient-to-br from-red-500/20 to-red-600/10 text-red-400 border-red-500/20',
            cyan: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/20',
          };

          return (
            <Card key={idx} className={`hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-${card.color}-500/10 border ${colorClasses[card.color as keyof typeof colorClasses]} bg-slate-800/50 backdrop-blur-sm`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{card.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions from your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                    <div>
                      <p className="text-white capitalize font-medium">{log.action}</p>
                      <p className="text-slate-400 text-sm">{log.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-center py-8">No activity yet. Start by adding an airdrop!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Completion Rate</span>
                <span className="font-bold text-white">
                  {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(0) : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Avg Reward</span>
                <span className="font-bold text-white">
                  {stats.total > 0 ? `$${(stats.totalProfit / stats.total).toFixed(2)}` : '$0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Tasks Completed</span>
                <span className="font-bold text-white">
                  {tasks.filter((t) => t.completed).length}/{tasks.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

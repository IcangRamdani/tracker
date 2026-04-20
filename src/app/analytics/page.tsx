'use client';

import React, { useMemo } from 'react';
import { useAirdropStore } from '@/store/airdropStore';
import { useClaimStore } from '@/store/claimStore';
import { useWalletStore } from '@/store/walletStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Wallet as WalletIcon, Target } from 'lucide-react';

export default function AnalyticsPage() {
  const { airdrops } = useAirdropStore();
  const { claims } = useClaimStore();
  const { wallets } = useWalletStore();

  const analytics = useMemo(() => {
    const totalAirdrops = airdrops.length;
    const completedAirdrops = airdrops.filter((a) => a.status === 'completed').length;
    const totalProfit = claims.reduce((sum, claim) => sum + (claim.valueUSD || 0), 0);
    const completionRate = totalAirdrops > 0 ? ((completedAirdrops / totalAirdrops) * 100).toFixed(1) : 0;

    // Best category
    const categoryMap = airdrops.reduce(
      (acc, a) => {
        acc[a.category] = (acc[a.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const bestCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

    // Wallet stats
    const walletClaimMap = claims.reduce(
      (acc, claim) => {
        const airdrop = airdrops.find((a) => a.id === claim.airdropId);
        if (airdrop?.walletAddress) {
          acc[airdrop.walletAddress] = (acc[airdrop.walletAddress] || 0) + (claim.valueUSD || 0);
        }
        return acc;
      },
      {} as Record<string, number>
    );
    const bestWallet = Object.entries(walletClaimMap).sort((a, b) => b[1] - a[1])[0];

    return {
      totalAirdrops,
      completedAirdrops,
      completionRate,
      totalProfit,
      bestCategory: bestCategory ? bestCategory[0] : 'N/A',
      bestCategoryCount: bestCategory ? bestCategory[1] : 0,
      bestWallet: bestWallet ? bestWallet[0] : 'N/A',
      bestWalletProfit: bestWallet ? bestWallet[1] : 0,
      totalWallets: wallets.length,
    };
  }, [airdrops, claims, wallets]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analitik</h1>
        <p className="text-slate-400 mt-2">Metrik performa dan insight</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Target,
            label: 'Total Airdrop',
            value: analytics.totalAirdrops,
            color: 'blue',
          },
          {
            icon: TrendingUp,
            label: 'Tingkat Penyelesaian',
            value: `${analytics.completionRate}%`,
            color: 'green',
          },
          {
            icon: Award,
            label: 'Total Profit',
            value: `$${analytics.totalProfit.toFixed(2)}`,
            color: 'cyan',
          },
          {
            icon: WalletIcon,
            label: 'Total Wallet',
            value: analytics.totalWallets,
            color: 'purple',
          },
        ].map((metric, idx) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-500/20 text-blue-400',
            green: 'bg-green-500/20 text-green-400',
            purple: 'bg-purple-500/20 text-purple-400',
            cyan: 'bg-cyan-500/20 text-cyan-400',
          };

          return (
            <Card key={idx} className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{metric.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Category */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Kategori Teratas</CardTitle>
            <CardDescription>Kategori airdrop paling aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold text-white capitalize mb-2">
                {analytics.bestCategory}
              </p>
              <Badge className="capitalize">{analytics.bestCategoryCount} airdrop</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Top Wallet */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Wallet Terbaik</CardTitle>
            <CardDescription>Alamat dengan profit tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <code className="text-xs bg-slate-700 px-3 py-2 rounded block break-all mb-3">
                {analytics.bestWallet}
              </code>
              <p className="text-white font-bold">
                Earned: <span className="text-cyan-400">${analytics.bestWalletProfit.toFixed(2)}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
          <CardDescription>Airdrop status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Not Started', status: 'not-started', color: 'bg-slate-500' },
              { label: 'Ongoing', status: 'ongoing', color: 'bg-blue-500' },
              { label: 'Completed', status: 'completed', color: 'bg-green-500' },
              { label: 'Claimable', status: 'claimable', color: 'bg-purple-500' },
              { label: 'Expired', status: 'expired', color: 'bg-red-500' },
            ].map((item) => {
              const count = airdrops.filter((a) => a.status === item.status).length;
              const percentage = airdrops.length > 0 ? ((count / airdrops.length) * 100).toFixed(1) : 0;

              return (
                <div key={item.status}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{item.label}</span>
                    <span className="text-slate-400">{percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{count} airdrops</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

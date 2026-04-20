'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useQuestStore } from '@/store/questStore';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { BarChart3, Wallet, Zap, Settings, LogOut, Home, Brain, Activity, Gift, Flame } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { dailyLoginStreak, totalPoints } = useQuestStore();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { name: 'Beranda', href: '/dashboard', icon: Home },
    { name: 'Airdrop', href: '/airdrops', icon: Zap },
    { name: 'Wallet', href: '/wallets', icon: Wallet },
    { name: 'Quest Harian', href: '/quest', icon: Gift, badge: dailyLoginStreak > 0 ? `${dailyLoginStreak}🔥` : null },
    { name: 'AI Panel', href: '/ai', icon: Brain },
    { name: 'Analitik', href: '/analytics', icon: BarChart3 },
    { name: 'Aktivitas', href: '/activity', icon: Activity },
    { name: 'Pengaturan', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800/50 flex flex-col h-screen shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="p-6 border-b border-slate-800/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              AirdropTrack
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Professional Farming</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-3 border-b border-slate-800/50 relative z-10">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-400">{dailyLoginStreak}</span>
            <span className="text-xs text-slate-500">streak</span>
          </div>
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
            <Gift className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-400">{totalPoints}</span>
            <span className="text-xs text-slate-500">pts</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto relative z-10">
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 px-4">Menu</div>
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${active ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs font-bold bg-slate-800/50 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-800/50 relative z-10">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">User</p>
            <p className="text-xs text-slate-500 truncate">Online</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-600/10 hover:text-red-400 transition-all duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-red-500/20">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { BarChart3, Wallet, Zap, Settings, LogOut, Home, Brain, Activity } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();

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
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Airdrops', href: '/airdrops', icon: Zap },
    { name: 'Wallets', href: '/wallets', icon: Wallet },
    { name: 'AI Panel', href: '/ai', icon: Brain },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Activity', href: '/activity', icon: Activity },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          AirdropTrack
        </h1>
        <p className="text-xs text-slate-400 mt-1">Professional Farming</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-300 hover:bg-red-600/20 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

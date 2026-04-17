'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Sidebar from '@/components/Sidebar';
import { useRouter, usePathname } from 'next/navigation';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser, setLoading, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        if (!pathname.includes('auth') && pathname !== '/') {
          router.push('/auth/login');
        }
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/20 border-t-blue-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="mt-6 text-slate-300 text-lg font-medium">Loading Airdrop Tracker...</p>
          <div className="mt-2 w-32 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user && !pathname.includes('auth') && pathname !== '/') {
    return null;
  }

  if (pathname.includes('auth') || pathname === '/') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-slate-900">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

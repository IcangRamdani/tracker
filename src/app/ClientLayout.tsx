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
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading...</p>
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

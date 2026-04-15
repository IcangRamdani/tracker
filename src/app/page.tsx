'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Zap, Brain, BarChart3, Lock } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuthStore();

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, {user.email}!
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Your professional airdrop farming dashboard is ready.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950">
      {/* Header */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          AirdropTrack
        </h1>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
          The Professional Airdrop Farming Platform
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Track airdrops, manage multi-wallets, analyze opportunities with AI, and optimize your
          farming strategy with advanced analytics.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              Start for Free
            </Button>
          </Link>
          <Button variant="outline" className="text-lg px-8 py-6">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Powerful Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Zap,
              title: 'Track Airdrops',
              description: 'Manage unlimited airdrops with advanced filtering and search',
            },
            {
              icon: Lock,
              title: 'Multi-Wallet',
              description: 'Organize multiple wallets across chains securely',
            },
            {
              icon: Brain,
              title: 'AI Analysis',
              description: 'Get AI-powered insights and scoring for every airdrop',
            },
            {
              icon: BarChart3,
              title: 'Analytics',
              description: 'Track profits, completion rates, and performance metrics',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition-colors"
              >
                <Icon className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-bold text-white mb-6">Ready to Optimize Your Farming?</h3>
        <p className="text-slate-300 mb-8 text-lg">
          Join thousands of crypto farmers already using AirdropTrack
        </p>
        <Link href="/auth/signup">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6">
            Start Your Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-slate-400">
          <p>&copy; 2026 AirdropTrack. Built for serious farmers.</p>
        </div>
      </footer>
    </div>
  );
}

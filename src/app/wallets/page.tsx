'use client';

import React, { useState } from 'react';
import { useWalletStore, type Wallet } from '@/store/walletStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function WalletsPage() {
  const { wallets, addWallet, deleteWallet } = useWalletStore();
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [label, setLabel] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddWallet = () => {
    if (!address || !label) {
      alert('Mohon isi semua kolom');
      return;
    }

    const newWallet: Wallet = {
      id: uuidv4(),
      userId: user?.uid || '',
      address,
      network: network as any,
      label,
      createdAt: new Date(),
    };

    addWallet(newWallet);
    setAddress('');
    setLabel('');
    setNetwork('ethereum');
    setShowForm(false);
  };

  const copyAddress = (addr: string, walletId: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedId(walletId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const networkColors: Record<string, string> = {
    ethereum: 'bg-purple-500/20 text-purple-400',
    polygon: 'bg-blue-500/20 text-blue-400',
    arbitrum: 'bg-cyan-500/20 text-cyan-400',
    optimism: 'bg-red-500/20 text-red-400',
    solana: 'bg-green-500/20 text-green-400',
    base: 'bg-yellow-500/20 text-yellow-400',
    other: 'bg-slate-500/20 text-slate-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Wallet</h1>
          <p className="text-slate-400 mt-2">Kelola alamat wallet untuk airdrop</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Wallet
        </Button>
      </div>

      {/* Add Wallet Form */}
      {showForm && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Label Wallet *</label>
                <Input
                  type="text"
                  placeholder="contoh: Wallet Utama, Wallet Cadangan"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="mt-2 bg-slate-700 border-slate-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Alamat Wallet *</label>
                <Input
                  type="text"
                  placeholder="0x..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2 bg-slate-700 border-slate-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Network *</label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="arbitrum">Arbitrum</option>
                  <option value="optimism">Optimism</option>
                  <option value="solana">Solana</option>
                  <option value="base">Base</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddWallet}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Tambah Wallet
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                >
                  Batal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Wallets List */}
      {wallets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wallets.map((wallet) => (
            <Card key={wallet.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{wallet.label}</CardTitle>
                    <Badge className={`mt-2 ${networkColors[wallet.network]}`}>
                      {wallet.network}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Address</p>
                  <div className="flex gap-2 items-center">
                    <code className="flex-1 text-xs bg-slate-700 px-3 py-2 rounded truncate">
                      {wallet.address}
                    </code>
                    <button
                      onClick={() => copyAddress(wallet.address, wallet.id)}
                      className="p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      {copiedId === wallet.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => deleteWallet(wallet.id)}
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-8">
            <p className="text-center text-slate-400">No wallets added yet. Add your first wallet!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

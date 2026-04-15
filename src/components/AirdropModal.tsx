'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Airdrop } from '@/store/airdropStore';

interface AirdropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Airdrop | null;
}

export default function AirdropModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AirdropModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'testnet',
    status: 'not-started',
    priority: 'medium',
    rewardEstimate: '',
    deadline: '',
    sourceLink: '',
    tags: '',
    notes: '',
    walletAddress: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        status: initialData.status,
        priority: initialData.priority,
        rewardEstimate: initialData.rewardEstimate,
        deadline: initialData.deadline.toISOString().split('T')[0],
        sourceLink: initialData.sourceLink,
        tags: initialData.tags.join(', '),
        notes: initialData.notes,
        walletAddress: initialData.walletAddress || '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        category: 'testnet',
        status: 'not-started',
        priority: 'medium',
        rewardEstimate: '',
        deadline: '',
        sourceLink: '',
        tags: '',
        notes: '',
        walletAddress: '',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <CardTitle>{initialData ? 'Edit Airdrop' : 'Add New Airdrop'}</CardTitle>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Project Name *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Uniswap Airdrop"
                  required
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                >
                  <option value="testnet">Testnet</option>
                  <option value="retroactive">Retroactive</option>
                  <option value="social">Social</option>
                  <option value="nft">NFT</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                >
                  <option value="not-started">Not Started</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="claimable">Claimable</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Priority *</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Reward Estimate</label>
                <Input
                  type="text"
                  value={formData.rewardEstimate}
                  onChange={(e) => setFormData({ ...formData, rewardEstimate: e.target.value })}
                  placeholder="e.g., 1000 UNI (~$5000)"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Deadline *</label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-white">Source Link</label>
                <Input
                  type="url"
                  value={formData.sourceLink}
                  onChange={(e) => setFormData({ ...formData, sourceLink: e.target.value })}
                  placeholder="https://..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-white">Wallet Address</label>
                <Input
                  type="text"
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  placeholder="0x..."
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-white">Tags</label>
                <Input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., governance, defi, nft"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-white">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any notes..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end border-t border-slate-700 pt-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {initialData ? 'Update' : 'Create'} Airdrop
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

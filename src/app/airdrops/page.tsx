'use client';

import React, { useState } from 'react';
import { useAirdropStore, type Airdrop } from '@/store/airdropStore';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import AirdropModal from '@/components/AirdropModal';

export default function AirdropsPage() {
  const { airdrops, addAirdrop, updateAirdrop, deleteAirdrop } = useAirdropStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [editingAirdrop, setEditingAirdrop] = useState<Airdrop | null>(null);

  const handleAddAirdrop = (formData: any) => {
    const newAirdrop: Airdrop = {
      id: uuidv4(),
      userId: user?.uid || '',
      name: formData.name,
      category: formData.category,
      status: formData.status,
      priority: formData.priority,
      rewardEstimate: formData.rewardEstimate,
      deadline: new Date(formData.deadline),
      sourceLink: formData.sourceLink,
      tags: formData.tags.split(',').map((t: string) => t.trim()),
      notes: formData.notes,
      createdAt: new Date(),
      walletAddress: formData.walletAddress,
    };
    addAirdrop(newAirdrop);
    setIsModalOpen(false);
  };

  const handleEditAirdrop = (formData: any) => {
    if (editingAirdrop) {
      updateAirdrop(editingAirdrop.id, {
        name: formData.name,
        category: formData.category,
        status: formData.status,
        priority: formData.priority,
        rewardEstimate: formData.rewardEstimate,
        deadline: new Date(formData.deadline),
        sourceLink: formData.sourceLink,
        tags: formData.tags.split(',').map((t: string) => t.trim()),
        notes: formData.notes,
        walletAddress: formData.walletAddress,
      });
      setEditingAirdrop(null);
      setIsModalOpen(false);
    }
  };

  const filteredAirdrops = airdrops.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || a.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    'not-started': 'bg-slate-500',
    'ongoing': 'bg-blue-500',
    'completed': 'bg-green-500',
    'claimable': 'bg-purple-500',
    'expired': 'bg-red-500',
  };

  const priorityColors: Record<string, string> = {
    'high': 'bg-red-500/20 text-red-400',
    'medium': 'bg-yellow-500/20 text-yellow-400',
    'low': 'bg-green-500/20 text-green-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Airdrops</h1>
          <p className="text-slate-400 mt-2">Manage your airdrop opportunities</p>
        </div>
        <Button
          onClick={() => {
            setEditingAirdrop(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Airdrop
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search by project name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterStatus || ''}
          onChange={(e) => setFilterStatus(e.target.value || null)}
          className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700"
        >
          <option value="">All Status</option>
          <option value="not-started">Not Started</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="claimable">Claimable</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Airdrops Grid */}
      {filteredAirdrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAirdrops.map((airdrop) => (
            <Card key={airdrop.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg truncate">{airdrop.name}</CardTitle>
                    <Badge className={`mt-2 ${statusColors[airdrop.status]}`}>
                      {airdrop.status}
                    </Badge>
                  </div>
                  <Badge className={priorityColors[airdrop.priority]}>
                    {airdrop.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-slate-400">Category</p>
                  <p className="text-white capitalize">{airdrop.category}</p>
                </div>
                <div className="text-sm">
                  <p className="text-slate-400">Reward Estimate</p>
                  <p className="text-white font-bold">{airdrop.rewardEstimate}</p>
                </div>
                <div className="text-sm">
                  <p className="text-slate-400">Deadline</p>
                  <p className="text-white">{new Date(airdrop.deadline).toLocaleDateString()}</p>
                </div>
                {airdrop.tags.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {airdrop.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 pt-3">
                  {airdrop.sourceLink && (
                    <a
                      href={airdrop.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit
                      </Button>
                    </a>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingAirdrop(airdrop);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteAirdrop(airdrop.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-8">
            <p className="text-center text-slate-400">No airdrops found. Create your first airdrop!</p>
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <AirdropModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAirdrop(null);
        }}
        onSubmit={editingAirdrop ? handleEditAirdrop : handleAddAirdrop}
        initialData={editingAirdrop}
      />
    </div>
  );
}

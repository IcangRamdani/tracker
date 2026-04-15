'use client';

import React, { useState } from 'react';
import { useActivityLogStore } from '@/store/activityLogStore';
import { useAuthStore } from '@/store/authStore';
import { useAirdropStore } from '@/store/airdropStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';

export default function ActivityPage() {
  const { logs, addLog, getLogsByUser } = useActivityLogStore();
  const { user } = useAuthStore();
  const { airdrops } = useAirdropStore();
  const [showForm, setShowForm] = useState(false);
  const [action, setAction] = useState('quest');
  const [description, setDescription] = useState('');
  const [selectedAirdrop, setSelectedAirdrop] = useState('');

  const handleAddLog = () => {
    if (!description || !selectedAirdrop) {
      alert('Please fill in all fields');
      return;
    }

    addLog({
      id: uuidv4(),
      userId: user?.uid || '',
      airdropId: selectedAirdrop,
      action: action as any,
      description,
      createdAt: new Date(),
    });

    setAction('quest');
    setDescription('');
    setSelectedAirdrop('');
    setShowForm(false);
  };

  const userLogs = user ? getLogsByUser(user.uid) : [];
  const sortedLogs = [...userLogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const actionColors: Record<string, string> = {
    swap: 'bg-blue-500/20 text-blue-400',
    bridge: 'bg-cyan-500/20 text-cyan-400',
    stake: 'bg-green-500/20 text-green-400',
    mint: 'bg-purple-500/20 text-purple-400',
    quest: 'bg-yellow-500/20 text-yellow-400',
    claim: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Activity Log</h1>
          <p className="text-slate-400 mt-2">Track your actions and progress</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Log Activity
        </Button>
      </div>

      {/* Add Activity Form */}
      {showForm && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Airdrop *</label>
                <select
                  value={selectedAirdrop}
                  onChange={(e) => setSelectedAirdrop(e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                >
                  <option value="">Select an airdrop</option>
                  {airdrops.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Action Type *</label>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white"
                >
                  <option value="swap">Swap</option>
                  <option value="bridge">Bridge</option>
                  <option value="stake">Stake</option>
                  <option value="mint">Mint</option>
                  <option value="quest">Quest</option>
                  <option value="claim">Claim</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Description *</label>
                <Input
                  type="text"
                  placeholder="e.g., Completed level 3 quests"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 bg-slate-700 border-slate-600"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddLog}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Log Activity
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Timeline */}
      {sortedLogs.length > 0 ? (
        <div className="space-y-3">
          {sortedLogs.map((log) => {
            const airdrop = airdrops.find((a) => a.id === log.airdropId);
            return (
              <Card key={log.id} className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={actionColors[log.action]}>
                          {log.action}
                        </Badge>
                        <p className="text-sm text-slate-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-white font-medium">{log.description}</p>
                      <p className="text-slate-400 text-sm">
                        Airdrop: <span className="text-white">{airdrop?.name || 'Unknown'}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-8">
            <p className="text-center text-slate-400">No activity logged yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

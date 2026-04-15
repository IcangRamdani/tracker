'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    setMessage('');

    try {
      if (displayName && displayName !== user.displayName) {
        await updateProfile(user, { displayName });
        setMessage('Profile updated successfully');
        setMessageType('success');
      }
    } catch (error: any) {
      setMessage(error.message || 'Error updating profile');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!user || !newEmail) return;
    setLoading(true);
    setMessage('');

    try {
      await updateEmail(user, newEmail);
      setMessage('Email updated successfully (Check your inbox to verify)');
      setMessageType('success');
      setNewEmail('');
    } catch (error: any) {
      setMessage(error.message || 'Error updating email');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!user || !newPassword) return;
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await updatePassword(user, newPassword);
      setMessage('Password updated successfully');
      setMessageType('success');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setMessage(error.message || 'Error updating password');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-2">Manage your account and preferences</p>
      </div>

      {/* Account Info */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white font-medium mt-1">{user?.email}</p>
            <Badge className="mt-2 bg-green-500/20 text-green-400">Verified</Badge>
          </div>
          <div>
            <p className="text-slate-400 text-sm">User ID</p>
            <code className="text-xs bg-slate-700 px-3 py-2 rounded block mt-1 break-all">
              {user?.uid}
            </code>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Account Created</p>
            <p className="text-white font-medium mt-1">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Update Profile */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>Change your display name</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div
              className={`px-4 py-2 rounded-lg text-sm ${
                messageType === 'success'
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                  : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}
            >
              {message}
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-white">Display Name</label>
            <Input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="mt-2 bg-slate-700 border-slate-600"
            />
          </div>
          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </CardContent>
      </Card>

      {/* Update Email */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Update Email</CardTitle>
          <CardDescription>Change your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white">New Email</label>
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="newemail@example.com"
              className="mt-2 bg-slate-700 border-slate-600"
            />
          </div>
          <Button
            onClick={handleUpdateEmail}
            disabled={loading || !newEmail}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Updating...' : 'Update Email'}
          </Button>
        </CardContent>
      </Card>

      {/* Update Password */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-white">New Password</label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 bg-slate-700 border-slate-600"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-white">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2 bg-slate-700 border-slate-600"
            />
          </div>
          <Button
            onClick={handleUpdatePassword}
            disabled={loading || !newPassword}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-slate-400 text-sm">Always enabled</p>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Email Notifications</p>
              <p className="text-slate-400 text-sm">Get notified about deadlines</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

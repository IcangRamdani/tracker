'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAIStore, type AIAnalysis, type AIScore } from '@/store/aiStore';
import { Brain, Loader } from 'lucide-react';

export default function AIPanel() {
  const { analyses, scores, loading, addAnalysis, addScore, setLoading } = useAIStore();
  const [input, setInput] = useState('');
  const [aiType, setAiType] = useState<'analyze' | 'score'>('analyze');

  const handleAIAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      // Simulate AI analysis - in production, call OpenRouter API
      const mockAnalysis: AIAnalysis = {
        projectName: input,
        type: 'DeFi Protocol',
        difficulty: 'medium',
        rewardPotential: '$1000 - $5000',
        scamRisk: 'low',
        recommendedActions: [
          'Follow official Twitter',
          'Join Discord community',
          'Complete testnet tasks',
          'Claim tokens when eligible',
        ],
      };

      addAnalysis(mockAnalysis);
      setInput('');
    } catch (error) {
      console.error('AI analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAIScore = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      // Simulate AI scoring - in production, call OpenRouter API
      const mockScore: AIScore = {
        projectName: input,
        score: Math.random() * 100,
        recommendation: Math.random() > 0.5 ? 'worth-it' : 'skip',
        reasoning: 'Based on historical data and community engagement, this project shows good potential.',
      };

      addScore(mockScore);
      setInput('');
    } catch (error) {
      console.error('AI scoring error:', error);
    } finally {
      setLoading(false);
    }
  };

  const difficultyColors: Record<string, string> = {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400',
  };

  const riskColors: Record<string, string> = {
    low: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-red-500/20 text-red-400',
  };

  const recommendationColors: Record<string, string> = {
    'worth-it': 'bg-green-500/20 text-green-400',
    'medium': 'bg-yellow-500/20 text-yellow-400',
    'skip': 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Panel</h1>
        <p className="text-slate-400 mt-2">Analyze airdrops and get AI-powered insights</p>
      </div>

      {/* Input Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Airdrop Analysis</CardTitle>
          <CardDescription>Enter a project name or URL to analyze</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Uniswap, https://example.com/airdrop"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-700 border-slate-600"
              disabled={loading}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !loading) {
                  aiType === 'analyze' ? handleAIAnalyze() : handleAIScore();
                }
              }}
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleAIAnalyze}
              disabled={loading || !input.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
            <Button
              onClick={handleAIScore}
              disabled={loading || !input.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Scoring...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Score
                </>
              )}
            </Button>
          </div>

          <div className="p-3 bg-slate-700/50 rounded-lg text-sm text-slate-300">
            💡 <strong>Tip:</strong> Powered by AI model analysis. Results are recommendations only.
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analyses.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Analysis Results</h2>
          {analyses.map((analysis, idx) => (
            <Card key={idx} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{analysis.projectName}</CardTitle>
                    <Badge className="mt-2">{analysis.type}</Badge>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={difficultyColors[analysis.difficulty]}>
                      {analysis.difficulty} difficulty
                    </Badge>
                    <Badge className={riskColors[analysis.scamRisk]}>
                      {analysis.scamRisk} scam risk
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Reward Potential</p>
                  <p className="text-white font-bold text-lg">{analysis.rewardPotential}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm mb-3">Recommended Actions</p>
                  <ul className="space-y-2">
                    {analysis.recommendedActions.map((action, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white">
                        <span className="text-blue-400">✓</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Score Results */}
      {scores.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Score Results</h2>
          {scores.map((score, idx) => (
            <Card key={idx} className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold">{score.projectName}</h3>
                    <Badge className={recommendationColors[score.recommendation]}>
                      {score.recommendation}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-white">{score.score.toFixed(1)}</div>
                    <p className="text-slate-400 text-sm">/100</p>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${score.score}%` }}
                  />
                </div>

                <p className="text-slate-300">{score.reasoning}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {analyses.length === 0 && scores.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-8">
            <p className="text-center text-slate-400">
              Enter a project name and analyze to get AI-powered insights
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

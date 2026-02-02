import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, Target, Flame, CheckCircle2, ExternalLink, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeetCodeData {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

interface LeetCodeStatsProps {
  username: string;
  className?: string;
}

export function LeetCodeStats({ username, className }: LeetCodeStatsProps) {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        setLoading(true);
        
        // Using public LeetCode stats API
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        if (!res.ok) throw new Error('Failed to fetch LeetCode data');
        
        const result = await res.json();
        
        if (result.status === 'error') {
          throw new Error(result.message || 'User not found');
        }

        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load LeetCode data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [username]);

  if (loading) {
    return (
      <div className={cn("glass-card rounded-3xl p-6 sm:p-8", className)}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
            <Code2 className="h-5 w-5 text-yellow-500" />
          </div>
          <h3 className="text-xl font-display font-bold">LeetCode Stats</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-4 animate-pulse">
              <div className="h-8 bg-muted/50 rounded mb-2" />
              <div className="h-4 bg-muted/30 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={cn("glass-card rounded-3xl p-6 sm:p-8", className)}>
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="h-6 w-6 text-yellow-500" />
          <h3 className="text-xl font-display font-bold">LeetCode Stats</h3>
        </div>
        <p className="text-muted-foreground">Unable to load LeetCode data</p>
      </div>
    );
  }

  const progressPercentage = (data.totalSolved / data.totalQuestions) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("glass-card rounded-3xl p-6 sm:p-8 overflow-hidden relative", className)}
    >
      {/* Background decoration */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Code2 className="h-5 w-5 text-yellow-500" />
          </motion.div>
          <div>
            <h3 className="text-xl font-display font-bold">LeetCode Stats</h3>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        <motion.a
          href={`https://leetcode.com/u/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl glass hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors"
          whileHover={{ scale: 1.1 }}
          aria-label="View LeetCode Profile"
        >
          <ExternalLink className="h-4 w-4" />
        </motion.a>
      </div>

      {/* Main Stats Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="glass rounded-2xl p-4 text-center group cursor-default col-span-2"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            <CheckCircle2 className="h-5 w-5 mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform" />
            <p className="text-3xl sm:text-4xl font-display font-bold gradient-text">{data.totalSolved}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Problems Solved</p>
            <div className="mt-3 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {progressPercentage.toFixed(1)}% of all problems
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="glass rounded-2xl p-4 text-center group cursor-default"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.15 }}
          >
            <Trophy className="h-5 w-5 mx-auto mb-2 text-yellow-500 group-hover:scale-110 transition-transform" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">
              {data.ranking > 0 ? data.ranking.toLocaleString() : 'N/A'}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Global Rank</p>
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="glass rounded-2xl p-4 text-center group cursor-default"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Target className="h-5 w-5 mx-auto mb-2 text-blue-500 group-hover:scale-110 transition-transform" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">
              {data.acceptanceRate.toFixed(1)}%
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">Acceptance</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Difficulty Breakdown - Bento Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-4 relative overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-green-500">Easy</span>
              <Zap className="h-3.5 w-3.5 text-green-500" />
            </div>
            <p className="text-xl sm:text-2xl font-display font-bold text-green-500">
              {data.easySolved}
            </p>
            <p className="text-xs text-muted-foreground">/ {data.totalEasy}</p>
            <div className="mt-2 h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${(data.easySolved / data.totalEasy) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-4 relative overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-yellow-500">Medium</span>
              <Flame className="h-3.5 w-3.5 text-yellow-500" />
            </div>
            <p className="text-xl sm:text-2xl font-display font-bold text-yellow-500">
              {data.mediumSolved}
            </p>
            <p className="text-xs text-muted-foreground">/ {data.totalMedium}</p>
            <div className="mt-2 h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${(data.mediumSolved / data.totalMedium) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-4 relative overflow-hidden group cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-red-500">Hard</span>
              <Trophy className="h-3.5 w-3.5 text-red-500" />
            </div>
            <p className="text-xl sm:text-2xl font-display font-bold text-red-500">
              {data.hardSolved}
            </p>
            <p className="text-xs text-muted-foreground">/ {data.totalHard}</p>
            <div className="mt-2 h-1.5 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${(data.hardSolved / data.totalHard) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

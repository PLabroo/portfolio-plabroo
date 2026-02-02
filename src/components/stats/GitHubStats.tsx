import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Users, Book, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface GitHubStatsProps {
  username: string;
  className?: string;
}

export function GitHubStats({ username, className }: GitHubStatsProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('Failed to fetch GitHub user');
        const userData = await userRes.json();
        setUser(userData);

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        setRepos(reposData);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

  const languageColors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-500',
    Python: 'bg-green-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-purple-500',
    Java: 'bg-red-500',
  };

  if (loading) {
    return (
      <div className={cn("glass-card rounded-3xl p-6 sm:p-8", className)}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Github className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-display font-bold">GitHub Activity</h3>
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

  if (error || !user) {
    return (
      <div className={cn("glass-card rounded-3xl p-6 sm:p-8", className)}>
        <div className="flex items-center gap-3 mb-4">
          <Github className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-display font-bold">GitHub Activity</h3>
        </div>
        <p className="text-muted-foreground">Unable to load GitHub data</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("glass-card rounded-3xl p-6 sm:p-8 overflow-hidden relative", className)}
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Github className="h-5 w-5 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-xl font-display font-bold">GitHub Activity</h3>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
        <motion.a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          aria-label="View GitHub Profile"
        >
          <ExternalLink className="h-4 w-4" />
        </motion.a>
      </div>

      {/* Stats Grid - Bento Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          className="glass rounded-2xl p-4 text-center group cursor-default"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            <Book className="h-5 w-5 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">{user.public_repos}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Repositories</p>
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
            <Star className="h-5 w-5 mx-auto mb-2 text-yellow-500 group-hover:scale-110 transition-transform" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">{totalStars}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Stars</p>
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
            <GitFork className="h-5 w-5 mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">{totalForks}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Forks</p>
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
            transition={{ type: "spring", delay: 0.25 }}
          >
            <Users className="h-5 w-5 mx-auto mb-2 text-green-500 group-hover:scale-110 transition-transform" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">{user.followers}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Followers</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Recent Repos - Bento Grid */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          Recent Repositories
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {repos.slice(0, 6).map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="glass rounded-xl p-4 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-sm truncate group-hover:text-primary transition-colors flex-1 mr-2">
                  {repo.name}
                </h5>
                {repo.language && (
                  <span className={cn(
                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                    languageColors[repo.language] || 'bg-gray-500'
                  )} />
                )}
              </div>
              {repo.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {repo.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" />
                  {repo.forks_count}
                </span>
                {repo.language && (
                  <span className="text-xs">{repo.language}</span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Member since */}
      <div className="mt-6 pt-4 border-t border-border/30 flex items-center gap-2 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        <span>GitHub member since {new Date(user.created_at).getFullYear()}</span>
      </div>
    </motion.div>
  );
}

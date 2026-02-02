import { motion } from 'framer-motion';
import { Users, GitPullRequest, MessageSquare, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadershipMetric {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

const leadershipMetrics: LeadershipMetric[] = [
  {
    icon: Users,
    value: '4+',
    label: 'Engineers Mentored',
    description: 'Guided junior developers through code reviews and pair programming',
  },
  {
    icon: GitPullRequest,
    value: '500+',
    label: 'PRs Reviewed',
    description: 'Ensuring code quality and best practices across the team',
  },
  {
    icon: MessageSquare,
    value: '30%',
    label: 'Defects Reduced',
    description: 'Through improved testing and code review processes',
  },
  {
    icon: TrendingUp,
    value: '45%',
    label: 'Team Velocity',
    description: 'Increased through better tooling and processes',
  },
];

const leadershipAreas = [
  {
    icon: Target,
    title: 'Technical Direction',
    description: 'Setting architectural standards and technology choices for the team',
  },
  {
    icon: Users,
    title: 'Mentorship',
    description: 'Conducting 1:1s, code reviews, and knowledge sharing sessions',
  },
  {
    icon: Lightbulb,
    title: 'Process Improvement',
    description: 'Implementing CI/CD, testing strategies, and development workflows',
  },
];

interface TechnicalLeadershipProps {
  className?: string;
}

export function TechnicalLeadership({ className }: TechnicalLeadershipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("space-y-6", className)}
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {leadershipMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-2xl p-5 group cursor-default relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <metric.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-3xl font-display font-bold gradient-text mb-1">{metric.value}</p>
              <p className="text-sm font-medium mb-2">{metric.label}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{metric.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leadership Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leadershipAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ x: 5 }}
            className="glass rounded-xl p-4 flex items-start gap-4 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
              <area.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">{area.title}</h4>
              <p className="text-xs text-muted-foreground">{area.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

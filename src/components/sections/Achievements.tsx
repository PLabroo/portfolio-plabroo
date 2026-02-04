import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'certification' | 'award' | 'achievement';
  url?: string;
  skills?: string[];
}

const achievements: Achievement[] = [
  {
    id: 'frontend-expert',
    title: 'Frontend Development Expert',
    issuer: 'Self-Assessed Proficiency',
    date: '2024',
    type: 'achievement',
    skills: ['React', 'TypeScript', 'Performance'],
  },
  {
    id: 'system-design',
    title: 'System Design Proficiency',
    issuer: 'Practical Experience',
    date: '2024',
    type: 'achievement',
    skills: ['Architecture', 'Scalability', 'Patterns'],
  },
  {
    id: 'leetcode-problems',
    title: '200+ LeetCode Problems',
    issuer: 'LeetCode',
    date: '2024',
    type: 'achievement',
    url: 'https://leetcode.com/u/PLabroo/',
    skills: ['DSA', 'Problem Solving'],
  },
  {
    id: 'team-lead',
    title: 'Technical Team Leadership',
    issuer: 'WebileApps',
    date: '2025',
    type: 'achievement',
    skills: ['Mentoring', 'Code Review', 'Architecture'],
  },
];

interface AchievementsProps {
  className?: string;
}

export function Achievements({ className }: AchievementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden", className)}
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative">
        <motion.div 
          className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Award className="h-5 w-5 text-yellow-500" />
        </motion.div>
        <div>
          <h3 className="text-xl font-display font-bold">Achievements & Skills</h3>
          <p className="text-sm text-muted-foreground">Recognition & Expertise</p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -3 }}
            className="glass rounded-2xl p-4 group cursor-default relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {achievement.title}
                  </h4>
                </div>
                {achievement.url && (
                  <motion.a
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    className="text-muted-foreground hover:text-primary"
                    aria-label="View credential"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span>{achievement.issuer}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {achievement.date}
                </span>
              </div>
              
              {achievement.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {achievement.skills.map((skill) => (
                    <span key={skill} className="tag text-[10px] px-2 py-0.5">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Calendar, ExternalLink, ChevronDown, Briefcase, Sparkles, Zap, Award } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ExperiencePage() {
  const { experience } = portfolioData;
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const formatDate = (date: string) => {
    if (date === 'Present') return date;
    const [year, month] = date.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = end === 'Present' ? new Date() : new Date(end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0 && remainingMonths > 0) return `${years}y ${remainingMonths}m`;
    if (years > 0) return `${years}y`;
    return `${remainingMonths}m`;
  };

  const cardColors = [
    { gradient: 'from-primary/10 via-transparent to-accent/10', accent: 'primary', border: 'border-primary/20' },
    { gradient: 'from-cyan/10 via-transparent to-emerald/10', accent: 'cyan', border: 'border-cyan/20' },
    { gradient: 'from-rose/10 via-transparent to-orange/10', accent: 'rose', border: 'border-rose/20' },
    { gradient: 'from-violet/10 via-transparent to-accent/10', accent: 'violet', border: 'border-violet/20' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 px-1">
      {/* Header */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.span 
          variants={staggerItem}
          className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium bg-gradient-to-r from-primary/10 to-cyan/10 text-primary mb-4 sm:mb-6"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Career Journey
          </span>
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          Work <span className="gradient-text">Experience</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Building products that impact millions of users across industries
        </motion.p>
      </motion.section>

      {/* Experience Cards - Accordion Style */}
      <section className="space-y-4">
        {experience.map((exp, index) => {
          const color = cardColors[index % cardColors.length];
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.article
                className={cn(
                  "glass-card rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 relative",
                  expandedId === exp.id && `ring-1 ${color.border}`
                )}
              >
                {/* Subtle gradient background */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-50",
                  color.gradient
                )} />

                {/* Card Header - Always Visible */}
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="w-full p-4 sm:p-6 lg:p-8 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset rounded-2xl sm:rounded-3xl relative z-10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Company Logo Placeholder */}
                      <motion.div 
                        className={cn(
                          "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0",
                          `bg-${color.accent}/10`
                        )}
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--${color.accent}) / 0.2), hsl(var(--accent) / 0.1))`
                        }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                      >
                        <Briefcase className={cn("w-5 h-5 sm:w-6 sm:h-6", `text-${color.accent}`)} />
                      </motion.div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold truncate">
                            {exp.role}
                          </h3>
                          {exp.endDate === 'Present' && (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald/10 to-cyan/10 text-emerald text-xs font-medium flex-shrink-0 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <div className={cn("flex items-center gap-2 font-medium text-sm sm:text-base", `text-${color.accent}`)}>
                          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{exp.company}</span>
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:opacity-80 flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                      {/* Meta info pills */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-xs sm:text-sm">
                          <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                        </span>
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          `bg-${color.accent}/10 text-${color.accent}`
                        )}
                        style={{
                          background: `hsl(var(--${color.accent}) / 0.1)`,
                          color: `hsl(var(--${color.accent}))`
                        }}
                        >
                          {getDuration(exp.startDate, exp.endDate)}
                        </span>
                      </div>

                      {/* Expand indicator */}
                      <motion.div
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full glass flex items-center justify-center flex-shrink-0"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Mobile date */}
                  <div className="sm:hidden flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </div>

                  {/* Tags row */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 sm:mt-4">
                    <span className="tag text-xs bg-gradient-to-r from-primary/10 to-accent/10">{exp.industry}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-rose" />
                      {exp.location}
                    </span>
                    <span className="tag text-xs capitalize bg-gradient-to-r from-cyan/10 to-emerald/10">{exp.type}</span>
                  </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 space-y-6">
                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                        {/* Key Achievements */}
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber" />
                            Key Achievements
                          </h4>
                          <div className="grid gap-3">
                            {exp.description.map((item, i) => {
                              const achievementColors = ['primary', 'cyan', 'rose', 'violet', 'emerald'];
                              const achieveColor = achievementColors[i % achievementColors.length];
                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/50 hover:to-muted/20 transition-colors border border-border/20"
                                >
                                  <motion.div 
                                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                    style={{
                                      background: `hsl(var(--${achieveColor}) / 0.1)`,
                                      color: `hsl(var(--${achieveColor}))`
                                    }}
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                  >
                                    <Zap className="w-3 h-3" />
                                  </motion.div>
                                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                                    {item}
                                  </p>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => {
                              const techColors = [
                                'from-primary/10 to-accent/10 text-primary',
                                'from-cyan/10 to-emerald/10 text-cyan',
                                'from-rose/10 to-orange/10 text-rose',
                                'from-violet/10 to-accent/10 text-violet',
                                'from-amber/10 to-orange/10 text-amber',
                              ];
                              return (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.03 }}
                                  whileHover={{ scale: 1.1 }}
                                  className={cn(
                                    "px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r",
                                    techColors[i % techColors.length]
                                  )}
                                >
                                  {tech}
                                </motion.span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            </motion.div>
          );
        })}
      </section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet/10 to-transparent rounded-bl-full" />
        
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet/20 to-accent/20 flex items-center justify-center">
            🎓
          </span>
          Education
        </h2>
        <div className="flex items-start gap-4 relative">
          <motion.div 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet/20 to-accent/20 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-xl sm:text-2xl">🎓</span>
          </motion.div>
          <div>
            <h3 className="font-semibold text-base sm:text-lg">Bachelor of Technology</h3>
            <p className="text-violet text-sm sm:text-base">Aryabhatta Knowledge University</p>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
              <Calendar className="w-3 h-3" />
              Aug 2017 – Oct 2021
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Calendar, ExternalLink, ChevronDown, Briefcase } from 'lucide-react';
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
          className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-4 sm:mb-6"
        >
          Career Journey
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
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.article
              className={cn(
                "glass-card rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500",
                expandedId === exp.id && "ring-1 ring-primary/30"
              )}
            >
              {/* Card Header - Always Visible */}
              <button
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                className="w-full p-4 sm:p-6 lg:p-8 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset rounded-2xl sm:rounded-3xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Company Logo Placeholder */}
                    <motion.div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </motion.div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold truncate">
                          {exp.role}
                        </h3>
                        {exp.endDate === 'Present' && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium flex-shrink-0">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
                        <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="truncate">{exp.company}</span>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary/80 flex-shrink-0"
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
                      <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
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
                  <span className="tag text-xs">{exp.industry}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                  <span className="tag text-xs capitalize">{exp.type}</span>
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
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 space-y-6">
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                      {/* Key Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                          Key Achievements
                        </h4>
                        <div className="grid gap-3">
                          {exp.description.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <motion.div 
                                className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                              >
                                <span className="text-primary text-xs font-bold">{i + 1}</span>
                              </motion.div>
                              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                                {item}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              whileHover={{ scale: 1.1 }}
                              className="tag tag-primary text-xs sm:text-sm"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          </motion.div>
        ))}
      </section>

      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8"
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-6">Education</h2>
        <div className="flex items-start gap-4">
          <motion.div 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-xl sm:text-2xl">🎓</span>
          </motion.div>
          <div>
            <h3 className="font-semibold text-base sm:text-lg">Bachelor of Technology</h3>
            <p className="text-primary text-sm sm:text-base">Aryabhatta Knowledge University</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Aug 2017 – Oct 2021</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

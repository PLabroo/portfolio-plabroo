import { motion } from 'framer-motion';
import { MapPin, Download, Coffee, Code, Bug, BookOpen, Mail, Github, Linkedin, User } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const { about } = portfolioData;

  const iconMap: Record<string, typeof Coffee> = {
    '☕': Coffee,
    '💻': Code,
    '🎯': Bug,
    '📚': BookOpen,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 px-1">
      {/* Hero Section with Photo */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Profile Photo */}
          <motion.div 
            variants={staggerItem}
            className="relative"
          >
            <motion.div
              className="w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-3xl glass-card overflow-hidden relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Placeholder - replace with actual photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center">
                <User className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-primary/40" />
              </div>
              
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all" />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Available for hire
            </motion.div>
            
            <motion.div
              className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white text-sm">👋</span>
            </motion.div>
          </motion.div>

          {/* Header Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.span 
              variants={staggerItem}
              className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-4"
            >
              About Me
            </motion.span>
            <motion.h1 
              variants={staggerItem}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3"
            >
              {about.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? "gradient-text" : ""}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
            <motion.p 
              variants={staggerItem}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl"
            >
              {about.subtitle}
            </motion.p>

            {/* Quick Actions */}
            <motion.div 
              variants={staggerItem}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6"
            >
              <Button asChild size="sm" className="gap-2">
                <a href={about.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2 glass">
                <a href={`mailto:${portfolioData.contact.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <a href={portfolioData.socialLinks.find(l => l.platform === 'github')?.url} target="_blank">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <a href={portfolioData.socialLinks.find(l => l.platform === 'linkedin')?.url} target="_blank">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bio */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10"
      >
        <div className="space-y-4">
          {about.bio.map((paragraph, index) => (
            <motion.p 
              key={index} 
              className="text-sm sm:text-base text-foreground/90 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>{portfolioData.contact.location}</span>
            </div>
            <span className="hidden sm:block text-border">•</span>
            <div className="text-sm sm:text-base text-muted-foreground">
              {portfolioData.contact.availability}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Current Focus */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">
          Current <span className="gradient-text">Focus</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {about.currentFocus.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center gap-3 glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4"
            >
              <motion.div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"
                whileHover={{ rotate: 10 }}
              >
                <span className="text-base sm:text-lg">→</span>
              </motion.div>
              <span className="font-medium text-sm sm:text-base">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Fun Facts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-4 sm:mb-6">
          Fun <span className="gradient-text">Facts</span>
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {about.funFacts.map((fact, index) => {
            const Icon = iconMap[fact.icon] || Coffee;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center"
              >
                <motion.div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </motion.div>
                <div className="text-xl sm:text-2xl font-bold gradient-text mb-0.5 sm:mb-1">{fact.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{fact.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}

import { motion } from 'framer-motion';
import { MapPin, Download, Coffee, Code, Bug, BookOpen, Mail, Github, Linkedin, User, Sparkles, Zap, Heart, Target } from 'lucide-react';
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

  const focusColors = [
    { bg: 'from-primary/10 to-accent/5', icon: 'bg-primary/10 text-primary', border: 'border-primary/20' },
    { bg: 'from-cyan/10 to-emerald/5', icon: 'bg-cyan/10 text-cyan', border: 'border-cyan/20' },
    { bg: 'from-rose/10 to-orange/5', icon: 'bg-rose/10 text-rose', border: 'border-rose/20' },
    { bg: 'from-violet/10 to-accent/5', icon: 'bg-violet/10 text-violet', border: 'border-violet/20' },
  ];

  const factColors = [
    { bg: 'from-primary/10 to-cyan/10', icon: 'bg-primary/10', text: 'from-primary to-cyan' },
    { bg: 'from-emerald/10 to-cyan/10', icon: 'bg-emerald/10', text: 'from-emerald to-cyan' },
    { bg: 'from-rose/10 to-orange/10', icon: 'bg-rose/10', text: 'from-rose to-orange' },
    { bg: 'from-violet/10 to-accent/10', icon: 'bg-violet/10', text: 'from-violet to-accent' },
  ];

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
              {/* Placeholder with gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-cyan/15 to-accent/20 flex items-center justify-center">
                <User className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 text-primary/40" />
              </div>
              
              {/* Animated gradient ring */}
              <motion.div 
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--cyan) / 0.2), hsl(var(--accent) / 0.3))',
                  padding: '2px',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full glass-card text-xs font-medium bg-gradient-to-r from-emerald/10 to-cyan/10 text-emerald border border-emerald/20"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                Available for hire
              </span>
            </motion.div>
            
            <motion.div
              className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-white text-lg">👋</span>
            </motion.div>

            {/* Additional floating element */}
            <motion.div
              className="absolute top-1/2 -right-6 w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-emerald flex items-center justify-center shadow-lg hidden lg:flex"
              animate={{ y: [-5, 5, -5], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>

          {/* Header Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.span 
              variants={staggerItem}
              className="inline-block px-4 py-1.5 rounded-full glass-card text-sm font-medium bg-gradient-to-r from-primary/10 to-accent/10 text-primary mb-4"
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
              <Button asChild size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <a href={about.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-2 glass border-cyan/30 hover:bg-cyan/10 hover:text-cyan">
                <a href={`mailto:${portfolioData.contact.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary">
                <a href={portfolioData.socialLinks.find(l => l.platform === 'github')?.url} target="_blank">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="sm" className="gap-2 hover:bg-cyan/10 hover:text-cyan">
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
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 via-cyan/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 via-rose/5 to-transparent rounded-tr-full" />
        
        <div className="relative space-y-4">
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

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/30 relative">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm sm:text-base">
              <MapPin className="h-4 w-4 flex-shrink-0 text-rose" />
              <span>{portfolioData.contact.location}</span>
            </div>
            <span className="hidden sm:block text-border">•</span>
            <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
              <Zap className="h-4 w-4 text-amber" />
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
          {about.currentFocus.map((item, index) => {
            const color = focusColors[index % focusColors.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center gap-3 glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-gradient-to-r ${color.bg} border ${color.border}`}
              >
                <motion.div 
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${color.icon}`}
                  whileHover={{ rotate: 10 }}
                >
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
                <span className="font-medium text-sm sm:text-base">{item}</span>
              </motion.div>
            );
          })}
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
            const color = factColors[index % factColors.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center relative overflow-hidden bg-gradient-to-br ${color.bg}`}
              >
                <motion.div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 ${color.icon}`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${color.text} bg-clip-text text-transparent mb-0.5 sm:mb-1`}>
                  {fact.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{fact.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}

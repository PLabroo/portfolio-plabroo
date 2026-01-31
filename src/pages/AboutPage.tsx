import { motion } from 'framer-motion';
import { MapPin, Download, Coffee, Code, Bug, BookOpen } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="text-center"
      >
        <motion.span 
          variants={staggerItem}
          className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6"
        >
          About Me
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          {about.title}
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {about.subtitle}
        </motion.p>
      </motion.section>

      {/* Bio */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-3xl p-8 lg:p-10"
      >
        <div className="space-y-4">
          {about.bio.map((paragraph, index) => (
            <p key={index} className="text-foreground/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href={about.resumeUrl} download>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{portfolioData.contact.location}</span>
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
        <h2 className="text-2xl font-display font-bold mb-6">Current Focus</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {about.currentFocus.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 glass rounded-2xl p-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="text-lg">→</span>
              </div>
              <span className="font-medium">{item}</span>
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
        <h2 className="text-2xl font-display font-bold mb-6">Fun Facts</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {about.funFacts.map((fact, index) => {
            const Icon = iconMap[fact.icon] || Coffee;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{fact.value}</div>
                <div className="text-sm text-muted-foreground">{fact.label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}

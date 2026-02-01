import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function UsesPage() {
  const { uses } = portfolioData;

  const categoryIcons: Record<string, string> = {
    'Editor & Terminal': '💻',
    'Development Tools': '🛠️',
    'Design & Productivity': '🎨',
    'Hardware': '⚡',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 px-1">
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
          My Setup
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          <span className="gradient-text">Uses</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          A collection of tools, software, and hardware I use daily
        </motion.p>
      </motion.section>

      {/* Categories */}
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {uses.map((category, catIndex) => (
          <motion.section
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <span className="text-lg sm:text-xl">{categoryIcons[category.category] || '⚡'}</span>
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-display font-bold">{category.category}</h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: itemIndex * 0.05 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-secondary/50 transition-colors group"
                >
                  <motion.div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-sm sm:text-base">✦</span>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm sm:text-base">{item.name}</h3>
                      {item.url && (
                        <motion.a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          whileHover={{ scale: 1.2 }}
                        >
                          <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </motion.a>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}

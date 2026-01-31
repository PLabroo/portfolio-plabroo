import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function UsesPage() {
  const { uses } = portfolioData;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
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
          My Setup
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Uses
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          A collection of tools, software, and hardware I use daily
        </motion.p>
      </motion.section>

      {/* Categories */}
      <div className="space-y-8">
        {uses.map((category, catIndex) => (
          <motion.section
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
            className="glass rounded-3xl p-6 lg:p-8"
          >
            <h2 className="text-2xl font-display font-bold mb-6">{category.category}</h2>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: itemIndex * 0.05 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-secondary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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

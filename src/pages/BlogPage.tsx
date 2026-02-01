import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function BlogPage() {
  const { blogPosts } = portfolioData;

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
          Blog
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          Thoughts & <span className="gradient-text">Tutorials</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Sharing knowledge about frontend development, React, and web technologies
        </motion.p>
      </motion.section>

      {/* Blog Posts */}
      <div className="space-y-4 sm:space-y-6">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 group cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6">
              {/* Gradient Placeholder */}
              <motion.div 
                className="w-full lg:w-40 xl:w-48 h-28 sm:h-32 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
              </motion.div>

              <div className="flex-1 min-w-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  {post.tags.map((tag) => (
                    <motion.span 
                      key={tag} 
                      className="tag tag-primary text-xs"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <motion.div
                className="hidden lg:block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Coming Soon */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">
          More <span className="gradient-text">Coming Soon</span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
          I'm working on more articles about React, TypeScript, performance optimization, and frontend architecture. Stay tuned!
        </p>
      </motion.section>
    </div>
  );
}

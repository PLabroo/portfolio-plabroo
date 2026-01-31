import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';

export default function BlogPage() {
  const { blogPosts } = portfolioData;

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
          Blog
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-display font-bold mb-4"
        >
          Thoughts & Tutorials
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Sharing knowledge about frontend development, React, and web technologies
        </motion.p>
      </motion.section>

      {/* Blog Posts */}
      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="glass rounded-3xl p-6 lg:p-8 group cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Gradient Placeholder */}
              <div className="w-full lg:w-48 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex-shrink-0" />

              <div className="flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag tag-primary text-xs">{tag}</span>
                  ))}
                </div>

                <h2 className="text-xl lg:text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all hidden lg:block" />
            </div>
          </motion.article>
        ))}
      </div>

      {/* Coming Soon */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-3xl p-8 text-center"
      >
        <h2 className="text-2xl font-display font-bold mb-4">More Coming Soon</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          I'm working on more articles about React, TypeScript, performance optimization, and frontend architecture. Stay tuned!
        </p>
      </motion.section>
    </div>
  );
}

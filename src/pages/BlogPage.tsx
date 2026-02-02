import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, TrendingUp, PenTool } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const { blogPosts } = portfolioData;

  // Featured post is the first one
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 px-1">
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

      {/* Stats Bento Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {[
          { icon: BookOpen, value: blogPosts.length + '+', label: 'Articles' },
          { icon: Clock, value: '30+', label: 'Min Read Time' },
          { icon: TrendingUp, value: '10K+', label: 'Readers' },
          { icon: PenTool, value: '5+', label: 'Topics' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass-card rounded-2xl p-4 text-center group cursor-default"
          >
            <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <p className="text-xl sm:text-2xl font-display font-bold gradient-text">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Featured Post - Large Bento */}
      {featuredPost && (
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Gradient Image Area */}
            <div className="h-48 sm:h-64 lg:h-auto bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-primary/20" />
              </motion.div>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredPost.tags.map((tag) => (
                  <motion.span 
                    key={tag} 
                    className="tag tag-primary text-xs"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredPost.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime}
                </span>
              </div>

              <motion.div 
                className="flex items-center gap-2 text-primary font-medium text-sm"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Read Article
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>
          </div>
        </motion.article>
      )}

      {/* Blog Posts Bento Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer"
          >
            {/* Gradient Header */}
            <div className="h-28 sm:h-36 bg-gradient-to-br from-primary/20 via-accent/15 to-primary/10 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.div
                className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            <div className="p-4 sm:p-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.slice(0, 2).map((tag) => (
                  <motion.span 
                    key={tag} 
                    className="tag tag-primary text-xs"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
                {post.tags.length > 2 && (
                  <span className="tag text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Hover shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
            </div>
          </motion.article>
        ))}

        {/* If only featured post exists, add placeholder cards */}
        {otherPosts.length === 0 && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl sm:rounded-3xl p-6 flex flex-col items-center justify-center text-center h-64"
              >
                <PenTool className="h-8 w-8 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground text-sm">Coming Soon</p>
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Topics Bento Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8"
      >
        <h3 className="text-lg sm:text-xl font-display font-bold mb-4">
          Topics I <span className="gradient-text">Write About</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {['React', 'TypeScript', 'Performance', 'Design Systems', 'Architecture', 'Best Practices'].map((topic, index) => (
            <motion.div
              key={topic}
              whileHover={{ scale: 1.05, y: -2 }}
              className="glass rounded-xl p-3 text-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-default"
            >
              {topic}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden"
      >
        <motion.div
          className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">
            More <span className="gradient-text">Coming Soon</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            I'm working on more articles about React, TypeScript, performance optimization, and frontend architecture. Stay tuned!
          </p>
        </div>
      </motion.section>
    </div>
  );
}

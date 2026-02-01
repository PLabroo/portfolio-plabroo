import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const categories = ['all', 'web', 'saas', 'extension', 'open-source'] as const;

export default function ProjectsPage() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

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
          Portfolio
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          Featured <span className="gradient-text">Projects</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          A collection of projects I've built, from startups to enterprise solutions
        </motion.p>
      </motion.section>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-2 flex-wrap px-2"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 capitalize",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "glass-card hover:bg-secondary"
            )}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={cn(
              "glass-card rounded-2xl sm:rounded-3xl overflow-hidden group",
              project.featured && "md:col-span-2"
            )}
          >
            {/* Project Image/Gradient */}
            <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6">
                <span className="tag text-xs">{project.category}</span>
              </div>
              {project.featured && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl glass hover:bg-primary/10 hover:text-primary transition-colors"
                      aria-label="View on GitHub"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl glass hover:bg-primary/10 hover:text-primary transition-colors"
                      aria-label="View live site"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{project.description}</p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {project.highlights.map((highlight, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-2 text-xs sm:text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <motion.span 
                    key={tech} 
                    className="tag tag-primary text-xs"
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Open Source CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">
          Open Source <span className="gradient-text">Contributions</span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto">
          I actively contribute to open source projects. Check out my GitHub for more projects and contributions.
        </p>
        <Button asChild className="group">
          <a
            href={portfolioData.socialLinks.find(l => l.platform === 'github')?.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            View GitHub Profile
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </Button>
      </motion.section>
    </div>
  );
}

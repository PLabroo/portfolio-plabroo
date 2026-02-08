import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  Folder,
  Star,
  Code2,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import {
  staggerContainer,
  staggerItem,
} from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categories = ["all", "web", "saas", "extension", "open-source"] as const;

export default function ProjectsPage() {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
          Projects Developed
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
          A collection of projects I've built, from startups to enterprise
          solutions
        </motion.p>
      </motion.section>

      {/* Category Filter - Bento Style */}
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
              "px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 capitalize",
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "glass-card hover:bg-secondary",
            )}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Bento Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => {
          // Determine card size for bento effect
          const isLarge = project.featured && index === 0;
          const isMedium = project.featured && index !== 0;

          const cardColors = [
            {
              gradient: "from-primary/20 via-accent/10 to-cyan/10",
              accent: "primary",
            },
            {
              gradient: "from-cyan/20 via-emerald/10 to-primary/10",
              accent: "cyan",
            },
            {
              gradient: "from-rose/20 via-orange/10 to-amber/10",
              accent: "rose",
            },
            {
              gradient: "from-violet/20 via-accent/10 to-primary/10",
              accent: "violet",
            },
          ];
          const cardColor = cardColors[index % cardColors.length];

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={cn(
                "glass-card rounded-2xl sm:rounded-3xl overflow-hidden group relative",
                isLarge && "md:col-span-2 lg:col-span-2 lg:row-span-2",
                isMedium && "md:col-span-1",
              )}
            >
              {/* Gradient Background */}
              <div
                className={cn(
                  "relative overflow-hidden bg-gradient-to-br",
                  cardColor.gradient,
                  isLarge ? "h-48 sm:h-64 lg:h-80" : "h-32 sm:h-40",
                )}
              >
                {/* Animated gradient overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-white/10 blur-lg"
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                {/* Category & Featured Badge */}
                <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 flex items-center gap-2">
                  <motion.span
                    className="tag text-xs flex items-center gap-1 bg-gradient-to-r from-primary/20 to-accent/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Folder className="h-3 w-3" />
                    {project.category}
                  </motion.span>
                </div>
                {project.featured && (
                  <motion.div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber to-orange text-white text-xs font-medium flex items-center gap-1 shadow-lg">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  </motion.div>
                )}
              </div>

              <div className={cn("p-4 sm:p-6", isLarge && "lg:p-8")}>
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <h3
                    className={cn(
                      "font-display font-bold group-hover:text-primary transition-colors",
                      isLarge
                        ? "text-xl sm:text-2xl lg:text-3xl"
                        : "text-lg sm:text-xl",
                    )}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-2.5 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label="View on GitHub"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-2.5 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-colors"
                        aria-label="View live site"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p
                  className={cn(
                    "text-muted-foreground mb-4 sm:mb-6",
                    isLarge ? "text-sm sm:text-base lg:text-lg" : "text-sm",
                  )}
                >
                  {project.description}
                </p>

                {/* Highlights - Bento Cards within */}
                <div
                  className={cn(
                    "grid gap-2 sm:gap-3 mb-4 sm:mb-6",
                    isLarge ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2",
                  )}
                >
                  {project.highlights
                    .slice(0, isLarge ? 4 : 2)
                    .map((highlight, i) => (
                      <motion.div
                        key={i}
                        className="glass rounded-xl p-3 text-center group/item"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Code2 className="h-4 w-4 mx-auto mb-1 text-primary opacity-60 group-hover/item:opacity-100 transition-opacity" />
                        <span className="text-xs text-muted-foreground line-clamp-2">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies
                    .slice(0, isLarge ? 7 : 4)
                    .map((tech, i) => {
                      const techColors = [
                        "from-primary/10 to-accent/10 text-primary",
                        "from-cyan/10 to-emerald/10 text-cyan",
                        "from-rose/10 to-orange/10 text-rose",
                        "from-violet/10 to-accent/10 text-violet",
                        "from-amber/10 to-orange/10 text-amber",
                      ];
                      return (
                        <motion.span
                          key={tech}
                          className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r",
                            techColors[i % techColors.length],
                          )}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + i * 0.03 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {tech}
                        </motion.span>
                      );
                    })}
                  {project.technologies.length > (isLarge ? 7 : 4) && (
                    <span className="px-2.5 py-1 rounded-full text-xs text-muted-foreground glass">
                      +{project.technologies.length - (isLarge ? 7 : 4)} more
                    </span>
                  )}
                </div>
              </div>

              {/* Hover shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Stats Bento Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            value: projects.length + "+",
            label: "Projects Built",
            icon: Folder,
          },
          { value: "100K+", label: "Users Impacted", icon: Star },
          { value: "4+", label: "Years Experience", icon: Code2 },
          { value: "15+", label: "Technologies", icon: Github },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02, y: -3 }}
            className="glass-card rounded-2xl p-4 sm:p-6 text-center group"
          >
            <stat.icon className="h-5 w-5 mx-auto mb-2 text-primary opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            <p className="text-2xl sm:text-3xl font-display font-bold gradient-text">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* Open Source CTA */}
      {/* <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center relative overflow-hidden"
      >
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="relative z-10">
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
        </div>
      </motion.section> */}
    </div>
  );
}

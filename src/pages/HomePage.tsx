import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Code2, ExternalLink, Sparkles, Zap, Rocket, Coffee, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { BentoCard } from '@/components/ui/bento-card';
import { TypingCodeBlock } from '@/components/ui/typing-code-block';
import { StatCard } from '@/components/ui/stat-card';
import { GitHubStats, LeetCodeStats } from '@/components/stats';
import { Achievements, TechnicalLeadership } from '@/components/sections';

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

const floatingAnimationDelayed = {
  y: [10, -10, 10],
  transition: {
    duration: 7,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 2
  }
};

export default function HomePage() {
  const { hero, experience, skillCategories, projects, testimonials, process } = portfolioData;

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const latestExperience = experience[0];
  const topSkills = skillCategories.flatMap(cat => cat.skills).filter(s => s.proficiency === 'expert').slice(0, 6);

  const bentoItems = [
    { title: "4+ Years", subtitle: "Frontend Experience", description: "Building scalable applications with React and TypeScript", icon: <Zap className="h-6 w-6" />, span: "lg:col-span-2" },
    { title: "Design Systems", subtitle: "Component Libraries", description: "Creating reusable, accessible UI components", icon: <Sparkles className="h-6 w-6" /> },
    { title: "90+", subtitle: "Lighthouse Score", description: "Optimized for speed & Core Web Vitals", icon: <Rocket className="h-6 w-6" /> },
    { title: "50+ Projects", subtitle: "Delivered Worldwide", description: "From startups to enterprise solutions" },
    { title: "100,000+", subtitle: "Users Served", description: "Scalable architectures at scale" },
    { title: "∞ Coffee", subtitle: "Fuel for Code", description: "Powered by caffeine", icon: <Coffee className="h-6 w-6" /> },
    { title: "Clean Code", subtitle: "Best Practices", description: "Writing maintainable, elegant solutions" },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-24 px-1">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center py-6 sm:py-8">
        {/* Decorative floating elements - hidden on mobile for performance */}
        <motion.div
          className="absolute top-20 right-10 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl hidden sm:block"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl hidden sm:block"
          animate={floatingAnimationDelayed}
        />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full"
        >
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div variants={staggerItem}>
              <motion.span 
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-card text-xs sm:text-sm font-medium text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.span 
                  className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {portfolioData.contact.availability}
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={staggerItem}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight"
            >
              <motion.span 
                className="text-muted-foreground text-sm sm:text-lg lg:text-xl block mb-2 sm:mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {hero.greeting}
              </motion.span>
              <motion.span 
                className="gradient-text inline-block"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {hero.name}
              </motion.span>
            </motion.h1>

            <motion.p 
              variants={staggerItem}
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-display text-foreground/80"
            >
              {hero.tagline}
            </motion.p>

            <motion.p 
              variants={staggerItem}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              {hero.description}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <Button asChild size="default" className="group relative overflow-hidden text-sm sm:text-base">
                <Link to={hero.ctaPrimary.href}>
                  <span className="relative z-10 flex items-center">
                    {hero.ctaPrimary.label}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="default" className="group glass text-sm sm:text-base">
                <Link to={hero.ctaSecondary.href}>
                  {hero.ctaSecondary.label}
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItem} className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
              {portfolioData.socialLinks.map((link, index) => {
                const icons = {
                  github: Github,
                  linkedin: Linkedin,
                  leetcode: Code2,
                  email: ExternalLink,
                };
                const Icon = icons[link.platform as keyof typeof icons] || ExternalLink;
                
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl glass-card hover:text-primary transition-colors"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Code Snippet & Stats */}
          <motion.div variants={staggerItem} className="space-y-4 sm:space-y-6">
            <TypingCodeBlock
              filename={hero.codeSnippet.filename}
              code={hero.codeSnippet.code}
              typingSpeed={25}
            />

            {/* Highlight Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {hero.highlights.map((highlight, index) => (
                <StatCard
                  key={index}
                  value={highlight.value}
                  label={highlight.label}
                  delay={0.6 + index * 0.15}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* What I Bring - Enhanced Bento Grid */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
          >
            What I <span className="gradient-text">Bring</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A blend of technical expertise, creative vision, and passion for building exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {bentoItems.map((item, index) => (
            <BentoCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              icon={item.icon}
              className={item.span}
              delay={index * 0.08}
              variant={index === 0 ? 'gradient' : index === 2 ? 'glow' : 'default'}
            />
          ))}
        </div>
      </section>

      {/* Current Role - Enhanced */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Current <span className="gradient-text">Role</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -5 }}
          className="glass-card rounded-3xl p-6 lg:p-8 relative overflow-hidden group"
        >
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.5 }}
          />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
              <div>
                <motion.h3 
                  className="text-2xl lg:text-3xl font-display font-bold"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {latestExperience.role}
                </motion.h3>
                <p className="text-primary font-medium text-lg">{latestExperience.company}</p>
                <p className="text-sm text-muted-foreground">
                  {latestExperience.industry} • {latestExperience.location}
                </p>
              </div>
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span 
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {latestExperience.endDate}
              </motion.span>
            </div>

            <ul className="space-y-3 mb-6">
              {latestExperience.description.slice(0, 3).map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3 text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mb-6">
              {latestExperience.technologies.map((tech, index) => (
                <motion.span 
                  key={tech} 
                  className="tag tag-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="pt-6 border-t border-border/30">
              <Button asChild variant="ghost" className="group">
                <Link to="/experience">
                  View full experience
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Technical Leadership Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Technical <span className="gradient-text">Leadership</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Leading teams, mentoring engineers, and driving technical excellence
          </p>
        </motion.div>

        <TechnicalLeadership />

        {/* System Design CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Button asChild variant="outline" className="group glass">
            <Link to="/system-design">
              <Layers className="mr-2 h-4 w-4" />
              Explore System Design
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Featured Projects - Enhanced */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Some of my recent work and side projects
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex group">
            <Link to="/projects">
              View all
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-3xl p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <motion.span 
                  className="tag"
                  whileHover={{ scale: 1.1 }}
                >
                  {project.category}
                </motion.span>
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View on GitHub"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                )}
              </div>

              <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <motion.span 
                    key={tech} 
                    className="tag tag-primary text-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link to="/projects">View all projects</Link>
          </Button>
        </div>
      </section>

      {/* Coding Profiles Section - GitHub & LeetCode */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Coding <span className="gradient-text">Profiles</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Live stats from my coding journey across platforms
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <GitHubStats username="vaibhavkumarswe" />
          <LeetCodeStats username="vaibhavkumarswe" />
        </div>

        {/* Achievements Section */}
        <Achievements />
      </section>

      {/* Process Section - Enhanced */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A streamlined approach to bringing your ideas to life
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden group"
            >
              <motion.div 
                className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5 group-hover:text-primary/15 transition-colors duration-500"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                {step.step}
              </motion.div>
              <div className="relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-primary font-bold text-lg">{step.step}</span>
                </motion.div>
                <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
              
              {/* Connecting line for desktop */}
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial - Enhanced */}
      {testimonials.length > 0 && (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <motion.div 
              className="absolute top-4 left-6 text-9xl text-primary/10 font-serif"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              "
            </motion.div>
            <blockquote className="relative z-10">
              <motion.p 
                className="text-lg lg:text-2xl text-foreground/90 mb-8 leading-relaxed font-display"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {testimonials[0].quote}
              </motion.p>
              <footer className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  {testimonials[0].author.charAt(0)}
                </motion.div>
                <div>
                  <cite className="not-italic font-semibold text-lg">{testimonials[0].author}</cite>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[0].role} at {testimonials[0].company}
                  </p>
                </div>
              </footer>
            </blockquote>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </motion.div>
        </section>
      )}

      {/* CTA - Enhanced */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          {/* Floating particles */}
          <motion.div
            className="absolute top-10 left-10 w-4 h-4 rounded-full bg-primary/30"
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-6 h-6 rounded-full bg-accent/30"
            animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Let's Build Something
              <motion.span 
                className="gradient-text block mt-2"
                whileHover={{ scale: 1.05 }}
              >
                Amazing Together
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Whether you need a stunning landing page, a complex web application, or a complete design system — I'm here to help bring your vision to life.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild size="lg" className="group text-lg px-8">
                <Link to="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group text-lg px-8 glass">
                <Link to="/resume">
                  <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Download Resume
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

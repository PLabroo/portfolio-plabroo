import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Code2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '@/data/portfolio';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { BentoCard } from '@/components/ui/bento-card';
import { CodeBlock } from '@/components/ui/code-block';
import { StatCard } from '@/components/ui/stat-card';

export default function HomePage() {
  const { hero, experience, skillCategories, projects, testimonials, process } = portfolioData;

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const latestExperience = experience[0];
  const topSkills = skillCategories.flatMap(cat => cat.skills).filter(s => s.proficiency === 'expert').slice(0, 6);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-6">
            <motion.div variants={staggerItem}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {portfolioData.contact.availability}
              </span>
            </motion.div>

            <motion.h1 
              variants={staggerItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight"
            >
              <span className="text-muted-foreground text-lg sm:text-xl block mb-2">
                {hero.greeting}
              </span>
              <span className="gradient-text">{hero.name}</span>
            </motion.h1>

            <motion.p 
              variants={staggerItem}
              className="text-xl sm:text-2xl font-display text-foreground/80"
            >
              {hero.tagline}
            </motion.p>

            <motion.p 
              variants={staggerItem}
              className="text-muted-foreground text-lg max-w-lg"
            >
              {hero.description}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link to={hero.ctaPrimary.href}>
                  {hero.ctaPrimary.label}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={hero.ctaSecondary.href}>
                  {hero.ctaSecondary.label}
                </Link>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={staggerItem} className="flex items-center gap-3 pt-4">
              {portfolioData.socialLinks.map((link) => {
                const icons = {
                  github: Github,
                  linkedin: Linkedin,
                  leetcode: Code2,
                  email: ExternalLink,
                };
                const Icon = icons[link.platform as keyof typeof icons] || ExternalLink;
                
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-105"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Code Snippet & Stats */}
          <motion.div variants={staggerItem} className="space-y-6">
            <CodeBlock
              filename={hero.codeSnippet.filename}
              code={hero.codeSnippet.code}
            />

            {/* Highlight Stats */}
            <div className="grid grid-cols-3 gap-4">
              {hero.highlights.map((highlight, index) => (
                <StatCard
                  key={index}
                  value={highlight.value}
                  label={highlight.label}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* What I Bring - Bento Grid */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">What I Bring</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A blend of technical expertise, creative vision, and passion for building exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <BentoCard
            title="4+ Years"
            subtitle="Frontend Experience"
            description="Building scalable applications with React and TypeScript"
            className="lg:col-span-2"
            delay={0}
          />
          <BentoCard
            title="Design Systems"
            subtitle="Component Libraries"
            description="Creating reusable, accessible UI components"
            delay={0.1}
          />
          <BentoCard
            title="90+"
            subtitle="Lighthouse Score"
            description="Optimized for speed & Core Web Vitals"
            delay={0.2}
          />
          <BentoCard
            title="50+ Projects"
            subtitle="Delivered Worldwide"
            description="From startups to enterprise solutions"
            delay={0.3}
          />
          <BentoCard
            title="100,000+"
            subtitle="Users Served"
            description="Scalable architectures at scale"
            delay={0.4}
          />
          <BentoCard
            title="∞ Coffee"
            subtitle="Fuel for Code"
            description="Powered by caffeine"
            delay={0.5}
          />
          <BentoCard
            title="Clean Code"
            subtitle="Best Practices"
            description="Writing maintainable, elegant solutions"
            delay={0.6}
          />
        </div>
      </section>

      {/* Current Role */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Current Role</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-3xl p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-display font-bold">{latestExperience.role}</h3>
              <p className="text-primary font-medium">{latestExperience.company}</p>
              <p className="text-sm text-muted-foreground">
                {latestExperience.industry} • {latestExperience.location}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {latestExperience.endDate}
            </span>
          </div>

          <ul className="space-y-3 mb-6">
            {latestExperience.description.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {latestExperience.technologies.map((tech) => (
              <span key={tech} className="tag tag-primary">{tech}</span>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <Button asChild variant="ghost">
              <Link to="/experience" className="group">
                View full experience
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">
              Some of my recent work and side projects
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link to="/projects" className="group">
              View all
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-3xl p-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="tag">{project.category}</span>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
              </div>

              <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag tag-primary text-xs">{tech}</span>
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

      {/* Process Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">My Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A streamlined approach to bringing your ideas to life
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-3xl p-6 relative overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {step.step}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      {testimonials.length > 0 && (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-6 left-8 text-8xl text-primary/10">"</div>
            <blockquote className="relative z-10">
              <p className="text-lg lg:text-xl text-foreground/90 mb-6 leading-relaxed">
                {testimonials[0].quote}
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                  {testimonials[0].author.charAt(0)}
                </div>
                <div>
                  <cite className="not-italic font-semibold">{testimonials[0].author}</cite>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[0].role} at {testimonials[0].company}
                  </p>
                </div>
              </footer>
            </blockquote>
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Let's Build Something
              <span className="gradient-text block">Amazing Together</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Whether you need a stunning landing page, a complex web application, or a complete design system — I'm here to help bring your vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/resume">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

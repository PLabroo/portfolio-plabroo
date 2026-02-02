import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Layers, Database, Server, Cloud, Shield, Zap, GitBranch, 
  Monitor, Smartphone, Globe, Lock, RefreshCw, ArrowRight,
  CheckCircle2, Lightbulb, Target, Puzzle, Code2, Box
} from 'lucide-react';
import { staggerContainer, staggerItem } from '@/components/layout/PageTransition';
import { cn } from '@/lib/utils';

// System Design Case Studies Data
const caseStudies = [
  {
    id: 'wms',
    title: 'Wealth Management System',
    description: 'Architected a scalable WMS serving 100,000+ users with role-based access control',
    challenge: 'Build a high-performance financial platform with complex RBAC for 4+ user roles, real-time portfolio analytics, and secure mutual fund transactions.',
    solution: 'Implemented a modular React architecture with Redux for state management, code-splitting for performance, and integrated BSE Star APIs for secure transactions.',
    technologies: ['React.js', 'TypeScript', 'Redux', 'Material UI', 'Highcharts', 'REST APIs'],
    metrics: [
      { label: 'Users Served', value: '100K+' },
      { label: 'User Roles', value: '4+' },
      { label: 'Load Time', value: '<2s' },
      { label: 'Uptime', value: '99.9%' },
    ],
    architecture: [
      { layer: 'Presentation', components: ['React Components', 'Material UI', 'Highcharts'] },
      { layer: 'State Management', components: ['Redux Store', 'Redux Saga', 'Selectors'] },
      { layer: 'API Layer', components: ['REST Clients', 'Interceptors', 'Error Handling'] },
      { layer: 'Integration', components: ['BSE Star APIs', 'Payment Gateway', 'Auth Service'] },
    ],
  },
  {
    id: 'browser-extension',
    title: 'Secure Browser Extension',
    description: 'Built a security-focused extension for AI interaction tracking and data protection',
    challenge: 'Create a browser extension that intercepts all LLM interactions, blocks sensitive data leakage, and captures evidence when required.',
    solution: 'Engineered DOM manipulation middleware to capture events across ChatGPT, Claude, and Gemini, with content script injection for 100% interaction tracking.',
    technologies: ['Plasmo', 'React.js', 'TypeScript', 'Chrome APIs', 'DOM Manipulation'],
    metrics: [
      { label: 'Coverage', value: '100%' },
      { label: 'Platforms', value: '3+' },
      { label: 'Teams Using', value: '10+' },
      { label: 'Events Tracked', value: 'All' },
    ],
    architecture: [
      { layer: 'Content Scripts', components: ['DOM Observers', 'Event Listeners', 'Injectors'] },
      { layer: 'Background', components: ['Service Worker', 'State Sync', 'API Client'] },
      { layer: 'Security', components: ['Encryption', 'Secure Storage', 'Screenshot Capture'] },
      { layer: 'UI', components: ['Popup', 'Options Page', 'Notifications'] },
    ],
  },
];

// Architecture Patterns
const architecturePatterns = [
  {
    name: 'Component Architecture',
    icon: Puzzle,
    description: 'Atomic design with reusable, composable components',
    principles: ['Single Responsibility', 'Prop-driven Design', 'Composition over Inheritance'],
  },
  {
    name: 'State Management',
    icon: Database,
    description: 'Predictable state with unidirectional data flow',
    principles: ['Centralized Store', 'Immutable Updates', 'Derived State'],
  },
  {
    name: 'Performance First',
    icon: Zap,
    description: 'Optimized rendering and bundle size',
    principles: ['Code Splitting', 'Lazy Loading', 'Memoization'],
  },
  {
    name: 'Security by Design',
    icon: Shield,
    description: 'Defense in depth for frontend applications',
    principles: ['Input Validation', 'XSS Prevention', 'Secure Storage'],
  },
];

// Design Principles
const designPrinciples = [
  {
    title: 'Scalability',
    icon: Layers,
    description: 'Build systems that grow with your users',
    details: 'Design modular architectures that can handle increasing load without major rewrites. Use code-splitting, lazy loading, and efficient state management.',
  },
  {
    title: 'Maintainability',
    icon: GitBranch,
    description: 'Code that teams can understand and extend',
    details: 'Follow consistent patterns, write self-documenting code, and maintain comprehensive documentation. Enable developers to make changes confidently.',
  },
  {
    title: 'Performance',
    icon: Zap,
    description: 'Fast experiences that delight users',
    details: 'Optimize Core Web Vitals, minimize bundle sizes, and implement efficient rendering strategies. Every millisecond counts for user experience.',
  },
  {
    title: 'Reliability',
    icon: Shield,
    description: 'Systems that work when users need them',
    details: 'Implement error boundaries, graceful degradation, and comprehensive testing. Build confidence through automated quality gates.',
  },
];

// Tech Stack Categories for the radar
const techRadar = [
  {
    ring: 'Adopt',
    description: 'Technologies we use daily',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Redux Toolkit'],
  },
  {
    ring: 'Trial',
    description: 'Technologies we\'re evaluating',
    items: ['React Server Components', 'Zustand', 'Tanstack Query v5', 'Bun'],
  },
  {
    ring: 'Assess',
    description: 'Worth exploring',
    items: ['Solid.js', 'Qwik', 'Effect-TS', 'Tauri'],
  },
  {
    ring: 'Hold',
    description: 'Moving away from',
    items: ['Redux Saga', 'Webpack', 'Create React App', 'Moment.js'],
  },
];

export default function SystemDesignPage() {
  const [selectedCase, setSelectedCase] = useState(caseStudies[0]);
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16 px-1">
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
          System Design
        </motion.span>
        <motion.h1 
          variants={staggerItem}
          className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
        >
          Architecture & <span className="gradient-text">Design</span>
        </motion.h1>
        <motion.p 
          variants={staggerItem}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
        >
          Building scalable, maintainable, and performant systems with modern architecture patterns
        </motion.p>
      </motion.section>

      {/* Design Principles - Bento Grid */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Design <span className="gradient-text">Principles</span>
          </h2>
          <p className="text-muted-foreground">Core principles that guide my architectural decisions</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setExpandedPrinciple(expandedPrinciple === principle.title ? null : principle.title)}
              className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <principle.icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: expandedPrinciple === principle.title ? 90 : 0 }}
                    className="text-muted-foreground"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{principle.description}</p>
                
                <AnimatePresence>
                  {expandedPrinciple === principle.title && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">{principle.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture Patterns */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Architecture <span className="gradient-text">Patterns</span>
          </h2>
          <p className="text-muted-foreground">Proven patterns for building robust frontend systems</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {architecturePatterns.map((pattern, index) => (
            <motion.div
              key={pattern.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-5 group"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                whileHover={{ rotate: 10 }}
              >
                <pattern.icon className="h-5 w-5 text-primary" />
              </motion.div>
              
              <h3 className="font-display font-bold mb-2 group-hover:text-primary transition-colors">
                {pattern.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{pattern.description}</p>
              
              <div className="space-y-2">
                {pattern.principles.map((principle, i) => (
                  <motion.div 
                    key={principle}
                    className="flex items-center gap-2 text-xs"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{principle}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <p className="text-muted-foreground">Real-world systems I've designed and built</p>
        </motion.div>

        {/* Case Study Selector */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {caseStudies.map((study) => (
            <motion.button
              key={study.id}
              onClick={() => setSelectedCase(study)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                selectedCase.id === study.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "glass-card hover:bg-secondary"
              )}
            >
              {study.title}
            </motion.button>
          ))}
        </div>

        {/* Selected Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">{selectedCase.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedCase.description}</p>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {selectedCase.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="glass rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl font-display font-bold gradient-text">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="h-5 w-5 text-red-500" />
                    <h4 className="font-semibold">Challenge</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedCase.challenge}</p>
                </div>
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <h4 className="font-semibold">Solution</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedCase.solution}</p>
                </div>
              </div>

              {/* Architecture Layers */}
              <div className="mb-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Architecture Layers
                </h4>
                <div className="space-y-3">
                  {selectedCase.architecture.map((layer, index) => (
                    <motion.div
                      key={layer.layer}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-xl p-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-sm font-medium text-primary min-w-[140px]">
                          {layer.layer}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {layer.components.map((component) => (
                            <span key={component} className="tag text-xs">
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {selectedCase.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="tag tag-primary"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Tech Radar */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Tech <span className="gradient-text">Radar</span>
          </h2>
          <p className="text-muted-foreground">Technologies I'm currently exploring and using</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techRadar.map((ring, index) => {
            const colors = {
              Adopt: 'from-green-500/20 to-green-500/5 border-green-500/30',
              Trial: 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
              Assess: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
              Hold: 'from-red-500/20 to-red-500/5 border-red-500/30',
            };
            const textColors = {
              Adopt: 'text-green-500',
              Trial: 'text-blue-500',
              Assess: 'text-yellow-500',
              Hold: 'text-red-500',
            };

            return (
              <motion.div
                key={ring.ring}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-2xl p-5 bg-gradient-to-br border",
                  colors[ring.ring as keyof typeof colors]
                )}
              >
                <h3 className={cn("font-display font-bold mb-1", textColors[ring.ring as keyof typeof textColors])}>
                  {ring.ring}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">{ring.description}</p>
                <div className="flex flex-wrap gap-2">
                  {ring.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      className="tag text-xs"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Frontend Architecture Diagram */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            Frontend <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground">My preferred architecture for scalable React applications</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-8"
        >
          {/* Architecture Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Layer 1: Presentation */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-5 border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent"
            >
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="h-6 w-6 text-blue-500" />
                <h4 className="font-display font-bold">Presentation Layer</h4>
              </div>
              <div className="space-y-2">
                {['Pages', 'Components', 'Layouts', 'Styles', 'Assets'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Box className="h-3 w-3 text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Layer 2: Business Logic */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-5 border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="h-6 w-6 text-purple-500" />
                <h4 className="font-display font-bold">Business Logic</h4>
              </div>
              <div className="space-y-2">
                {['Custom Hooks', 'State Management', 'Utils/Helpers', 'Validation', 'Types'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Box className="h-3 w-3 text-purple-500" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Layer 3: Data */}
            <motion.div
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-5 border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent"
            >
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-green-500" />
                <h4 className="font-display font-bold">Data Layer</h4>
              </div>
              <div className="space-y-2">
                {['API Clients', 'Query Hooks', 'Cache Management', 'Transformers', 'Schemas'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Box className="h-3 w-3 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Data Flow Arrows */}
          <div className="hidden lg:flex justify-center items-center gap-4 my-6">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">User Interaction</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">State Update</span>
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">API Call</span>
              <RefreshCw className="h-4 w-4" />
            </motion.div>
          </div>

          {/* Key Principles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/30">
            {[
              { icon: Lock, label: 'Type Safety' },
              { icon: RefreshCw, label: 'Reactive Updates' },
              { icon: Globe, label: 'API Agnostic' },
              { icon: Smartphone, label: 'Responsive First' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-3 text-center"
              >
                <item.icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                <p className="text-xs font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

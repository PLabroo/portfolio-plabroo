import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Primary Grid Pattern - Most Visible */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      
      {/* Large Grid Overlay */}
      <motion.div 
        className="absolute inset-0 grid-large opacity-40"
        animate={{
          x: [0, -20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Animated Dot Grid */}
      <motion.div 
        className="absolute inset-0 dot-grid opacity-50"
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Radial gradient glow from center */}
      <div className="absolute inset-0 bg-radial-glow" />
      
      {/* Animated Blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/12 rounded-full filter blur-[100px]"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-accent/8 rounded-full filter blur-[120px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full filter blur-[80px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />
      
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-primary/15 to-accent/15 rounded-full filter blur-[60px]"
        animate={{
          x: ['-50%', '-30%', '-70%', '-50%'],
          y: ['-50%', '-70%', '-30%', '-50%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Grid Crosshairs at corners */}
      <div className="absolute top-0 left-0 w-40 h-40 border-r border-b border-primary/10" />
      <div className="absolute top-0 right-0 w-40 h-40 border-l border-b border-primary/10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 border-r border-t border-primary/10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-l border-t border-primary/10" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}

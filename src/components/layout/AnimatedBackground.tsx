import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
      
      {/* Primary Grid Pattern - Most Visible */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Large Grid Overlay */}
      <motion.div 
        className="absolute inset-0 grid-large opacity-30"
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
        className="absolute inset-0 dot-grid opacity-40"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Radial gradient glow from center */}
      <div className="absolute inset-0 bg-radial-glow" />
      
      {/* Multi-color Animated Blobs */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full filter blur-[120px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))' }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full filter blur-[100px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--cyan) / 0.12), hsl(var(--emerald) / 0.08))' }}
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
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
        className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full filter blur-[90px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--rose) / 0.1), hsl(var(--orange) / 0.08))' }}
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />
      <motion.div
        className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full filter blur-[80px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--violet) / 0.1), hsl(var(--amber) / 0.06))' }}
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 9,
        }}
      />
      
      {/* Moving gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full filter blur-[70px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--cyan) / 0.1))' }}
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
      <div className="absolute top-0 right-0 w-40 h-40 border-l border-b border-accent/10" />
      <div className="absolute bottom-0 left-0 w-40 h-40 border-r border-t border-cyan/10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 border-l border-t border-rose/10" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}

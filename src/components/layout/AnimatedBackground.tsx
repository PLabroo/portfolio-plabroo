import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />
      
      {/* Animated Dot Grid Pattern */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      
      {/* Radial gradient glow from center */}
      <div className="absolute inset-0 bg-radial-glow" />
      
      {/* Animated Blobs - more subtle and professional */}
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/15 rounded-full filter blur-[100px]"
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
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-accent/10 rounded-full filter blur-[120px]"
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
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full filter blur-[80px]"
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
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-br from-primary/20 to-accent/20 rounded-full filter blur-[60px]"
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

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}

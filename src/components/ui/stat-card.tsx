import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

export function StatCard({ value, label, delay = 0, className }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "glass-card rounded-2xl p-4 text-center group cursor-default",
        className
      )}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500" />
      
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <motion.div 
          className="text-2xl sm:text-3xl font-display font-bold gradient-text"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          {value}
        </motion.div>
        <div className="text-xs sm:text-sm text-muted-foreground mt-1">
          {label}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-br from-primary/20 to-accent/20 -z-10" />
    </motion.div>
  );
}

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface BentoCardProps {
  title: string;
  subtitle: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'gradient' | 'glow';
}

export function BentoCard({ 
  title, 
  subtitle, 
  description, 
  icon,
  className,
  delay = 0,
  variant = 'default'
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
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
      className={cn(
        "glass-card rounded-3xl p-6 relative overflow-hidden group cursor-default",
        variant === 'gradient' && "bg-gradient-to-br from-primary/10 to-accent/10",
        variant === 'glow' && "glow",
        className
      )}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100"
        initial={false}
        transition={{ duration: 0.5 }}
      />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
      
      {/* Content */}
      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        {icon && (
          <motion.div 
            className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>
        )}
        <div className="mb-1">
          <span className="text-2xl lg:text-3xl font-display font-bold gradient-text">
            {title}
          </span>
        </div>
        <h3 className="font-semibold text-foreground mb-2">{subtitle}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Decorative animated element */}
      <motion.div 
        className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

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
  variant?: 'default' | 'gradient' | 'glow' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'violet';
}

const variantStyles = {
  default: {
    bg: '',
    glow: 'from-primary/20 to-accent/20',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  gradient: {
    bg: 'bg-gradient-to-br from-primary/10 via-accent/5 to-cyan/10',
    glow: 'from-primary/30 to-accent/30',
    iconBg: 'bg-gradient-to-br from-primary/20 to-accent/20',
    iconColor: 'text-primary',
  },
  glow: {
    bg: '',
    glow: 'from-primary/25 to-cyan/25',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-cyan/10 to-emerald/5',
    glow: 'from-cyan/30 to-emerald/30',
    iconBg: 'bg-cyan/10',
    iconColor: 'text-cyan',
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald/10 to-cyan/5',
    glow: 'from-emerald/30 to-cyan/30',
    iconBg: 'bg-emerald/10',
    iconColor: 'text-emerald',
  },
  rose: {
    bg: 'bg-gradient-to-br from-rose/10 to-orange/5',
    glow: 'from-rose/30 to-orange/30',
    iconBg: 'bg-rose/10',
    iconColor: 'text-rose',
  },
  amber: {
    bg: 'bg-gradient-to-br from-amber/10 to-orange/5',
    glow: 'from-amber/30 to-orange/30',
    iconBg: 'bg-amber/10',
    iconColor: 'text-amber',
  },
  violet: {
    bg: 'bg-gradient-to-br from-violet/10 to-accent/5',
    glow: 'from-violet/30 to-accent/30',
    iconBg: 'bg-violet/10',
    iconColor: 'text-violet',
  },
};

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

  const styles = variantStyles[variant];

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
        styles.bg,
        variant === 'glow' && "glow",
        className
      )}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100",
          styles.glow.replace('from-', 'from-').replace('/30', '/10').replace('/25', '/10')
        )}
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
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-4",
              styles.iconBg,
              styles.iconColor
            )}
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
        className={cn(
          "absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl bg-gradient-to-br",
          styles.glow
        )}
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
      <div className={cn(
        "absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        styles.glow.replace('from-', 'from-').replace('/30', '/20').replace('/25', '/20')
      )} />
    </motion.div>
  );
}

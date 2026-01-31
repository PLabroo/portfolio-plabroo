import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  title: string;
  subtitle: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ 
  title, 
  subtitle, 
  description, 
  icon,
  className,
  delay = 0 
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(
        "glass rounded-3xl p-6 relative overflow-hidden group cursor-default",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
            {icon}
          </div>
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

      {/* Decorative element */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
    </motion.div>
  );
}

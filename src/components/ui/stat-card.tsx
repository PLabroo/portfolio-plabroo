import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
  className?: string;
}

export function StatCard({ value, label, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "glass rounded-2xl p-4 text-center",
        className
      )}
    >
      <div className="text-2xl sm:text-3xl font-display font-bold gradient-text">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground mt-1">
        {label}
      </div>
    </motion.div>
  );
}

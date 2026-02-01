import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypingCodeBlockProps {
  filename: string;
  code: string;
  className?: string;
  typingSpeed?: number;
}

export function TypingCodeBlock({ 
  filename, 
  code, 
  className,
  typingSpeed = 30 
}: TypingCodeBlockProps) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [code, typingSpeed, isInView]);

  // Simple syntax highlighting
  const highlightCode = (text: string) => {
    return text
      .replace(/(const|let|var|function|return|export|import|from|type|interface)/g, '<span class="text-primary">$1</span>')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-accent">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground italic">$1</span>')
      .replace(/(\d+)/g, '<span class="text-orange-400 dark:text-orange-300">$1</span>')
      .replace(/(true|false|null|undefined|Infinity)/g, '<span class="text-orange-400 dark:text-orange-300">$1</span>');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "glass-card rounded-2xl overflow-hidden relative group",
        className
      )}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-card/50 relative z-10">
        <div className="flex gap-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-red-400"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-yellow-400"
            whileHover={{ scale: 1.2 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-green-400"
            whileHover={{ scale: 1.2 }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{filename}</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">live</span>
        </div>
      </div>
      
      {/* Code with typing animation */}
      <div className="p-4 overflow-x-auto scrollbar-hide relative z-10 min-h-[200px]">
        <pre className="font-mono text-sm leading-relaxed">
          <code 
            dangerouslySetInnerHTML={{ __html: highlightCode(displayedCode) }}
          />
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
            />
          )}
        </pre>
      </div>

      {/* Line numbers glow */}
      <div className="absolute left-0 top-12 bottom-0 w-8 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

      {/* Floating decorations */}
      <motion.div 
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </motion.div>
  );
}

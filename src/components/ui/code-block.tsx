import { motion } from 'framer-motion';

interface CodeBlockProps {
  filename: string;
  code: string;
  className?: string;
}

export function CodeBlock({ filename, code, className }: CodeBlockProps) {
  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(const|let|var|function|return|export|import|from)/g, '<span class="text-primary">$1</span>')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-accent">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground italic">$1</span>')
      .replace(/(\d+)/g, '<span class="text-orange-400 dark:text-orange-300">$1</span>')
      .replace(/(true|false|null|undefined|Infinity)/g, '<span class="text-orange-400 dark:text-orange-300">$1</span>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`glass rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{filename}</span>
      </div>
      
      {/* Code */}
      <pre className="p-4 overflow-x-auto scrollbar-hide">
        <code 
          className="font-mono text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
        />
      </pre>

      {/* Floating decorations */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
    </motion.div>
  );
}

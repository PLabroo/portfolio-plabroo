import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const codeSymbols = [
  '{', '}', '(', ')', '[', ']', '<', '>', '/', '\\',
  ';', ':', '=', '+', '-', '*', '%', '&', '|', '!',
  '?', '#', '@', '$', '^', '~', '`', '"', "'", ',',
  'const', 'let', 'var', 'function', 'return', 'if',
  'else', 'for', 'while', 'class', 'import', 'export',
  '=>', '===', '!==', '&&', '||', '...', '++', '--',
  'async', 'await', 'try', 'catch', 'null', 'true',
  'false', 'undefined', 'this', 'new', 'typeof',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'React', 'useState', 'useEffect', 'props', 'state',
];

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function CodeBackground() {
  const symbols = useRef<FloatingSymbol[]>([]);

  if (symbols.current.length === 0) {
    symbols.current = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 10,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Starfield effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating code symbols */}
      {symbols.current.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute font-mono text-primary/20 select-none"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            opacity: symbol.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, Math.random() * 20 - 10, 0],
            opacity: [symbol.opacity, symbol.opacity * 1.5, symbol.opacity],
          }}
          transition={{
            duration: symbol.duration,
            repeat: Infinity,
            delay: symbol.delay,
            ease: 'easeInOut',
          }}
        >
          {symbol.symbol}
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

import { useMemo } from 'react';

const codeSymbols = [
  '{', '}', '(', ')', '[', ']', '<', '>',
  ';', ':', '=', '+', '-', '*', '&', '|',
  'const', 'let', 'function', 'return', 'if',
  '=>', '===', '&&', '||', '...',
  'async', 'await', 'null', 'true', 'false',
  '0', '1', '2', '3', '4', '5',
  'React', 'useState', 'props',
];

interface FloatingSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
}

export function CodeBackground() {
  // Generate symbols only once with useMemo
  const symbols = useMemo<FloatingSymbol[]>(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 10,
      opacity: Math.random() * 0.15 + 0.05,
      animationDelay: `${Math.random() * -10}s`,
      animationDuration: `${Math.random() * 10 + 15}s`,
    }))
  , []);

  // Generate stars only once
  const stars = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 2 + 2}s`,
    }))
  , []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Starfield effect - CSS animation only */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Floating code symbols - CSS animation only */}
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="absolute font-mono text-primary/20 select-none animate-float"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: `${symbol.size}px`,
            opacity: symbol.opacity,
            animationDelay: symbol.animationDelay,
            animationDuration: symbol.animationDuration,
          }}
        >
          {symbol.symbol}
        </div>
      ))}

      {/* Static gradient orbs */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
          left: '10%',
          top: '20%',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
        }}
      />

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
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

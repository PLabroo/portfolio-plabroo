export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Mesh Gradient Overlay - Static for performance */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
      
      {/* Primary Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Radial gradient glow from center */}
      <div className="absolute inset-0 bg-radial-glow" />
      
      {/* Static Gradient Blobs - No animation for performance */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full filter blur-[100px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--accent) / 0.08))' }}
      />
      <div
        className="absolute top-1/4 -left-40 w-[400px] h-[400px] rounded-full filter blur-[80px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--cyan) / 0.1), hsl(var(--emerald) / 0.06))' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full filter blur-[70px]"
        style={{ background: 'linear-gradient(135deg, hsl(var(--rose) / 0.08), hsl(var(--orange) / 0.06))' }}
      />

      {/* Grid Crosshairs at corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-r border-b border-primary/10" />
      <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-accent/10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-cyan/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-l border-t border-rose/10" />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}

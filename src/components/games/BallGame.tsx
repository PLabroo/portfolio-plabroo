import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 12;
const BALL_SIZE = 12;
const BRICK_ROWS = 4;
const BRICK_COLS = 8;
const BRICK_WIDTH = CANVAS_WIDTH / BRICK_COLS - 4;
const BRICK_HEIGHT = 20;

interface Brick {
  x: number;
  y: number;
  active: boolean;
  color: string;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--amber))',
  'hsl(var(--emerald))',
];

export function BallGame() {
  const [paddleX, setPaddleX] = useState(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2);
  const [ball, setBall] = useState({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, vx: 3, vy: -3 });
  const [bricks, setBricks] = useState<Brick[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const initBricks = useCallback(() => {
    const newBricks: Brick[] = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        newBricks.push({
          x: col * (BRICK_WIDTH + 4) + 2,
          y: row * (BRICK_HEIGHT + 4) + 30,
          active: true,
          color: COLORS[row % COLORS.length],
        });
      }
    }
    return newBricks;
  }, []);

  const resetGame = () => {
    setPaddleX(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2);
    setBall({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, vx: 3, vy: -3 });
    setBricks(initBricks());
    setIsPlaying(false);
    setGameOver(false);
    setWon(false);
    setScore(0);
  };

  useEffect(() => {
    setBricks(initBricks());
  }, [initBricks]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isPlaying) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - PADDLE_WIDTH / 2;
      setPaddleX(Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, x)));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !isPlaying) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left - PADDLE_WIDTH / 2;
      setPaddleX(Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, x)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || gameOver || won) return;

    const gameLoop = setInterval(() => {
      setBall((prev) => {
        let { x, y, vx, vy } = prev;
        x += vx;
        y += vy;

        // Wall collisions
        if (x <= 0 || x >= CANVAS_WIDTH - BALL_SIZE) vx = -vx;
        if (y <= 0) vy = -vy;

        // Paddle collision
        if (
          y >= CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_SIZE - 5 &&
          y <= CANVAS_HEIGHT - PADDLE_HEIGHT &&
          x >= paddleX &&
          x <= paddleX + PADDLE_WIDTH
        ) {
          vy = -Math.abs(vy);
          // Adjust angle based on where ball hits paddle
          const hitPos = (x - paddleX) / PADDLE_WIDTH;
          vx = (hitPos - 0.5) * 8;
        }

        // Bottom - game over
        if (y >= CANVAS_HEIGHT) {
          setGameOver(true);
          setIsPlaying(false);
        }

        // Brick collisions
        setBricks((prevBricks) => {
          let hitBrick = false;
          const newBricks = prevBricks.map((brick) => {
            if (
              brick.active &&
              x + BALL_SIZE >= brick.x &&
              x <= brick.x + BRICK_WIDTH &&
              y + BALL_SIZE >= brick.y &&
              y <= brick.y + BRICK_HEIGHT
            ) {
              hitBrick = true;
              setScore((s) => s + 10);
              return { ...brick, active: false };
            }
            return brick;
          });

          if (hitBrick) {
            vy = -vy;
          }

          // Check win condition
          if (newBricks.every((b) => !b.active)) {
            setWon(true);
            setIsPlaying(false);
          }

          return newBricks;
        });

        return { x, y, vx, vy };
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying, gameOver, won, paddleX]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="text-lg font-mono">
          Score: <span className="text-primary font-bold">{score}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={gameOver || won}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative bg-secondary/30 rounded-xl border border-border overflow-hidden cursor-none"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        {/* Bricks */}
        {bricks.map((brick, index) => (
          brick.active && (
            <motion.div
              key={index}
              className="absolute rounded-sm"
              style={{
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT,
                left: brick.x,
                top: brick.y,
                background: brick.color,
              }}
              initial={{ scale: 1 }}
              exit={{ scale: 0 }}
            />
          )
        ))}

        {/* Ball */}
        <motion.div
          className="absolute rounded-full bg-foreground"
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            left: ball.x,
            top: ball.y,
            boxShadow: '0 0 10px hsl(var(--primary) / 0.5)',
          }}
        />

        {/* Paddle */}
        <motion.div
          className="absolute rounded-full bg-primary"
          style={{
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            left: paddleX,
            top: CANVAS_HEIGHT - PADDLE_HEIGHT - 5,
          }}
        />

        {/* Game Over overlay */}
        {(gameOver || won) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <p className={`text-2xl font-bold mb-2 ${won ? 'text-success' : 'text-destructive'}`}>
              {won ? 'You Won!' : 'Game Over!'}
            </p>
            <p className="text-muted-foreground">Final Score: {score}</p>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">Move mouse or touch to control the paddle</p>
    </div>
  );
}

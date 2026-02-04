import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 280;
const PADDLE_WIDTH = 70;
const PADDLE_HEIGHT = 10;
const BALL_SIZE = 10;
const BRICK_ROWS = 4;
const BRICK_COLS = 7;
const BRICK_WIDTH = (CANVAS_WIDTH - 8) / BRICK_COLS - 4;
const BRICK_HEIGHT = 18;

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
  const gameLoopRef = useRef<number | null>(null);
  const paddleRef = useRef(paddleX);

  const initBricks = useCallback(() => {
    const newBricks: Brick[] = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        newBricks.push({
          x: col * (BRICK_WIDTH + 4) + 6,
          y: row * (BRICK_HEIGHT + 4) + 30,
          active: true,
          color: COLORS[row % COLORS.length],
        });
      }
    }
    return newBricks;
  }, []);

  const resetGame = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setPaddleX(CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2);
    paddleRef.current = CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2;
    setBall({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, vx: 3, vy: -3 });
    setBricks(initBricks());
    setIsPlaying(false);
    setGameOver(false);
    setWon(false);
    setScore(0);
  }, [initBricks]);

  useEffect(() => {
    setBricks(initBricks());
  }, [initBricks]);

  useEffect(() => {
    paddleRef.current = paddleX;
  }, [paddleX]);

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

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleTouchMove);
    }
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || gameOver || won) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    let ballState = { ...ball };
    let brickState = [...bricks];
    let currentScore = score;

    const gameLoop = () => {
      let { x, y, vx, vy } = ballState;
      x += vx;
      y += vy;

      // Wall collisions
      if (x <= 0 || x >= CANVAS_WIDTH - BALL_SIZE) {
        vx = -vx;
        x = Math.max(0, Math.min(CANVAS_WIDTH - BALL_SIZE, x));
      }
      if (y <= 0) {
        vy = -vy;
        y = 0;
      }

      // Paddle collision
      const currentPaddleX = paddleRef.current;
      if (
        y >= CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_SIZE - 5 &&
        y <= CANVAS_HEIGHT - PADDLE_HEIGHT &&
        x + BALL_SIZE >= currentPaddleX &&
        x <= currentPaddleX + PADDLE_WIDTH
      ) {
        vy = -Math.abs(vy);
        const hitPos = (x - currentPaddleX + BALL_SIZE / 2) / PADDLE_WIDTH;
        vx = (hitPos - 0.5) * 6;
        y = CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_SIZE - 6;
      }

      // Bottom - game over
      if (y >= CANVAS_HEIGHT) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      // Brick collisions
      let hitBrick = false;
      brickState = brickState.map((brick) => {
        if (
          brick.active &&
          x + BALL_SIZE >= brick.x &&
          x <= brick.x + BRICK_WIDTH &&
          y + BALL_SIZE >= brick.y &&
          y <= brick.y + BRICK_HEIGHT
        ) {
          hitBrick = true;
          currentScore += 10;
          return { ...brick, active: false };
        }
        return brick;
      });

      if (hitBrick) {
        vy = -vy;
        setBricks(brickState);
        setScore(currentScore);

        if (brickState.every((b) => !b.active)) {
          setWon(true);
          setIsPlaying(false);
          return;
        }
      }

      ballState = { x, y, vx, vy };
      setBall(ballState);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameOver, won]);

  const togglePlay = () => {
    if (gameOver || won) {
      resetGame();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

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
            onClick={togglePlay}
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
        className="relative bg-secondary/30 rounded-xl border border-border overflow-hidden cursor-none select-none"
        style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
      >
        {/* Bricks */}
        {bricks.map((brick, index) => (
          brick.active && (
            <div
              key={index}
              className="absolute rounded-sm transition-opacity duration-150"
              style={{
                width: BRICK_WIDTH,
                height: BRICK_HEIGHT,
                left: brick.x,
                top: brick.y,
                background: brick.color,
              }}
            />
          )
        ))}

        {/* Ball */}
        <div
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
        <div
          className="absolute rounded-full bg-primary"
          style={{
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            left: paddleX,
            top: CANVAS_HEIGHT - PADDLE_HEIGHT - 5,
          }}
        />

        {/* Game Over / Won overlay */}
        {(gameOver || won) && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <p className={`text-2xl font-bold mb-2 ${won ? 'text-success' : 'text-destructive'}`}>
              {won ? 'You Won!' : 'Game Over!'}
            </p>
            <p className="text-muted-foreground mb-4">Final Score: {score}</p>
            <Button onClick={resetGame} size="sm">Play Again</Button>
          </div>
        )}

        {/* Start overlay */}
        {!isPlaying && !gameOver && !won && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <p className="text-lg font-semibold mb-2">Breakout</p>
            <Button onClick={togglePlay} size="sm">
              <Play className="h-4 w-4 mr-2" /> Start
            </Button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">Move mouse or touch to control the paddle</p>
    </div>
  );
}

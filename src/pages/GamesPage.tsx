import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  CodeBackground,
  SnakeGame,
  BallGame,
  MemoryGame,
  TypingGame,
  GuessOutputGame,
} from '@/components/games';

type GameType = 'snake' | 'ball' | 'memory' | 'typing' | 'guess' | null;

const games = [
  {
    id: 'snake' as GameType,
    title: 'Snake Game',
    description: 'Classic snake game - eat food and grow!',
    icon: '🐍',
    color: 'from-emerald/20 to-cyan/20 border-emerald/30',
  },
  {
    id: 'ball' as GameType,
    title: 'Breakout',
    description: 'Break all bricks with the bouncing ball',
    icon: '🎾',
    color: 'from-primary/20 to-amber/20 border-primary/30',
  },
  {
    id: 'memory' as GameType,
    title: 'Memory Match',
    description: 'Match pairs of code symbols',
    icon: '🧠',
    color: 'from-violet/20 to-rose/20 border-violet/30',
  },
  {
    id: 'typing' as GameType,
    title: 'Code Typing',
    description: 'Test your typing speed with code snippets',
    icon: '⌨️',
    color: 'from-amber/20 to-orange/20 border-amber/30',
  },
  {
    id: 'guess' as GameType,
    title: 'Guess the Output',
    description: 'Predict what JavaScript code will output',
    icon: '🤔',
    color: 'from-rose/20 to-primary/20 border-rose/30',
  },
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        return <SnakeGame />;
      case 'ball':
        return <BallGame />;
      case 'memory':
        return <MemoryGame />;
      case 'typing':
        return <TypingGame />;
      case 'guess':
        return <GuessOutputGame />;
      default:
        return null;
    }
  };

  const currentGame = games.find((g) => g.id === selectedGame);

  return (
    <div className="relative min-h-screen">
      {/* Unique code background */}
      <CodeBackground />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold gradient-text">
              Code Games
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Take a break and have fun with these coding-themed mini games. Challenge yourself and improve your skills!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              {/* Back button and title */}
              <div className="w-full max-w-lg mb-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedGame(null)}
                  className="mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Games
                </Button>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentGame?.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{currentGame?.title}</h2>
                    <p className="text-sm text-muted-foreground">{currentGame?.description}</p>
                  </div>
                </div>
              </div>

              {/* Game container */}
              <motion.div
                className="w-full flex justify-center p-6 rounded-2xl glass-card"
                layoutId={`game-${selectedGame}`}
              >
                {renderGame()}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Game selection grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game, index) => (
                  <motion.button
                    key={game.id}
                    layoutId={`game-${game.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`group relative p-6 rounded-2xl bg-gradient-to-br ${game.color} border backdrop-blur-sm text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                        {game.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {game.description}
                        </p>
                      </div>
                    </div>

                    {/* Play indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        Play →
                      </div>
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Info section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-6 rounded-2xl glass text-center"
              >
                <h3 className="text-lg font-semibold mb-2">🎮 Why Games?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Playing games helps reinforce programming concepts, improves problem-solving skills, 
                  and makes learning more engaging. Plus, taking breaks with fun activities boosts productivity!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

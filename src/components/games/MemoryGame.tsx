import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const CODE_SYMBOLS = [
  '{ }', '( )', '[ ]', '< >', '= =', '! =',
  '& &', '| |', '= >', '+ +', '- -', '* *',
];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initGame = () => {
    const selectedSymbols = CODE_SYMBOLS.slice(0, 8);
    const cardPairs = [...selectedSymbols, ...selectedSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatches((m) => m + 1);
          setIsChecking(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const isWon = matches === 8;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <div className="flex gap-4">
          <div className="text-sm font-mono">
            Moves: <span className="text-primary font-bold">{moves}</span>
          </div>
          <div className="text-sm font-mono">
            Matches: <span className="text-emerald font-bold">{matches}/8</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={initGame}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="relative cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => handleCardClick(card.id)}
          >
            <motion.div
              className="relative w-16 h-20 sm:w-20 sm:h-24"
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front (hidden) */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-2xl text-primary/50">?</span>
              </div>

              {/* Back (shown when flipped) */}
              <motion.div
                className={`absolute inset-0 rounded-xl border flex items-center justify-center font-mono text-lg sm:text-xl font-bold ${
                  card.isMatched
                    ? 'bg-emerald/20 border-emerald text-emerald'
                    : 'bg-card border-primary text-primary'
                }`}
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                {card.symbol}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-success mb-1">🎉 You Won!</p>
            <p className="text-muted-foreground">Completed in {moves} moves</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground">Match pairs of code symbols</p>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
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

  const initGame = useCallback(() => {
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
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (cardId: number) => {
    if (isChecking) return;
    if (flippedCards.length === 2) return;
    
    const card = cards[cardId];
    if (card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c, i) => 
      i === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsChecking(true);

      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) => prev.map((c, i) => 
            i === first || i === second ? { ...c, isMatched: true } : c
          ));
          setFlippedCards([]);
          setMatches((m) => m + 1);
          setIsChecking(false);
        }, 400);
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) => prev.map((c, i) => 
            i === first || i === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 800);
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
          <div
            key={card.id}
            className="relative cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => handleCardClick(card.id)}
          >
            <div
              className={`relative w-14 h-18 sm:w-18 sm:h-22 transition-transform duration-300 ${
                card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                width: '3.5rem',
                height: '4.5rem',
              }}
            >
              {/* Front (hidden) */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-2xl text-primary/50">?</span>
              </div>

              {/* Back (shown when flipped) */}
              <div
                className={`absolute inset-0 rounded-xl border flex items-center justify-center font-mono text-sm sm:text-base font-bold ${
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {isWon && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-2xl font-bold text-success mb-1">🎉 You Won!</p>
          <p className="text-muted-foreground mb-4">Completed in {moves} moves</p>
          <Button onClick={initGame} size="sm">Play Again</Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">Match pairs of code symbols</p>
    </div>
  );
}

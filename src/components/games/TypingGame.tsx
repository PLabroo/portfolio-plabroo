import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';

const CODE_SNIPPETS = [
  'const sum = (a, b) => a + b;',
  'function hello() { return "world"; }',
  'const arr = [1, 2, 3].map(x => x * 2);',
  'if (isValid) { process(); }',
  'const { name, age } = user;',
  'async function fetch() { await api(); }',
  'export default App;',
  'import React from "react";',
  'useState(() => initialState);',
  'arr.filter(x => x > 0).length;',
  'const obj = { ...prev, new: val };',
  'try { parse(json); } catch (e) {}',
];

export function TypingGame() {
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);
  const [snippetsCompleted, setSnippetsCompleted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomSnippet = useCallback(() => {
    return CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
  }, []);

  const startGame = () => {
    const snippet = getRandomSnippet();
    setCurrentSnippet(snippet);
    setUserInput('');
    setIsPlaying(true);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
    setSnippetsCompleted(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const resetGame = () => {
    setCurrentSnippet('');
    setUserInput('');
    setIsPlaying(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
    setSnippetsCompleted(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying || isComplete) return;
    
    const value = e.target.value;
    
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === currentSnippet[i]) correct++;
    }
    const newAccuracy = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setAccuracy(newAccuracy);

    // Calculate WPM
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = value.length / 5;
      setWpm(timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0);
    }

    // Check completion
    if (value === currentSnippet) {
      const newCompleted = snippetsCompleted + 1;
      setSnippetsCompleted(newCompleted);
      
      if (newCompleted >= 3) {
        setIsComplete(true);
        setIsPlaying(false);
      } else {
        setCurrentSnippet(getRandomSnippet());
        setUserInput('');
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4">
          <div className="text-sm font-mono">
            WPM: <span className="text-primary font-bold">{wpm}</span>
          </div>
          <div className="text-sm font-mono">
            Accuracy: <span className={`font-bold ${accuracy >= 90 ? 'text-emerald' : accuracy >= 70 ? 'text-amber' : 'text-destructive'}`}>{accuracy}%</span>
          </div>
          <div className="text-sm font-mono">
            Progress: <span className="text-violet font-bold">{snippetsCompleted}/3</span>
          </div>
        </div>
        <div className="flex gap-2">
          {!isPlaying && !isComplete && (
            <Button variant="outline" size="sm" onClick={startGame}>
              <Play className="h-4 w-4 mr-1" /> Start
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full p-4 rounded-xl bg-secondary/30 border border-border min-h-[80px]">
        {currentSnippet ? (
          <div className="font-mono text-base leading-relaxed break-all">
            {currentSnippet.split('').map((char, index) => {
              let colorClass = 'text-muted-foreground';
              if (index < userInput.length) {
                colorClass = userInput[index] === char ? 'text-emerald' : 'text-destructive bg-destructive/20';
              } else if (index === userInput.length) {
                colorClass = 'text-foreground bg-primary/30 animate-pulse';
              }
              return (
                <span key={index} className={colorClass}>
                  {char}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Press Start to begin typing!</p>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        disabled={!isPlaying || isComplete}
        className="w-full p-3 rounded-xl bg-card border border-border font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        placeholder={isPlaying ? 'Start typing...' : 'Press Start to begin'}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />

      {isComplete && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4">
          <p className="text-2xl font-bold text-success mb-1">🎉 Complete!</p>
          <p className="text-muted-foreground mb-4">
            Final WPM: {wpm} | Accuracy: {accuracy}%
          </p>
          <Button onClick={startGame} size="sm">Play Again</Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">Type 3 code snippets as fast as you can!</p>
    </div>
  );
}

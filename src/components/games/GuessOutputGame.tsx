import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, ChevronRight, Check, X } from 'lucide-react';

interface Question {
  code: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    code: `console.log(typeof null);`,
    options: ['"null"', '"object"', '"undefined"', 'null'],
    correct: 1,
    explanation: 'typeof null returns "object" due to a historical bug in JavaScript.',
  },
  {
    code: `console.log(1 + "2" + 3);`,
    options: ['6', '"123"', '"15"', 'NaN'],
    correct: 1,
    explanation: 'JavaScript coerces numbers to strings when concatenating with +.',
  },
  {
    code: `console.log([1, 2, 3].map(x => x * 2)[1]);`,
    options: ['2', '4', '[2, 4, 6]', 'undefined'],
    correct: 1,
    explanation: 'map returns [2, 4, 6], and index [1] gives us 4.',
  },
  {
    code: `console.log([] == false);`,
    options: ['true', 'false', 'undefined', 'TypeError'],
    correct: 0,
    explanation: 'Empty array is coerced to "" which equals false in loose equality.',
  },
  {
    code: `console.log("b" + "a" + + "a" + "a");`,
    options: ['"baaa"', '"baNaNa"', '"ba a"', 'TypeError'],
    correct: 1,
    explanation: '+"a" tries to convert "a" to number, resulting in NaN.',
  },
  {
    code: `const a = [1]; const b = [1];
console.log(a == b);`,
    options: ['true', 'false', 'undefined', 'TypeError'],
    correct: 1,
    explanation: 'Arrays are compared by reference, not value. Different arrays are not equal.',
  },
  {
    code: `console.log(0.1 + 0.2 === 0.3);`,
    options: ['true', 'false', 'undefined', 'NaN'],
    correct: 1,
    explanation: 'Floating point arithmetic: 0.1 + 0.2 = 0.30000000000000004',
  },
  {
    code: `console.log(!!"false" === !!"true");`,
    options: ['true', 'false', 'undefined', 'TypeError'],
    correct: 0,
    explanation: 'Both are non-empty strings, so !! converts both to true.',
  },
  {
    code: `let x = 1;
let y = x++;
console.log(y);`,
    options: ['1', '2', 'undefined', 'NaN'],
    correct: 0,
    explanation: 'Post-increment returns the value before incrementing.',
  },
  {
    code: `console.log([..."hello"][0]);`,
    options: ['"hello"', '"h"', '["h"]', 'undefined'],
    correct: 1,
    explanation: 'Spread operator converts string to array of characters.',
  },
];

export function GuessOutputGame() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const shuffleQuestions = useCallback(() => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    shuffleQuestions();
  }, [shuffleQuestions]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || !questions[currentIndex]) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentIndex].correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (!currentQuestion && !isComplete) {
    return (
      <div className="flex items-center justify-center py-8">
        <Button onClick={shuffleQuestions}>Start Game</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4">
          <div className="text-sm font-mono">
            Question: <span className="text-primary font-bold">{currentIndex + 1}/{questions.length}</span>
          </div>
          <div className="text-sm font-mono">
            Score: <span className="text-emerald font-bold">{score}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={shuffleQuestions}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {!isComplete ? (
        <div className="w-full animate-in fade-in slide-in-from-right-4">
          {/* Code block */}
          <div className="w-full p-4 rounded-xl bg-secondary/50 border border-border mb-4 overflow-x-auto">
            <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
              {currentQuestion.code}
            </pre>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correct;
              let bgClass = 'bg-card hover:bg-secondary border-border';
              
              if (showResult) {
                if (isCorrect) bgClass = 'bg-emerald/20 border-emerald';
                else if (isSelected && !isCorrect) bgClass = 'bg-destructive/20 border-destructive';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-3 rounded-xl border text-left font-mono text-sm transition-all ${bgClass} disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span className="flex items-center gap-2">
                    {showResult && isCorrect && <Check className="h-4 w-4 text-emerald flex-shrink-0" />}
                    {showResult && isSelected && !isCorrect && <X className="h-4 w-4 text-destructive flex-shrink-0" />}
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="w-full p-3 rounded-xl bg-muted/50 border border-border mb-4 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {showResult && (
            <Button onClick={nextQuestion} className="w-full">
              {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-8 animate-in fade-in zoom-in">
          <p className="text-4xl mb-2">
            {score === questions.length ? '🏆' : score >= 3 ? '🎉' : '💪'}
          </p>
          <p className="text-2xl font-bold mb-2">
            {score === questions.length
              ? 'Perfect Score!'
              : score >= 3
              ? 'Great Job!'
              : 'Keep Learning!'}
          </p>
          <p className="text-muted-foreground mb-4">
            You got {score} out of {questions.length} correct
          </p>
          <Button onClick={shuffleQuestions}>Play Again</Button>
        </div>
      )}

      <p className="text-xs text-muted-foreground">Guess what the JavaScript code outputs</p>
    </div>
  );
}

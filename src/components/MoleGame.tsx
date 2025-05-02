import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose 
} from '@/components/ui/dialog';

interface MolePosition {
  top: number;
  left: number;
  id: number;
}

const MoleGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [moles, setMoles] = useState<MolePosition[]>([]);
  const [moleCount, setMoleCount] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<number>(1000); // начальная сложность

  // Начать игру
  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    setMoles([]);
    setMoleCount(0);
    setDifficulty(1000);
  }, []);

  // Обработчик клика по кроту
  const handleMoleClick = useCallback((id: number) => {
    setScore((prevScore) => prevScore + 1);
    setMoles((prevMoles) => prevMoles.filter((mole) => mole.id !== id));
    
    // Увеличиваем сложность с каждым попаданием
    if (score > 0 && score % 5 === 0) {
      setDifficulty((prevDiff) => Math.max(prevDiff - 100, 300));
    }
  }, [score]);

  // Обновляем время
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Добавляем кротов
  useEffect(() => {
    if (!isPlaying) return;

    const spawnMole = () => {
      const gameArea = document.getElementById('game-area');
      if (gameArea) {
        const { width, height } = gameArea.getBoundingClientRect();
        
        const newMole: MolePosition = {
          top: Math.random() * (height - 60),
          left: Math.random() * (width - 60),
          id: moleCount
        };
        
        setMoles((prevMoles) => [...prevMoles, newMole]);
        setMoleCount((prevCount) => prevCount + 1);
      }
    };

    const interval = setInterval(spawnMole, difficulty);
    return () => clearInterval(interval);
  }, [isPlaying, moleCount, difficulty]);

  // Удаляем кротов через время
  useEffect(() => {
    if (!isPlaying || moles.length === 0) return;

    const removeMoles = () => {
      setMoles((prevMoles) => {
        if (prevMoles.length > 0) {
          return prevMoles.slice(1);
        }
        return prevMoles;
      });
    };

    const interval = setInterval(removeMoles, 2000);
    return () => clearInterval(interval);
  }, [isPlaying, moles.length]);

  return (
    <div className="flex flex-col items-center justify-start p-4 w-full max-w-3xl mx-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="text-2xl font-bold">Счет: {score}</div>
        <div className="text-2xl font-bold">Время: {timeLeft}</div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <h1 className="text-3xl font-bold mb-2">Поймай крота! 🐭</h1>
          <p className="text-lg text-gray-600 mb-4">Кликай по кротам и набирай очки!</p>
          <Button onClick={startGame} size="lg">Начать игру</Button>
        </div>
      )}

      <div 
      <div 
        id="game-area"
        className="relative w-full bg-gray-700 rounded-lg border-4 border-gray-600"
      >
        {isPlaying && moles.map((mole) => (
          <div
            key={mole.id}
            className="absolute cursor-pointer transition-transform hover:scale-110"
            style={{
              top: `${mole.top}px`,
              left: `${mole.left}px`,
              width: '60px',
              height: '60px',
            }}
            onClick={() => handleMoleClick(mole.id)}
          >
            <div className="w-12 h-12 bg-brown-500 rounded-full flex items-center justify-center">
              <span role="img" aria-label="mole" className="text-2xl">🐹</span>
            </div>
          </div>
        ))}

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-bold text-gray-500">Нажми "Начать игру"</div>
          </div>
        )}
      </div>

      <Dialog open={gameOver} onOpenChange={(open) => !open && setGameOver(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Игра окончена!</DialogTitle>
            <DialogDescription>
              Твой финальный счет: {score}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={startGame}>Играть снова</Button>
            <DialogClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoleGame;
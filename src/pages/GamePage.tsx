import React from 'react';
import MoleGame from '@/components/MoleGame';

const GamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-800">Мини-игра "Поймай крота"</h1>
        <MoleGame />
      </div>
    </div>
  );
};

export default GamePage;
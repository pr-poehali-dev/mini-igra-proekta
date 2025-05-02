import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Добро пожаловать!</h1>
        <h1 className="text-4xl font-bold mb-4 text-blue-400">Добро пожаловать!</h1>
        <p className="text-xl text-gray-300 mb-6">Готовы проверить свою реакцию и точность?</p>
        
        <div className="flex justify-center">
          <Link to="/game">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Играть в "Поймай крота"
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-400">Кликайте по появляющимся кротам и набирайте очки!</p>
          <p className="text-sm text-gray-400 mt-2">Игра становится сложнее с каждым попаданием.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
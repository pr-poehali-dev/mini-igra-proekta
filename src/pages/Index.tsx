import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100">
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-orange-800">Добро пожаловать!</h1>
        <p className="text-xl text-gray-600 mb-6">Готовы проверить свою реакцию и точность?</p>
        
        <div className="flex justify-center">
          <Link to="/game">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Играть в "Поймай крота"
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">Кликайте по появляющимся кротам и набирайте очки!</p>
          <p className="text-sm text-gray-500 mt-2">Игра становится сложнее с каждым попаданием.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
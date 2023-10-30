import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import GameSettings from './components/gameSettings/gameSettings';
import MemoryGame from './components/memoryGame/memoryGame';
import ResultScreen from './components/resultScreen/resultScreen';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GameSettings />} />
          <Route path='/memory' element={<MemoryGame />} />
          <Route path='/result' element={<ResultScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

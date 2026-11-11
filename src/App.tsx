import React from 'react';
import { ProvedorJogo } from './JogoContext';
import { Tabuleiro } from './Tabuleiro';

const App: React.FC = () => {
  return (
    <ProvedorJogo>
      <Tabuleiro />
    </ProvedorJogo>
  );
};

export default App;

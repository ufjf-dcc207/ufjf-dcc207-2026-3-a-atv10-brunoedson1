import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import { jogoReducer, estadoInicial, type EstadoJogo, type AcaoJogo } from './jogo';

interface JogoContextType {
  estado: EstadoJogo;
  dispatch: React.Dispatch<AcaoJogo>;
}

const JogoContext = createContext<JogoContextType | undefined>(undefined);

export const ProvedorJogo = ({ children }: { children: ReactNode }) => {
  const [estado, dispatch] = useReducer(jogoReducer, estadoInicial);

  return (
    <JogoContext.Provider value={{ estado, dispatch }}>
      {children}
    </JogoContext.Provider>
  );
};

export const useJogo = (): JogoContextType => {
  const contexto = useContext(JogoContext);
  if (!contexto) {
    throw new Error('useJogo deve ser usado dentro de um ProvedorJogo');
  }
  return contexto;
};

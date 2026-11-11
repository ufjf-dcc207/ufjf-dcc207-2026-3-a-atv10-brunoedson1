import React from 'react';
import { useJogo } from './JogoContext';
import './Tabuleiro.css';

export const Tabuleiro: React.FC = () => {
  const { estado, dispatch } = useJogo();

  return (
    <div className="container-jogo">
      <h1 className="titulo-jogo">Magic Sort 🧪</h1>
      <h3>Movimentos: {estado.movimentos}</h3>

      {estado.venceu && <h2 className="mensagem-vitoria">🎉 Você Venceu! 🎉</h2>}

      <div className="area-tubos">
        {estado.tubos.map((tubo, indice) => {
          const estaSelecionado = estado.posicaoSelecionada === indice;

          return (
            <div key={indice} onClick={() => dispatch({ type: 'clicar', payload: indice })} className={`tubo ${estaSelecionado ? 'tubo-selecionado' : 'tubo-padrao'}`}>
                {tubo.map((cor, idx) => (
                    <span key={idx} className="esfera">{cor}</span>
                ))}
            </div>
          );
        })}
      </div>

      <button onClick={() => dispatch({ type: 'reiniciar' })} className="botao-reiniciar">
        Reiniciar Jogo
      </button>
    </div>
  );
};

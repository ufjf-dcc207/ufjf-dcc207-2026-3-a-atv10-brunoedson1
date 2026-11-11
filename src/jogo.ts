export const CAPACIDADE = 4;

export type Cor = '🔴' | '🔵' | '🟢' | '🟡';
export type Tubo = Cor[];

export interface EstadoJogo {
  tubos: Tubo[];
  posicaoSelecionada: number | null;
  movimentos: number;
  venceu: boolean;
}

export type AcaoJogo =
  | { type: 'clicar'; payload: number }
  | { type: 'reiniciar' };

export const estadoInicial: EstadoJogo = {
  tubos: [
    ['🔴', '🔵', '🔴', '🟢'], 
    ['🔵', '🟢', '🔵', '🔴'], 
    ['🟢', '🔴',], 
    ['🔵', '🟢'],                       
  ],
  posicaoSelecionada: null,
  movimentos: 0,
  venceu: false,
};

const verificarVitoria = (tubos: Tubo[]): boolean => {
  return tubos.every(tubo => {
    if (tubo.length === 0) return true; 
    if (tubo.length !== CAPACIDADE) return false;
    return tubo.every(cor => cor === tubo[0]);
  });
};

export const jogoReducer = (estado: EstadoJogo, acao: AcaoJogo): EstadoJogo => {
  switch (acao.type) {
    case 'clicar': {
      const indiceAlvo = acao.payload;

      if (estado.posicaoSelecionada === null) {
        if (estado.tubos[indiceAlvo].length === 0) return estado;
        return { ...estado, posicaoSelecionada: indiceAlvo };
      }

      if (estado.posicaoSelecionada === indiceAlvo) {
        return { ...estado, posicaoSelecionada: null };
      }

      const indiceOrigem = estado.posicaoSelecionada;
      const novosTubos = estado.tubos.map(tubo => [...tubo]);
      const tuboOrigem = novosTubos[indiceOrigem];
      const tuboDestino = novosTubos[indiceAlvo];

      const corParaMover = tuboOrigem[tuboOrigem.length - 1];
      const corNoTopoDoDestino = tuboDestino[tuboDestino.length - 1];

      const temEspacoNoDestino = tuboDestino.length < CAPACIDADE;
      const destinoAceitaCor = tuboDestino.length === 0 || corNoTopoDoDestino === corParaMover;

      if (temEspacoNoDestino && destinoAceitaCor) {
        tuboOrigem.pop();
        tuboDestino.push(corParaMover);

        return {
          ...estado,
          tubos: novosTubos,
          posicaoSelecionada: null,
          movimentos: estado.movimentos + 1,
          venceu: verificarVitoria(novosTubos),
        };
      }

      return {
        ...estado,
        posicaoSelecionada: tuboDestino.length > 0 ? indiceAlvo : null,
      };
    }

    case 'reiniciar':
      return estadoInicial;

    default:
      return estado;
  }
};

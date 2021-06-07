import { Imprimivel } from '../models/index';

export function imprime(...negociacoes: Imprimivel[]) {
  negociacoes.forEach(negociacao => negociacao.paraTexto());
}
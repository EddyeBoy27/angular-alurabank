import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {

  obterNegociacoes(handler: ResponseHandler): Promise<Negociacao[]> {

    return fetch('http://localhost:9090/dados')
      .then(res => handler(res))
      .then(res => res.json())
      .then((dados: NegociacaoParcial[]) =>
        dados
          .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
      )
      .catch(err => console.log(err));
  }
}

export interface ResponseHandler {
  (res: Response): Response
}
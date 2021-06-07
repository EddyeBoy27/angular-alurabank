import { MensagemView, NegociacoesView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';

let timer: number = 0;

export class NegociacaoController {
	@domInject('#data')
	private _inputData: JQuery;

	@domInject('#quantidade')
	private _inputQuantidade: JQuery;

	@domInject('#valor')
	private _inputValor: JQuery;
	private _negociacoes = new Negociacoes();
	private _negociacoesView = new NegociacoesView('#negociacoesView');
	private _mensagemView = new MensagemView('#mensagemView');
  private _service = new NegociacaoService();

	constructor() {
		this._negociacoesView.update(this._negociacoes);
	}

	@throttle()
	importarDados() {
		const isOk: ResponseHandler = (res: Response) => {
			if (res.ok) {
				return res;
			} else {
				throw new Error(res.statusText);
			}
		}
    this._service
      .obterNegociacoes(isOk)
      .then(negociacoes => {
        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao))
      });
        this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
	adiciona(event: Event) {
		const t1 = performance.now();
		event.preventDefault();

		let data = new Date(this._inputData.val().replace(/-/g, ','));

		if (!this._ehDiaUtil(data)) {
			this._mensagemView.update('Somente negociações em dias úteis, por favor!');
			return;
		}

		const negociacao = new Negociacao(data, parseInt(this._inputQuantidade.val()), parseFloat(this._inputValor.val()));

		this._negociacoes.adiciona(negociacao);
		this._negociacoesView.update(this._negociacoes);
		this._mensagemView.update('Negociação adicionada com sucesso!');
		const t2 = performance.now();
		console.log(`Tempo de execução do método adiciona(): ${(t2 - t1) / 1000} segundos`);
	}

	private _ehDiaUtil(data: Date) {
		return data.getDay() !== DiaDaSemana.Sabado && data.getDay() !== DiaDaSemana.Domingo;
	}
}

enum DiaDaSemana {
	Domingo,
	Segunda,
	Terca,
	Quarta,
	Quinta,
	Sexta,
	Sabado,
}

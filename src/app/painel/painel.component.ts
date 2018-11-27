import { Component, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/models/frase.model';
import { fraseList } from '../shared/services/frases-mock';

@Component({
	selector: 'app-painel',
	templateUrl: './painel.component.html',
	styleUrls: ['./painel.component.css']
})

export class PainelComponent {

	public instrucao = 'Traduza a frase: ';
	public fraseList: Array<Frase> = fraseList;
	public resposta = '';
	public rodada = 0;
	public rodadaFrase: Frase;
	public progresso = 0;
	public tentativas = 3;
	@Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

	constructor() {
		this.atualizarRodada();
	}

	public obterResposta(resposta: Event): void {
		this.resposta = (<HTMLInputElement>resposta.target).value;
	}

	public verificarResposta(): void {

		if (this.rodadaFrase.frasePtBr.toUpperCase() === this.resposta.toUpperCase()) {

			this.rodada++;
			this.progresso = this.progresso + (100 / this.fraseList.length);
			this.resposta = '';

			if (this.rodada >= this.fraseList.length) {
				this.encerrarJogo.emit('VITORIA');
			} else {
				this.atualizarRodada();
			}
		} else {
			this.tentativas--;

			if (this.tentativas === -1) {
				this.encerrarJogo.emit('DERROTA');
			}
		}
	}

	public atualizarRodada(): void {
		this.rodadaFrase = this.fraseList[this.rodada];
	}
}

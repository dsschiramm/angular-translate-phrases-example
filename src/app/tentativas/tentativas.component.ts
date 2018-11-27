import { Component, OnChanges, Input } from '@angular/core';
import { Coracao } from '../shared/models/coracao.model';

@Component({
	selector: 'app-tentativas',
	templateUrl: './tentativas.component.html',
	styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnChanges {

	@Input() public tentativas: number;

	public coracaoList: Array<Coracao> = [];

	constructor() { }

	ngOnChanges() {

		if (!this.coracaoList.length) {

			for (let i = 0; i < this.tentativas; i++) {
				this.coracaoList.push(new Coracao(true));
			}

		} else if (this.tentativas !== this.coracaoList.length) {

			const indice = (this.coracaoList.length - this.tentativas) - 1;
			this.coracaoList[indice].cheio = false;
		}
	}
}

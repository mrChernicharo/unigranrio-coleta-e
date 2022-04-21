export interface UF {
	id: number;
	nome: string;
	sigla: string;
	regiao: {
		id: number;
		nome: string;
		sigla: string;
	};
}

export interface City {
	id: string;
	microrregiao: {};
	nome: string;
	'regiao-imediata': {};
}

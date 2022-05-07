import { Location, PointFormValues } from './interfaces';

const initialPosition: Location = {
	lat: -22.91888,
	lng: -43.2217,
};
export const initialState = {
	initialPosition,
	initialZoom: 10,
};

export const formDefaultValues: PointFormValues = {
	address: '',
	email: '',
	image: '',
	name: '',
	phone: '',
	lat: 0,
	lng: 0,
	typesOfWaste: {
		small: false,
		large: false,
		info: false,
		battery: false,
	},
};

export const placeholderCity = {
	id: 'placeholder',
	nome: 'selecione a cidade',
	'regiao-imediata': {},
	microrregiao: {},
};

export const imgURLS = {
	defaultAvatarImg:
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iJYut0dHXchVowfmwoP8ZwAAAA%26pid%3DApi&f=1',
	defaultPointImg:
		'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2021%2F07%2F30%2Frio-de-janeiro-RIOTG0721.jpg&w=600&h=400&c=sc&poi=face&q=60',
};

// export const prodBaseURL =
// 	'https://unigranrio-coleta-e-mrchernicharo.vercel.app';
// export const devBaseURL = 'http://localhost:3000';

export const wasteTypesData = [
	{
		item: 'small',
		title: 'Itens Pequenos',
		description: 'Torradeiras, câmeras, rádios, etc.',
	},
	{
		item: 'large',
		title: 'Itens Grandes',
		description: 'Geladeiras, máquinas de lavar, ar condicionados, etc',
	},
	{
		item: 'info',
		title: 'Itens de Informática',
		description: 'Computadores, celulares, impressoras, monitores.',
	},
	{
		item: 'battery',
		title: 'Baterias',
		description: 'Pilhas, baterias e carregadores.',
	},
];

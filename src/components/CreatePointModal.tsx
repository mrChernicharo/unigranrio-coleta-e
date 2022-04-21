import axios from 'axios';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { City, UF } from '../lib/interfaces';

interface Props {
	handleModalClose: () => void;
}

export default function CreatePointModal({ handleModalClose }: Props) {
	const [UFs, setUFs] = useState<UF[]>([]);
	const [SelectedUF, setSelectedUF] = useState('RJ');
	const [cities, setCities] = useState<City[]>([]);
	const [SelectedCity, setSelectedCity] = useState('Rio de Janeiro');

	const UFSelectRef = useRef<HTMLSelectElement>(null);
	const citySelectRef = useRef<HTMLSelectElement>(null);

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log({ SelectedUF, SelectedCity });
	};

	const handleUFSelect = e => {
		setSelectedUF(UFSelectRef.current?.value!);
	};

	const handleCitySelect = e => {
		setSelectedCity(citySelectRef.current?.value!);
	};

	const fetchUFs = async () => {
		const response = await axios.get<UF[]>(
			'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
		);
		const { data } = response;

		console.log(data);
		return data;
	};

	const fetchCities = async (UF: string) => {
		const response = await axios.get<City[]>(
			`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`
		);
		const { data } = response;

		console.log(data);
		return data;
	};

	useEffect(() => {
		fetchUFs().then(ufs => setUFs(ufs));
	}, []);

	useEffect(() => {
		fetchCities(SelectedUF).then(cities => setCities(cities));
	}, [SelectedUF]);

	return (
		<>
			<div className="max-w-[600px] bg-white pb-4 relative z-50 mx-auto flex flex-col justify-center items-center border border-sky-500">
				<button
					onClick={handleModalClose}
					className="absolute right-2 top-2"
				>
					<FiX />
				</button>

				<br />
				<h1>Cadastrar novo ponto de coleta</h1>

				<form onSubmit={handleFormSubmit}>
					<select
						name="UFs"
						onChange={handleUFSelect}
						value={SelectedUF}
						ref={UFSelectRef}
					>
						{UFs &&
							UFs.map(uf => (
								<option key={uf.id} value={uf.sigla}>
									{uf.sigla}
								</option>
							))}
					</select>

					<select
						name="City"
						onChange={handleCitySelect}
						value={SelectedCity}
						ref={citySelectRef}
					>
						{cities &&
							cities.map(city => (
								<option key={city.id} value={city.nome}>
									{city.nome}
								</option>
							))}
					</select>

					<div>Mapa</div>

					<button type="submit">Confirmar</button>
				</form>
			</div>
			<div
				onClick={handleModalClose}
				className="w-screen h-screen absolute top-0 left-0 bg-indigo-300 opacity-50 z-40"
			></div>
		</>
	);
}

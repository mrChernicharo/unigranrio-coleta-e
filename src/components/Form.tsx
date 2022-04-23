import { CollectionPoint } from '@prisma/client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { placeholderCity } from '../lib/constants';
import { fetchCities, fetchUFs, postCreatePoint } from '../lib/functions';
import { City, UF } from '../lib/interfaces';
import { styles } from '../styles/styles';

export default function Form() {
	const [UFs, setUFs] = useState<UF[]>([]);
	const [SelectedUF, setSelectedUF] = useState('');
	const [cities, setCities] = useState<City[]>([]);
	const [SelectedCity, setSelectedCity] = useState('');
	const [address, setAddress] = useState('');
	const [name, setName] = useState('');

	const UFSelectRef = useRef<HTMLSelectElement>(null);
	const citySelectRef = useRef<HTMLSelectElement>(null);
	const addressInputRef = useRef<HTMLInputElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const point: Partial<CollectionPoint> = {
			name,
			UF: SelectedUF,
			city: SelectedCity,
			address,
			lat: -22.930489,
			lng: -43.361814,
			// lat: -22.930489039424334,
			// lng: -43.36181473091044,
		};
		await postCreatePoint(point);
	};

	const handleUFSelect = e => {
		setSelectedUF(UFSelectRef.current?.value!);
	};

	const handleCitySelect = e => {
		const inputVal = citySelectRef.current?.value;
		const city = inputVal === 'selecione a cidade' ? '' : inputVal;
		setSelectedCity(city!);
	};

	const handleAddressInput = e => {
		setAddress(addressInputRef.current?.value!);
	};

	const handleNameInput = e => {
		setName(nameInputRef.current?.value!);
	};

	useEffect(() => {
		fetchUFs().then(ufs => setUFs(ufs));
	}, []);

	useEffect(() => {
		if (SelectedUF)
			fetchCities(SelectedUF).then(cities =>
				setCities([placeholderCity, ...cities])
			);
		else setSelectedCity('');
	}, [SelectedUF]);
	return (
		<form className="h-full bg-sky-200" onSubmit={handleFormSubmit}>
			<div className="px-4 py-5 sm:px-8 ">
				<div className="grid grid-cols-6 gap-6">
					<>
						<div className="col-span-2 sm:col-span-1">
							<label htmlFor="UF" className={styles.fieldLabel}>
								UF
							</label>
							<select
								name="UF"
								id="UF"
								onChange={handleUFSelect}
								value={SelectedUF}
								ref={UFSelectRef}
								className={styles.input2}
							>
								<option value=""></option>
								{UFs &&
									UFs.map(uf => (
										<option key={uf.id} value={uf.sigla}>
											{uf.sigla}
										</option>
									))}
							</select>
						</div>
						<div className="col-span-4 sm:col-span-5">
							<label htmlFor="city" className={styles.fieldLabel}>
								Cidade
							</label>
							<select
								name="city"
								id="city"
								onChange={handleCitySelect}
								value={SelectedCity}
								ref={citySelectRef}
								className={styles.input2}
								disabled={!SelectedUF}
							>
								{cities &&
									cities.map(city => (
										<option key={city.id} value={city.nome}>
											{city.nome}
										</option>
									))}
							</select>
						</div>

						{SelectedCity && (
							<div className="col-span-6">
								{/* <GoogleMap /> */}
							</div>
						)}

						{SelectedCity && (
							<>
								<div className="col-span-6">
									<label
										htmlFor="address"
										className={styles.fieldLabel}
									>
										Endereço
									</label>
									<input
										ref={addressInputRef}
										onChange={handleAddressInput}
										type="text"
										name="address"
										id="address"
										className={styles.input2}
									/>
								</div>
								<div className="col-span-6">
									<label
										htmlFor="name"
										className={styles.fieldLabel}
									>
										Nome do Ponto de Coleta
									</label>
									<input
										ref={nameInputRef}
										onChange={handleNameInput}
										type="text"
										name="name"
										id="name"
										className={styles.input2}
									/>
								</div>
							</>
						)}

						{/* nameInputRef */}
					</>
				</div>
				<div className="fixed bottom-0 w-full right-0 px-4 py-3 bg-gray-100 text-right sm:px-6">
					<button type="submit" className={styles.btn}>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}

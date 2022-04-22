import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { placeholderCity } from '../lib/constants';
import { fetchCities, fetchUFs } from '../lib/functions';
import { City, UF } from '../lib/interfaces';
import { styles } from '../styles/styles';

export default function Form() {
	const [UFs, setUFs] = useState<UF[]>([]);
	const [SelectedUF, setSelectedUF] = useState('');
	const [cities, setCities] = useState<City[]>([]);
	const [SelectedCity, setSelectedCity] = useState('');

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

	useEffect(() => {
		fetchUFs().then(ufs => setUFs(ufs));
	}, []);

	useEffect(() => {
		if (SelectedUF)
			fetchCities(SelectedUF).then(cities =>
				setCities([placeholderCity, ...cities])
			);
	}, [SelectedUF]);
	return (
		<form onSubmit={handleFormSubmit}>
			<div className="w-full sm:w-[640px] mx-auto shadow overflow-hidden sm:rounded-md">
				<div className="px-4 py-5 sm:px-8">
					<div className="grid grid-cols-6 gap-6">
						<>
							<div className="col-span-2 sm:col-span-1">
								<label
									htmlFor="UF"
									className={styles.fieldLabel}
								>
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
											<option
												key={uf.id}
												value={uf.sigla}
											>
												{uf.sigla}
											</option>
										))}
								</select>
							</div>
							<div className="col-span-4 sm:col-span-5">
								<label
									htmlFor="city"
									className={styles.fieldLabel}
								>
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
											<option
												key={city.id}
												value={city.nome}
											>
												{city.nome}
											</option>
										))}
								</select>
							</div>
							{SelectedCity &&
								SelectedCity !== 'selecione a cidade' && (
									<div className="col-span-6">
										<label
											htmlFor="address"
											className={styles.fieldLabel}
										>
											Endereço
										</label>
										<input
											type="text"
											name="address"
											id="address"
											className={styles.input2}
										/>
									</div>
								)}
						</>
					</div>
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button type="submit" className={styles.btn}>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
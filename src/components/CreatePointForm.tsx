/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import { CollectionPoint } from '@prisma/client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useUserContext } from '../contexts/UserContext';
import { fetchAddressLatLng, postCreatePoint } from '../lib/functions';
import { CollectionPointWithAuthor, Geocode } from '../lib/interfaces';
import { styles } from '../styles/styles';
import GoogleMap from './GoogleMap';
import Marker from './Marker';
interface Props {
	onFormClose: () => void;
	onSend: (point: CollectionPointWithAuthor) => void;
}

export default function CreatePointForm({ onFormClose, onSend }: Props) {
	const { user } = useUserContext();
	const [address, setAddress] = useState('');
	const [imgURL, setImgURL] = useState('');
	const [geocodeAddresses, setGeocodeAddresses] = useState<Geocode[]>([]);
	const [geoCodeStatus, setGeoCodeStatus] = useState('');
	const [latLng, setLatLng] = useState<{ lat: number; lng: number }>();
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const addressInputRef = useRef<HTMLInputElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const phoneInputRef = useRef<HTMLInputElement>(null);
	const imgURLInputRef = useRef<HTMLInputElement>(null);
	const smallCheckboxRef = useRef<HTMLInputElement>(null);
	const largeCheckboxRef = useRef<HTMLInputElement>(null);
	const infoCheckboxRef = useRef<HTMLInputElement>(null);
	const batteriesCheckboxRef = useRef<HTMLInputElement>(null);

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const name = nameInputRef.current?.value;
		const email = emailInputRef.current?.value;
		const phone = phoneInputRef.current?.value;
		const imgURL = imgURLInputRef.current?.value;

		console.log({ address, name, email, phone, imgURL });
		if (!address || !name || !user) return;

		try {
			setIsLoading(true);
			const slib = [
				smallCheckboxRef.current?.checked,
				largeCheckboxRef.current?.checked,
				infoCheckboxRef.current?.checked,
				batteriesCheckboxRef.current?.checked,
			];

			const typesOfWaste = slib
				.map((item, i) => (item ? 'SLIB'[i] : '_'))
				.join('');

			const point: Partial<CollectionPoint> = {
				name,
				address,
				email,
				phone,
				typesOfWaste,
				lat: latLng?.lat,
				lng: latLng?.lng,
				image: imgURL,
				authorId: user?.id,
			};
			console.log(point);
			const newPoint = await postCreatePoint({ ...point });
			onSend({ ...newPoint, author: user });
			onFormClose();
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
			alert('Ponto de coleta cadastrado com sucesso!');
		}
	};

	const handleAddressInput = async e => {
		setAddress(addressInputRef.current?.value!);
	};

	const onFieldBlur = e => {
		const isValid = Boolean(
			addressInputRef.current?.value &&
				nameInputRef.current?.value &&
				emailInputRef.current?.value &&
				phoneInputRef.current?.value &&
				(smallCheckboxRef.current?.checked ||
					largeCheckboxRef.current?.checked ||
					infoCheckboxRef.current?.checked ||
					batteriesCheckboxRef.current?.checked)
		);
		console.log('onFieldBlur', isValid);
		setIsBtnDisabled(!isValid);
	};

	const onImgFieldChange = e => {
		setImgURL(imgURLInputRef.current?.value || '');
	};

	const handleAddressSearch = async e => {
		const data = await fetchAddressLatLng(addressInputRef.current?.value!);
		const { results, status } = data;

		const geoCode: Geocode[] = results;
		console.log({ geoCode });
		setGeoCodeStatus(status);
		setGeocodeAddresses(geoCode);
	};

	useEffect(() => {
		addressInputRef.current?.focus();
	}, []);
	useEffect(() => console.log(latLng), [latLng]);
	useEffect(() => console.log(geocodeAddresses), [geocodeAddresses]);

	if (isLoading)
		return (
			<form className="h-full bg-white" onSubmit={handleFormSubmit}>
				<div className="px-4 py-5 sm:px-8 ">
					<div className="flex justify-center">
						<img
							src="loading.svg"
							alt="loading"
							height={120}
							width={120}
						/>
					</div>
				</div>
			</form>
		);

	return (
		<form className="h-full bg-white" onSubmit={handleFormSubmit}>
			<div className="px-4 py-5 sm:px-8 ">
				<div className="grid grid-cols-6 gap-6">
					<div className="col-span-5">
						<label htmlFor="address" className={styles.fieldLabel}>
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
					<div className="col-span-1 flex pt-6">
						<button
							className={styles.submitBtn}
							onClick={handleAddressSearch}
						>
							<span>buscar</span>
						</button>
					</div>

					{geoCodeStatus === 'OK' && geocodeAddresses.length && (
						<div className="col-span-6">
							{geocodeAddresses.map((geo, i, arr) =>
								// prettier-ignore
								<div
									key={geo.place_id}
									onClick={() =>{
										setAddress(geo.formatted_address)
										setLatLng(geo.geometry.location)
									}}
									className={`p-2 border border-b-0 hover:bg-gray-50 cursor-pointer ${i === 0 && 'rounded-t-md'} ${i + 1 === arr.length &&'rounded-b-md  border-b'}`}
								>
									{geo.formatted_address}
								</div>
							)}
						</div>
					)}

					{/* prettier-ignore */}
					{geoCodeStatus === 'ZERO_RESULTS' && (
						<div className="col-span-6">
							<div className="p-2 hover:bg-gray-50 cursor-pointer rounded flex items-center">
								<FaExclamationTriangle />
								<span className="mx-2">
									Não conseguimos encontrar o endereço
									informado
								</span>
							</div>
						</div>
					)}

					{latLng && (
						<>
							<div className="col-span-6">
								<GoogleMap center={latLng} zoom={15}>
									<Marker
										position={latLng}
										// animation={markerAnimation}
									/>
								</GoogleMap>
							</div>

							{/* <div className="bg-white text-sky-500">
								<pre>click:{JSON.stringify(latLng)}</pre>
							</div> */}

							<div className="col-span-6">
								<label
									htmlFor="name"
									className={styles.fieldLabel}
								>
									Nome do Ponto de Coleta
								</label>
								<input
									ref={nameInputRef}
									onBlur={onFieldBlur}
									type="text"
									name="name"
									id="name"
									className={styles.input2}
								/>
							</div>

							<div className="col-span-4">
								<label
									htmlFor="email"
									className={styles.fieldLabel}
								>
									Email
								</label>
								<input
									ref={emailInputRef}
									onBlur={onFieldBlur}
									type="email"
									name="email"
									id="email"
									className={styles.input2}
								/>
							</div>

							<div className="col-span-2">
								<label
									htmlFor="phone"
									className={styles.fieldLabel}
								>
									Telefone
								</label>
								<input
									ref={phoneInputRef}
									// onChange={handlePhoneInput}
									onBlur={onFieldBlur}
									type="tel"
									name="phone"
									id="phone"
									className={styles.input2}
								/>
							</div>

							<div className="col-span-6">
								<h2 className="mb-4">
									Tipos de resíduos recolhidos
								</h2>
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											ref={smallCheckboxRef}
											id="small"
											name="small"
											type="checkbox"
											className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="small"
											className="font-medium text-gray-700"
										>
											Pequenos equipamentos
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											applies for a job.
										</p>
									</div>

									<div className="flex items-center h-5">
										<input
											ref={largeCheckboxRef}
											id="large"
											name="large"
											type="checkbox"
											className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="large"
											className="font-medium text-gray-700"
										>
											Itens Grandes
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											applies for a job.
										</p>
									</div>

									<div className="flex items-center h-5">
										<input
											ref={infoCheckboxRef}
											id="info"
											name="info"
											type="checkbox"
											className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="info"
											className="font-medium text-gray-700"
										>
											Itens de Informática
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											applies for a job.
										</p>
									</div>

									<div className="flex items-center h-5">
										<input
											ref={batteriesCheckboxRef}
											id="batteries"
											name="batteries"
											type="checkbox"
											className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="batteries"
											className="font-medium text-gray-700"
										>
											Baterias
										</label>
										<p className="text-gray-500">
											Get notified when a candidate
											applies for a job.
										</p>
									</div>
								</div>
							</div>

							<div className="col-span-6">
								<label
									htmlFor="image"
									className={styles.fieldLabel}
								>
									Imagem URL
								</label>
								<input
									ref={imgURLInputRef}
									onChange={onImgFieldChange}
									type="text"
									name="image"
									id="image"
									className={styles.input2}
								/>
							</div>
						</>
					)}
				</div>

				{imgURL && (
					<div className="bg-gray-100">
						<img
							src={imgURL}
							alt="imagem do ponto de coleta"
							className={'mx-auto'}
						/>
					</div>
				)}
				<div className="mt-8 mb-4 text-right">
					{latLng && (
						<button
							type="submit"
							className={`${styles.btn}`}
							disabled={isBtnDisabled}
						>
							Cadastrar Ponto
						</button>
					)}
				</div>
			</div>
		</form>
	);
}

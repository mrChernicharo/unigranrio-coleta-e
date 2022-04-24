/* eslint-disable @next/next/no-img-element */
import { CollectionPoint } from '@prisma/client';
// import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { imgURLS } from '../lib/constants';
import { fetchAddressLatLng, postCreatePoint } from '../lib/functions';
import { Geocode } from '../lib/interfaces';
import { styles } from '../styles/styles';
import GoogleMap from './GoogleMap';
import Marker from './Marker';
interface Props {
	onFormClose: () => void;
	onSend: (point: CollectionPoint) => void;
	userId: number;
}

export default function Form({ onFormClose, onSend, userId }: Props) {
	const [address, setAddress] = useState('');
	const [geocodeAddresses, setGeocodeAddresses] = useState<Geocode[]>([]);
	const [geoCodeStatus, setGeoCodeStatus] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [imgURL, setImgURL] = useState('');
	const [latLng, setLatLng] = useState<{ lat: number; lng: number }>();

	const addressInputRef = useRef<HTMLInputElement>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);
	const emailInputRef = useRef<HTMLInputElement>(null);
	const phoneInputRef = useRef<HTMLInputElement>(null);
	const imgURLInputRef = useRef<HTMLInputElement>(null);

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		console.log({ address, name, email, phone, imgURL, userId });
		if (!address || !name || !userId) return;

		try {
			const point: Partial<CollectionPoint> = {
				name,
				address,
				email,
				phone,
				lat: latLng?.lat,
				lng: latLng?.lng,
				image: imgURL ?? imgURLS.rio,
				authorId: userId,
			};
			const newPoint = await postCreatePoint({ ...point });
			onSend(newPoint);
			alert('Ponto de coleta cadastrado com sucesso!');
			onFormClose();
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddressInput = async e => {
		setAddress(addressInputRef.current?.value!);
	};

	const handleAddressSearch = async e => {
		const data = await fetchAddressLatLng(addressInputRef.current?.value!);
		const { results, status } = data;

		const geoCode: Geocode[] = results;
		setGeoCodeStatus(status);
		setGeocodeAddresses(geoCode);
	};

	const handleNameInput = e => {
		setName(nameInputRef.current?.value!);
	};

	const handlePhoneInput = e => {
		setPhone(phoneInputRef.current?.value!);
	};

	const handleEmailInput = e => {
		setEmail(emailInputRef.current?.value!);
	};

	const handleImgURLInput = e => {
		setImgURL(imgURLInputRef.current?.value!);
	};

	useEffect(() => console.log(latLng), [latLng]);
	useEffect(() => console.log(geocodeAddresses), [geocodeAddresses]);

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

							<div className="bg-white text-sky-500">
								<pre>click:{JSON.stringify(latLng)}</pre>
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

							<div className="col-span-4">
								<label
									htmlFor="email"
									className={styles.fieldLabel}
								>
									Email
								</label>
								<input
									ref={emailInputRef}
									onChange={handleEmailInput}
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
									onChange={handlePhoneInput}
									type="tel"
									name="phone"
									id="phone"
									className={styles.input2}
								/>
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
									onChange={handleImgURLInput}
									type="text"
									name="image"
									id="image"
									className={styles.input2}
								/>
							</div>
							{imgURL && (
								<div className={'w-auto h-auto'}>
									<img
										src={imgURL}
										alt="imagem do ponto de coleta"
									/>
								</div>
							)}
						</>
					)}
				</div>
				<div className="mt-8 mb-4 text-right">
					{latLng && (
						<button
							type="submit"
							className={`${styles.btn}`}
							disabled={!latLng || !name}
						>
							Cadastrar Ponto
						</button>
					)}
				</div>
			</div>
		</form>
	);
}

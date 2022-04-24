/* eslint-disable @next/next/no-img-element */
import { CollectionPoint } from '@prisma/client';
// import Image from 'next/image';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { fetchAddressLatLng, getClickLatLng } from '../lib/functions';
import { styles } from '../styles/styles';
import GoogleMap from './GoogleMap';
interface Props {
	onFormClose: () => void;
	onSend: (point: CollectionPoint) => void;
}

export default function Form({ onFormClose, onSend }: Props) {
	const [address, setAddress] = useState('');
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
		console.log({ address, name, email, phone, imgURL });
		try {
			// const point: Partial<CollectionPoint> = {
			// 	name,
			// 	UF: SelectedUF,
			// 	city: SelectedCity,
			// 	address,
			// 	lat: latLng?.lat,
			// 	lng: latLng?.lng,
			// };

			// const newPoint = await postCreatePoint(point);
			// onSend(newPoint);

			await fetchAddressLatLng(addressInputRef.current?.value!);

			// alert('Ponto de coleta cadastrado com sucesso!');
			// onFormClose();
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddressInput = async e => {
		setAddress(addressInputRef.current?.value!);
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

	const handleLatLng = e => {
		const { lat, lng } = getClickLatLng(e);
		setLatLng(loc => ({ lat, lng }));
	};

	useEffect(() => console.log(latLng), [latLng]);

	return (
		<form className="h-full bg-white" onSubmit={handleFormSubmit}>
			<div className="px-4 py-5 sm:px-8 ">
				<div className="grid grid-cols-6 gap-6">
					<div className="col-span-6">
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

					<div className="col-span-6">
						<span>Clique no mapa</span>
						<GoogleMap onClick={handleLatLng} />
					</div>

					<div className="bg-white text-sky-500">
						<pre>click:{JSON.stringify(latLng)}</pre>
					</div>

					<div className="col-span-6">
						<label htmlFor="name" className={styles.fieldLabel}>
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
						<label htmlFor="email" className={styles.fieldLabel}>
							Email
						</label>
						<input
							ref={nameInputRef}
							onChange={handleNameInput}
							type="email"
							name="email"
							id="email"
							className={styles.input2}
						/>
					</div>

					<div className="col-span-2">
						<label htmlFor="phone" className={styles.fieldLabel}>
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
						<label htmlFor="image" className={styles.fieldLabel}>
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
						// <div className={'w-[576px] h-[500px]'}>
						<div className={'w-[206px] h-[500px]'}>
							<img src={imgURL} alt="imagem do ponto de coleta" />
						</div>
					)}
				</div>
				<div className="mt-8 mb-4 text-right">
					<button type="submit" className={styles.btn}>
						Cadastrar Ponto
					</button>
				</div>
			</div>
		</form>
	);
}

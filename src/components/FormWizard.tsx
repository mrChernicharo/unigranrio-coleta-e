/* eslint-disable @next/next/no-img-element */
import { FormikHelpers, useFormik } from 'formik';
import { FormEvent, useRef, useState } from 'react';
import {
	FaCheck,
	FaChevronCircleLeft,
	FaChevronCircleRight,
	FaExclamationTriangle,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { wasteTypesData } from '../lib/constants';
import { fetchAddressLatLng } from '../lib/functions';
import { Geocode, PointFormValues } from '../lib/interfaces';
import { styles } from '../styles/styles';
import GoogleMap from './GoogleMap';
import Marker from './Marker';

// prettier-ignore
interface Props {
	initialValues: PointFormValues;
	onSubmit: (values: PointFormValues, formikHelpers: FormikHelpers<PointFormValues>) => void | Promise<any>;
	mode: 'create' | 'edit';
	onCancel?: () => void
}

export default function Form({
	initialValues,
	onSubmit,
	mode,
	onCancel,
}: Props) {
	// prettier-ignore
	const { handleSubmit, handleChange, setFieldValue, values, validateForm } = 
        useFormik<PointFormValues>({ initialValues, onSubmit });

	const addressInputRef = useRef<HTMLInputElement>(null);

	const [formStep, setFormStep] = useState(1);
	const [geocodeAddresses, setGeocodeAddresses] = useState<Geocode[]>([]);
	const [geoCodeStatus, setGeoCodeStatus] = useState('');
	const [showMap, setShowMap] = useState(false);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const hasAtLeastOneTypeOfWaste = Object.keys(values.typesOfWaste).some(
			k => !!values.typesOfWaste[k]
		);
		const hasRequiredValues = Object.keys(values)
			.filter(v => ['name', 'email', 'address', 'lat', 'lng'].includes(v))
			.every(v => !!v);

		const isValidForm = hasRequiredValues && hasAtLeastOneTypeOfWaste;

		if (isValidForm) {
			handleSubmit(e);
		}
	};

	const handleAddressSearch = async () => {
		const data = await fetchAddressLatLng(addressInputRef.current?.value!);
		const { results, status } = data;

		const geoCode: Geocode[] = results;
		// console.log({ results, status, geoCode });
		setGeoCodeStatus(status);
		setGeocodeAddresses(geoCode);
		setShowMap(false);
	};

	const handleAddressSelect = geo => {
		setFieldValue('address', geo.formatted_address);
		setFieldValue('lat', geo.geometry.location.lat);
		setFieldValue('lng', geo.geometry.location.lng);
		(addressInputRef.current as any).value = geo.formatted_address;
		setShowMap(true);
	};

	const isValidStep = step => {
		const stepChecks = {
			step1() {
				return (
					(values.address && values.lat && values.lng && showMap) ||
					mode === 'edit'
				);
			},
			step2() {
				return values.name && values.email && values.phone;
			},
			step3() {
				return Object.keys(values.typesOfWaste).some(
					k => values.typesOfWaste[k]
				);
			},
			step4() {
				return values.name && values.email && values.phone;
			},
		};

		const func = `step${step}`;
		return stepChecks[func]();
	};

	return (
		<div>
			<div className="px-4 py-5 sm:px-8 ">
				<form onSubmit={handleFormSubmit}>
					<div className="grid grid-cols-6 gap-6">
						{formStep === 1 && (
							<>
								<div className="col-span-6 sm:col-span-5">
									<label
										htmlFor="address"
										className={styles.fieldLabel}
									>
										Endereço
									</label>
									<input
										ref={addressInputRef}
										type="text"
										name="address"
										className={styles.input2}
										defaultValue={values.address}
									/>
								</div>
								<div className="col-span-6 sm:col-span-1 flex pt-0 sm:pt-6">
									<button
										onClick={handleAddressSearch}
										className={styles.submitBtn}
									>
										<span>buscar</span>
									</button>
								</div>

								{geoCodeStatus === 'OK' &&
									geocodeAddresses.length &&
									!showMap && (
										<div className="col-span-6">
											<ul>
												{geocodeAddresses.map(
													(geo, i, arr) =>
														// prettier-ignore
														<li
															key={geo.place_id}
															onClick={() => handleAddressSelect(geo)}
															className={`p-2 border border-b-0 hover:bg-indigo-50 cursor-pointer
																${i === 0 && 'rounded-t-md'} 
																${i + 1 === arr.length && 'rounded-b-md  border-b'}
																${geo.formatted_address === values.address && 'ring-inset ring-2'}`
															}
														>
														{geo.formatted_address}
													</li>
												)}
											</ul>
										</div>
									)}

								{/* prettier-ignore */}
								{geoCodeStatus === 'ZERO_RESULTS' && (
									<div className="col-span-6">
										<div className="p-2 hover:bg-gray-50 cursor-pointer rounded flex items-center">
											<FaExclamationTriangle />
											<span className="mx-2">
												Não conseguimos encontrar o
												endereço informado
											</span>
										</div>
									</div>
								)}

								{(showMap || mode === 'edit') && (
									<div className="col-span-6">
										<GoogleMap
											center={{
												lat: values.lat,
												lng: values.lng,
											}}
											zoom={15}
										>
											<Marker
												position={{
													lat: values.lat,
													lng: values.lng,
												}}
												// animation={markerAnimation}
											/>
										</GoogleMap>
									</div>
								)}
							</>
						)}

						{formStep === 2 && (
							<>
								<div className="mb-0 sm:-mb-2 col-span-6">
									<label
										htmlFor="name"
										className={styles.fieldLabel}
									>
										Nome do Ponto de Coleta
									</label>
									<input
										onChange={handleChange}
										value={values.name}
										type="text"
										name="name"
										className={styles.input2}
									/>
								</div>

								<div className="col-span-6 sm:col-span-4">
									<label
										htmlFor="email"
										className={styles.fieldLabel}
									>
										Email
									</label>
									<input
										onChange={handleChange}
										value={values.email}
										type="email"
										name="email"
										className={styles.input2}
									/>
								</div>

								<div className="col-span-6 sm:col-span-2">
									<label
										htmlFor="phone"
										className={styles.fieldLabel}
									>
										Telefone
									</label>
									<input
										onChange={handleChange}
										value={values.phone}
										type="tel"
										name="phone"
										id="phone"
										className={styles.input2}
									/>
								</div>
							</>
						)}
						{formStep === 3 && (
							<>
								<div className="col-span-6">
									<fieldset>
										<h2 className="mb-4">
											Tipos de resíduos recolhidos
										</h2>
										<div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
											{wasteTypesData.map(wasteType => {
												// prettier-ignore
												return (
													<div
														key={wasteType.item}
														className=""
													>
														<div className="inline float-left">
															<input
																onChange={handleChange}
																name={`typesOfWaste.${wasteType.item}`}
																id={`typesOfWaste.${wasteType.item}`}
																type="checkbox"
																checked={values.typesOfWaste[wasteType.item]!}
																className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mr-2"
															/>
														</div>
														<div className="ml-3 text-sm">
															<label
																htmlFor={`typesOfWaste.${wasteType.item}`}
																className="font-medium text-gray-700"
															>
																<p className="text-md">
																	{wasteType.title}
																</p>
																<p className="text-gray-400 text-xs">
																	{wasteType.description}
																</p>
															</label>
														</div>
													</div>
												);
											})}
										</div>
									</fieldset>
								</div>
							</>
						)}

						{formStep === 4 && (
							<>
								<div className="col-span-6">
									<label
										htmlFor="image"
										className={styles.fieldLabel}
									>
										Imagem URL
									</label>
									<textarea
										onChange={handleChange}
										name="image"
										id="image"
										className={styles.input2}
										value={values.image}
									/>
									<p className="text-sm text-gray-400 text-right">
										*opcional
									</p>

									<div className="mt-4 bg-gray-100">
										{values.image ? (
											<img
												src={values.image}
												alt="imagem do ponto de coleta"
												className={
													'rounded-lg mx-auto max-h-[400px]'
												}
											/>
										) : (
											<div className="h-24 flex justify-center items-center">
												<span>Adicione uma imagem</span>
											</div>
										)}
									</div>
								</div>
							</>
						)}
					</div>
					<div className="w-full mt-8 flex">
						<div className="w-full flex justify-end">
							{mode === 'edit' && (
								<button
									type="button"
									onClick={onCancel}
									className={
										'flex items-center ' + styles.btn
									}
								>
									<span className="mr-2">Cancelar</span>
									<span>
										<FiX />
									</span>
								</button>
							)}
							{formStep > 1 && (
								<button
									onClick={() => setFormStep(s => s - 1)}
									type="button"
									className={
										'w-[30%] ml-2 flex items-center ' +
										styles.btnPrimary
									}
								>
									<span className="mr-2">Voltar</span>
									<span>
										<FaChevronCircleLeft />
									</span>
								</button>
							)}
							{formStep < 4 && (
								<button
									disabled={!isValidStep(formStep)}
									type="button"
									onClick={() => setFormStep(s => s + 1)}
									className={
										'w-[40%] ml-2 flex items-center ' +
										styles.btnPrimary
									}
								>
									<span className="mr-2">Próximo</span>
									<span>
										<FaChevronCircleRight />
									</span>
								</button>
							)}
							{formStep === 4 && (
								<button
									type="submit"
									className={
										'w-[40%] ml-2 flex items-center ' +
										styles.btnPrimary
									}
								>
									<span className="mr-2">
										{mode === 'create'
											? 'Enviar'
											: 'Salvar'}
									</span>
									<span>
										<FaCheck />
									</span>
								</button>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

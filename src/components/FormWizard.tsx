/* eslint-disable @next/next/no-img-element */
import { FormikHelpers, useFormik } from 'formik';
import { useRef, useState } from 'react';
import {
	FaCheck,
	FaChevronCircleLeft,
	FaChevronCircleRight,
	FaExclamationTriangle,
} from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
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
	const { handleSubmit, handleChange, setFieldValue, values } = 
        useFormik<PointFormValues>({ initialValues, onSubmit });

	const addressInputRef = useRef<HTMLInputElement>(null);

	const [formStep, setFormStep] = useState(1);
	const [geocodeAddresses, setGeocodeAddresses] = useState<Geocode[]>([]);
	const [geoCodeStatus, setGeoCodeStatus] = useState('');
	const [showMap, setShowMap] = useState(false);

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

	const handleFormKeyUp = e => {
		// return e.code === 'Enter' && formStep === 1
		// 	? handleAddressSearch()
		// 	: () => {};
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
				<form onSubmit={handleSubmit} onKeyUp={handleFormKeyUp}>
					<div className="grid grid-cols-6 gap-6">
						{formStep === 1 && (
							<>
								<div className="col-span-5">
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
								<div className="col-span-1 flex pt-6">
									<button
										type="button"
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
								<div className="-mb-2 col-span-6">
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

								<div className="col-span-4">
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

								<div className="col-span-2">
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
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													onChange={handleChange}
													name="typesOfWaste.small"
													id="typesOfWaste.small"
													type="checkbox"
													checked={
														values.typesOfWaste!
															.small
													}
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="typesOfWaste.small"
													className="font-medium text-gray-700"
												>
													Pequenos equipamentos
												</label>
												<p className="text-gray-500">
													Get notified when a
													candidate applies for a job.
												</p>
											</div>

											<div className="flex items-center h-5">
												<input
													onChange={handleChange}
													id="typesOfWaste.large"
													name="typesOfWaste.large"
													type="checkbox"
													checked={
														values.typesOfWaste
															.large
													}
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="typesOfWaste.large"
													className="font-medium text-gray-700"
												>
													Itens Grandes
												</label>
												<p className="text-gray-500">
													Get notified when a
													candidate applies for a job.
												</p>
											</div>

											<div className="flex items-center h-5">
												<input
													onChange={handleChange}
													name="typesOfWaste.info"
													id="typesOfWaste.info"
													type="checkbox"
													checked={
														values.typesOfWaste.info
													}
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="typesOfWaste.info"
													className="font-medium text-gray-700"
												>
													Itens de Informática
												</label>
												<p className="text-gray-500">
													Get notified when a
													candidate applies for a job.
												</p>
											</div>

											<div className="flex items-center h-5">
												<input
													onChange={handleChange}
													id="typesOfWaste.battery"
													name="typesOfWaste.battery"
													type="checkbox"
													checked={
														values.typesOfWaste
															.battery
													}
													className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
												/>
											</div>
											<div className="ml-3 text-sm">
												<label
													htmlFor="typesOfWaste.battery"
													className="font-medium text-gray-700"
												>
													Baterias
												</label>
												<p className="text-gray-500">
													Get notified when a
													candidate applies for a job.
												</p>
											</div>
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
					<div className="mt-8 grid grid-cols-6 gap-6">
						<div className="col-span-6 text-right">
							{mode === 'edit' && (
								<button
									type="button"
									onClick={onCancel}
									className={
										'ml-2 flex items-center ' + styles.btn
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
										'ml-2 flex items-center ' + styles.btn
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
										'ml-2 flex items-center ' + styles.btn
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
										'ml-2 flex items-center ' + styles.btn
									}
								>
									<span className="mr-2">
										{mode === 'create'
											? 'Enviar'
											: 'Salvar alterações'}
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

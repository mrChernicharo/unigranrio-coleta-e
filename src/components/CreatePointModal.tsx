import { CollectionPoint } from '@prisma/client';
import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useUserContext } from '../contexts/UserContext';
import { formDefaultValues } from '../lib/constants';
import { parseTypesOfWaste, postCreatePoint } from '../lib/functions';
import {
	CollectionPointWithAuthor,
	PointFormValues,
	TypesOfWasteStr,
} from '../lib/interfaces';
import { styles } from '../styles/styles';
import FormWizard from './FormWizard';
import LoadingSpinner from './LoadingSpinner';

interface Props {
	handleModalClose: () => void;
	onPointCreated: (point: CollectionPointWithAuthor) => void;
}

export default function CreatePointModal({
	handleModalClose,
	onPointCreated,
}: Props) {
	const { user } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);

	const handleFormSubmit = async (pointFormValues: PointFormValues) => {
		try {
			setIsLoading(true);
			localStorage.setItem(
				'@createPointFormValues',
				JSON.stringify(pointFormValues)
			);
			const wasteTypes = Object.values(pointFormValues.typesOfWaste).map(
				v => (v ? 1 : 0)
			);
			const pointInfo: Omit<CollectionPoint, 'id' | 'createdAt'> = {
				...pointFormValues,
				authorId: user?.id!,
				typesOfWaste: parseTypesOfWaste(wasteTypes),
			};

			console.log('onSubmit', pointInfo);

			const point = await postCreatePoint(pointInfo);

			onPointCreated({
				...point,
				typesOfWaste: point.typesOfWaste as TypesOfWasteStr,
				author: { ...user! },
			});
			setIsLoading(false);
			handleModalClose();
			alert('Ponto de coleta cadastrado com sucesso!');
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	return (
		<>
			<div
				className={`animate-fade_in w-full sm:w-[640px] max-h-[90vh] block sm:rounded-lg py-1 bg-gray-50 ${styles.absoluteCenter} z-50`}
			>
				<div className="text-right p-3 pb-0">
					<button onClick={handleModalClose}>
						<FiX
							size={24}
							strokeWidth={4}
							className="text-gray-600"
						/>
					</button>
				</div>

				<h1 className="mt-[-2rem] mb-2 text-lg font-bold text-center">
					{isLoading
						? 'Salvando ponto de coleta...'
						: 'Cadastrar novo ponto de coleta'}
				</h1>

				{isLoading ? (
					<div className="py-16">
						<LoadingSpinner height={120} width={120} />
					</div>
				) : (
					<FormWizard
						initialValues={formDefaultValues}
						onSubmit={handleFormSubmit}
						mode="create"
					/>
				)}
			</div>
			<div className={styles.overlay} onClick={handleModalClose}></div>
		</>
	);
}

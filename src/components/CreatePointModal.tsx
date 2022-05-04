import React from 'react';
import { FiX } from 'react-icons/fi';
import { formDefaultValues } from '../lib/constants';
import { CollectionPointWithAuthor } from '../lib/interfaces';
import { styles } from '../styles/styles';
import FormWizard from './FormWizard';

interface Props {
	handleModalClose: () => void;
	onPointCreated: (point: CollectionPointWithAuthor) => void;
}

export default function CreatePointModal({
	handleModalClose,
	onPointCreated,
}: Props) {
	const handleFormSubmit = e => {
		console.log('onSubmit', e);
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
					Cadastrar novo ponto de coleta
				</h1>

				<FormWizard
					initialValues={formDefaultValues}
					onSubmit={handleFormSubmit}
					mode="create"
				/>

				{/* <CreatePointForm
					onFormClose={handleModalClose}
					onSend={onPointCreated}
				/> */}
			</div>
			<div className={styles.overlay} onClick={handleModalClose}></div>
		</>
	);
}

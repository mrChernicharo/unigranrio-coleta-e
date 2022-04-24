import { CollectionPoint } from '@prisma/client';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { styles } from '../styles/styles';
import Form from './Form';

interface Props {
	handleModalClose: () => void;
	onPointCreated: (point: CollectionPoint) => void;
	userId: number;
}

export default function CreatePointModal({
	handleModalClose,
	onPointCreated,
	userId,
}: Props) {
	return (
		<>
			<div
				className={`w-full sm:w-[640px] shadow overflow-hidden sm:rounded-md bg-gray-50 ${styles.absoluteCenter} z-50`}
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

				<Form
					onFormClose={handleModalClose}
					onSend={onPointCreated}
					userId={userId}
				/>
			</div>
			<div className={styles.overlay} onClick={handleModalClose}></div>
		</>
	);
}

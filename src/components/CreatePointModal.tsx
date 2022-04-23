import React from 'react';
import { FiX } from 'react-icons/fi';
import { styles } from '../styles/styles';
import Form from './Form';

interface Props {
	handleModalClose: () => void;
}

export default function CreatePointModal({ handleModalClose }: Props) {
	return (
		<div
			className={`w-full sm:w-[640px] h-[760px] shadow overflow-hidden sm:rounded-md bg-gray-50 ${styles.absoluteCenter}`}
		>
			<div className="text-right p-3 pb-0">
				<button onClick={handleModalClose}>
					<FiX size={24} strokeWidth={4} className="text-gray-600" />
				</button>
			</div>

			<Form onSend={handleModalClose} />
		</div>
	);
}

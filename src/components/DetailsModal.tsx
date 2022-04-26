/* eslint-disable @next/next/no-img-element */
import { User } from '@prisma/client';
import { useCallback } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { CollectionPointWithAuthor } from '../lib/interfaces';
import { useUserContext } from '../lib/UserContext';
import { styles } from '../styles/styles';

interface Props {
	point: CollectionPointWithAuthor;
	handleModalClose: () => void;
	// onPointCreated: (point: CollectionPoint) => void;
	// userId: number;
}

export default function DetailsModal({
	point,
	handleModalClose,
}: // onPointCreated,
Props) {
	const { user } = useUserContext();
	const { name, address, image, phone, email, author, authorId } = point;
	console.log(point);

	const isAuthor = useCallback(
		(user: User) => authorId === Number(user.id),
		[authorId]
	);

	return (
		<>
			<div
				className={`w-full sm:w-[640px] p-4 shadow overflow-hidden sm:rounded-md bg-gray-50 ${styles.absoluteCenter} z-50`}
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

				<div>{name}</div>

				<img src={image} alt="imagem do ponto de coleta" />
				<div>{address}</div>

				<div>{email}</div>
				<div>{phone}</div>

				<span>Postado por:</span>

				{user && isAuthor(user) && (
					<div>
						<button>
							<FaTrash />
						</button>

						<button>
							<FaEdit />
						</button>
					</div>
				)}

				<div className="w-52 flex items-center border">
					<img
						className="h-12 rounded-full"
						src={author?.image}
						alt=""
					/>
					<span>{author?.name}</span>
				</div>
			</div>
			<div className={styles.overlay} onClick={handleModalClose}></div>
		</>
	);
}

/* eslint-disable @next/next/no-img-element */
import { User } from '@prisma/client';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useUserContext } from '../contexts/UserContext';
import { imgURLS } from '../lib/constants';
import { postDeletePoint } from '../lib/functions';
import { CollectionPointWithAuthor } from '../lib/interfaces';
import { styles } from '../styles/styles';

interface Props {
	point: CollectionPointWithAuthor;
	handleModalClose: () => void;
	onPointDeleted: (point: CollectionPointWithAuthor) => void;
	onPointUpdated: (point: CollectionPointWithAuthor) => void;
	// onPointCreated: (point: CollectionPoint) => void;
	// userId: number;
}

export default function DetailsModal({
	point,
	handleModalClose,
	onPointDeleted,
	onPointUpdated,
}: Props) {
	const { user } = useUserContext();
	const { id, name, address, image, phone, email, author, authorId } = point;
	const [isLoading, setIsLoading] = useState(false);

	const isAuthor = (user: User) => {
		console.log({ user, authorId });
		return authorId === user.id;
	};

	const handleDelete = async () => {
		const hasConfirmed = confirm(`Tem certeza que deseja deletar ${name}?`);

		if (hasConfirmed) {
			setIsLoading(true);
			console.log('deleting...', point);
			await postDeletePoint(id);
			onPointDeleted(point);

			setIsLoading(false);
			alert('ponto de coleta deletado com sucesso');
			handleModalClose();
		}
	};
	const handleEdit = () => {
		console.log('edit');
	};

	return (
		<>
			<div
				className={`animate-fade_in w-full sm:w-[580px] shadow overflow-hidden sm:rounded-md bg-gray-50 ${styles.absoluteCenter} z-50 text-center`}
			>
				<div className="text-right bg-gray-200 flex p-2">
					<h1 className="w-full text-lg font-bold text-center">
						{name}
					</h1>

					<button
						className="absolute right-2"
						onClick={handleModalClose}
					>
						<FiX
							size={24}
							strokeWidth={4}
							className="text-gray-600"
						/>
					</button>
				</div>

				<div className="">
					<img
						src={image || imgURLS.defaultPointImg}
						alt="imagem do ponto de coleta"
						height={200}
						width={580}
						className=""
					/>
				</div>

				<div className="p-4">
					{user && isAuthor(user) && (
						<div className="flex justify-end -mt-10">
							<div className="mr-2 flex-shrink-0 flex items-center justify-center rounded-full bg-green-200 bg-opacity-80 h-12 w-12">
								<button onClick={handleEdit}>
									<FaEdit
										size={26}
										className="text-green-600 translate-x-[2px] translate-y-[-1px]"
									/>
								</button>
							</div>

							<div className="flex-shrink-0 flex items-center justify-center rounded-full bg-red-200 bg-opacity-80 h-12 w-12">
								<button onClick={handleDelete}>
									<FaTrash
										size={24}
										className="text-red-600"
									/>
								</button>
							</div>
						</div>
					)}
					{isLoading && (
						<div className="flex flex-col justify-center">
							<h2 className="text-xl">
								Deletando Ponto de Coleta...
							</h2>
							<img
								className="mx-auto my-8"
								src="loading.svg"
								alt="loading"
								height={120}
								width={120}
							/>
						</div>
					)}
					{!isLoading && (
						<>
							<div className="flex flex-col mb-4">
								<div className="w-full flex justify-left">
									<div className="text-left mr-4">
										<label className="text-gray-400 text-xs">
											Endereço
										</label>
										<p>{address}</p>
									</div>
								</div>
								<div className="w-full flex ">
									<div className="text-left mr-6">
										<label className="text-gray-400 text-xs">
											Email
										</label>
										<p>{email}</p>
									</div>
									<div className="text-left">
										<label className="text-gray-400 text-xs">
											Telefone
										</label>
										<p>{phone}</p>
									</div>
								</div>
							</div>

							<div className="p-2 flex items-center">
								<div className="">
									<img
										className="h-10 rounded-full"
										src={
											author?.image ||
											imgURLS.defaultAvatarImg
										}
										alt=""
									/>
								</div>
								<div className="pl-2 text-left">
									<p className="text-gray-400 text-xs">
										Postado por
									</p>
									<p>{author?.name}</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
			<div className={styles.overlay} onClick={handleModalClose}></div>
		</>
	);
}

{
	/* <Image
		src={`/api/imgae/imageproxy?url=${encodeURIComponent(
			image
		)}`}
		alt="imagem do ponto de coleta"
		height={200}
		width={500}
		placeholder="blur"
		blurDataURL={`data:image/svg+xml;base64,${toBase64(
			shimmer(700, 475)
		)}`}
		/> */
}

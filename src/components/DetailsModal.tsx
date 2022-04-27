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

// const shimmer = (w, h) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`;

// const toBase64 = str =>
// 	typeof window === 'undefined'
// 		? Buffer.from(str).toString('base64')
// 		: window.btoa(str);

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
				className={`w-full sm:w-[640px] shadow overflow-hidden sm:rounded-md bg-gray-50 ${styles.absoluteCenter} z-50 text-center`}
			>
				<div className="text-right bg-gray-200 p-3 pb-0">
					<button onClick={handleModalClose}>
						<FiX
							size={24}
							strokeWidth={4}
							className="text-gray-600"
						/>
					</button>
				</div>

				{/* <div>{name}</div> */}
				<h1 className="mt-[-2rem] mb-2 text-lg font-bold text-center">
					{name}
				</h1>

				<div className="p-4">
					{user && isAuthor(user) && (
						<div className="flex">
							<div className="mr-1 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:h-10 sm:w-10">
								<button>
									<FaEdit
										size={24}
										className="text-green-600"
									/>
								</button>
							</div>

							<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<button>
									<FaTrash
										size={24}
										className="text-red-600"
									/>
								</button>
							</div>
						</div>
					)}

					<div className="">
						<img
							src={image}
							alt="imagem do ponto de coleta"
							height={200}
							width={620}
							className="m-auto"
						/>
					</div>

					{/* <Image
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
				/> */}

					<div className="border  flex flex-col">
						<div className="w-full flex justify-left">
							<div className="text-left mr-4">
								<label className="text-gray-400 text-sm">
									Endereço
								</label>
								<p>{address}</p>
							</div>
						</div>
						<div className="w-full flex justify-left">
							<div className="text-left mr-4">
								<label className="text-gray-400 text-sm">
									Email
								</label>
								<p>{email}</p>
							</div>
							<div className="text-left">
								<label className="text-gray-400 text-sm">
									Telefone
								</label>
								<p>{phone}</p>
							</div>
						</div>
					</div>

					<div className="w-52 p-1 flex items-center border rounded">
						<div className="">
							<img
								className="h-12 rounded-full"
								src={author?.image}
								alt=""
							/>
						</div>
						<div className="pl-2 text-left">
							<p className="text-gray-400 text-sm">Postado por</p>
							<p>{author?.name}</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.overlay} onClick={handleModalClose}></div>
		</>
	);
}

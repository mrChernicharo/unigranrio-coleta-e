/* eslint-disable @next/next/no-img-element */
import { CollectionPoint } from '@prisma/client';

interface Props {
	point: CollectionPoint;
}
export default function DetailsModal({ point }: Props) {
	const { name, image } = point;
	return (
		<div>
			<h1>{name}</h1>

			<img src={image} alt="imagem do ponto de coleta" />
		</div>
	);
}

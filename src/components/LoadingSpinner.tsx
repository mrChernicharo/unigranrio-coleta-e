import Image from 'next/image';

interface Props {
	width?: number;
	height?: number;
	className?: string;
}
export default function LoadingSpinner({
	width = 42,
	height = 42,
	className,
}: Props) {
	return (
		<div className="flex justify-center">
			<Image
				className={className}
				src="/loading.svg"
				alt="loading"
				height={height}
				width={width}
			/>
		</div>
	);
}

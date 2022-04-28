import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaPowerOff } from 'react-icons/fa';

export default function Profile() {
	const { data } = useSession();

	if (data && data.user) {
		const { user } = data;
		const { name, email, image } = user;
		return (
			<div className="fixed top-0 z-20 w-full px-2 py-1 flex border items-center justify-between bg-gray-50">
				<Image
					className="rounded-full"
					src={image!}
					width={60}
					height={60}
					alt=""
				/>
				<span>{name}</span>
				<button
					onClick={() =>
						signOut({ redirect: true, callbackUrl: '/' })
					}
				>
					<FaPowerOff size={24} />
				</button>
			</div>
		);
	}
	return <div>profile</div>;
}

/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from 'next-auth/react';
import { FaPowerOff } from 'react-icons/fa';
import { useUserContext } from '../contexts/UserContext';
import { imgURLS } from '../lib/constants';
import LoadingSpinner from './LoadingSpinner';

export default function Profile() {
	const { data: session } = useSession();
	const { user } = useUserContext();

	if (session && session.user && user) {
		const { name, email, image } = user;
		return (
			<div className="fixed top-0 z-20 w-full px-6 py-2 flex border items-center justify-between bg-gray-50">
				<img
					className="rounded-full"
					src={image || imgURLS.defaultAvatarImg}
					width={54}
					height={54}
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
	return (
		<div className="fixed top-0 z-20 w-full px-6 py-2 border justify-left bg-gray-50">
			<LoadingSpinner />
		</div>
	);
}

import { signOut } from 'next-auth/react';
import { FaPowerOff } from 'react-icons/fa';

export default function App() {
	return (
		<div className="">
			<h1>Hello world</h1>

			<button
				onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
			>
				<FaPowerOff />
			</button>
		</div>
	);
}

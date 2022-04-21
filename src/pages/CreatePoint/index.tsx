import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Profile from '../../components/Profile';

export default function CreatePoint() {
	return (
		<div className="">
			<Profile />
			<Link href="/Main" passHref>
				<FaArrowLeft />
			</Link>
			<h1>Create Point</h1>
		</div>
	);
}

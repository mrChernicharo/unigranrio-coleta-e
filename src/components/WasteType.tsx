import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { FaBatteryThreeQuarters, FaLaptop } from 'react-icons/fa';
import { ImMobile } from 'react-icons/im';

export default function WasteType({ type }) {
	console.log(type);
	const names = { S: 'Pequenos', L: 'Grandes', I: 'Info', B: 'Baterias' };
	const icons = {
		S: <ImMobile size={24} />,
		L: <CgSmartHomeRefrigerator size={24} />,
		I: <FaLaptop size={24} />,
		B: <FaBatteryThreeQuarters size={24} />,
	};

	return (
		<div className="w-12 h-12 px-1 ml-1 rounded-md border flex flex-col items-center shadow-md">
			<div title={names[type]} className="text-indigo-600 mt-3">
				{icons[type]}
			</div>
		</div>
	);
}

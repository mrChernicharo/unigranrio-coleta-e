import type { NextPage } from 'next';

const Home: NextPage = () => {
	return (
		<>
			<div className="grid grid-cols-2 gap-4">
				<div className="h-24 bg-red-300">1</div>
				<div>2</div>
				<div>3</div>
				<div>4</div>
				<div>5</div>
				<div>6</div>
			</div>

			<div className="grid lg:grid-cols-2 gap-4">
				<div>10</div>
				<div>20</div>
				<div>30</div>
				<div>40</div>
				<div>50</div>
				<div>60</div>
			</div>

			<div className="grid sm:grid-cols-2 gap-4">
				<div>100</div>
				<div>200</div>
				<div>300</div>
				<div>400</div>
				<div>500</div>
				<div>600</div>
			</div>
		</>
	);
};

export default Home;

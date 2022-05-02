import Footer from '../../components/Footer';

export default function VerifyEmail() {
	return (
		<div className="bg-gray-200 flex flex-col items-center space-between">
			<div className="w-full">
				<div className="max-w-lg mx-auto mt-32 mb-[20rem] pt-16 pb-24 px-12 bg-white rounded-lg shadow-md">
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
							alt="Workflow"
						/>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Coleta App
						</h2>
						<div className="my-8 text-center text-xl">
							Acabamos de enviar um email para você!
						</div>
						<div className="text-center text-md text-gray-400">
							Verifique o sua caixa de Email para verificar sua
							conta e finalizar o login.
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

import type { GetServerSideProps, NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { styles } from '../styles/styles';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });
	if (session) {
		return {
			redirect: {
				destination: '/Main',
				permanent: false,
			},
			props: {
				session,
			},
		};
	}
	return {
		props: {},
	};
};

const SignIn: NextPage = () => {
	const handleGithubSignIn = () => {
		signIn('github');
	};

	const handleGoogleSignIn = () => {
		signIn('google');
	};
	return (
		<div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form className="mt-8 space-y-6" action="#" method="POST">
					<input type="hidden" name="remember" value="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className={styles.input}
								placeholder="Email address"
							/>
						</div>

						<div className="h-4"></div>

						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className={styles.input}
								placeholder="Password"
							/>
						</div>
					</div>

					<div>
						<button type="submit" className={styles.submitBtn}>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
							Sign in
						</button>
					</div>
				</form>

				<hr />

				<h2 className="mt-6 text-center text-xl font-bold text-gray-900">
					or login with
				</h2>

				<div className="grid grid-cols-2 gap-4 w-100 h-10">
					<button
						type="button"
						className={styles.loginProviderBtn}
						onClick={handleGoogleSignIn}
					>
						<FaGoogle className="text-indigo-500 group-hover:text-white" />
					</button>
					<button
						type="button"
						className={styles.loginProviderBtn}
						onClick={handleGithubSignIn}
					>
						<FaGithub className="text-indigo-500 group-hover:text-white" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

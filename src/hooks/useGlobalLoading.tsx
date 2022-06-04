import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useGlobalLoading() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleStart = (url: string) => {
			console.log('handleStart', url);
			return url !== router.asPath && setIsLoading(true);
		};
		const handleComplete = (url: string) => {
			console.log('handleComplete', url);

			return url === router.asPath && setIsLoading(false);
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	});

	return {
		isLoading,
	};
}

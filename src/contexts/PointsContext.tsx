import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { CollectionPointWithAuthor } from '../lib/interfaces';

export interface ICollectionPointsContext {
	collectionPoints: CollectionPointWithAuthor[];
	setCollectionPoints: Dispatch<SetStateAction<CollectionPointWithAuthor[]>>;
}
interface IPointsContextProviderProps {
	children: ReactNode;
}

export const CollectionPointsContext = createContext<ICollectionPointsContext>({
	collectionPoints: [],
	setCollectionPoints: async CollectionPoints => {},
});

export const PointsContextProvider = ({
	children,
}: IPointsContextProviderProps) => {
	const [collectionPoints, setCollectionPoints] = useState<
		CollectionPointWithAuthor[]
	>([]);

	useEffect(() => {
		console.log({ collectionPoints });
	}, [collectionPoints]);

	const context: ICollectionPointsContext = {
		collectionPoints,
		setCollectionPoints,
	};

	return (
		<CollectionPointsContext.Provider value={context}>
			{children}
		</CollectionPointsContext.Provider>
	);
};

export const useCollectionPointsContext = () => {
	return useContext(CollectionPointsContext);
};

import { User } from '@prisma/client';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';

export interface IUserContext {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
}
interface IUserContextProviderProps {
	children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
	user: null,
	setUser: async user => {},
});

export const UserContextProvider = ({
	children,
}: IUserContextProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		console.log({ user });
	}, [user]);

	const context: IUserContext = {
		user,
		setUser,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};

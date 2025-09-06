import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useState
} from 'react';

const actionsSizeContext = createContext<{
	size: number;
	setSize: (size: number) => void;
}>({
	size: 0,
	setSize: () => {}
});

export const ActionsSizeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [size, setSize] = useState(48);

	return (
		<actionsSizeContext.Provider value={{ size, setSize }}>
			{children}
		</actionsSizeContext.Provider>
	);
};

export const useActionsSizeContext = () => useContext(actionsSizeContext);

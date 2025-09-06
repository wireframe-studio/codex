'use client';

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to get system theme preference
const getSystemTheme = (): Theme => {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedTheme = localStorage.getItem('theme') as Theme | null;
			setTheme(storedTheme ?? getSystemTheme());

			// Listen for system theme changes
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = (e: MediaQueryListEvent) => {
				if (!localStorage.getItem('theme')) {
					setTheme(e.matches ? 'dark' : 'light');
				}
			};

			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	}, []);

	useEffect(() => {
		if (theme === 'dark') {
			document.querySelector('html')!.classList.add('dark');
		} else {
			document.querySelector('html')!.classList.remove('dark');
		}
	}, [theme]);

	const toggleTheme = useCallback(() => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

'use client';

import { ThemeProvider } from '@/deps/tailwind/theme/providers/theme-provider';
import { TRPCReactProvider } from '@/deps/trpc/react';
import { ViewportSizeProvider } from '@/global/hooks/use-viewport';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<TRPCReactProvider>
			<ViewportSizeProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</ViewportSizeProvider>
		</TRPCReactProvider>
	);
};

'use client';

import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { httpBatchLink, loggerLink, TRPCLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { useState } from 'react';
import SuperJSON from 'superjson';

import { type AppRouter } from '@/deps/trpc/root';
import { env } from '@/env';
import { observable } from '@trpc/server/observable';
import { toast } from 'sonner';
import { createQueryClient } from './query-client';

export const sonnerLink: TRPCLink<AppRouter> = () => {
	return ({ next, op }) => {
		return observable((observer) => {
			const unsubscribe = next(op).subscribe({
				next(value) {
					observer.next(value);
				},
				error(err) {
					toast.error('Error', {
						description: err.message,
						duration: 10000
					});
					observer.error(err);
				},
				complete() {
					observer.complete();
				}
			});
			return unsubscribe;
		});
	};
};

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return createQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	return (clientQueryClientSingleton ??= createQueryClient());
};

export const api = createTRPCReact<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	const [trpcClient] = useState(() =>
		api.createClient({
			links: [
				sonnerLink,
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === 'development' ||
						(op.direction === 'down' && op.result instanceof Error)
				}),
				httpBatchLink({
					transformer: SuperJSON,
					url: getBaseUrl() + '/api/trpc',
					headers: () => {
						const headers = new Headers();
						headers.set('x-trpc-source', 'nextjs-react');
						return headers;
					}
				})
			]
		})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<api.Provider client={trpcClient} queryClient={queryClient}>
				{props.children}
			</api.Provider>
		</QueryClientProvider>
	);
}

function getBaseUrl() {
	if (typeof window !== 'undefined') return window.location.origin;
	if (env.NEXT_PUBLIC_URL) return `https://${env.NEXT_PUBLIC_URL}`;
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import { isProduction } from '@/global/constants';
import '@/styles/index.css';
import { Providers } from './providers';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Poliklinika Medora',
	description: 'Poliklinika Medora',
	icons: [{ rel: 'icon', url: '/favicon.png' }],
	openGraph: {
		title: 'Poliklinika Medora',
		description: 'Poliklinika Medora',
		url: 'https://www.medora-centar.hr',
		type: 'website',
		siteName: 'medora-centar.hr',
		images: [
			{
				url: 'https://www.medora-centar.hr/cover.png',
				width: 1200,
				height: 630
			}
		],
		locale: 'hr-HR'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background overflow-x-hidden`}>
					<NextTopLoader
						color="#d18547"
						shadow={false}
						showSpinner={false}
						height={4}
					/>
					{children}
					<Toaster />
				</body>
				{isProduction && (
					<Script
						async
						src="https://umami.medora-centar.hr/script.js"
						data-website-id="8109aaba-e51c-4ab5-b159-2e879ddfe687"
					/>
				)}
			</html>
		</Providers>
	);
}

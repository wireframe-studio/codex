import type { Metadata } from 'next';

import { EditorLayout } from '@/modules/editor/components/editor-layout';
import '@/styles/index.css';
import { BodyOverlays } from './body-overlays';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'Codex',
	description: 'Wireframe Codex',
	icons: [{ rel: 'icon', url: '/favicon.png' }]
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en">
				<body className={`antialiased bg-background overflow-x-hidden`}>
					<BodyOverlays>
						<EditorLayout>{children}</EditorLayout>
					</BodyOverlays>
				</body>
			</html>
		</Providers>
	);
}

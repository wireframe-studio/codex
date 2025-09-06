'use client';

import { Button } from '@/deps/shadcn/ui/button';
import { cn } from '@/deps/shadcn/utils';
import { api } from '@/deps/trpc/react';
import { Reveal, RevealArea } from '@/global/components/reveal';
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import Link from 'next/link';

const DoctorCard = ({ id }: { id: string }) => {
	const remoteDoctor = api.doctor.get.useQuery({ doctorId: id });
	const photoFileDownloadUrl = api.file.getFileDownloadUrl.useQuery(
		{
			fileId: remoteDoctor.data?.doctor.photoFileId ?? ''
		},
		{
			enabled: !!remoteDoctor.data?.doctor.photoFileId
		}
	);

	const doctor = remoteDoctor.data?.doctor;

	if (!doctor) return null;

	const hasArticle = doctor.articleId !== null;

	const Wrapper = hasArticle
		? ({ children, ...props }: { children: React.ReactNode }) => (
				<Link href={`/doctors/${doctor.id}`} {...props}>
					{children}
				</Link>
		  )
		: 'div';

	return (
		<Wrapper
			className={cn(
				'p-4 bg-section rounded-xl relative flex flex-row gap-4 items-center group',
				hasArticle && 'clickable '
			)}>
			<div
				className={cn(
					'shrink-0 relative -mt-10 w-24 aspect-[0.8] overflow-hidden',
					hasArticle &&
						'group-hover:-translate-y-0.5 group-active:translate-y-1 transition-all duration-300 group-active:duration-100 pointer-events-none'
				)}>
				<img
					className="object-cover w-full h-full [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
					src={
						photoFileDownloadUrl.data ?? '/assets/images/doctor-placeholder.png'
					}
				/>
			</div>

			<div className="flex flex-col w-full">
				<div className="caption text-neutral-medium">{doctor.title}</div>
				<div className="title-2">{doctor.name}</div>
			</div>

			{hasArticle && (
				<Button
					variant="ghost"
					size="lg"
					singleIcon="arrow-right"
					className="shrink-0"
				/>
			)}
		</Wrapper>
	);
};

export const DoctorListNodeView = ({ node }: NodeViewProps) => {
	const doctorIds = (node.attrs.ids as string).split(',').filter(Boolean);

	return (
		<NodeViewWrapper className="doctor-list-component container-lg px-1">
			<RevealArea
				className={cn(
					doctorIds.length <= 3 && 'flex flex-row gap-1',
					doctorIds.length > 3 &&
						'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1'
				)}>
				{doctorIds.map((id, i) => (
					<Reveal
						style={{
							transitionDelay: `${i * 100}ms`
						}}
						from="opacity-0 translate-y-4"
						className="duration-700"
						key={id}>
						<DoctorCard id={id} key={id} />
					</Reveal>
				))}
			</RevealArea>
			<NodeViewContent />
		</NodeViewWrapper>
	);
};

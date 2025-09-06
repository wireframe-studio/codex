'use client';

import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';

import { Button } from '@/deps/shadcn/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/deps/shadcn/ui/dialog';
import { Input } from '@/deps/shadcn/ui/input';
import { api } from '@/deps/trpc/react';

export const DoctorListNodeEdit = ({
	node,
	updateAttributes,
	selected
}: NodeViewProps) => {
	const [search, setSearch] = useState('');

	const doctorList = api.doctor.list.useQuery();
	const doctors = doctorList.data?.doctors;

	// Parse the comma-separated list of doctor IDs
	const selectedDoctorIds = (node.attrs.ids as string)
		.split(',')
		.filter(Boolean);

	const toggleDoctor = (doctorId: string) => {
		const currentIds = selectedDoctorIds;
		const newIds = currentIds.includes(doctorId)
			? currentIds.filter((id) => id !== doctorId)
			: [...currentIds, doctorId];

		updateAttributes({ ids: newIds.join(',') });
	};

	const filteredDoctors =
		doctors?.filter(
			(doctor) =>
				doctor.name.toLowerCase().includes(search.toLowerCase()) ||
				doctor.title.toLowerCase().includes(search.toLowerCase())
		) || [];

	return (
		<NodeViewWrapper className="doctor-list-component">
			<div className="border border-neutral-medium rounded-xl p-4 flex flex-col gap-4 items-center">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
					{/* Selected Doctors */}
					{selectedDoctorIds.map((id) => (
						<div
							className="relative p-6 bg-neutral-weak rounded-xl title-3"
							key={id}>
							{/* Doctor {id} */}
							{doctors?.find((doctor) => doctor.id === id)?.name || id}
							<Button
								variant="ghost"
								className="absolute top-4 right-4"
								singleIcon="delete-circle"
								onClick={() => toggleDoctor(id)}
							/>
						</div>
					))}
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="solid-weak"
							size="sm"
							rightIcon="search"
							className="w-fit">
							Select Doctors
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create Service</DialogTitle>
							<DialogDescription>
								Create a new medical service.
							</DialogDescription>
							<div className="flex-1 flex flex-col pb-4 px-6 border-b border-b-neutral-weak">
								<Input
									type="text"
									placeholder="Search for a doctor"
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</DialogHeader>

						{/* Search */}
						<div className="flex-1 flex flex-col border-r border-r-neutral-weak">
							<div className="flex flex-col gap-1 p-4">
								{filteredDoctors.map(({ id }) => (
									<Button
										key={id}
										className="shrink-0 w-full"
										onClick={() => toggleDoctor(id)}
										size="card"
										rightIcon={
											selectedDoctorIds.includes(id)
												? 'checkmark-circle'
												: 'add'
										}
										variant={
											selectedDoctorIds.includes(id) ? 'solid' : 'solid-weak'
										}>
										{/* {doctors?.find((doctor) => doctor.id === id)?.name || id} */}
										<div className="flex flex-col w-full">
											{doctors?.find((doctor) => doctor.id === id)?.title && (
												<div className="caption text-neutral-medium text-left w-full">
													{doctors?.find((doctor) => doctor.id === id)!.title}
												</div>
											)}
											<div className="title-3 text-left w-full">
												{doctors?.find((doctor) => doctor.id === id)?.name ||
													id}
											</div>
										</div>
										{/* Doctor {id} */}
									</Button>
								))}
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<NodeViewContent />
		</NodeViewWrapper>
	);
};

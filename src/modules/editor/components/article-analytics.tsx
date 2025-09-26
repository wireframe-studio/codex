'use client';
export const ArticleAnalyticsCard = () => {
	return (
		<div className="grid grid-cols-2 gap-2 p-4">
			<div className="text-neutral caption">Views</div>
			<input className="text-neutral input" type="number" placeholder="Views" />

			<div className="text-neutral caption">Reactions</div>
			<input
				className="text-neutral input"
				type="number"
				placeholder="Reactions"
			/>
		</div>
	);
};

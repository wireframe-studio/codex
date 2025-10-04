import { SitesList } from '../components/sites-list';

export const SitesPage = () => {
	return (
		<div className="flex flex-col gap-10 items-center w-full my-20">
			<div className="border border-neutral-weak rounded-md p-10 flex flex-col gap-6 container-md w-full">
				<SitesList />
			</div>
		</div>
	);
};

import { type PrismaClient } from '@prisma/client';

export const cleanOrphanFiles = async (db: PrismaClient) => {
	const files = await db.s3Object.findMany({
		where: {
			AND: [
				{
					Doctors: {
						none: {}
					}
				},
				{
					Articles: {
						none: {}
					}
				}
			]
		}
	});

	const fileIds = files.map((file) => file.id);

	await db.s3Object.deleteMany({
		where: {
			id: {
				in: fileIds
			}
		}
	});

	return {
		deletedIds: files.map((file) => file.id)
	};
};

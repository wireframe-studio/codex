import { authedProcedure, publicProcedure } from '@/deps/trpc/procedures';
import { createTRPCRouter } from '@/deps/trpc/trpc';
import { removeBackground } from '@imgly/background-removal-node';
import { TRPCError } from '@trpc/server';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { deleteFile } from '../helpers/delete-file';
import { getFileDownloadUrl } from '../helpers/get-download-url';
import { getFileUploadUrl } from '../helpers/get-file-upload-url';

export const fileRouter = createTRPCRouter({
	makeCarouselBackgroundUploadUrl: authedProcedure.mutation(async ({ ctx }) => {
		const key = `carousel-background/${nanoid()}`;
		const url = await getFileUploadUrl(key);
		return { url, key };
	}),

	makeContentUploadUrl: authedProcedure.mutation(async ({ ctx }) => {
		const key = `content/${nanoid()}`;
		const url = await getFileUploadUrl(key);
		return { url, key };
	}),

	registerFile: authedProcedure
		.input(
			z.object({
				key: z.string(),
				contentType: z.string(),
				size: z.number()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { key, contentType, size } = input;
			const { db } = ctx;

			const fileRaw = await db.s3Object.create({
				data: {
					id: `file-${nanoid()}`,
					key,
					contentType,
					size
				}
			});

			const fileUrl = await getFileDownloadUrl(key);

			const file = {
				id: fileRaw.id,
				key: fileRaw.key,
				url: fileUrl
			};

			return { file };
		}),

	upload: authedProcedure
		.input(
			z.object({
				file: z.any()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { file } = input;

			if (!(file instanceof File)) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Invalid file input'
				});
			}

			console.log(file);
		}),

	deleteFileById: authedProcedure
		.input(z.object({ fileId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { fileId } = input;
			const fileRaw = await ctx.db.s3Object.findFirst({
				where: { id: fileId }
			});

			if (!fileRaw) {
				throw new TRPCError({ code: 'NOT_FOUND', message: 'File not found' });
			}

			await deleteFile(fileRaw.key);
		}),

	getFileDownloadUrl: publicProcedure
		.input(z.object({ fileId: z.string() }))
		.query(async ({ ctx, input }) => {
			const { fileId } = input;
			const fileRaw = await ctx.db.s3Object.findFirst({
				where: { id: fileId }
			});

			if (!fileRaw) {
				throw new TRPCError({ code: 'NOT_FOUND', message: 'File not found' });
			}

			return await getFileDownloadUrl(fileRaw.key);
		}),

	removeBackground: authedProcedure
		.input(z.object({ fileId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { fileId } = input;
			const fileRaw = await ctx.db.s3Object.findFirst({
				where: { id: fileId }
			});

			if (!fileRaw) {
				throw new TRPCError({ code: 'NOT_FOUND', message: 'File not found' });
			}

			// download file

			const fileUrl = await getFileDownloadUrl(fileRaw.key);

			const downloadResponse = await fetch(fileUrl);
			const blob = await downloadResponse.blob();

			// remove bg

			const removeBgResponse = await removeBackground(blob);

			// remove old s3 file

			await deleteFile(fileRaw.key);

			// upload new file

			const newKey = `doctorprofiles/${nanoid()}`;

			const uploadUrl = await getFileUploadUrl(newKey);

			await fetch(uploadUrl, {
				method: 'PUT',
				body: removeBgResponse
			});

			// register new file

			const newFile = await ctx.db.s3Object.update({
				data: {
					id: fileId,
					key: newKey,
					size: removeBgResponse.size,
					contentType: 'image/png'
				},
				where: { id: fileId }
			});

			return { file: newFile };
		})
});

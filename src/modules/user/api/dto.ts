import { type User } from '@prisma/client';

export const userDTO = (user: User) => ({
	id: user.id,
	name: user.name,
	email: user.email,
	createdAt: user.createdAt
});

export type UserDTO = ReturnType<typeof userDTO>;

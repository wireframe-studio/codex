import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '../prisma';

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: 'postgresql'
	}),

	emailAndPassword: {
		enabled: true
	},

	user: {
		additionalFields: {
			badge: {
				type: 'string',
				required: false,
				input: false
			}
		}
	},

	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					console.log(`New user created: ${user.email} with ID: ${user.id}`);
				}
			}
		}
	}
});

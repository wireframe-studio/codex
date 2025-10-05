import { env } from '@/env';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '../prisma';

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: 'postgresql'
	}),

	secret: env.JWT_SECRET,

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

	emailVerification: {
		sendVerificationEmail: async ({ user: _user, url: _url }) => {
			// implement your logic here to send email verification
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

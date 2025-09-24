import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '../../server/src/prisma/Client'

export const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'mongodb' }),
	emailAndPassword: {
		enabled: false,
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID as string,
			clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
			scope: ['identify', 'email', 'guilds'],
		},
	},
})

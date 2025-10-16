import { betterAuth } from 'better-auth'
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../prisma";

const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'mongodb' }),
	baseURL: 'http://localhost:3000',
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
	trustedOrigins: [
		'http://localhost:3001'
	]
})

export { auth }
import { betterAuth } from 'better-auth'
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../prisma";

const auth = betterAuth({
	database: prismaAdapter(prisma, { provider: 'mongodb' }),
	emailAndPassword: {
		enabled: false,
	},
	socialProviders: {
		discord: {
			clientId: process.env.DISCORD_CLIENT_ID ?? "",
			clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
			scope: ['identify', 'email', 'guilds'],
		},
	},
	trustedOrigins: [
		'http://localhost:3001',
    'https://rick.konga.dev'
	]
})

export { auth }
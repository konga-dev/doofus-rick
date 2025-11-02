import { ORPCError, os } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'
import z from 'zod'
import { client } from '../discord/client'
import { logger as pino } from '../logger'

const logger = pino.child({ module: 'oRPC' })

const all = os.handler(() => {
	const guild = client.guilds.cache.find(
		guild => guild.id === process.env.DISCORD_GUILD_ID,
	)

	if (!guild) {
		logger.error(
			'Could not find the specified guild. You should check your .env!',
		)
		throw new ORPCError('Could not find guild.')
	}

	logger.debug('Fetching all guild members')
	return guild.members.cache
})

const find = os
	.input(
		z.object({
			creator: z.string(),
			participants: z.array(z.string()),
		}),
	)
	.handler(({ input }) => {
		const guild = client.guilds.cache.find(
			guild => guild.id === process.env.DISCORD_GUILD_ID,
		)

		if (!guild) {
			logger.error(
				'Could not find the specified guild. You should check your .env!',
			)
			throw new ORPCError('Could not find guild.')
		}

		const creator = guild.members.cache.find(
			member => member.id === input.creator,
		) ?? { displayName: 'Unknown', displayAvatarURL: () => '' }

		logger.debug(
			[input.creator, ...input.participants],
			'Fetching data from users',
		)
		return {
			creator: {
				name: creator.displayName,
				avatar: creator.displayAvatarURL(),
			},
			participants: guild.members.cache
				.filter(member => input.participants.includes(member.id))
				.map(member => ({
					name: member.displayName,
					avatar: member.displayAvatarURL(),
				})),
		}
	})

export const router = os.router({ all, find })

export const handler = new RPCHandler(router, {
	plugins: [new CORSPlugin()],
})

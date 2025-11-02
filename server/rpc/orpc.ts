import { ORPCError, os } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { CORSPlugin } from '@orpc/server/plugins'
import z from 'zod'
import { client } from '../discord/client'

const all = os.handler(() => {
	const guild = client.guilds.cache.find(
		guild => guild.id === process.env.DISCORD_GUILD_ID,
	)

	if (!guild) {
		throw new ORPCError('Could not find guild.')
	}

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
			throw new ORPCError('Could not find guild.')
		}

		const creator = guild.members.cache.find(
			member => member.id === input.creator,
		) ?? { displayName: 'Unknown', displayAvatarURL: () => '' }

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

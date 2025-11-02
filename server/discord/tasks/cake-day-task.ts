import type { TextChannel } from 'discord.js'
import { client as rpc } from '../../rpc/client'
import { client } from '../client'
import { quoteEmbeds } from '../util/embeds'
import type { Task } from './task'
import { logger as pino } from '@/logger'

const logger = pino.child({ namespace: 'Discord', module: 'Tasks', service: 'Cakeday' })

export const cakeDay: Task = {
	name: 'cakeday',
	cron: '0 0 20 * * *',
	callback: async () => {
		const guild = client.guilds.cache.find(
			guild => guild.id === process.env.GUILD_ID,
		)
		if (!guild) {
			logger.error('Could not find the specified guild. You should check [GUILD_ID] in your .env!')
			return
		}

		const channel = guild.channels.cache.find(
			channel => channel.id === process.env.CAKEDAY_QUOTES_CHANNEL_ID,
		) as TextChannel
		if (!channel) {
			logger.error('Could not find the specified channel. You should check [CAKEDAY_QUOTES_CHANNEL_ID] in your .env!')
			return
		}

		const cakeday = await rpc.quote.cakeday()
		const quotes = cakeday.map(quote => {
			const creator = guild.members.cache.find(
				member => member.id === quote.creator,
			)

			return {
				...quote,
				creator: {
					name: creator?.displayName || 'Unknown',
					avatar: creator?.displayAvatarURL() || '',
				},
			}
		})

		quotes.forEach(async quote => {
			await channel.send({
				embeds: [
					quoteEmbeds({
						id: quote.id,
						title: `Look who is turning ${quote.age} today!`,
						content: quote.content,
						creator: quote.creator,
						timestamp: quote.timestamp,
					}),
				],
			})
		})
	},
	onComplete: () => logger.info('Celebrated cakedays without any incidents!'),
	onError: (error) => { logger.error({ error }, 'An error occured while celebrating cakedays') },
}

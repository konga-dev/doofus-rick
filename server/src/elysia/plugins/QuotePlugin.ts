import type { Quote } from '@prisma/client'
import type { Client } from 'discord.js'
import { Elysia, t } from 'elysia'
import log4js from 'log4js'
import { ObjectId } from 'mongodb'
import { getUserById } from '../../discord/Client'
import { useDiscord, usePrisma } from '../Setup'

const populateWithDiscordUsers = async (quote: Quote, discordClient: Client) => {
	return {
		id: quote.id,
		content: quote.content,
		timestamp: quote.timestamp,
		creator: await getUserById(discordClient, quote.creator),
		participants: await Promise.all(
			quote.participants.map(async (participant) => await getUserById(discordClient, participant))
		),
		votes: quote.votes
	}
}

const quotePlugin = new Elysia({ name: 'Quote', prefix: '/quote' })
	.use(usePrisma())
	.use(useDiscord())
	.decorate('logger', log4js.getLogger('QuotePlugin'))
	.get('/', async ({ prisma, discord }) => {
		const quotes = await prisma.quote.findMany({ orderBy: { timestamp: 'desc' } })

		return Promise.all(quotes.map(async (quote) => populateWithDiscordUsers(quote, discord)))
	})
	.get(
		'/:id',
		async ({ set, prisma, discord, params: { id } }) => {
			if (!ObjectId.isValid(id)) {
				set.status = 400
				return
			}
			const quote = await prisma.quote.findUnique({
				where: {
					id: id
				}
			})

			if (!quote) {
				set.status = 404
				return
			}

			return populateWithDiscordUsers(quote, discord)
		},
		{ params: t.Object({ id: t.String() }) }
	)
	.get('/self', () => {})
	.get('/random', async ({ set, prisma, discord }) => {
		const [quotesCount, quotes] = await Promise.allSettled([prisma.quote.count(), prisma.quote.findMany()])

		if (quotesCount.status !== 'fulfilled' || quotes.status !== 'fulfilled') {
			set.status = 'Internal Server Error'
			return
		}

		const quote = quotes.value.at(Math.floor(Math.random() * (quotesCount.value + 1)))

		if (!quote) {
			set.status = 'Internal Server Error'
			return
		}

		return populateWithDiscordUsers(quote, discord)
	})

export { quotePlugin }

import { EmbedBuilder } from 'discord.js'
import type { client } from '../../rpc/client'

type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

type DiscordUser = { name: string; avatar: string }

type QuoteEmbeds = Prettify<
	Omit<
		NonNullable<Awaited<ReturnType<typeof client.quote.random>>>,
		'creator' | 'participants' | 'votes'
	> & { creator: DiscordUser; title: string }
>

export const quoteEmbeds = (quote: QuoteEmbeds) =>
	new EmbedBuilder()
		.setColor('Random')
		.setTitle(quote.title)
		.setDescription(quote.content)
		.setAuthor({
			name: 'Open in browser',
			url: `https://rick.konga.dev/quote/${quote.id}`,
		})
		.setFooter({
			text: quote.creator.name,
			iconURL: quote.creator.avatar,
		})
		.setTimestamp(quote.timestamp)

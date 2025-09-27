import type { Quote } from '@prisma/client'
import { type CacheType, type CommandInteraction, EmbedBuilder } from 'discord.js'
import { prisma } from '../../../../prisma/client'
import type { ICommand } from './ICommand'

export default class RandomQuoteCommand implements ICommand {
	public execute = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
		const quote: Quote = (
			await prisma.quote.aggregateRaw({
				pipeline: [{ $sample: { size: 1 } }]
			})
		)[0] as Quote

		if (!quote) {
			await interaction.reply({ content: 'Could not fetch quote' })
			return
		}

		const quoteCreator = interaction.guild?.members.cache.find((member) => member.id === quote.creator)
		const quoteEmbed = new EmbedBuilder()
			.setColor('Random')
			.setDescription(quote.content)
			.setFooter({
				text: quoteCreator?.nickname ?? 'Unknown author',
				iconURL: quoteCreator?.displayAvatarURL() ?? undefined
			})
			.setTimestamp(quote.timestamp)

		await interaction.reply({ embeds: [quoteEmbed] })
	}
}

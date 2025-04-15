import { type CacheType, type CommandInteraction, EmbedBuilder } from 'discord.js'
import { prisma } from '../../prisma/Client'
import type { Quote } from '../../prisma/gen/prisma/client'
import type { ICommand } from './ICommand'

export default class QuoteCommand implements ICommand {
	public execute = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
		const quote = interaction.options.get('quote')

		if (!quote) {
			await interaction.reply({ content: 'You need to provide a quote!', ephemeral: true })
			return
		}

		const quoteObject: Omit<Quote, 'id'> = {
			content: (quote.value as string).replaceAll('\\n', '\n'),
			creator: interaction.user.id,
			timestamp: Date.now(),
			votes: 0,
			participants: [],
		}

		const quoteCreator = interaction.guild?.members.cache.find((member) => member.id === interaction.user.id)

		await prisma.quote.create({ data: quoteObject })

		const quoteEmbed = new EmbedBuilder()
			.setColor('Random')
			.setDescription(quoteObject.content)
			.setFooter({
				text: quoteCreator?.nickname ?? 'Unknown author',
				iconURL: quoteCreator?.displayAvatarURL() ?? undefined
			})
			.setTimestamp(quoteObject.timestamp)

		await interaction.reply({ embeds: [quoteEmbed] })
	}
}

import {
	type ChatInputCommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js'
import { client } from '@/rpc/client.ts'
import type { Command } from './command'

export const randomQuote: Command = {
	fire: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		const quote = await client.quote.random()

		if (!quote) {
			await interaction.reply({
				content: `Couldn't find a quote.`,
				flags: 'Ephemeral',
			})
			return
		}

		const creator = interaction.guild?.members.cache.find(
			member => member.id === quote?.creator,
		)

		const embeds = new EmbedBuilder()
			.setColor('Random')
			.setDescription(quote.content)
			.setFooter({
				text: creator?.nickname ?? 'Unknown',
				iconURL: creator?.displayAvatarURL() ?? undefined,
			})
			.setTimestamp(quote.timestamp)

		await interaction.reply({ embeds: [embeds] })
	},
	slashCommand: new SlashCommandBuilder()
		.setName('randomquote')
		.setDescription(
			'Delivers a quote that brightens your day directly to your doorstep.',
		),
}

import { ActionRowBuilder, Colors, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } from 'discord.js'
import type { CacheType, CommandInteraction, ModalActionRowComponentBuilder, ModalSubmitInteraction, UserSelectMenuInteraction } from 'discord.js'
import { prisma } from '../../prisma/Client'
import type { Quote } from '../../prisma/gen/prisma/client'
import type { ICommand } from './ICommand'

export default class QuoteCommand implements ICommand {
	public static QUOTE_MODAL = 'quote'
	public static QUOTE_CONTENT = 'content'
	public static QUOTE_PARTICIPANTS = 'participants'

	private placeholders: Array<string> = [
		"Everything that has been said.",
		"The very intellectual conversation goes here.",
		"Damn. What a stupid thing to come frome someone's mouth.",
		"*Facepalm*",
		'The super awesome quote-worthy text you just witnessed.'
	]

	public execute = async (interaction: CommandInteraction<CacheType>): Promise<void> => {
		const modal = new ModalBuilder()
			.setCustomId(QuoteCommand.QUOTE_MODAL)
			.setTitle('Time for a new quote!')

		// Create text input for quote
		const input = new ActionRowBuilder<ModalActionRowComponentBuilder>()
			.addComponents(
				new TextInputBuilder()
					.setCustomId(QuoteCommand.QUOTE_CONTENT)
					.setLabel('Quote')
					.setStyle(TextInputStyle.Paragraph)
					.setRequired(true)
					.setPlaceholder(this.getRandom(this.placeholders))
			)

		modal.setComponents(input)

		await interaction.showModal(modal)

		// Await modal submission for 15 seconds
		const modalSubmission = await interaction.awaitModalSubmit({
			filter: ({ user: { id }, customId }) => customId === QuoteCommand.QUOTE_MODAL && id === interaction.user.id,
			time: 120_000
		})

		await modalSubmission.deferReply({ ephemeral: true })

		const quote: Omit<Quote, 'id'> = {
			content: modalSubmission.fields.getTextInputValue(QuoteCommand.QUOTE_CONTENT),
			creator: interaction.user.id,
			timestamp: interaction.createdTimestamp,
			votes: 0,
			participants: []
		}

		const quoteWithId: Quote = await prisma.quote.create({ data: quote })

		if (!quoteWithId) {
			await modalSubmission.editReply({
				content: 'An error occured and your quote could not be saved! :(',
			})

			return
		}

		const participantSelection = new ActionRowBuilder<UserSelectMenuBuilder>()
			.addComponents(
				new UserSelectMenuBuilder()
					.setCustomId(QuoteCommand.QUOTE_PARTICIPANTS)
					.setPlaceholder('Participants')
					.setMinValues(1)
					.setMaxValues(25)
			)

		const creator = interaction.guild?.members.cache.find((member) => member.id === interaction.user.id)
		const embeds = new EmbedBuilder()
			.setColor('Random')
			.setDescription(quote.content)
			.setFooter({
				text: creator?.nickname ?? 'Unknown',
				iconURL: creator?.displayAvatarURL()
			})
			.setTimestamp(quote.timestamp)

		await modalSubmission.editReply({
			content: 'Quote was saved! Now please select all users that were a part of it! :)',
			embeds: [embeds],
			components: [participantSelection],
		})

		// biome-ignore lint: dei muada is a forbidden null-assertion
		const collector = modalSubmission.channel!.createMessageComponentCollector({
			filter: ({ customId }) => customId === QuoteCommand.QUOTE_PARTICIPANTS,
			max: 3,
			time: 120_000
		})

		collector.on('collect', async (selectInteraction: UserSelectMenuInteraction) => {
			await selectInteraction.deferUpdate()

			await prisma.quote.update({
				where: { id: quoteWithId.id },
				data: { participants: selectInteraction.values }
			})

			await selectInteraction.editReply({
				content: 'All selected users were added to the quote!',
				components: []
			})
		})

		collector.on('end', async (collected) => {
			if (collected.size === 0) {
				await modalSubmission.editReply({
					content: 'No users were added to the quote!',
					components: []
				})
			}

			await modalSubmission.channel?.send({
				embeds: [embeds]
			})
		})
	}

	private getRandom = <T>(target: ReadonlyArray<T>): T => target[Math.floor(Math.random() * target.length)]
}

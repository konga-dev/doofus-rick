import {
	type ChatInputCommandInteraction,
	Routes,
	SlashCommandBuilder,
} from 'discord.js'
import type { Command } from './command'

const placeholders = [
	'Everything that has been said.',
	'The very intellectual conversation goes here.',
	"Damn. What a stupid thing to come frome someone's mouth.",
	'*Facepalm*',
	'The super awesome quote-worthy text you just witnessed.',
]

export const QUOTE_MODAL_ID = 'quote-modal'
export const QUOTE_CONTENT_ID = 'quote-content'
export const QUOTE_PARTICIPANTS_ID = 'quote-participants'

export const quote: Command = {
	fire: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		const modal = {
			type: 9, // Modal
			data: {
				custom_id: QUOTE_MODAL_ID,
				title: 'Time for a new quote!',
				components: [
					{
						type: 1, // Action Row for TextInput
						components: [
							{
								type: 4, // Text Input component
								custom_id: QUOTE_CONTENT_ID,
								label: 'Quote content',
								style: 2, // Paragraph style
								min_length: 1,
								max_length: 400,
								required: true,
								placeholder:
									placeholders[
									Math.floor(
										Math.random() * placeholders.length,
									)
									],
							},
						],
					},
					{
						type: 18, // Label wrapper for non-text inputs
						label: 'All users that are part of this quote',
						component: {
							type: 5, // User select menu
							custom_id: QUOTE_PARTICIPANTS_ID,
							min_values: 1,
							max_values: 5,
							placeholder: '',
							required: true,
						},
					},
				],
			},
		}

		await interaction.client.rest.post(
			Routes.interactionCallback(interaction.id, interaction.token),
			{ body: modal },
		)
	},
	slashCommand: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Save a new quote.'),
}

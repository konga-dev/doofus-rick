import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js'
import type { Command } from './command'

export const ping: Command = {
	fire: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		interaction.reply({ content: 'dei muada!', flags: 'Ephemeral' })
	},
	slashCommand: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping-Pong with Doofus Rick.'),
}

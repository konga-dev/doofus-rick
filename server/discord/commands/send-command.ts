import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
	type Snowflake,
} from 'discord.js'
import type { Command } from './command'

const allowedUsers: ReadonlyArray<Snowflake> = [
	'275342581821603842',
	'155046312411267072',
]

export const send: Command = {
	fire: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		if (!allowedUsers.includes(interaction.member?.user.id || '')) {
			await interaction.reply({
				content: 'des deafst du ned du sandla',
				flags: 'Ephemeral',
			})
			return
		}

		const target = interaction.options.getUser('target')
		const message = interaction.options.getString('message')

		if (!target) {
			await interaction.reply({
				content: 'i woas ned wem i auf de eier gia soll',
				flags: 'Ephemeral',
			})
			return
		}

		if (!message) {
			await interaction.reply({
				content: 'i woas ned wos i sogn soll',
				flags: 'Ephemeral',
			})
			return
		}

		const dm = await target.createDM()
		dm.send(message)
		await interaction.reply({ content: 'jo passd', flags: 'Ephemeral' })
	},
	slashCommand: new SlashCommandBuilder()
		.setName('send')
		.setDescription("Sends a message to the targeted user's DMs.")
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The targeted user')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('The message to be sent')
				.setRequired(true),
		) as SlashCommandBuilder,
}

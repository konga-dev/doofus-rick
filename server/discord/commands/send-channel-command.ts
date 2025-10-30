import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
	type TextChannel,
} from 'discord.js'
import type { Command } from './command'

const allowedUsers = ['275342581821603842', '155046312411267072']

export const sendChannel: Command = {
	fire: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		if (!allowedUsers.includes(interaction.member?.user.id || '')) {
			await interaction.reply({
				content: 'du deafsd des ned du sandla',
				flags: 'Ephemeral',
			})
			return
		}

		const target = interaction.options.getChannel('target')
		const message = interaction.options.getString('message')

		if (!target) {
			await interaction.reply({
				content: 'hawara wo soll i des hischickn?? trottl',
				flags: 'Ephemeral',
			})
			return
		}

		if (!message) {
			await interaction.reply({
				content: 'wos soid i denn sogn??',
				flags: 'Ephemeral',
			})
			return
		}

		await (target as TextChannel).send(message)
		await interaction.reply({
			content: 'jo is erledigt',
			flags: 'Ephemeral',
		})
	},
	slashCommand: new SlashCommandBuilder()
		.setName('sendchannel')
		.setDescription('Send a message to the specified channel.')
		.addChannelOption(option =>
			option
				.setName('target')
				.setDescription('The channel the message will be sent to.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('message')
				.setDescription('The message to be sent.')
				.setRequired(true),
		) as SlashCommandBuilder,
}

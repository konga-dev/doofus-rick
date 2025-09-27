import type { ChatInputCommandInteraction } from 'discord.js'
import type { ICommand } from './ICommand'

const allowedUsers = ['155046312411267072', '275342581821603842']

export default class SendCommand implements ICommand {
	async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		if (!allowedUsers.includes(interaction.member?.user.id ?? 'null')) {
			await interaction.reply({ content: 'des deafst du ned du santla', ephemeral: true })
			return
		}
		const target = interaction.options.getUser('user')
		const message = interaction.options.get('message')?.value
		if (target && message) {
			try {
				const userDM = await target.createDM()
				userDM.send(message as string)
				await interaction.reply({ content: 'ok', ephemeral: true })
			} catch (_) {
				await interaction.reply({ content: 'gehd ned', ephemeral: true })
			}
		} else {
			await interaction.reply({ content: 'tua normal', ephemeral: true })
		}
	}
}

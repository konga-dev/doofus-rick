import type { CommandInteraction } from 'discord.js'
import type { ICommand } from './ICommand'

export default class PingCommand implements ICommand {
	async execute(interaction: CommandInteraction): Promise<void> {
		await interaction.reply({ content: 'Pong!', ephemeral: true })
	}
}

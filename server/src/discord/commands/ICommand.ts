import type { CommandInteraction } from 'discord.js'

interface ICommand {
	execute(interaction: CommandInteraction): void
}

export type { ICommand }

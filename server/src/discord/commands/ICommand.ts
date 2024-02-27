import { CommandInteraction } from 'discord.js'

interface ICommand {
    execute(interaction: CommandInteraction): void
}

export { ICommand }

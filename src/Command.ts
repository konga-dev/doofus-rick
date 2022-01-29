import { CommandInteraction } from 'discord.js'

export default interface Command {
    execute(interaction: CommandInteraction): void
}

import { CacheType, CommandInteraction } from 'discord.js'
import { ICommand } from './ICommand'

export default class PingCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        await interaction.reply({ content: 'Pong!', ephemeral: true })
    }
}

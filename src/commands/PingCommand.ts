import { CommandInteraction, CacheType } from 'discord.js'
import Command from '../Command'

export default class PingCommand implements Command {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        await interaction.reply('Pong!')
    }
}

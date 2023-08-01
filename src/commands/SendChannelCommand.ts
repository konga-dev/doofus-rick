import { CacheType, CommandInteraction, TextChannel } from 'discord.js'
import { ICommand } from './ICommand'

const allowedUsers = ['155046312411267072', '275342581821603842']

export default class SendChannelCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        if (!allowedUsers.includes(interaction.member?.user.id ?? 'null')) {
            await interaction.reply({ content: 'des deafst du ned du santla', ephemeral: true })
            return
        }
        const target = interaction.options.get('channel')?.channel
        const message = interaction.options.get('message')?.value
        if (target && message) {
            try {
                if (!target) throw {}
                if (!(target instanceof TextChannel)) throw {}
                await (target as TextChannel).send(message as string)
                await interaction.reply({ content: 'ok', ephemeral: true })
            } catch (_) {
                await interaction.reply({ content: 'gehd ned', ephemeral: true })
            }
        } else {
            await interaction.reply({ content: 'tua normal', ephemeral: true })
        }
    }
}

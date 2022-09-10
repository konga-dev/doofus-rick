import { CacheType, CommandInteraction } from 'discord.js'
import { ICommand } from './ICommand'

const allowedUsers = ['155046312411267072', '275342581821603842']

export default class SendCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        if (!allowedUsers.includes(interaction.member?.user.id ?? 'null')) {
            await interaction.reply({ content: 'des deaf lei da joshi', ephemeral: true })
            return
        }
        const target = interaction.options.get('id')?.value
        const message = interaction.options.get('message')?.value
        if (target && message) {
            try {
                const user = await interaction.client.users.fetch(target as string)
                const userDM = await user.createDM()
                userDM.send(message as string)
                await interaction.reply({ content: 'message sent', ephemeral: true })
            } catch (_) {
                await interaction.reply({ content: 'could not send message', ephemeral: true })
            }
        } else {
            await interaction.reply({ content: 'invalid arguments', ephemeral: true })
        }
    }
}

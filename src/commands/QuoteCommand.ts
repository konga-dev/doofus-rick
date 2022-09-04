import { CacheType, CommandInteraction, EmbedBuilder } from 'discord.js'
import { ICommand } from './ICommand'
import Quote from '../models/Quote'

export default class QuoteCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        let quote = interaction.options.get('quote')
        let stringQuote = (quote as string).replaceAll('\\n', '\n')
        const quoteObject = new Quote(stringQuote, interaction.user.id, Date.now())
        const quoteCreator = interaction.guild?.members.cache.find((member) => member.id === interaction.user.id)
        await quoteObject.create() // this usually never takes more than 3 seconds, so we don't need to defer
        const quoteEmbed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(quoteObject.content)
            .setFooter({
                text: quoteCreator?.nickname ?? 'Unknown author',
                iconURL: quoteCreator?.displayAvatarURL() ?? undefined,
            })
            .setTimestamp(quoteObject.timestamp)
        interaction.reply({ embeds: [quoteEmbed] })
    }
}

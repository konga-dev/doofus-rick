import { CacheType, CommandInteraction, MessageEmbed } from 'discord.js'
import Command from '../Command'
import Quote from '../models/Quote'

export default class RandomQuoteCommand implements Command {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        const quote = await Quote.getRandom()
        if (!quote) {
            interaction.reply({ content: 'Could not fetch quote' })
            return
        }
        const quoteCreator = interaction.guild?.members.cache.find((member) => member.id === quote.creator)
        const quoteEmbed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(quote.content)
            .setFooter({
                text: quoteCreator?.nickname ?? 'Unknown author',
                iconURL: quoteCreator?.displayAvatarURL() ?? undefined,
            })
            .setTimestamp(quote.timestamp)
        interaction.reply({ embeds: [quoteEmbed] })
    }
}

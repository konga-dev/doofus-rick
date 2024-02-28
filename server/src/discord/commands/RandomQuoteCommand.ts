import { CacheType, CommandInteraction, EmbedBuilder } from 'discord.js'
import { ICommand } from './ICommand'
import { Database } from '../../common/Database'
import { Quote } from '../../common/Quote'

export default class RandomQuoteCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        const quote = await Database.getInstance().getRandom<Quote>('quote')
        if (!quote) {
            await interaction.reply({ content: 'Could not fetch quote' })
            return
        }
        const quoteCreator = interaction.guild?.members.cache.find((member) => member.id === quote.creator)
        const quoteEmbed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(quote.content)
            .setFooter({
                text: quoteCreator?.nickname ?? 'Unknown author',
                iconURL: quoteCreator?.displayAvatarURL() ?? undefined,
            })
            .setTimestamp(quote.timestamp)
        await interaction.reply({ embeds: [quoteEmbed] })
    }
}

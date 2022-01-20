import { CacheType, CommandInteraction } from 'discord.js'
import Command from '../Command'
import Quote from '../models/Quote'

export default class RandomQuoteCommand implements Command {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        let quote = await Quote.getRandom()
        if (!quote) {
            interaction.reply({ content: 'Could not fetch quote' })
            return
        }
        interaction.reply({ content: quote.content })
    }
}

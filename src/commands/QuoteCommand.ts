import { CacheType, CommandInteraction } from 'discord.js'
import Command from '../Command'
import Quote from '../models/Quote'

export default class QuoteCommand implements Command {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        let quote = interaction.options.getString('quote')
        if (!quote) {
            interaction.reply({ content: 'You need to specify a quote!', ephemeral: true })
            return
        }
        quote = quote.replace('\\n', '\n')
        let quoteObject = new Quote(quote, interaction.user.id)
        await quoteObject.create() // this usually never takes more than 3 seconds, so we don't need to defer
        interaction.reply({ content: quote })
    }
}

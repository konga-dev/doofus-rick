import { EmbedBuilder, TextChannel } from 'discord.js'
import { Quote } from '../../common/Quote'
import { ITextChannelTask } from './ITextChannelTask'
import { Database } from '../../common/Database'

export default class CakeDayTask implements ITextChannelTask {
    private channel: TextChannel

    constructor(channel: TextChannel) {
        this.channel = channel
    }

    async execute(): Promise<void> {
        let cakeQuotes = await this.getCakeQuotes()

        if (!cakeQuotes) {
            return
        }

        cakeQuotes.forEach(({ quote, age }) => {
            let creator = this.channel.members.find((member) => member.id === quote.creator)

            let embed = new EmbedBuilder()
                .setTitle(`Look who is turning **${age}** today!`)
                .setColor('Random')
                .setDescription(quote.content)
                .setFooter({
                    text: creator?.nickname ?? 'Unknown author',
                    iconURL: creator?.displayAvatarURL() ?? undefined,
                })
                .setTimestamp(quote.timestamp)

            this.channel.send({ embeds: [embed] })
        })
    }

    async getCakeQuotes(): Promise<Array<{ quote: Quote, age: number }>> {
        let quotes = await Database.getInstance().all<Quote>('quote')
        if (!quotes) {
            return []
        }

        let today = new Date()

        return quotes
            .filter((quote) => {
                let dateOfQuote = new Date(quote.timestamp)
                return (
                    dateOfQuote.getFullYear() !== today.getFullYear() &&
                    dateOfQuote.getMonth() === today.getMonth() &&
                    dateOfQuote.getDate() === today.getDate()
                )
            })
            .map((quote) => ({ quote: quote, age: today.getFullYear() - new Date(quote.timestamp).getFullYear() }))
			.toSorted((x, y) => y.age - x.age)
	}
}

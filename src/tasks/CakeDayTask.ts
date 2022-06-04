import { MessageEmbed, TextChannel } from 'discord.js'

import { ITextChannelTask } from './ITextChannelTask'
import Quote from '../models/Quote'

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

        cakeQuotes.forEach((quote) => {
            let creator = this.channel.members.find((member) => member.id === quote[0].creator)

            let embed = new MessageEmbed()
                .setTitle(`Look who is turning **${quote[1]}** today!`)
                .setColor('RANDOM')
                .setDescription(quote[0].content)
                .setFooter({
                    text: creator?.nickname ?? 'Unknown author',
                    iconURL: creator?.displayAvatarURL() ?? undefined,
                })
                .setTimestamp(quote[0].timestamp)

            this.channel.send({ embeds: [embed] })
        })
    }

    async getCakeQuotes(): Promise<[Quote, number][] | null> {
        let quotes = await Quote.all()
        if (!quotes) {
            return null
        }

        let today = new Date()
        return quotes.filter((quote) => {
            let dateOfQuote = new Date(quote.timestamp)
            return dateOfQuote.getFullYear() !== today.getFullYear() 
                    && dateOfQuote.getMonth() === today.getMonth()
                    && dateOfQuote.getDate() === today.getDate()
        }).map((quote) => {
            return [quote, today.getFullYear() - new Date(quote.timestamp).getFullYear()]
        })
    }
}

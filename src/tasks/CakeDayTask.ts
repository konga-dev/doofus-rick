import { MessageEmbed, TextChannel } from 'discord.js'

import { ITextChannelTask } from './ITextChannelTask'
import Quote from '../models/Quote'

class CakeDayTask implements ITextChannelTask {
    private channel: TextChannel

    constructor(channel: TextChannel) {
        this.channel = channel
    }

    async execute(): Promise<void> {
        console.log('oida i wea etz executed')
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
                .setTimestamp(quote[0].timestamp * 1000)

            this.channel.send({ embeds: [embed] })
        })
    }

    async getCakeQuotes(): Promise<[Quote, number][] | null> {
        let quotes = await Quote.all()
        if (!quotes) {
            return null
        }

        // Filter quotes
        let today = new Date()
        let cakeQuotes: [Quote, number][] = []
        quotes.forEach((quote) => {
            let quoteDate = new Date(quote.timestamp * 1000)
            if (
                today.getDate() === quoteDate.getDate() &&
                today.getMonth() === quoteDate.getMonth() &&
                today.getFullYear() !== quoteDate.getFullYear()
            ) {
                cakeQuotes.push([quote, today.getFullYear() - quoteDate.getFullYear()])
            }
        })

        return cakeQuotes
    }
}

export { CakeDayTask }
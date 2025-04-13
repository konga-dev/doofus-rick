import { EmbedBuilder, type TextChannel } from 'discord.js'
import { prisma } from '../../prisma/Client'
import type { Quote } from '../../prisma/gen/prisma/client'
import type { ITextChannelTask } from './ITextChannelTask'

export default class CakeDayTask implements ITextChannelTask {
	private channel: TextChannel

	constructor(channel: TextChannel) {
		this.channel = channel
	}

	public execute = async (): Promise<void> => {
		// biome-ignore lint: oida loss mi mei forEach schreibn
		(await this.getCakeQuotes())
			.forEach(({ quote, age }) => {
				const creator = this.channel.members.find((member) => member.id === quote.creator)

				const embed = new EmbedBuilder()
					.setTitle(`Look who is turning **${age}** today!`)
					.setColor('Random')
					.setDescription(quote.content)
					.setFooter({
						text: creator?.nickname ?? 'Unknown author',
						iconURL: creator?.displayAvatarURL() ?? undefined
					})
					.setTimestamp(quote.timestamp)

				this.channel.send({ embeds: [embed] })
			})
	}

	async getCakeQuotes(): Promise<Array<{ quote: Quote; age: number }>> {
		const quotes = await prisma.quote.findMany()

		if (!quotes) {
			return []
		}

		const today = new Date()

		return quotes
			.filter((quote) => {
				const dateOfQuote = new Date(quote.timestamp)
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

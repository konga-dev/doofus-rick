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

	private getCakeQuotes = async (): Promise<Array<{ quote: Quote; age: number }>> => {
		const today = new Date();

		return (await prisma.quote.findMany())
			.map((quote) => ({ quote: quote, date: new Date(quote.timestamp) }))
			.filter(({ date }) =>
				date.getFullYear() < today.getFullYear() &&
				date.getMonth() === today.getMonth() &&
				date.getDate() === today.getDate())
			.map(({ quote, date }) => ({ quote: quote, age: today.getFullYear() - date.getFullYear() }))
			.toSorted((x, y) => y.age - x.age)
	}
}

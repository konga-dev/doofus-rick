import { headers } from 'next/headers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Quote from '@/components/ui/quote/quote'
import { auth } from '@/lib/auth'
import { prisma } from '@/prisma'
import { client } from '@/lib/rpc/orpc'

export default async function Self() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		return
	}

	const discordUser = await prisma.account.findFirst({
		where: {
			userId: session.user.id,
		},
		select: {
			accountId: true,
		},
	})

	if (!discordUser) {
		return
	}

	const quotes = await prisma.quote.findMany({
		where: {
			creator: discordUser.accountId,
		},
		orderBy: {
			timestamp: 'desc',
		},
	})

	const populatedQuotes = await Promise.all(
		quotes.map(async quote => {
			const { creator, participants } = await client.find({
				creator: quote.creator,
				participants: quote.participants,
			})

			return { ...quote, creator, participants }
		}),
	)

	return (
		<div>
			<div className="flex items-center justify-center gap-4">
				<span>All the awesome quotes captured by </span>
				<Avatar>
					<AvatarImage
						src={populatedQuotes.at(0)?.creator.avatar}
						alt={''}
					/>
					<AvatarFallback />
				</Avatar>
				<span>{populatedQuotes.at(0)?.creator.name}</span>
			</div>
			<div className="flex flex-col items-center justify-center gap-4 mt-4">
				{populatedQuotes.map(quote => (
					<Quote
						key={quote.id}
						content={quote.content}
						creator={quote.creator}
						timestamp={quote.timestamp}
						participants={quote.participants}
						votes={quote.votes}
					/>
				))}
			</div>
		</div>
	)
}

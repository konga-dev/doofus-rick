import { Elysia, t } from 'elysia'
import { getUserById } from '../../discord/Client'
import { useDiscord, usePrisma } from '../Setup'

const discordPlugin = new Elysia({ name: 'Discord', prefix: '/discord' })
	.use(usePrisma())
	.use(useDiscord())
	.get(
		'/:id',
		async ({ set, discord, params: { id } }) => {
			const user = await getUserById(discord, id)

			if (!user) {
				set.status = 'Not Found'
				return
			}

			return user
		},
		{
			params: t.Object({
				id: t.String()
			})
		}
	)
	.get(
		'/creators',
		async ({ prisma, discord }) =>
			await Promise.all(
				Array.from(new Set((await prisma.quote.findMany()).map((quote) => quote.creator))).map(
					async (creator) => {
						const user = await getUserById(discord, creator)

						if (!user) {
							return
						}

						return user
					}
				)
			)
	)

export { discordPlugin }

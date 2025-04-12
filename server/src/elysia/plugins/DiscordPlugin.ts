import { Elysia, t } from 'elysia'
import { getUserById } from '../../discord/Client'
import { databaseDecorator, discordClientDecorator } from '../Setup'
import { Quote } from '../../common/Quote'

const discordPlugin = new Elysia({ name: 'Discord' })
	.use(databaseDecorator)
	.use(discordClientDecorator)
	.group('/discord', (app) =>
		app
			.get(
				'/:id',
				async ({ set, discordClient, params: { id } }) => {
					const user = await getUserById(discordClient, id)

					if (!user) {
						set.status = 404
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
				async ({ database, discordClient }) =>
					await Promise.all(
						Array.from(new Set((await database.all<Quote>('quote')).map((quote) => quote.creator))).map(async (creator) => {
							const user = await getUserById(discordClient, creator)
							if (!user) {
								return
							}

							return user
						})
					)
			)
	)

export { discordPlugin }

import { Elysia, t } from 'elysia'
import { getUserById } from '../../discord/Client'
import { discordClientDecorator } from '../Setup'

const discordPlugin = new Elysia({ name: 'Discord' })
    .use(discordClientDecorator)
    .group('/discord', (app) =>
        app
            .get('/:id', async ({ set, discordClient, params: { id } }) => {
                const user = await getUserById(discordClient, id)

                if (!user) {
                    set.status = 404
                    return
                }

                return user
            }, {
                params: t.Object({
                    id: t.String(),
                }),
            })
    )

export { discordPlugin }


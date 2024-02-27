import { Elysia, t } from 'elysia'
import { client } from '../../discord/Client'
import { discordClientDecorator } from '../Setup'

const qqtGuild = '691751152034906142'

const discordPlugin = new Elysia()
    .use(discordClientDecorator)
    .group('/discord', (app) =>
        app
            .get('/:id', async ({ set, params: { id } }) => {
                const guild = await client.guilds.fetch(qqtGuild)
                const user = guild.members.cache
                                  .map(member => member)
                                  .find(member => member.id === id)

                if (!user) {
                    set.status = 404
                    return
                }

                return {
                    name: user?.nickname,
                    avatar: user?.displayAvatarURL()
                }
            }, {
                params: t.Object({
                    id: t.String(),
                }),
            })
    )

export { discordPlugin }


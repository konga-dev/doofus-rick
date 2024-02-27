import { Elysia, t } from 'elysia'
import log4js from 'log4js'
import { databaseDecorator } from '../Setup'

const quotePlugin = new Elysia({ name: 'Quote' })
        .use(databaseDecorator)
        .decorate('logger', log4js.getLogger('QuotePlugin'))
        .group('/quote', (app) =>
            app
                .get('/', ({ database }) => database.all('quote'))
                .get('/:id', ({ database, params: { id } }) => database.get('quote', { creator: id }), {
                    params: t.Object({
                        id: t.String()
                    })
                })
        )

export { quotePlugin }

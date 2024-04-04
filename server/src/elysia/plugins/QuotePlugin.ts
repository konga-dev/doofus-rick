import { Elysia, t } from 'elysia'
import log4js from 'log4js'
import { Quote } from '../../common/Quote'
import { getUserById } from '../../discord/Client'
import { databaseDecorator, discordClientDecorator } from '../Setup'
import { ObjectId } from 'mongodb'

const mapToClientQuote = async (quote: Quote, discordClient: any) => {
    return {
        _id: quote._id,
        content: quote.content,
        timestamp: quote.timestamp,
        creator: await getUserById(discordClient, quote.creator),
        participants: await Promise.all(
            quote.participants.map(
                async (participant) =>
                    await getUserById(discordClient, participant),
            ),
        ),
        votes: quote.votes,
    }
}

const quotePlugin = new Elysia({ name: 'Quote' })
    .use(databaseDecorator)
    .use(discordClientDecorator)
    .decorate('logger', log4js.getLogger('QuotePlugin'))
    .group('/quote', (app) =>
        app
            .get('', async ({ database, discordClient }) => {
                const quotes = await database.all<Quote>('quote')

                return Promise.all(
                    quotes.map(async (quote) =>
                        mapToClientQuote(quote, discordClient),
                    ),
                )
            })
            .get('/random', async ({ set, database, discordClient }) => {
                const quote = await database.getRandom<Quote>('quote')

                if (!quote) {
                    set.status = 404
                    return
                }

                return quote._id?.toString()
            })
            .get(
                '/byId/:id',
                async ({ set, database, discordClient, params: { id } }) => {
                    if (!ObjectId.isValid(id)) {
                        set.status = 400
                        return
                    }
                    const quotes = await database.get<Quote>('quote', {
                        _id: new ObjectId(id),
                    })

                    if (quotes.length == 0) {
                        set.status = 404
                        return
                    }
                    let quote = quotes[0]

                    return mapToClientQuote(quote, discordClient)
                },
            )
            .get(
                '/byCreator/:creatorId',
                async ({ database, discordClient, params: { creatorId } }) => {
                    const quotes = await database.get<Quote>('quote', {
                        creator: creatorId,
                    })

                    return Promise.all(
                        quotes.map(async (quote) =>
                            mapToClientQuote(quote, discordClient),
                        ),
                    )
                },
                {
                    params: t.Object({
                        creatorId: t.String(),
                    }),
                },
            ),
    )

export { quotePlugin }

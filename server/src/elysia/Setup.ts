import { Elysia } from 'elysia'
import { database } from '../common/Database'
import { client } from '../discord/Client'

const databaseDecorator = new Elysia({ name: 'DatabaseDecorator' })
    .decorate('database', database)

const discordClientDecorator = new Elysia({ name: 'DiscordClientDecorator' })
    .decorate('discordClient', client)

export { databaseDecorator, discordClientDecorator }
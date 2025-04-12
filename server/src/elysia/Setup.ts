import { Elysia } from 'elysia'
import { Database } from '../common/Database'
import { client } from '../discord/Client'

const databaseDecorator = new Elysia({ name: 'DatabaseDecorator' }).decorate('database', Database.getInstance())

const discordClientDecorator = new Elysia({ name: 'DiscordClientDecorator' }).decorate('discordClient', client)

export { databaseDecorator, discordClientDecorator }

import { Elysia } from 'elysia'
import { client } from '../discord/Client'
import { prisma } from '../prisma/Client'

const databaseDecorator = new Elysia({ name: 'PrismaDecorator' })
	.decorate('prisma', prisma)

const discordClientDecorator = new Elysia({ name: 'DiscordClientDecorator' })
	.decorate('discordClient', client)

export { databaseDecorator, discordClientDecorator }

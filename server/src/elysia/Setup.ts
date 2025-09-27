import { Elysia } from 'elysia'
import { prisma } from '../../../prisma/client'
import { client } from '../discord/Client'

const usePrisma = () => new Elysia({ name: 'Prisma' }).decorate('prisma', prisma)

const useDiscord = () => new Elysia({ name: 'Discord' }).decorate('discord', client)

export { usePrisma, useDiscord }

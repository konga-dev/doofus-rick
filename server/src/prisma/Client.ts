import { PrismaClient } from './gen/prisma/client'

const prisma = new PrismaClient({
	errorFormat: 'pretty'
})

export { prisma }

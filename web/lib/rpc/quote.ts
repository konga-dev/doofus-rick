import { os } from '@orpc/server'
import z from 'zod'
import { prisma } from '@/prisma'

export const random = os.handler(async () => {
	const count = await prisma.quote.count()

	return prisma.quote.findFirst({
		skip: Math.floor(Math.random() * count),
	})
})

export const create = os
	.input(
		z.object({
			content: z.string(),
			creator: z.string(),
			timestamp: z.date(),
			participants: z.array(z.string()),
			votes: z.number(),
		}),
	)
	.handler(async ({ input }) => {
		await prisma.quote.create({
			data: input,
		})
	})

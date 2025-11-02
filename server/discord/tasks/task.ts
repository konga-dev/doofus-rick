import type { CronOptions } from 'cronbake'
import z from 'zod'

const TaskSchema = z.custom<CronOptions<string>>()

export type Task = z.infer<typeof TaskSchema>

export const isTask = (x: unknown): x is Task => TaskSchema.safeParse(x).success

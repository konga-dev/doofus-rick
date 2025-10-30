import {
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
} from 'discord.js'
import z from 'zod'

const CommandSchema = z.object({
	fire: z.function({
		// scheiss discordjs
		// input: [z.instanceof(ChatInputCommandInteraction)],
		output: z.promise(z.void()),
	}),
	slashCommand: z.instanceof(SlashCommandBuilder),
})

export type Command = z.infer<typeof CommandSchema> & {
	fire: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export const isCommand = (x: unknown): boolean =>
	CommandSchema.safeParse(x).success

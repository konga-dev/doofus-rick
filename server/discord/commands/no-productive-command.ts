import {
	ChannelType,
	type ChatInputCommandInteraction,
	GuildMember,
	SlashCommandBuilder,
	type VoiceChannel,
} from 'discord.js'
import type { Command } from './command'

export const noProductive: Command = {
	fire: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		const executor = interaction.member as GuildMember

		if (!executor) {
			await interaction.reply({
				content: 'You may not execute this command',
				ephemeral: true,
			})
			return
		}

		if (!executor.voice.channel) {
			await interaction.reply({
				content:
					'You can only use this command while in a voice channel',
				ephemeral: true,
			})
			return
		}

		const origin = executor.voice.channel
		const target = interaction.options.getChannel('target') as VoiceChannel

		const people = (executor as GuildMember).voice.channel?.members
		// biome-ignore lint: setChannel returns a non-void value. Biome doesn't like callbacks that return a value inside a forEach()
		people?.forEach(member => member.voice.setChannel(target))

		await interaction.reply({
			content: `<@${executor.id}> has moved everyone from <#${origin?.id}> to <#${target.id}>`,
		})
	},
	slashCommand: new SlashCommandBuilder()
		.setName('noproductive')
		.setDescription(
			'Moves all members of the current productive voice channel into the general area.',
		)
		.addChannelOption(option =>
			option
				.setName('target')
				.setDescription('The channel to move to')
				.setRequired(true)
				.addChannelTypes(ChannelType.GuildVoice),
		) as SlashCommandBuilder,
}

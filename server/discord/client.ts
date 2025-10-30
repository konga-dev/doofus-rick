import { REST } from '@discordjs/rest'
import {
	ActivityType,
	Client,
	EmbedBuilder,
	GatewayIntentBits,
	Partials,
	Routes,
	type TextChannel,
} from 'discord.js'
import { client as rpc } from '../rpc/client'
import * as chatCommands from './commands'
import { isCommand } from './commands/command'
import {
	QUOTE_CONTENT_ID,
	QUOTE_MODAL_ID,
	QUOTE_PARTICIPANTS_ID,
} from './commands/quote-command'

export const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.DirectMessages,
	],
	partials: [Partials.Channel],
})

const commands = Object.values(chatCommands).filter(command =>
	isCommand(command),
)

// biome-ignore lint: Ignore value returned by console.log
commands.forEach(command =>
	console.log(`Registered command: ${command.slashCommand.name}`),
)

const rest = new REST({ version: '10' }).setToken(
	process.env.DISCORD_TOKEN as string,
)

await rest.put(
	Routes.applicationGuildCommands(
		process.env.DISCORD_CLIENT_ID as string,
		process.env.DISCORD_GUILD_ID as string,
	),
	{ body: commands.map(command => command.slashCommand.toJSON()) },
)

console.log('Patched slash commands.')

client.once('clientReady', () => {
	client.user?.setPresence({
		status: 'online',
		activities: [
			{ type: ActivityType.Watching, name: 'joshis muada auf youporn' },
		],
	})
})

client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		commands
			.find(
				command =>
					command.slashCommand.name === interaction.commandName,
			)
			?.fire(interaction)
		return
	}

	if (interaction.isModalSubmit()) {
		if (interaction.customId === QUOTE_MODAL_ID) {
			const content =
				interaction.fields.getTextInputValue(QUOTE_CONTENT_ID)

			const participants =
				interaction.fields
					.getSelectedUsers(QUOTE_PARTICIPANTS_ID)
					?.map(participant => participant.id) || []

			await rpc.quote.create({
				content: content,
				creator: interaction.user.id,
				participants: participants,
				votes: 0,
				timestamp: new Date(),
			})

			const embeds = new EmbedBuilder()
				.setColor('Random')
				.setDescription(content)
				.setFooter({
					text: interaction.user.displayName,
					iconURL: interaction.user.displayAvatarURL(),
				})
				.setTimestamp(new Date())

			await (interaction.channel as TextChannel).send({
				embeds: [embeds],
			})

			await interaction.reply({
				content: 'Quote has been saved!',
				flags: 'Ephemeral',
			})
		}
	}
})

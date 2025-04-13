import { ChannelType, Client, EmbedBuilder, Events, GatewayIntentBits, Partials, type Snowflake } from 'discord.js'
import log4js from 'log4js'
import CommandRegistry from './CommandRegistry'

import { TaskScheduler } from './TaskScheduler'
import { AutoResponseListener, NameListener } from './listener'

const joshId: Snowflake = '155046312411267072'
const qqtGuild: Snowflake = '691751152034906142'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.DirectMessages
	],
	partials: [Partials.Channel]
})

client.once(Events.ClientReady, () => {
	log4js.getLogger('Discord').info('Successfully connected to Discord')
	new TaskScheduler(client).registerTasks()
})

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isCommand()) {
		return
	}
	const { commandName } = interaction
	CommandRegistry.getCommand(commandName)?.execute(interaction)
})

client.on(Events.MessageCreate, AutoResponseListener.onEvent)

client.on(Events.GuildMemberUpdate, NameListener.onEvent)

client.on(Events.MessageCreate, async (interaction) => {
	if (interaction.author.bot || interaction.channel.type !== ChannelType.DM || interaction.author.id === joshId) {
		return
	}
	const josh = await client.users.fetch(joshId)
	const joshDMs = await josh.createDM()
	const embed = new EmbedBuilder()
		.setColor('Random')
		.setTitle(`${interaction.author.tag} wrote:`)
		.setDescription(interaction.content.length > 0 ? interaction.content : 'No content')
		.setFooter({
			text: `ID: ${interaction.author.id}`
		})
	const attachment = interaction.attachments.first()
	if (attachment) {
		embed.setImage(attachment.url)
	}
	joshDMs.send({ embeds: [embed] })
})

const getUserById = async (client: Client, id: string): Promise<{ name: string; avatar: string } | null> => {
	const guild = await client.guilds.fetch({ guild: qqtGuild })
	const user = guild.members.cache.map((member) => member).find((member) => member.id === id)

	if (!user) {
		return null
	}

	return {
		name: user.nickname ?? user.displayName,
		avatar: user.displayAvatarURL()
	}
}

export { client, getUserById }

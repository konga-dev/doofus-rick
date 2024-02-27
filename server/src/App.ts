import { ChannelType, Client, EmbedBuilder, Events, GatewayIntentBits, Partials } from 'discord.js'
import dotenv from 'dotenv'
import log4js from 'log4js'
import { Database } from './common/Database'
import CommandRegistry from './discord/CommandRegistry'
import { AutoResponseListener, NameListener } from './discord/listener'
import { TaskScheduler } from './discord/TaskScheduler'

const joshId = '155046312411267072'

async function main(args: string[]) {
    dotenv.config({ path: '../.env' })
    new Database(process.env.MONGODB_URI!)

    log4js.configure({
        appenders: {
            console: { type: 'console' },
        },
        categories: {
            default: { appenders: ['console'], level: args[0] === 'debug' ? 'debug' : 'info' },
        },
    })

    const logger = log4js.getLogger('Bootstrap')
    const client = new Client({
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

    client.once(Events.ClientReady, () => {
        logger.info('Successfully connected to Discord')
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
        if (interaction.author.bot || interaction.channel.type != ChannelType.DM || interaction.author.id === joshId) {
            return
        }
        const josh = await client.users.fetch(joshId)
        const joshDMs = await josh.createDM()
        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`${interaction.author.tag} wrote:`)
            .setDescription(interaction.content.length > 0 ? interaction.content : 'No content')
            .setFooter({
                text: `ID: ${interaction.author.id}`,
            })
        const attachment = interaction.attachments.first()
        if (attachment) {
            embed.setImage(attachment.url)
        }
        joshDMs.send({ embeds: [embed] })
    })

    await Database.getInstance().connect(process.env.DATABASE!)

    await client.login(process.env.DISCORD_TOKEN)
}

main(process.argv.slice(2))

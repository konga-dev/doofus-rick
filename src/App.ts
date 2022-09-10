import { ChannelType, Client, EmbedBuilder, GatewayIntentBits, Partials } from 'discord.js'
import dotenv from 'dotenv'
import log4js from 'log4js'

import CommandRegistry from './CommandRegistry'
import Database from './Database'
import { TaskScheduler } from './TaskScheduler'

async function main(args: string[]) {
    dotenv.config()
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

    client.once('ready', () => {
        logger.info('Successfully connected to Discord')
        new TaskScheduler(client).registerTasks()
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }
        const { commandName } = interaction
        CommandRegistry.getCommand(commandName)?.execute(interaction)
    })

    client.on('messageCreate', async (interaction) => {
        if (interaction.author.bot || interaction.channel.type != ChannelType.DM) {
            return
        }
        const josh = await client.users.fetch('155046312411267072')
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

    client.login(process.env.DISCORD_TOKEN)
}

main(process.argv.slice(2))

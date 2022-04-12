import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import log4js from 'log4js'

import CommandRegistry from './CommandRegistry'
import { TaskScheduler } from './TaskScheduler'
import Database from './Database'

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
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_VOICE_STATES,
        ],
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

    await Database.getInstance().connect(process.env.DATABASE!)

    client.login(process.env.DISCORD_TOKEN)
}

main(process.argv.slice(2))

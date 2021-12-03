import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv'
import log4js from 'log4js'
import CommandRegistry from './CommandRegistry'

import Database from './util/database/Database'

async function main(args: string[]) {
    dotenv.config()
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
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES],
    })

    client.once('ready', () => {
        logger.info('Successfully connected to Discord')
    })

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) {
            return
        }
        const { commandName } = interaction
        CommandRegistry.getCommand(commandName)?.execute(interaction)
    })

    const database = new Database(process.env.MONGODB_URI)
    await database.connect()

    client.login(process.env.DISCORD_TOKEN)
}

main(process.argv.slice(2))

/*
    This script is for deploying Discord commands. It needs to be run every time you add/remove or edit a command.
    You can always use the command `npm run deploy-commands` to redeploy commands.
    Simply add a SlashCommandBuilder to the `commands` array while using the desired building functions.

    For more information, see
    https://discordjs.guide/popular-topics/builders.html#slash-command-builders
*/

const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const dotenv = require('dotenv')

dotenv.config()

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Stores a quote for later')
        .addStringOption((option) =>
            option.setName('quote').setDescription('The quote to be stored').setRequired(true),
        ),
    new SlashCommandBuilder().setName('randomquote').setDescription('Gets a random quote to brighten your day!'),
].map((command) => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_QQT_ID), {
    body: commands,
})
    .then(() => console.log('Successfully deployed commands'))
    .catch(console.error)

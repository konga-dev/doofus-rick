/*
	This script is for deploying Discord commands. It needs to be run every time you add/remove or edit a command.
	You can always use the command `npm run deploy-commands` to redeploy commands.
	Simply add a SlashCommandBuilder to the `commands` array while using the desired building functions.

	For more information, see
	https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration
*/

import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { config } from 'dotenv'

config()

const commands = [
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!'),
	new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Stores a quote for later')
		.addStringOption((option) => option.setName('quote').setDescription('The quote to be stored').setRequired(true)),
	new SlashCommandBuilder()
		.setName('randomquote')
		.setDescription('Gets a random quote to brighten your day!'),
	new SlashCommandBuilder()
		.setName('vitals')
		.setDescription("Shows Doofus Rick's vital signs"),
	new SlashCommandBuilder()
		.setName('votekick')
		.setDescription('Votes to kick someone from the voice channel')
		.addUserOption((option) => option.setName('user').setDescription('The user to be kicked').setRequired(true)),
	new SlashCommandBuilder()
		.setName('noproductive')
		.addIntegerOption((option) => option.setName('index').setDescription('The index of the channel to move into (starts at 0)').setRequired(false))
		.setDescription('Moves everyone from the productive zone to general'),
	new SlashCommandBuilder()
		.setName('send')
		.setDescription('Sends a message to a user')
		.addUserOption((option) => option.setName('user').setDescription('The target user').setRequired(true))
		.addStringOption((option) => option.setName('message').setDescription('The message to send').setRequired(true)),
	new SlashCommandBuilder()
		.setName('sendchannel')
		.setDescription('Sends a message to a channel')
		.addChannelOption((option) => option.setName('channel').setDescription('The target channel').setRequired(true))
		.addStringOption((option) => option.setName('message').setDescription('The message to send').setRequired(true))
].map((command) => command.toJSON())

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_QQT_ID), { body: commands })
	.then(() => console.log('Successfully deployed commands'))
	.catch(console.error)

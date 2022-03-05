import { CacheType, Collection, CommandInteraction, GuildMember } from 'discord.js'
import Command from '../Command'

interface VotekickData {
    victim: GuildMember
    executor: GuildMember
    votes: number
    neededVotes: number
}

export default class VotekickCommand implements Command {
    private readonly NEEDED_VOTES_RATIO = 0.66 // 2/3 majority
    private readonly kickMap = new Map<string, string[]>() // key: victimSnowflake, value: executorSnowflake[]
    private clearInterval: NodeJS.Timer

    constructor() {
        this.clearInterval = setInterval(() => {
            this.kickMap.clear()
        }, 1000 * 60 * 5) // Clear cache every 5 minutes
    }

    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        const user = interaction.options.getUser('user')
        const executor = interaction.member?.user
        const guild = interaction.guild
        if (!user) {
            await interaction.reply({ content: 'You need to specify a user!', ephemeral: true })
            return
        }
        if (!guild || !executor) {
            await interaction.reply({ content: 'This command can only be executed in a guild', ephemeral: true })
            return
        }
        const guildMembers = guild!.members.cache
        const guildUser = await guildMembers.find((member) => member.id == user!.id)?.fetch()
        const guildExecutor = await guildMembers.find((member) => member.id == executor!.id)?.fetch()
        if (!guildUser || !guildExecutor) {
            await interaction.reply({ content: 'User could not be found', ephemeral: true })
            return
        }

        if (
            !guildExecutor.voice.channel ||
            !guildUser.voice.channel ||
            guildExecutor.voice.channel.id !== guildUser.voice.channel.id
        ) {
            await interaction.reply({
                content: 'Sorry, you can only votekick a user in your voice channel',
                ephemeral: true,
            })
            return
        }

        let voiceMembers = guildExecutor.voice.channel?.members
        let neededVotes = Math.floor((voiceMembers as Collection<string, GuildMember>).size * this.NEEDED_VOTES_RATIO)
        if (this.kickMap.has(user.id)) {
            let votes = this.kickMap.get(user.id) as string[]
            if (votes.includes(executor.id)) {
                await interaction.reply({
                    content: 'Sorry, you can only vote to kick someone once',
                    ephemeral: true,
                })
                return
            }
            votes.push(executor.id)
            if (votes.length >= neededVotes) {
                this.executeVotekick(interaction, {
                    victim: guildUser,
                    executor: guildExecutor,
                    votes: votes.length,
                    neededVotes,
                })
            } else {
                await interaction.reply({
                    content: `<@${executor.id}> has voted to kick <@${user.id}> (${votes.length}/${neededVotes})`,
                })
            }
            this.kickMap.set(user.id, votes)
        } else {
            if (neededVotes == 1) {
                this.executeVotekick(interaction, {
                    victim: guildUser,
                    executor: guildExecutor,
                    votes: 1,
                    neededVotes,
                })
            } else {
                this.clearInterval.refresh() // reset the timer
                this.kickMap.set(user.id, [executor.id])
                await interaction.reply({
                    content: `<@${executor.id}> has started a votekick for <@${user.id}> (1/${neededVotes})`,
                })
            }
        }
    }

    async executeVotekick(interaction: CommandInteraction<CacheType>, kickData: VotekickData): Promise<void> {
        let { victim, executor, votes, neededVotes } = kickData
        victim.voice.disconnect('Disconnected due to successful votekick')
        await interaction.reply({
            content: `<@${victim.id}> has been kicked due to vote by <@${executor.id}> (${votes}/${neededVotes})`,
        })
        this.kickMap.delete(victim.id)
    }
}

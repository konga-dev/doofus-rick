import { CacheType, ChannelType, Collection, CommandInteraction, GuildMember, VoiceChannel } from 'discord.js'
import { ICommand } from './ICommand'

const PRODUCTIVE_AREA = '881916495012180028'
const GENERAL_CHANNEL = '691755269604245524'

export default class NoProductiveCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        const executor = interaction.member
        if (!executor || !(executor instanceof GuildMember)) {
            await interaction.reply({ content: 'You may not execute this command', ephemeral: true })
            return
        }
        if (!(executor as GuildMember).voice.channel) {
            await interaction.reply({
                content: 'You can only use this command while in a voice channel',
                ephemeral: true,
            })
            return
        }
        let voiceChannels = interaction.guild?.channels.cache.filter((channel) => channel instanceof VoiceChannel)
        let productiveChannels = voiceChannels?.filter((channel) => channel.parent?.id == PRODUCTIVE_AREA)
        let generalChannel = interaction.guild?.channels.cache.find(
            (channel) => channel.id == GENERAL_CHANNEL && channel.type === ChannelType.GuildVoice,
        )
        if (!generalChannel) {
            await interaction.reply({ content: 'The general channel is not configured correctly', ephemeral: true })
            return
        }
        if (!productiveChannels) {
            await interaction.reply({ content: 'The productive area is not configured correctly', ephemeral: true })
            return
        }
        let productivePeople = productiveChannels.flatMap(
            (channel) => channel.members as Collection<string, GuildMember>,
        )
        if (productivePeople.size == 0) {
            await interaction.reply({ content: 'There is nobody to move in the productive area', ephemeral: true })
        } else {
            productivePeople.forEach((member) => {
                member.voice.setChannel(generalChannel as VoiceChannel)
            })
            await interaction.reply({ content: `<@${executor.user.id}> has moved everyone to general` })
        }
    }
}

import { CacheType, ChannelType, Collection, CommandInteraction, GuildMember, VoiceChannel } from 'discord.js'
import { ICommand } from './ICommand'

const PRODUCTIVE_AREA = '881916495012180028'
const GENERAL_CHANNELS = ['691755269604245524', '696694023053770793']

const toArray = <T>(iterable: IterableIterator<T>): T[] => {
    const array: T[] = []
    for (const item of iterable) {
        array.push(item)
    }
    return array
}

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
        let generalChannels = interaction.guild?.channels.cache
            .filter((channel) => GENERAL_CHANNELS.includes(channel.id) && channel.type === ChannelType.GuildVoice)
            .values()
        if (!generalChannels) {
            await interaction.reply({ content: 'The general channels are not configured correctly', ephemeral: true })
            return
        }
        let generalChannelsArray = toArray(generalChannels)
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
            const index = interaction.options.get('index')
            if (index != null && (index.value as number) > generalChannelsArray.length) {
                await interaction.reply({ content: 'The index is out of bounds', ephemeral: true })
                return
            }
            const channel = index ? generalChannelsArray[index.value as number] : generalChannelsArray[0]
            productivePeople.forEach((member) => {
                member.voice.setChannel(channel as VoiceChannel)
            })
            await interaction.reply({ content: `<@${executor.user.id}> has moved everyone to general` })
        }
    }
}

import { GuildMember, PartialGuildMember } from 'discord.js'

const CLIENT_ID = '155046312411267072'

const onEvent = async (oldMember: PartialGuildMember | GuildMember, newMember: GuildMember) => {
    if (newMember.id !== CLIENT_ID) {
        return
    }
    if (newMember.displayName !== '!Josh') {
        await newMember.setNickname('!Josh')
    }
}

export { onEvent }

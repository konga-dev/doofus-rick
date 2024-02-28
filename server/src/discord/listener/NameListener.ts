import { GuildMember, PartialGuildMember } from 'discord.js'

const CLIENT_ID = '275342581821603842'

const MIN_TIME_MIN = 120
const MAX_TIME_MIN = 2500

const onEvent = async (_: PartialGuildMember | GuildMember, newMember: GuildMember) => {
    if (newMember.id !== CLIENT_ID) {
        return
    }
    if (newMember.displayName !== 'nicolaus') {
        setTimeout(
            async () => {
                await newMember.setNickname('nicolaus')
            },
            Math.floor(Math.random() * (MAX_TIME_MIN - MIN_TIME_MIN + 1) + MIN_TIME_MIN) * 60 * 1000,
        )
    }
}

export { onEvent }

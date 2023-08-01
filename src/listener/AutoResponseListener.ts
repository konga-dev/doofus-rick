import { ChannelType, Message } from 'discord.js'

interface AutoResponse {
    regex: RegExp
    response: string
}

const autoResponses: AutoResponse[] = [
    {
        regex: /187/i,
        response: '187 lümmel in dei mama',
    },
    {
        regex: /oha/i,
        response: 'ladung?',
    },
    {
        regex: /figg di/i,
        response: 'figg di selber',
    },
    {
        regex: /good one/i,
        response: 'XDDDDDDD',
    },
    {
        regex: /i mog nimma/i,
        response: 'i a ned',
    },
]

const onEvent = (event: Message<boolean>) => {
    const { content, channel } = event
    if (event.author.bot) return
    autoResponses.forEach((autoResponse) => {
        if (autoResponse.regex.test(content)) {
            channel.send(autoResponse.response)
        }
    })
}

export { onEvent }

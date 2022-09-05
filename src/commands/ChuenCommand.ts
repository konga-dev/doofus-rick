import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    CacheType,
    CollectorFilter,
    CommandInteraction,
    InteractionCollector,
    InteractionResponse,
} from 'discord.js'
import { ICommand } from './ICommand'

const CHUEN_USERS = [
    '275342581821603842', // bauch
    '695655381006942279', // aner
    '396673727770918923', // maxi
    '243018267717795840', // beni(s)
    '267638172375187466', // maxi
    '594507314963415041', // eva
    '346021456662102016', // H
    '285073775475687435', // seg
    '881587557916344331', // masa
    '312580864133562370', // T
]

const MESSAGES = [
    'hi i soi di vom joshi frogn ob du discord chün wüsd',
    'wos gedn megst du mitn joshi discord chün',
    'he mogst du vielleicht mitn joshi discord chün',
    'as alukum mogst du vielleicht mitn joshi discord chün',
    'heeeeeeee zahds di mitn joshi discord chün',
    'hallo, mitn joshi discord chün?',
    'hi da joshi zwingt mi dazua di zum frogn ob du mid eam discord chün wüsd',
    'hallo haben Sie vielleicht interesse mit herrn dünner hering auf discord zu chün',
    'oida mogst du mitn joshi discord chün eam tats voi zahn',
    'du mogst doch sicha mitn joshi discord chün oda',
    'he he he discord chün mitn joshi zahd di doch save oda',
]

const CHUEN_BUTTON_ID = 'chuen_send'

const getRandomMessage = () => {
    return MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
}

const getOnlineUsers = async (interaction: CommandInteraction) => {
    const chuenUsers = (await interaction.guild?.members.fetch())?.filter((member) =>
        CHUEN_USERS.includes(member.user.id),
    )
    if (!chuenUsers) {
        throw new Error('discord sagt na')
    }
    const onlineUsers = chuenUsers.filter(
        (member) => member.presence?.status === 'online' || member.presence?.status === 'dnd',
    )
    if (onlineUsers.size == 0) {
        throw new Error('keiner is online zum chün')
    }
    return onlineUsers
}

export default class ChuenCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        if (interaction.member?.user.id !== '155046312411267072') {
            await interaction.reply({ content: 'des deaf lei da joshi', ephemeral: true })
            return
        }

        const onlineUsers = await getOnlineUsers(interaction).catch((error) => {
            interaction.reply({ content: error.message, ephemeral: true })
        })
        if (!onlineUsers) {
            return
        }

        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder().setCustomId(CHUEN_BUTTON_ID).setLabel('leid nervn').setStyle(ButtonStyle.Primary),
        )
        const filter: CollectorFilter<any> = (i: ButtonInteraction) =>
            i.customId === CHUEN_BUTTON_ID && i.user.id === '155046312411267072'
        const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 15000 })
        if (!collector) {
            await interaction.reply({ content: 'discord sagt na (could not create collector)', ephemeral: true })
            return
        }
        collector.on('collect', async (i) => {
            let successfulUsers = []
            for (let user of onlineUsers.values()) {
                try {
                    ;(await user.createDM()).send(getRandomMessage())
                    successfulUsers.push(user)
                } catch (_) {}
            }
            await i.update({
                content: 'hab folgende leid gnervt: ' + successfulUsers.map((member) => member.displayName).join(', '),
                components: []
            })
        })
        await interaction.reply({
            content:
                'folgende leid sein online zum chün: ' + onlineUsers.map((member) => member.displayName).join(', '),
            ephemeral: true,
            components: [row],
        })
    }
}

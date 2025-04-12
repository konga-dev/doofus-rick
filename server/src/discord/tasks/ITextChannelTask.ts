import { TextChannel } from 'discord.js'

import { ITask } from './ITask'

interface ITextChannelTask extends ITask {
	execute(channel: TextChannel): Promise<void>
}

export type { ITextChannelTask }

import type { TextChannel } from 'discord.js'
import type { ITask } from './ITask'

interface ITextChannelTask extends ITask {
	execute(channel: TextChannel): Promise<void>
}

export type { ITextChannelTask }

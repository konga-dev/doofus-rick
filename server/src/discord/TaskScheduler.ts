import type { Client, TextChannel } from 'discord.js'
import log4js from 'log4js'
import * as cron from 'node-cron'
import { CakeDayTask } from './tasks'
import type { ITask } from './tasks/ITask'

interface TaskEntry {
	name: string
	schedule: string
	task: ITask
}

class TaskScheduler {
	private static instance: TaskScheduler
	private client: Client
	private tasks: TaskEntry[]
	private logger = log4js.getLogger('Bootstrap')

	constructor(client: Client) {
		if (TaskScheduler.instance) {
			throw new Error(`ERROR: An instance of 'Database' has already been created.`)
		}
		this.client = client
		this.tasks = [
			{
				name: 'cakeday',
				schedule: '0 20 * * *', // every day at 8 PM / 20:00
				task: new CakeDayTask(this.client.channels.cache.find((channel) => channel.id === '691751152034906145') as TextChannel)
			}
		]

		TaskScheduler.instance = this
	}

	static getInstance(): TaskScheduler {
		return TaskScheduler.instance
	}

	registerTasks(): void {
		// biome-ignore lint: oida loss mi mei forEach schreibn
		this.tasks.forEach((task) => {
			if (!cron.validate(task.schedule)) {
				throw new Error(`ERROR: Invalid cron schedule expression for task '${task.name}'`)
			}

			cron.schedule(task.schedule, async () => {
				this.logger.debug(`Running task '${task.name}'`)
				await task.task.execute()
			}).start()
			this.logger.info(`Registered task '${task.name}' scheduled for '${task.schedule}'`)
		})
	}
}

export { TaskScheduler }

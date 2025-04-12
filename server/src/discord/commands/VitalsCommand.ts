import { type CacheType, type CommandInteraction, EmbedBuilder } from 'discord.js'
import type { ICommand } from './ICommand'

export default class VitalsCommand implements ICommand {
	async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
		const vitalsEmbed = new EmbedBuilder().setTitle('Doofus Rick Vitals').setFields([
			{
				name: 'Uptime',
				value: this.uptime(),
				inline: true
			},
			{
				name: 'Image built',
				value: await this.imageBuilt(),
				inline: true
			},
			{
				name: 'OS',
				value: await this.os(),
				inline: true
			}
		])
		interaction.reply({ embeds: [vitalsEmbed] })
	}

	private uptime(): string {
		const pad = (num: number) => (num < 10 ? '0' : '') + num
		const time = process.uptime()
		const hours = Math.floor(time / (60 * 60))
		const minutes = Math.floor((time % (60 * 60)) / 60)
		const seconds = Math.floor(time % 60)
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
	}

	private async imageBuilt(): Promise<string> {
		const buildFilePath = '/home/app/docker-build-date'
		try {
			const file = Bun.file(buildFilePath)
			if (await file.exists()) {
				return await file.text()
			}

			return 'Unknown'
		} catch {
			return 'Unknown'
		}
	}

	private async os(): Promise<string> {
		return new Promise((resolve) => {
			switch (process.platform) {
				case 'win32':
					resolve('Windows')
					break
				case 'linux':
					// Attempt to get more information about Linux distribution
					try {
						const output = Bun.spawnSync(['cat', '/etc/os-release']).stdout.toString();

						const osrMap = new Map<string, string>();
						for (const line of output.split('\n')) {
							const keyval = line.split('=');
							if (keyval.length === 2) {
								osrMap.set(keyval[0], keyval[1].substring(1, keyval[1].length - 1));
							}
						}

						if (osrMap.has('NAME')) {
							if (osrMap.has('VERSION')) {
								resolve(`${osrMap.get('NAME')} ${osrMap.get('VERSION')}`);
								return;
							}
							resolve(osrMap.get('NAME') ?? 'Unknown');
							return;
						}
						resolve('Linux');
					} catch (err) {
						resolve('Linux');
					}
					break
				case 'aix':
					resolve('AIX')
					return
				case 'android':
					resolve('Android')
					return
				case 'cygwin':
					resolve('Cygwin')
					return
				case 'darwin':
					resolve('Darwin')
					return
				case 'freebsd':
					resolve('FreeBSD')
					return
				case 'netbsd':
					resolve('NetBSD')
					return
				case 'openbsd':
					resolve('OpenBSD')
					return
				case 'haiku':
					resolve('Haiku')
					return
				case 'sunos':
					resolve('SunOS')
					return
			}
		})
	}
}

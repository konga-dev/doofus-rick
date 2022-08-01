import { exec } from 'child_process'
import { CacheType, CommandInteraction, EmbedBuilder } from 'discord.js'
import fs from 'fs'
import { ICommand } from './ICommand'

export default class VitalsCommand implements ICommand {
    async execute(interaction: CommandInteraction<CacheType>): Promise<void> {
        const vitalsEmbed = new EmbedBuilder().setTitle('Doofus Rick Vitals').setFields([
            {
                name: 'Uptime',
                value: this.uptime(),
                inline: true,
            },
            {
                name: 'Image built',
                value: await this.imageBuilt(),
                inline: true,
            },
            {
                name: 'OS',
                value: await this.os(),
                inline: true,
            },
        ])
        interaction.reply({ embeds: [vitalsEmbed] })
    }

    private uptime(): string {
        const pad = (num: number) => (num < 10 ? '0' : '') + num
        let time = process.uptime()
        let hours = Math.floor(time / (60 * 60))
        let minutes = Math.floor((time % (60 * 60)) / 60)
        let seconds = Math.floor(time % 60)
        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    }

    private async imageBuilt(): Promise<string> {
        const buildFilePath = '/home/app/docker-build-date'
        return new Promise((resolve) => {
            fs.access(buildFilePath, fs.constants.R_OK, (err) => {
                if (err) {
                    resolve('Unknown')
                    return
                }
                fs.readFile(buildFilePath, (err, data) => {
                    if (err) {
                        resolve('Unknown')
                        return
                    }
                    resolve(data.toString('utf-8'))
                })
            })
        })
    }

    private async os(): Promise<string> {
        return new Promise((resolve) => {
            switch (process.platform) {
                case 'win32':
                    resolve('Windows')
                    break
                case 'linux':
                    // Attempt to get more information about Linux distribution
                    exec('cat /etc/os-release', (err, stdout, _) => {
                        if (err) {
                            resolve('Linux')
                            return
                        }
                        const osrMap = new Map<string, string>()
                        for (let line of stdout.split('\n')) {
                            let keyval = line.split('=')
                            if (keyval.length == 2) {
                                osrMap.set(keyval[0], keyval[1].substring(1, keyval[1].length - 1))
                            }
                        }
                        if (osrMap.has('NAME')) {
                            if (osrMap.has('VERSION')) {
                                resolve(osrMap.get('NAME')! + ' ' + osrMap.get('VERSION'))
                                return
                            }
                            resolve(osrMap.get('NAME')!)
                            return
                        }
                        resolve('Linux')
                    })
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

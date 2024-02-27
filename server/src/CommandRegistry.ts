import * as Commands from './commands'
import { ICommand } from './commands/ICommand'

interface CommandEntry {
    name: string
    command: ICommand
}

const commands: CommandEntry[] = [
    {
        name: 'ping',
        command: new Commands.PingCommand(),
    },
    {
        name: 'quote',
        command: new Commands.QuoteCommand(),
    },
    {
        name: 'randomquote',
        command: new Commands.RandomQuoteCommand(),
    },
    {
        name: 'vitals',
        command: new Commands.VitalsCommand(),
    },
    {
        name: 'votekick',
        command: new Commands.VotekickCommand(),
    },
    {
        name: 'noproductive',
        command: new Commands.NoProductiveCommand(),
    },
    {
        name: 'send',
        command: new Commands.SendCommand(),
    },
    {
        name: 'sendchannel',
        command: new Commands.SendChannelCommand(),
    },
]

class CommandRegistry {
    getCommand(name: string): ICommand | undefined {
        return commands.find((entry) => entry.name === name)?.command
    }
}

export default new CommandRegistry()

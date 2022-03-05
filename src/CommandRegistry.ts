import { ICommand } from './commands/ICommand'
import { PingCommand, VitalsCommand, QuoteCommand, RandomQuoteCommand, VotekickCommand } from './commands'

interface CommandEntry {
    name: string
    command: ICommand
}

const commands: CommandEntry[] = [
    {
        name: 'ping',
        command: new PingCommand(),
    },
    {
        name: 'quote',
        command: new QuoteCommand(),
    },
    {
        name: 'randomquote',
        command: new RandomQuoteCommand(),
    },
    {
        name: 'vitals',
        command: new VitalsCommand(),
    },
    {
        name: 'votekick',
        command: new VotekickCommand(),
    },
]

class CommandRegistry {
    getCommand(name: string): ICommand | undefined {
        return commands.find((entry) => entry.name === name)?.command
    }
}

export default new CommandRegistry()

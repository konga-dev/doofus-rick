import Command from './Command'
import PingCommand from './commands/PingCommand'
import QuoteCommand from './commands/QuoteCommand'
import RandomQuoteCommand from './commands/RandomQuoteCommand'
import VitalsCommand from './commands/VitalsCommand'
import VotekickCommand from './commands/VotekickCommand'
interface CommandEntry {
    name: string
    command: Command
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
    getCommand(name: string): Command | undefined {
        return commands.find((entry) => entry.name === name)?.command
    }
}

export default new CommandRegistry()

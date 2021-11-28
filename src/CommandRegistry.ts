import Command from './Command'
import PingCommand from './commands/PingCommand'

interface CommandEntry {
    name: string
    command: Command
}

const commands: CommandEntry[] = [
    {
        name: 'ping',
        command: new PingCommand(),
    },
]

class CommandRegistry {
    getCommand(name: string): Command | undefined {
        return commands.find((entry) => entry.name === name)?.command
    }
}

export default new CommandRegistry()

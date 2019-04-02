// NodeJS
import * as fs from 'fs'
import * as path from 'path'

export async function runCommands(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
  for (let file of commandFiles) {
    if (file !== '00 - ls.ts') { // ls will run as the first command
      const commandImport = await import(path.join(__dirname, 'commands', file))
      const ctorName = Object.keys(commandImport)[0]
      const command = new commandImport[ctorName](step, logFn)
      await command.run()
    }
  }
}

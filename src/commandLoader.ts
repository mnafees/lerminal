// NodeJS
import * as fs from 'fs'
import * as path from 'path'

export function loadCommands(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'))
  commandFiles.forEach(async file => {
    if (file !== 'ls.ts') { // ls will run as the first command
      const commandImport = await import(__dirname + '/commands/' + file)
      const ctorName = Object.keys(commandImport)[0]
      const command = new commandImport[ctorName](step, logFn)
      await command.run()
    }
  })
}

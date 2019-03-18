// Libs
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

// Lerminal
import {FileType, LerminalFileSystem} from '../filesystem'
import {LerminalCommand} from '../lerminal-command'

export class LerminalLs extends LerminalCommand {
  constructor(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
    super(step, logFn)
  }

  async execute() {
    this.log(chalk.default`\n{inverse 3. Your very first terminal command}\n`)
    this.log(chalk.default`The very first command that we will use is {yellow.bold ls}. It is used to list the contents of the current working directory.`)
    await inquirer.prompt([
      {
        name: 'ls',
        prefix: this.helper.prompt,
        message: 'Type ls and press [ENTER]',
        validate: (input: string) => {
          if (input !== 'ls') return 'Please type ls to proceed'
          return true
        }
      }
    ])
    const dirContents = LerminalFileSystem.instance.ls()
    // FIXME: Cleaner way to print dirs first and then files
    for (let f of dirContents) {
      if (f[1] === FileType.DIR) {
        this.log(chalk.default`{cyan.bold ${f[0]}}`)
      }
    }
    for (let f of dirContents) {
      if (f[1] === FileType.FILE) {
        this.log(f[0])
      }
    }
    this.log(chalk.default`{yellow.bold Congratulations!} You just typed and executed your very first terminal command!\n`)
  }
}

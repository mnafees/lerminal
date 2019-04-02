// Libs
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

// Lerminal
import {LerminalFileSystem} from '../filesystem'
import {LerminalCommand} from '../lerminal-command'

export class LerminalMkdir extends LerminalCommand {
  constructor(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
    super(step, logFn)
  }

  async execute() {
    this.log(chalk.default`\n{inverse The mkdir command}\n`)
    this.log(chalk.default`While the touch command can be used to create empty files, mkdir can be used to create a directory. `)
    await inquirer.prompt([
      {
        name: 'mkdir',
        prefix: this.helper.prompt,
        message: chalk.default`Type {cyan mkdir dir12} and press [ENTER]`,
        validate: (input: string) => {
          if (input !== 'mkdir dir12') return 'Please type mkdir dir12 to proceed'
          return true
        }
      }
    ])
    LerminalFileSystem.instance.mkdir('dir12')
    this.log(chalk.default`\nNow that you have successfully created a directory, type {cyan ls} to see the contents of the current directory again.`)
    await inquirer.prompt([
      {
        name: 'ls',
        prefix: this.helper.prompt,
        message: chalk.default`Type {cyan ls} and press [ENTER]`,
        validate: (input: string) => {
          if (input !== 'ls') return 'Please type ls to proceed'
          return true
        }
      }
    ])
    const dirContents = this.helper.lsContents
    for (let f of dirContents) {
      this.log(f)
    }
    this.log(this.helper.prompt)
    this.log(chalk.default`{yellow.bold Notice that the directory you just created dir12 is now there? Good job!}\n`)
  }
}

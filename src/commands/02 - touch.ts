// Libs
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

// Lerminal
import {LerminalFileSystem} from '../filesystem'
import {LerminalCommand} from '../lerminal-command'

export class LerminalTouch extends LerminalCommand {
  constructor(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
    super(step, logFn)
  }

  async execute() {
    this.log(chalk.default`\n{inverse The touch command}\n`)
    this.log(chalk.default`The touch command is used to create a file with no contents. The command sets the modification and access time of files, and if the file doesn't exist, then it will create the file. `)
    await inquirer.prompt([
      {
        name: 'touch',
        prefix: this.helper.prompt,
        message: chalk.default`Type {cyan touch file1} and press [ENTER]`,
        validate: (input: string) => {
          if (input !== 'touch file1') return 'Please type touch file1 to proceed'
          return true
        }
      }
    ])
    LerminalFileSystem.instance.touch('file1')
    this.log(chalk.default`\nNow that you have successfully created a file, type {cyan ls} to see the contents of the current directory again.`)
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
    this.log(chalk.default`{yellow.bold Notice that the file you just created file1 is now there? Good job!}\n`)
  }
}

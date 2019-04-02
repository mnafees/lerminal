// Libs
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

// Lerminal
import {LerminalFileSystem} from '../filesystem'
import {LerminalCommand} from '../lerminal-command'

export class LerminalCp extends LerminalCommand {
  constructor(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
    super(step, logFn)
  }

  async execute() {
    this.log(chalk.default`\n{inverse The cp command}\n`)
    this.log(chalk.default`The cp command can be used to copy a file. The syntax of it is cp [source file] [destination file]\n`)
    await inquirer.prompt([
      {
        name: 'cp',
        message: chalk.default`Type {cyan cp file1 fileduplicate} and press [ENTER] \nThis is because we want to make a copy of file1 in the current directory and name the copied file fileduplicate \n`,
        suffix: this.helper.prompt,
        validate: (input: string) => {
          if (input !== 'cp file1 fileduplicate') return 'Please type cp file1 fileduplicate to proceed'
          return true
        }
      }
    ])
    LerminalFileSystem.instance.cp('file1', 'fileduplicate')
    this.log(chalk.default`\nNow that you have copied a file, type {cyan ls} to see the contents of the current directory again.`)
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
    this.log(chalk.default`{yellow.bold Notice that the fileduplicate is now there? That is a copy of file1 Good job!}\n`)
  }
}

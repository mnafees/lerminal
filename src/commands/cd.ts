// Libs
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

// Lerminal
import {LerminalFileSystem} from '../filesystem'
import {LerminalCommand} from '../lerminalCommand'

export class LerminalCd extends LerminalCommand {
  constructor(step: boolean, logFn: (message?: string, ...args: any[]) => void) {
    super(step, logFn)
  }

  async execute() {
    this.log(chalk.default`\n{inverse The cd command}\n`)
    this.log(chalk.default`The cd command is used to change the current working directory. As you saw above when you ran the ls command, there exists some directories like dir01. Let us first change to that directory.`)
    await inquirer.prompt([
      {
        name: 'cd',
        prefix: this.helper.prompt,
        message: 'Type cd dir01 and press [ENTER]',
        validate: (input: string) => {
          if (input !== 'cd dir01') return 'Please type cd dir01 to proceed'
          return true
        }
      }
    ])
    LerminalFileSystem.instance.cd('dir01')
    this.log(this.helper.pwd)
  }
}

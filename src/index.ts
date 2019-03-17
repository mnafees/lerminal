// Libs
import {Command, flags} from '@oclif/command'
import * as chalk from 'chalk'
import * as inquirer from 'inquirer'

// Lerminal
import * as Loader from './commandLoader'
import {LerminalLs} from './commands/ls'
import {LerminalHelper} from './helper'
import {Progress} from './progress'

class Lerminal extends Command {
  static description = 'Lerminal - Learn to use the Terminal'
  static flags = {
    version: flags.version({char: 'v', description: 'Show Lerminal version'}),
    help: flags.help({char: 'h', description: 'Show this information'}),
    step: flags.boolean({description: 'Start Lerminal in stepping mode'}),
    'progress-file': flags.string({description: 'Progress file to use to use for the session'}),
  }

  private readonly _helper: LerminalHelper = LerminalHelper.instance

  async run() {
    const {flags} = await this.parse(Lerminal)
    Progress.startRecording()

    this.log('     _                  _           _ ')
    this.log('    | |   ___ _ _ _ __ (_)_ _  __ _| |')
    this.log("    | |__/ -_) '_| '  \\| | ' \\/ _` | |")
    this.log('    |____\\___|_| |_|_|_|_|_||_\\__,_|_|\n')

    this.log(chalk.default`{magenta You are running Lerminal v${this.config.version} on ${this.config.platform}-${this.config.arch}}\n`)
    this.log('Welcome to Lerminal! Lerminal will help you learn how to use the terminal by emulating the behavior of an actual terminal.\n')
    this.log(flags.step ? 'You have chosen to run with step mode enabled.\n' : 'You have chosen to run with step mode disabled.\n')

    // Terminal confirmation prompts
    this.log(chalk.default`{inverse 1. Terminal confirmation prompts}\n`)
    const prelimConf = await inquirer.prompt([
      {
        name: 'conf_eg',
        type: 'confirm',
        message: '\bShall we begin?',
        prefix: chalk.default`{cyan The following is how a usual confirmation prompt in a terminal works. There will be two or more options available. {bold Since Y is in upper case, it denotes that the default option is [Y]es which also means that if you just press [ENTER] [Y]es is what will be sent as an answer.} The other option is [n]o.\n}`
      }
    ])
    this.log(`You chose your answer to be ${JSON.parse(JSON.stringify(prelimConf)).conf_eg ? 'Yes' : 'No'}\n`)

    // The terminal
    this.log(chalk.default`{inverse 2. The terminal}\n`)
    this.log('What you see below is called a terminal prompt.')

    this.log(this._helper.prompt)
    this.log(chalk.default`- {green.bold ${this._helper.username}} is your current username`)
    this.log(chalk.default`- {green.bold ${this._helper.hostname}} is your current hostname (or computer's name)`)
    this.log(chalk.default`- {blue.bold ${this._helper.pwd}} is your current working directory`)

    // Your very first terminal command
    const ls: LerminalLs = new LerminalLs(flags.step, this.log)
    await ls.run()

    // More commands!
    this.log(chalk.default`{inverse 4. More terminal commands!}\n`)
    Loader.loadCommands(flags.step, this.log)
  }
}

export = Lerminal

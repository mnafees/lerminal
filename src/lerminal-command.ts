// NodeJS
import * as process from 'process'

// Libs
import * as inquirer from 'inquirer'

// Lerminal
import {LerminalHelper} from './helper'

export abstract class LerminalCommand {
  helper: LerminalHelper = LerminalHelper.instance
  log: (message?: string, ...args: any[]) => void

  private readonly _step: boolean

  // By default we have continue to next since if step is not enabled, we want to continue
  constructor(step = false, logFn: (message?: string, ...args: any[]) => void) {
    this._step = step
    this.log = logFn
  }

  // Check whether step is enabled. If step is disabled, it returns "continue" for continuing to next command.
  // If step is enabled, it asks user what they want to do: "continue", "repeat", "quit"
  async run() {
    await this.execute()
    if (this._step) {
      const choice = await inquirer.prompt([
        {
          name: 'step_mode',
          type: 'expand',
          message: 'Do you want to [c]ontinue to next lesson, [r]epeat the current lesson, or [q]uit the program?',
          choices: [
            {
              key: 'c',
              value: 'continue'
            },
            {
              key: 'r',
              value: 'repeat'
            },
            {
              key: 'q',
              value: 'quit'
            }
          ]
        }
      ])
      const userSelection = JSON.parse(JSON.stringify(choice)).step_mode
      if (userSelection === 'quit') {
        process.exit(0)
      } else if (userSelection === 'repeat') {
        await this.run()
      }
    }
  }

  protected abstract async execute(): Promise<any>
}

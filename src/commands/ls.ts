// NodeJS
import { execSync } from 'child_process';

// Libs
import * as chalk from 'chalk'
import * as inquirer from 'inquirer';

// Lerminal
import { LerminalCommand } from '../lerminalCommand';

export class LerminalLs extends LerminalCommand {

  constructor(step: boolean){
    super(step);
  }

  async execute() {
    console.log(chalk.default`\n{inverse 3. Your very first terminal command}\n`);
    console.log(chalk.default`The very first command that we will use is {yellow.bold ls}. It is used to list the contents of the current working directory.`);
    await inquirer.prompt([
      {
        name: 'ls',
        prefix: this.helper.prompt,
        message: 'Type ls and press [ENTER]',
        validate: (input: string) => {
          if (input !== 'ls') return 'Please type ls to proceed';
          return true;
        }
      }
    ]);
    console.log(execSync('ls').toString());
    console.log(chalk.default`{yellow.bold Congratulations!} You just typed and executed your very first terminal command!\n`);
  }

}

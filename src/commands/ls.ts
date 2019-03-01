import { LearminalCommand } from '../learminalCommand';
import * as chalk from 'chalk'
import inquirer = require('inquirer');
import { execSync } from 'child_process';

export class LearminalLs extends LearminalCommand {
    constructor(step : boolean){
        super(step)
    }
    public async run(){
        console.log(chalk.default`{inverse 3. Your very first terminal command}\n`);
        console.log(chalk.default`The very first command that we will use is {yellow.bold ls}. It is used to list the contents of the current working directory.`);
        await inquirer.prompt([
        {
            name: 'ls-cmd',
            prefix: this.helperInstance.getPrompt(),
            message: 'Type ls and press [ENTER]',
            validate: (input: string) => {
            if (input !== 'ls') return 'Please type ls to proceed'
            return true
            }
        }
        ]);
        console.log(execSync('ls').toString());
        console.log(chalk.default`{yellow.bold Congratulations!} You just typed and executed your very first terminal command!\n`);
        await this.endCommand()
        if(this.userSelection == 1)
            await this.run()
        else if (this.userSelection == 2)
            process.exit(0)
    }
}
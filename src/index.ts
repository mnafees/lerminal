import {userInfo, hostname} from 'os';
import {cwd} from 'process';

import {Command, flags} from '@oclif/command';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import {execSync} from 'child_process';

class Lerminal extends Command {
  static description = 'Start the interactive Lerminal prompt';

  async run() {
    const {args, flags} = this.parse(Lerminal);
    
    this.log("     _                  _           _ ");
    this.log("    | |   ___ _ _ _ __ (_)_ _  __ _| |");
    this.log("    | |__/ -_) '_| '  \\| | ' \\/ _` | |");
    this.log("    |____\\___|_| |_|_|_|_|_||_\\__,_|_|\n"); 

    this.log(chalk.default`{magenta You are running Lerminal v${this.config.version} on ${this.config.platform}-${this.config.arch}}\n`);
    this.log('Welcome to Lerminal! Lerminal will help you learn how to use the terminal by emulating the behavior of an actual terminal.\n');

    // Terminal Confirmation Prompts
    this.log(chalk.default`{inverse 1. Terminal confirmation prompts}\n`);
    const prelimConf = await inquirer.prompt([
      {
        name: 'conf_eg',
        type: 'confirm',
        message: '\bShall we begin?',
        prefix: chalk.default`{cyan The following is how a usual confirmation prompt in a terminal works. There will be two or more options available. {bold Since Y is in upper case, it denotes that the default option is Y(es) which also means that if you just press [ENTER] Y(es) is what will be sent as an answer.} The other option is n(o).\n}`
      }
    ]);
    this.log(`You chose your answer to be ${JSON.parse(JSON.stringify(prelimConf)).conf_eg ? 'Yes' : 'No'}\n`);

    // The Terminal
    this.log(chalk.default`{inverse 2. The terminal}\n`);
    this.log('What you see below is called a terminal prompt.');
    this.log(chalk.default`{green.bold ${userInfo().username}@${hostname()}}:{blue.bold ${cwd()}}$`);
    this.log(chalk.default`- {green.bold ${userInfo().username}} is your current username`);
    this.log(chalk.default`- {green.bold ${hostname()}} is your current hostname (or computer's name)`);
    this.log(chalk.default`- {blue.bold ${cwd()}} is your current working directory\n`);

    // Your very first terminal command
    this.log(chalk.default`{inverse 3. Your very first terminal command}\n`);
    this.log(chalk.default`The very first command that we will use is {yellow.bold ls}. It is used to list the contents of the current working directory.`);
    await inquirer.prompt([
      {
        name: 'ls-cmd',
        prefix: chalk.default`{green.bold ${userInfo().username}@${hostname()}}:{blue.bold ${cwd()}}$`,
        message: 'Type ls and press [ENTER]',
        validate: (input: string) => {
          if (input !== 'ls') return 'Please type ls to proceed';
          return true;
        }
      }
    ]);
    this.log(execSync('ls').toString());
    this.log(chalk.default`{yellow.bold Congratulations!} You just typed and executed your very first terminal command!`);
  }
}

export = Lerminal;

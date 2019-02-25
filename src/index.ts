// NodeJS
import * as os from 'os'
import * as process from 'process'
import {execSync} from 'child_process'

// Libs
import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer'
import * as chalk from 'chalk'

// Lerminal
import {Progress} from './progress'

class Lerminal extends Command {

  static description : string = 'Lerminal - Learn to use the Terminal';
  static flags = {
    version: flags.version({char: 'v', description: 'Show Lerminal version'}),
    help: flags.help({char: 'h', description: 'Show this information'}),
    step: flags.boolean({description: 'Start Lerminal in stepping mode'}),
    'progress-file': flags.string({description: 'Progress file to use to use for the session'}),
  };

  private username : string = os.userInfo().username;
  private hostname : string = os.hostname();
  private pwd : string = process.cwd();

  private getPrompt() : string {
    return chalk.default`{green.bold ${this.username}@${this.hostname}}:{blue.bold ${this.pwd}}$`;
  }

  async run() {
    const {flags} = await this.parse(Lerminal);
    Progress.startRecording();

    this.log("     _                  _           _ ");
    this.log("    | |   ___ _ _ _ __ (_)_ _  __ _| |");
    this.log("    | |__/ -_) '_| '  \\| | ' \\/ _` | |");
    this.log("    |____\\___|_| |_|_|_|_|_||_\\__,_|_|\n");

    this.log(chalk.default`{magenta You are running Lerminal v${this.config.version} on ${this.config.platform}-${this.config.arch}}\n`);
    this.log('Welcome to Lerminal! Lerminal will help you learn how to use the terminal by emulating the behavior of an actual terminal.\n');

    // Terminal confirmation prompts
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

    // The terminal
    this.log(chalk.default`{inverse 2. The terminal}\n`);
    this.log('What you see below is called a terminal prompt.');

    this.log(this.getPrompt());
    this.log(chalk.default`- {green.bold ${this.username}} is your current username`);
    this.log(chalk.default`- {green.bold ${this.hostname}} is your current hostname (or computer's name)`);
    this.log(chalk.default`- {blue.bold ${this.pwd}} is your current working directory\n`);

    // Your very first terminal command
    this.log(chalk.default`{inverse 3. Your very first terminal command}\n`);
    this.log(chalk.default`The very first command that we will use is {yellow.bold ls}. It is used to list the contents of the current working directory.`);
    await inquirer.prompt([
      {
        name: 'ls-cmd',
        prefix: this.getPrompt(),
        message: 'Type ls and press [ENTER]',
        validate: (input: string) => {
          if (input !== 'ls') return 'Please type ls to proceed'
          return true
        }
      }
    ]);
    this.log(execSync('ls').toString());
    this.log(chalk.default`{yellow.bold Congratulations!} You just typed and executed your very first terminal command!\n`);

    // More commonly used commands
    this.log(chalk.default`{inverse 4. More commonly used commands}\n`);
    // const cmdChoice = await inquirer.prompt([
    //   {
    //     name:
    //   }
    // ])
  }

}

export = Lerminal;

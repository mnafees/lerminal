import inquirer = require("inquirer");
import chalk from 'chalk';
import { LearminalHelper } from './helper';

export class LearminalCommand {
    private step : boolean;
    protected userSelection : userChoicesEnum
    protected helperInstance : LearminalHelper = LearminalHelper.getInstance()
    constructor(step : boolean) {
        this.step = step
        //by default we have continue to next since if step is not enabled, we want to continue
        this.userSelection = userChoicesEnum.continue
    }
    
    //Check whether step is enabled. If step is disabled, it returns "continue" for continuing to next command.
    //If step is enabled, it asks user what they want to do: "continue", "repeat", "quit"
    protected async endCommand(){
        if(this.step){
            var endCommandPrompt = await inquirer.prompt([
                {
                  name: 'step_mode',
                  type: 'expand',
                  message: 'Do you want to [C]ontinue to next lesson, [r]epeat the current lesson, or [q]uit the program?',
                  choices: [
                      {
                          key: 'C',
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
              ]);
              var userPrompt = JSON.parse(JSON.stringify(endCommandPrompt)).step_mode
              if(userPrompt == 'quit'){
                  this.userSelection = userChoicesEnum.quit
              }
              else if(userPrompt == 'repeat'){
                  this.userSelection = userChoicesEnum.repeat
              }
              else
                  this.userSelection = userChoicesEnum.continue

        }
    else
        this.userSelection = userChoicesEnum.continue

    }

}
enum userChoicesEnum {
    continue = 0,
    repeat = 1,
    quit = 2
}

import * as os from 'os'
import * as chalk from 'chalk'
import * as process from 'process'

export class LearminalHelper{
    private static instance : LearminalHelper;
    private username : string = os.userInfo().username;
    private hostname : string = os.hostname();
    private pwd : string = process.cwd();

    static getInstance() : LearminalHelper {
        if (!LearminalHelper.instance) {
            LearminalHelper.instance = new LearminalHelper();
        }
    
        return LearminalHelper.instance;
      }
    public getPrompt() : string {
        return chalk.default`{green.bold ${this.username}@${this.hostname}}:{blue.bold ${this.pwd}}$`;
      }
    public getUsername() : string {
        return this.username
    }
    public getHostname() : string {
        return this.hostname
    }
    public getPwd() : string {
        return this.pwd
    }
    
}
// NodeJS
import * as os from 'os';
import * as process from 'process';

// Libs
import * as chalk from 'chalk';

export class LerminalHelper {
    
    private static s_instance : LerminalHelper;
    private _username : string = os.userInfo().username;
    private _hostname : string = os.hostname();

    static get instance() : LerminalHelper {
        if (!LerminalHelper.s_instance) {
            LerminalHelper.s_instance = new LerminalHelper();
        }
    
        return LerminalHelper.s_instance; 
    }

    get prompt() : string {
        return chalk.default`{green.bold ${this.username}@${this.hostname}}:{blue.bold ${this.pwd}}$`;
    }

    get username() : string {
        return this._username;
    }

    get hostname() : string {
        return this._hostname;
    }

    get pwd() : string {
        return process.cwd();
    }
    
}

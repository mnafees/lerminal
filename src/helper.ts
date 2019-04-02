// Libs
import * as chalk from 'chalk'
import * as os from 'os'

// Lerminal
import {FileType,LerminalFileSystem} from './filesystem'

export class LerminalHelper {
  static get instance(): LerminalHelper {
    if (!LerminalHelper.s_instance) {
      LerminalHelper.s_instance = new LerminalHelper()
    }

    return LerminalHelper.s_instance
  }

  private static s_instance: LerminalHelper

  private readonly _username: string = os.userInfo().username
  private readonly _hostname: string = os.hostname()

  get prompt(): string {
    return chalk.default`{green.bold ${this.username}@${this.hostname}}:{blue.bold ${this.pwd}}$`
  }

  get lsContents() : Array<string> {
    const systemDirContents = LerminalFileSystem.instance.ls()
    let dirContents : Array<string> = []
    // FIXME: Cleaner way to print dirs first and then files
    for (let f of systemDirContents) {
      if (f[1] === FileType.DIR) {
        dirContents.push(chalk.default`{cyan.bold ${f[0]}}`)
      }
    }
    for (let f of systemDirContents) {
      if (f[1] === FileType.FILE) {
        dirContents.push(chalk.default`{green.bold ${f[0]}}`)
      }
    }
    return dirContents
  }
  get username(): string {
    return this._username
  }

  get hostname(): string {
    return this._hostname
  }

  get pwd(): string {
    return `/lerminal${LerminalFileSystem.instance.pwd()
      .substr(LerminalFileSystem.instance.tmpDir.length)}`
  }

  get ls() {
    return LerminalFileSystem.instance.ls()
  }
}

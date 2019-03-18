// NodeJS
import * as fs from 'fs'
import * as os from 'os'

export class LerminalConfig {
  static instance(): LerminalConfig {
    if (!LerminalConfig.s_instance) {
      LerminalConfig.s_instance = new LerminalConfig()
    }

    return LerminalConfig.s_instance
  }

  private static s_instance: LerminalConfig

  private filePath = `${os.homedir()}/.config/lerminal.json`
  private contents = Object()

  private constructor() {
    this.readContents()
  }

  set configFilePath(customFilePath: string) {
    this.filePath = customFilePath
    this.readContents()
  }

  get configFilePath(): string {
    return this.filePath
  }

  getValue(key?: string): any {
    if (key) return this.contents[key]

    return this.contents
  }

  setValue(key: string, val: any) {
    this.contents[key] = val
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.contents))
  }

  private readContents() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath)
      this.contents = data.toString()
    }
  }
}

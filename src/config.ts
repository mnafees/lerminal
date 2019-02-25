// NodeJS
import * as os from 'os';
import * as fs from 'fs';

export class LerminalConfig {

  private static instance : LerminalConfig;
  private filePath : string = `${os.homedir()}/.config/lerminal.json`;
  private contents = Object();

  private constructor() {
    this.readContents();
  }

  static getInstance() : LerminalConfig {
    if (!LerminalConfig.instance) {
      LerminalConfig.instance = new LerminalConfig();
    }

    return LerminalConfig.instance;
  }

  set configFilePath(customFilePath : string) {
    this.filePath = customFilePath;
    this.readContents();
  }

  get configFilePath() : string {
    return this.filePath;
  }

  getValue(key?: string) : any {
    if (key) return this.contents[key];

    return this.contents;
  }

  setValue(key: string, val: any) {
    this.contents[key] = val;
  }

  private readContents() {
    if (fs.existsSync(this.filePath)) {
      const data = fs.readFileSync(this.filePath);
      this.contents = data.toString();
    }
  }

  save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.contents));
  }

}

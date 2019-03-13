// NodeJS
import * as os from 'os';
import * as fs from 'fs';

export class LerminalConfig {

  private static s_instance : LerminalConfig;
  private _filePath : string = `${os.homedir()}/.config/lerminal.json`;
  private _contents = Object();

  private constructor() {
    this.readContents();
  }

  static get instance() : LerminalConfig {
    if (!LerminalConfig.s_instance) {
      LerminalConfig.s_instance = new LerminalConfig();
    }

    return LerminalConfig.s_instance;
  }

  set configFilePath(customFilePath : string) {
    this._filePath = customFilePath;
    this.readContents();
  }

  get configFilePath() : string {
    return this._filePath;
  }

  value(key?: string) : any {
    if (key) return this._contents[key];

    return this._contents;
  }

  setValue(key: string, val: any) {
    this._contents[key] = val;
  }

  private readContents() {
    if (fs.existsSync(this._filePath)) {
      const data = fs.readFileSync(this._filePath);
      this._contents = data.toString();
    }
  }

  save() {
    fs.writeFileSync(this._filePath, JSON.stringify(this._contents));
  }

}

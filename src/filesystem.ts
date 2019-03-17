// NodeJS
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export enum LFSCode {
  SUCCESSFUL = 0,
  BAD_INPUT,
  EXISTS,
  NO_EXISTS
}

export enum FileType {
  FILE = 0,
  DIR
}

export class LerminalFileSystem {
  private static s_instance: LerminalFileSystem

  readonly tmpDir: string
  private readonly _dirs: Array<string> = []
  private readonly _files: Array<string> = []
  private _pwd: string

  static get instance(): LerminalFileSystem {
    if (!LerminalFileSystem.s_instance) {
      LerminalFileSystem.s_instance = new LerminalFileSystem()
    }

    return LerminalFileSystem.s_instance
  }

  private constructor() {
    this.tmpDir = fs.mkdtempSync(`${os.tmpdir}${path.sep}lerminal_tmp_`)
    this._pwd = this.tmpDir
    this.init()
  }

  cd(name: string): LFSCode {
    const newPath = path.join(this._pwd, name)
    if (fs.existsSync(newPath) &&
        newPath.startsWith(this.tmpDir) &&
        fs.statSync(newPath).isDirectory) {
      this._pwd = newPath
      return LFSCode.SUCCESSFUL
    }

    return LFSCode.BAD_INPUT
  }

  ls(): Array<[string, FileType]> {
    let contentsArr: Array<[string, FileType]> = []
    const dirContents = fs.readdirSync(this._pwd)
    for (let f of dirContents) {
      if (fs.statSync(path.join(this._pwd, f)).isDirectory) {
        contentsArr.push([f, FileType.DIR])
      } else if (fs.statSync(path.join(this._pwd, f)).isFile) {
        contentsArr.push([f, FileType.FILE])
      }
    }
    return contentsArr
  }

  mkdir(name: string): LFSCode {
    if (name.includes('/') || name.indexOf('.') === 0) {
      return LFSCode.BAD_INPUT
    }

    const dirPath = path.join(this._pwd, name)
    if (fs.existsSync(dirPath)) {
      return LFSCode.EXISTS
    }
    fs.mkdirSync(dirPath)
    this._dirs.push()
    return LFSCode.SUCCESSFUL
  }

  touch(name: string): LFSCode {
    const filePath = `${this.tmpDir}${path.sep}${name}`
    if (fs.existsSync(filePath)) {
      return LFSCode.EXISTS
    }
    fs.mkdirSync(`${this.tmpDir}${path.sep}${name}`)
    this._dirs.push(name)
    return LFSCode.SUCCESSFUL
  }

  rmdir(name: string) {
    fs.rmdirSync(`${this.tmpDir}${path.sep}${name}`)
    const dirIdx = this._dirs.indexOf(name)
    this._dirs
  }

  rm() {

  }

  cleanup() {

  }

  pwd(): string {
    return this._pwd
  }

  private init() {
    // Generate some random directories
    for (let dir of ['dir01', 'anotherdir', 'dir with spaces']) {
      this.mkdir(dir)
    }
  }
}

// NodeJS
import * as os from 'os';

export class Progress {
  /*************
   * Variables *
   *************/
  private file = `${os.homedir()}/.config/lerminal.json`

  /***********
   * Methods *
   ***********/

  constructor(file?: string) {
    if (file) this.file = file
  }
}

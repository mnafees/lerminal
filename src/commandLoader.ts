// NodeJS
import * as fs from 'fs';
import * as path from 'path';

export function loadCommands(step: boolean) {
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands'));
  commandFiles.forEach(async (file) => {
    const commandImport = await import(__dirname + '/commands/' + file);
    const ctorName = Object.keys(commandImport)[0];
    const command = new commandImport[ctorName](step);
    await command.run();
  });
}

const { spawn } = require("child_process");
const { ipcMain } = require("electron");

module.exports.startTerminal = (mainWindow)=>{
    const cmd = spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
      cwd: process.env.HOME,
      env: process.env
    });
  
    // Get command from client and run in the terminal
    ipcMain.on('execute-command', (event, command) => {
      command && cmd.stdin.write(command.split('>')[1] !== undefined ? command.split('>')[1] + '\n' : command + '\n');
    });
  
    // Get the terminal output and send it to the rendering process
    cmd.stdout.on('data', (data) => {
      mainWindow.webContents.send('command-output', data.toString());
    });
  
    cmd.stderr.on('data', (data) => {
      mainWindow.webContents.send('command-output', data.toString());
    });
}
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("API", {
  exit: () => {
    ipcRenderer.send("exit");
  },
  minimize: () => {
    ipcRenderer.send("minimize");
  },
  maximize: () => {
    ipcRenderer.send("maximize");
  },
  showSaveDialogAndSaveFile: (content, showSaveDialogAndSaveFile) => {
    ipcRenderer
      .invoke("showSaveDialogAndSaveFile", content)
      .then((filePath) => {
        showSaveDialogAndSaveFile(filePath);
      })
      .catch((error) => {
        console.log(error);
        showSaveDialogAndSaveFile("error");
      });
  },
  saveFileWithoutDialog: (filePath,content)=>{
    ipcRenderer.invoke("saveFileWithoutDialog",filePath,content);
  },
  selectFolder:()=>{
    return ipcRenderer.invoke("selectFolder")
  },
  readDirectoryAt: async (selectedDirectory)=>{
    const result = await ipcRenderer.invoke("readDirectoryAt", selectedDirectory);
    return result;
  },
  readFile : async (filePath)=>{
    const result = await ipcRenderer.invoke("readFile",filePath);
    return result;
  },
  openFolder : async(address)=>{
    const result = await ipcRenderer.invoke("openFolder",address);
    return result;
  },
  sendCommand: (command) => {
    ipcRenderer.send('execute-command', command);
  },
  receiveOutput: (callback) => {
    ipcRenderer.on('command-output', (_, output) => {
      callback(output);
    });
  },
  renameCurrentFile:(addressOfFileToBeRenamed,newAddress)=>{
    ipcRenderer.invoke('renameCurrentFile', addressOfFileToBeRenamed,newAddress);
  },
  deleteCurrentFile:(addressOfFileToBeDeleted)=>{
    ipcRenderer.invoke('deleteCurrentFile', addressOfFileToBeDeleted);
  },
  createProject:(project)=>{
    ipcRenderer.invoke('createProject', project);
  }
});

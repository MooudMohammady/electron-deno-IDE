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
  }
});

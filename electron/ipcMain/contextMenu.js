const fs = require('fs');

const { ipcMain } = require("electron");

module.exports.contextMenu = ()=>{
  ipcMain.handle("renameCurrentFile", async (e, addressOfFileToBeRenamed,newAddress) => {
      fs.rename(addressOfFileToBeRenamed, newAddress, (err) => {
        if(err) throw err;
      });
  });
}
const fs = require("fs");

const { ipcMain } = require("electron");

module.exports.contextMenu = () => {
  ipcMain.handle(
    "renameCurrentFile",
    (e, addressOfFileToBeRenamed, newAddress) => {
      fs.renameSync(addressOfFileToBeRenamed, newAddress, (err) => {
        if (err) throw err;
      });
    }
  );
  ipcMain.handle("deleteCurrentFile", (e, addressOfFileToBeDeleted) => {
    fs.unlinkSync(addressOfFileToBeDeleted, (err) => {
      if (err) throw err;
    });
  });
};

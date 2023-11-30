const { app, BrowserWindow, ipcMain, Notification, net, webContents, remote } = require("electron");
const path = require("path");
const { SerialPort } = require("serialport");
const fs = require("fs");
const getAssetPath = (...paths) => {
  return path.join(RESOURCES_PATH, ...paths);
};
const kill = require("kill-port");

const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath) : path.join(__dirname);
let win;
function createwindow() {
  win = new BrowserWindow({
    icon: getAssetPath("assets/logo.ico"),
    frame: false,
    width: 1024,
    height: 768,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  win.loadFile("index.html");
  win.webContents.openDevTools();
}
app.whenReady().then(function () {
  createwindow();
});
app.on("before-quit", () => {
  const port = 6000;
  kill(port).then(console.log).catch(console.log);
});

ipcMain.on("print", (event, arg) => {
  console.log("Print");

  let win2 = new BrowserWindow({
    width: 302,
    height: 793,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win2.once("ready-to-show", () => win2.hide());
  fs.writeFile(getAssetPath("assets/data.json"), JSON.stringify(arg), function (err) {
    win2.loadURL(getAssetPath("assets/Receipt.html"));
    win2.webContents.on("did-finish-load", async () => {
      // Finding Default Printer name
      let printersInfo = await win2.webContents.getPrintersAsync();
      let printer = printersInfo.filter((printer) => printer.isDefault === true)[0];
      const options = {
        deviceName: printer.name,
        silent: true,
        pageSize: { height: 297000, width: 80000 },
        margins: {
          marginType: "printableArea",
        },
        landscape: false,
      };
      win2.webContents.print(options, () => {
        win2 = null;
      });
    });
  });
});
ipcMain.on("close", () => {
  app.quit();
});

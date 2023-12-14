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
  // win.webContents.openDevTools();
}

app.whenReady().then(function () {
  createwindow();
});
app.on("before-quit", () => {
  const port = 6000;
  kill(port).then(console.log).catch(console.log);
});
ipcMain.on("getCOMPORT", async (event, arg) => {
  await SerialPort.list().then((port, err) => {
    if (err) {
      console.log(err.message);
      return;
    } else {
      event.reply("getCOMPORT", port);
    }
  });
});

ipcMain.handle("getCOMPORT", async (event, someArgument) => {
  console.log("invokeMain received arg:", someArgument);
  const port = await SerialPort.list();
  return port;
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
ipcMain.on("printSummary", (event, arg) => {
  let win3 = new BrowserWindow({
    width: 302,
    height: 793,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win3.once("ready-to-show", () => win3.hide());
  fs.writeFile(getAssetPath("assets/summary.json"), JSON.stringify(arg), function (err) {
    win3.loadURL(getAssetPath("assets/Report.html"));
    win3.webContents.on("did-finish-load", async () => {
      let printersInfo = await win3.webContents.getPrintersAsync();
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
      win3.webContents.print(options, () => {
        win3 = null;
      });
    });
  });
});
ipcMain.on("close", () => {
  app.quit();
});
ipcMain.on("openCashDrawer", (event, arg) => {
  const serialport = new SerialPort({ path: arg, baudRate: 9600 });
  const data = new Uint8Array([27, 112, 0, 25, 251]);
  serialport.write(data, function (err) {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    serialport.close();
  });
});

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  Print: {
    Print(arg) {
      console.log("ASda");
      ipcRenderer.send("print", arg);
    },
  },
  receipt: () => {
    ipcRenderer.send("Print");
  },
  close: () => {
    ipcRenderer.send("close");
  },
});

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  Print: {
    Print(arg) {
      ipcRenderer.send("print", arg);
    },
    PrintSummary(arg) {
      ipcRenderer.send("printSummary", arg);
    },
    RePrint: () => {
      ipcRenderer.send("rePrint");
    },
  },

  getPort: {
    send(channel) {
      console.log("ASda");
      ipcRenderer.send("getCOMPORT");
    },
    once(channel, func) {
      console.log("ASda");
      const validChannels = ["getCOMPORT"];
      ipcRenderer.removeAllListeners("getCOMPORT");
      if (validChannels.includes(channel)) {
        return ipcRenderer.on(channel, (event, ...test) => func(...test));
      }
    },
    invoke(channel, args) {
      console.log(channel, args);
      const validChannels = ["getCOMPORT"];

      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, args);
      }
    },
  },
  Cashdrawer(arg) {
    console.log(arg);
    ipcRenderer.send("openCashDrawer", arg);
  },
  receipt: () => {
    ipcRenderer.send("Print");
  },
  close: () => {
    ipcRenderer.send("close");
  },
});

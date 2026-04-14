const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    selectTS: () => ipcRenderer.invoke("select-ts"),
    startBuild: (file) => ipcRenderer.invoke("start-build", file),
    flashHex: (hex) => ipcRenderer.invoke("flash-hex", hex),

    onBuildLog: (cb) => ipcRenderer.on("build-log", (_, msg) => cb(msg)),
    onBuildComplete: (cb) => ipcRenderer.on("build-complete", (_, res) => cb(res)),
    onBuildProgress: (cb) => ipcRenderer.on("build-progress", (_, pct) => cb(pct)),

    listBuilds: () => ipcRenderer.invoke("list-builds"),
    listBuildFiles: (folder) => ipcRenderer.invoke("list-build-files", folder),
    readFile: (file) => ipcRenderer.invoke("read-file", file),
    deleteBuild: (folder) => ipcRenderer.invoke("delete-build", folder),
});

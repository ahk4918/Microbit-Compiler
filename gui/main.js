const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
// This ensures we look for compiler.js in the correct location relative to __dirname
const compilerPath = app.isPackaged 
    ? path.join(process.resourcesPath, "app.asar", "compiler.js") 
    : path.join(__dirname, "../compiler.js");

const { build } = require(compilerPath);
const { flash } = require("../flash.js");

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    win.loadFile("./gui/index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("select-ts", async () => {
    const result = await dialog.showOpenDialog({
        filters: [
            { name: "Source Files", extensions: ["ts", "py", "cpp"] }
        ],
        properties: ["openFile"]
    });

    return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle("start-build", async (event, filePath) => {
    const start = Date.now();

    try {
        const result = await build(
            filePath,
            msg => {
                event.sender.send("build-log", msg);

                if (msg.includes("Compiling")) event.sender.send("build-progress", 20);
                if (msg.includes("Generating")) event.sender.send("build-progress", 40);
                if (msg.includes("Linking")) event.sender.send("build-progress", 60);
                if (msg.toLowerCase().includes("hex")) event.sender.send("build-progress", 80);
            }
        );

        const duration = ((Date.now() - start) / 1000).toFixed(1);
        event.sender.send("build-progress", 100);

        event.sender.send("build-complete", {
            success: true,
            hex: result.hex,
            folder: result.folder,
            duration
        });

    } catch (err) {
        event.sender.send("build-complete", {
            success: false,
            error: err.message
        });
    }

    return;
});

ipcMain.handle("flash-hex", async (_, hexPath) => {
    try {
        const message = flash(hexPath); // Uses your robust flasher logic
        return { ok: true, message: message };
    } catch (err) {
        return { ok: false, error: err.message };
    }
});

ipcMain.handle("list-builds", async () => {
    const buildsDir = path.join(__dirname, "../Builds");
    if (!fs.existsSync(buildsDir)) return [];

    return fs.readdirSync(buildsDir)
        .filter(f => fs.statSync(path.join(buildsDir, f)).isDirectory())
        .sort()
        .reverse()
        .map(f => ({
            name: f,
            path: path.join(buildsDir, f)
        }));
});

ipcMain.handle("list-build-files", async (_, folder) => {
    const files = fs.readdirSync(folder);
    return files.map(f => ({
        name: f,
        path: path.join(folder, f)
    }));
});

ipcMain.handle("read-file", async (_, filePath) => {
    return fs.readFileSync(filePath, "utf8");
});

ipcMain.handle("delete-build", async (_, folder) => {
    fs.rmSync(folder, { recursive: true, force: true });
    return true;
});

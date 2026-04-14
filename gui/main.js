const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { build } = require("../compiler"); // adjust path if needed

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    win.loadFile("index.html");
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
        const fs = require("fs");
        const path = require("path");

        // Scan all possible drive letters
        const letters = "DEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let microbit = null;

        for (const letter of letters) {
            const drive = `${letter}:\\`;
            const htm = path.join(drive, "MICROBIT.HTM");

            try {
                if (fs.existsSync(htm)) {
                    microbit = drive;
                    break;
                }
            } catch {}
        }

        if (!microbit) {
            return { ok: false, error: "Micro:bit not found" };
        }

        const dest = path.join(microbit, "MICROBIT.hex");
        fs.copyFileSync(hexPath, dest);

        return { ok: true, message: `Flashed to ${microbit}` };

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

// ======================================================
//  MICRO:BIT FLASHER (USB MASS STORAGE) - ROBUST VERSION
// ======================================================

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function findMicrobitDrive() {
    // 1. Windows: Classic drive letter scan
    if (process.platform === "win32") {
        const DRIVE_LETTERS = ["D", "E", "F", "G", "H", "I"];
        for (const letter of DRIVE_LETTERS) {
            const drive = `${letter}:\\`;
            if (fs.existsSync(path.join(drive, "DETAILS.TXT"))) return drive;
        }
    } 
    // 2. Linux: Querying via lsblk
    else if (process.platform === "linux") {
        try {
            // Using -J to parse JSON output cleanly
            const output = execSync("lsblk -J -o LABEL,MOUNTPOINT").toString();
            const data = JSON.parse(output);
            
            // Search through the blockdevices array
            const findLabel = (list) => {
                for (const dev of list) {
                    // Look for the "MICROBIT" label
                    if (dev.label === "MICROBIT" && dev.mountpoint) {
                        return dev.mountpoint;
                    }
                    // Recurse into children (partitions) if necessary
                    if (dev.children) {
                        const found = findLabel(dev.children);
                        if (found) return found;
                    }
                }
                return null;
            };

            const mountPoint = findLabel(data.blockdevices || []);
            if (!mountPoint) {
                console.error("DEBUG: lsblk found no mounted partition with label 'MICROBIT'");
            }
            return mountPoint;
        } catch (e) {
            console.error("DEBUG: Failed to run or parse lsblk:", e.message);
        }
    }
    return null;
}

function flash(hexPath) {
    const abs = path.isAbsolute(hexPath) ? hexPath : path.join(__dirname, hexPath);
    if (!fs.existsSync(abs)) throw new Error("HEX not found: " + abs);

    const drive = findMicrobitDrive();
    if (!drive) throw new Error("No micro:bit detected. Check connection and mount status.");

    const dest = path.join(drive, path.basename(abs));

    try {
        // Copy the file
        fs.copyFileSync(abs, dest);

        // Force OS to commit write to hardware (Critical for Linux)
        const fd = fs.openSync(dest, 'r+');
        fs.fsyncSync(fd); 
        fs.closeSync(fd);

        return "Flash complete.";
    } catch (err) {
        throw new Error("Flash failed: " + err.message);
    }
}

module.exports = { flash };
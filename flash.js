// ======================================================
//  MICRO:BIT FLASHER (USB MASS STORAGE) - ROBUST VERSION
// ======================================================

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Finds the mounted Micro:bit drive.
 * Returns the path as a string or null if not found.
 */
function findMicrobitDrive() {
    // 1. Windows: Classic drive letter scan
    if (process.platform === "win32") {
        const DRIVE_LETTERS = ["D", "E", "F", "G", "H", "I", "J", "K"];
        for (const letter of DRIVE_LETTERS) {
            const drive = `${letter}:\\`;
            // DETAILS.TXT is the signature file for Micro:bit bootloaders
            if (fs.existsSync(path.join(drive, "DETAILS.TXT"))) return drive;
        }
    } 
    // 2. Linux: Querying via lsblk
    else if (process.platform === "linux") {
        try {
            // Get JSON output of all devices
            const output = execSync("lsblk -J -o LABEL,MOUNTPOINT").toString();
            const data = JSON.parse(output);
            
            // Recursive helper to traverse device tree
            const search = (devices) => {
                for (const dev of devices) {
                    const label = dev.label ? dev.label.toUpperCase() : "";
                    // Check if label matches and is mounted
                    if (label === "MICROBIT" && dev.mountpoint) {
                        return dev.mountpoint;
                    }
                    if (dev.children) {
                        const found = search(dev.children);
                        if (found) return found;
                    }
                }
                return null;
            };
            
            return search(data.blockdevices || []);
        } catch (e) {
            console.error("DEBUG: Error searching block devices:", e.message);
        }
    }
    return null;
}

/**
 * Safety check: Ensures the drive is actually writable
 */
function canFlash(drivePath) {
    try {
        const testFile = path.join(drivePath, ".tmp_flash_check");
        fs.writeFileSync(testFile, "test");
        fs.unlinkSync(testFile);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Flashes the hex file to the detected drive.
 */
function flash(hexPath) {
    const abs = path.isAbsolute(hexPath) ? hexPath : path.join(__dirname, hexPath);
    if (!fs.existsSync(abs)) throw new Error("HEX not found: " + abs);

    const drive = findMicrobitDrive();
    if (!drive) throw new Error("No micro:bit detected. Check connection and mount status.");
    
    if (!canFlash(drive)) throw new Error("Drive is not writable. Please check permissions.");

    const dest = path.join(drive, path.basename(abs));

    try {
        // Copy the file
        fs.copyFileSync(abs, dest);

        // Force OS to commit write to hardware (Critical for reliable flashing on Linux)
        const fd = fs.openSync(dest, 'r+');
        fs.fsyncSync(fd); 
        fs.closeSync(fd);

        return "Flash complete.";
    } catch (err) {
        throw new Error("Flash failed: " + err.message);
    }
}

module.exports = { flash };
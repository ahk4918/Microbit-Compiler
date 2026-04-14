// ======================================================
//  MICRO:BIT FLASHER (USB MASS STORAGE)
// ======================================================

const fs = require("fs");
const path = require("path");

const DRIVE_LETTERS = ["D", "E", "F", "G", "H", "I"];

function findMicrobitDrive() {
    for (const letter of DRIVE_LETTERS) {
        const drive = `${letter}:\\`;
        if (fs.existsSync(path.join(drive, "DETAILS.TXT"))) return drive;
    }
    return null;
}

function flash(hexPath) {
    const abs = path.isAbsolute(hexPath)
        ? hexPath
        : path.join(__dirname, hexPath);

    if (!fs.existsSync(abs)) throw new Error("HEX not found: " + abs);

    const drive = findMicrobitDrive();
    if (!drive) throw new Error("No micro:bit detected.");

    const dest = path.join(drive, path.basename(abs));
    fs.copyFileSync(abs, dest);

    return "Flash complete.";
}

module.exports = { flash };

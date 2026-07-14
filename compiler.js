const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { app } = require("electron");

// Helper to resolve resource paths
const getBaseResources = () => {
    return (app && app.isPackaged) 
        ? path.join(process.resourcesPath, "resources", "buildengine") 
        : path.join(__dirname, "..", "buildengine");
};

// Centralized Path configuration
const getPaths = () => {
    const base = getBaseResources();
    const isWin = process.platform === "win32";

    return {
        npx: "npx",
        python: isWin 
            ? path.join(base, "MPython", "compilerVenv", "Scripts", "python.exe")
            : path.join(base, "MPython", "compilerVenv", "bin", "python3"),
        py2hex: isWin 
            ? path.join(base, "MPython", "compilerVenv", "Scripts", "py2hex.exe")
            : path.join(base, "MPython", "compilerVenv", "bin", "py2hex"),
        cmake: isWin 
            ? path.join(base, "toolchain", "cmake", "bin", "cmake.exe")
            : path.join(base, "toolchain", "cmake", "bin", "cmake"),
        ninja: isWin 
            ? path.join(base, "toolchain", "ninja", "ninja.exe")
            : path.join(base, "toolchain", "ninja", "ninja")
    };
};

const ROOT = __dirname;
const PROJECT = path.join(ROOT, "buildengine", "Makecode", "pxt-project");
const BUILT = path.join(PROJECT, "built");

// Updated runAsync to accept custom environment variables
function runAsync(cmd, args, cwd, onLog, env = process.env) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { cwd, shell: true, env });
        child.stdout.on("data", d => onLog(d.toString()));
        child.stderr.on("data", d => onLog(d.toString()));
        child.on("close", code => {
            if (code === 0) resolve();
            else reject(new Error(`Process exited with code ${code}`));
        });
    });
}

function createBuildFolder(srcFile) {
    const baseName = path.basename(srcFile, path.extname(srcFile));
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folder = path.join(ROOT, "Builds", `${timestamp}_${baseName}`);
    fs.mkdirSync(folder, { recursive: true });
    return folder;
}

async function buildTS(tsFile, onLog) {
    const PATHS = getPaths();
    const buildFolder = createBuildFolder(tsFile);
    
    const code = fs.readFileSync(tsFile, "utf8");
    fs.writeFileSync(path.join(PROJECT, "main.ts"), code);

    await runAsync(PATHS.npx, ["pxt", "install"], PROJECT, onLog);
    await runAsync(PATHS.npx, ["pxt", "build", "--hw", "v2"], PROJECT, onLog);

    const dest = path.join(buildFolder, `${path.basename(tsFile, ".ts")}-v2.hex`);
    fs.copyFileSync(path.join(BUILT, "mbcodal-binary.hex"), dest);
    return { folder: buildFolder, hex: dest };
}

async function buildPython(pyFile, onLog) {
    const PATHS = getPaths();
    const buildFolder = createBuildFolder(pyFile);

    await runAsync(PATHS.py2hex, [pyFile, "-o", buildFolder], ROOT, onLog);
    return { folder: buildFolder, hex: path.join(buildFolder, `${path.basename(pyFile, ".py")}.hex`) };
}

async function buildCpp(src, onLog) {
    const PATHS = getPaths();
    const buildFolder = createBuildFolder(src);
    const CPP_ROOT = getBaseResources();
    
    // Build custom environment for the compiler sub-process
    const env = Object.create(process.env);
    const armGccBin = path.join(CPP_ROOT, "C++", "toolchain", "arm-gcc", "bin");
    env.PATH = `${armGccBin}${path.delimiter}${env.PATH}`;
    env.CODAL_CMAKE = PATHS.cmake;
    env.CODAL_NINJA = PATHS.ninja;

    await runAsync(PATHS.python, ["build.py"], path.join(CPP_ROOT, "C++", "microbit"), onLog, env);

    const outHex = path.join(CPP_ROOT, "C++", "microbit", "MICROBIT.hex");
    const dest = path.join(buildFolder, `${path.basename(src, ".cpp")}.hex`);
    fs.copyFileSync(outHex, dest);

    return { folder: buildFolder, hex: dest };
}

async function build(file, onLog = console.log) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".ts") return await buildTS(file, onLog);
    if (ext === ".py") return await buildPython(file, onLog);
    if (ext === ".cpp" || ext === ".c") return await buildCpp(file, onLog);
    throw new Error("Unsupported file type: " + ext);
}

module.exports = { build };
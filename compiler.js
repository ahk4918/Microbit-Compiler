const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { app } = require("electron");
const os = require("os");

// Helper to resolve resource paths regardless of environment
const getBaseResources = () => {
    return (app && app.isPackaged)
        ? path.join(process.resourcesPath, "resources")
        : path.join(__dirname, "buildengine");
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

// Public build root (works for all users)
function getSystemBuildRoot() {
    // Windows: AppData\Roaming\microbit-compiler-builds
    // macOS: Library/Application Support/microbit-compiler-builds
    // Linux: ~/.config/microbit-compiler-builds
    const dir = path.join(app.getPath("appData"), "microbit-compiler");
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    return dir;
}


function createBuildFolder(srcFile) {
    const baseName = path.basename(srcFile, path.extname(srcFile));
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const root = getSystemBuildRoot();
    const folder = path.join(root, "Builds", `${timestamp}_${baseName}`);
    try {
        fs.mkdirSync(folder, { recursive: true });
    } catch (err) {
        // Fallback to user directory if public directory fails
        const fallbackRoot = path.join(os.homedir(), ".microbit-compiler");
        const fallbackFolder = path.join(fallbackRoot, "Builds", `${timestamp}_${baseName}`);
        fs.mkdirSync(fallbackFolder, { recursive: true });
        return fallbackFolder;
    }
    return folder;
}

const ROOT = __dirname;
const PROJECT = path.join(ROOT, "buildengine", "Makecode", "pxt-project");
const BUILT = path.join(PROJECT, "built");

function runAsync(cmd, args, cwd, onData) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { cwd, shell: true });
        child.stdout.on("data", d => onData(d.toString()));
        child.stderr.on("data", d => onData(d.toString()));
        child.on("close", code => {
            if (code === 0) resolve();
            else reject(new Error(`Process exited with code ${code}`));
        });
    });
}

async function buildTS(tsFile, onLog) {
    const PATHS = getPaths();
    const buildFolder = createBuildFolder(tsFile);
    const log = msg => onLog(msg);

    log("🔨 Building TypeScript...");
    const code = fs.readFileSync(tsFile, "utf8");
    fs.writeFileSync(path.join(PROJECT, "main.ts"), code);

    await runAsync(PATHS.npx, ["pxt", "install"], PROJECT, log);
    await runAsync(PATHS.npx, ["pxt", "build", "--hw", "v2"], PROJECT, log);

    const dest = path.join(buildFolder, `${path.basename(tsFile, ".ts")}-v2.hex`);
    fs.copyFileSync(path.join(BUILT, "mbcodal-binary.hex"), dest);
    return { folder: buildFolder, hex: dest };
}

async function buildPython(pyFile, onLog) {
    const PATHS = getPaths();
    const buildFolder = createBuildFolder(pyFile);
    const log = msg => onLog(msg);

    log("🔨 Building MicroPython...");
    const outHex = path.join(buildFolder, `${path.basename(pyFile, ".py")}.hex`);

    log(PATHS.py2hex);
    await runAsync(PATHS.py2hex, [pyFile, "-o", buildFolder], ROOT, log);
    return { folder: buildFolder, hex: outHex };
}

async function buildCpp(src, onLog) {
    const PATHS = getPaths();
    const buildFolder = createBuildFolder(src);
    const CPP_ROOT = path.join(getBaseResources(), "C++");
    const log = msg => onLog(msg);

    log("🔨 Building C++ (CODAL)...");

    process.env.CODAL_CMAKE = PATHS.cmake;
    process.env.CODAL_NINJA = PATHS.ninja;
    process.env.CODAL_ARM_GCC = path.join(CPP_ROOT, "toolchain", "arm-gcc", "bin");

    await runAsync(PATHS.python, ["build.py"], path.join(CPP_ROOT, "microbit"), log);

    const outHex = path.join(CPP_ROOT, "microbit", "MICROBIT.hex");
    const dest = path.join(buildFolder, `${path.basename(src, ".cpp")}.hex`);
    fs.copyFileSync(outHex, dest);

    return { folder: buildFolder, hex: dest };
}

async function build(file, onLog) {
    // Ensure onLog is always a function
    if (typeof onLog !== 'function') {
        onLog = console.log();
    }

    const ext = path.extname(file).toLowerCase();
    if (ext === ".ts") return await buildTS(file, onLog);
    if (ext === ".py") return await buildPython(file, onLog);
    if (ext === ".cpp" || ext === ".c") return await buildCpp(file, onLog);
    throw new Error("Unsupported file type: " + ext);
}

module.exports = { build };
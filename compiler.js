const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Use __dirname as ROOT (simplified for now)
const ROOT = __dirname;
const ENGINE = path.join(ROOT, "buildengine");
const MAKECODE = path.join(ENGINE, "Makecode");
const MPython = path.join(ENGINE, "MPython");
const CPP = path.join(ENGINE, "C++");

const PROJECT = path.join(MAKECODE, "pxt-project");
const BUILT = path.join(PROJECT, "built");

// Cross-platform PATHS
const PATHS = {
    npx: "npx",
    node: "node",
    npm: "npm",
    python: process.platform === "win32"
      ? path.join(MPython, "compilerVenv", "Scripts", "python.exe")
      : path.join(MPython, "compilerVenv", "bin", "python3"),
    py2hex: process.platform === "win32"
      ? path.join(MPython, "compilerVenv", "Scripts", "py2hex.exe")
      : path.join(MPython, "compilerVenv", "bin", "py2hex"),
    cmake: process.platform === "win32"
      ? path.join(CPP, "toolchain", "cmake", "bin", "cmake.exe")
      : path.join(CPP, "toolchain", "cmake", "bin", "cmake"),
    ninja: process.platform === "win32"
      ? path.join(CPP, "toolchain", "ninja", "ninja.exe")
      : path.join(CPP, "toolchain", "ninja", "ninja"),
    powershell: process.platform === "win32"
      ? "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
      : null
};

function runAsync(cmd, args, cwd, onData) {
    if (!cmd) {
        throw new Error(`Command not available on this platform: ${cmd}`);
    }
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

function createBuildFolder(srcFile) {
    const baseName = path.basename(srcFile, path.extname(srcFile));
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const folder = path.join(ROOT, "Builds", `${timestamp}_${baseName}`);
    fs.mkdirSync(folder, { recursive: true });
    return folder;
}

async function build(file, onLog = console.log) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".ts") return await buildTS(file, onLog);
    if (ext === ".py") return await buildPython(file, onLog);
    if (ext === ".cpp" || ext === ".c") return await buildCpp(file, onLog);
    throw new Error("Unsupported file type: " + ext);
}

async function buildTS(tsFile, onLog) {
    const buildFolder = createBuildFolder(tsFile);
    const logFile = path.join(buildFolder, "build.log");

    const log = msg => {
        fs.appendFileSync(logFile, msg + "\n");
        onLog(msg);
    };

    log("🔨 Building TypeScript...");

    const code = fs.readFileSync(tsFile, "utf8");
    fs.writeFileSync(path.join(buildFolder, "source.ts"), code);
    fs.writeFileSync(path.join(PROJECT, "main.ts"), code);

    // Ensure the pxt target is set for Micro:bit
    const pxtTargetJson = path.join(PROJECT, "pxtarget.json");
    if (!fs.existsSync(pxtTargetJson)) {
        log("🔧 Setting PXT target to microbit...");
        await runAsync(
            PATHS.npx,
            ["pxt", "target", "microbit"],
            PROJECT,
            log
        );
    }
    // Ensure pxt dependencies are installed
    await runAsync(
        PATHS.npx,
        ["pxt", "install"],
        PROJECT,
        log
    );
    // Proceed with the build
    await runAsync(
        PATHS.npx,
        ["pxt", "build", "--hw", "v2"],
        PROJECT,
        log
    );

    const name = path.basename(tsFile).replace(".ts", "");
    const v2 = path.join(BUILT, "mbcodal-binary.hex");
    if (!fs.existsSync(v2)) throw new Error("MakeCode did not produce output");

    const dest = path.join(buildFolder, `${name}-v2.hex`);
    fs.copyFileSync(v2, dest);

    return { folder: buildFolder, hex: dest };
}

async function buildPython(pyFile, onLog) {
    const buildFolder = createBuildFolder(pyFile);
    const logFile = path.join(buildFolder, "build.log");

    const log = msg => {
        fs.appendFileSync(logFile, msg + "\n");
        onLog(msg);
    };

    log("🔨 Building MicroPython...");

    fs.copyFileSync(pyFile, path.join(buildFolder, "source.py"));

    const name = path.basename(pyFile).replace(".py", "");
    const outHex = path.join(buildFolder, `${name}.hex`);

    await runAsync(
        PATHS.py2hex,
        [pyFile, "-o", buildFolder],
        ROOT,
        log
    );

    if (!fs.existsSync(outHex)) throw new Error("py2hex did not produce output");

    return { folder: buildFolder, hex: outHex };
}

async function buildCpp(src, onLog) {
    const buildFolder = createBuildFolder(src);
    const logFile = path.join(buildFolder, "build.log");

    const log = msg => {
        fs.appendFileSync(logFile, msg + "\n");
        onLog(msg);
    };

    log("🔨 Building C++ (CODAL)...");

    const repo = path.join(CPP, "microbit");
    const sourceDir = path.join(repo, "source");
    const outHex = path.join(repo, "MICROBIT.hex");

    fs.copyFileSync(src, path.join(buildFolder, "source.cpp"));
    fs.copyFileSync(src, path.join(sourceDir, "main.cpp"));

    // Set toolchain environment
    process.env.CODAL_CMAKE = PATHS.cmake;
    process.env.CODAL_NINJA = PATHS.ninja;
    process.env.CODAL_ARM_GCC = path.join(CPP, "toolchain", "arm-gcc", "bin");

    await runAsync(
        PATHS.python,
        ["build.py"],
        path.join(CPP, "microbit"),
        log
    );

    if (!fs.existsSync(outHex)) throw new Error("CODAL did not produce MICROBIT.hex");

    const name = path.basename(src).replace(".cpp", "");
    const dest = path.join(buildFolder, `${name}.hex`);
    fs.copyFileSync(outHex, dest);

    return { folder: buildFolder, hex: dest };
}

module.exports = { build };

// CLI Mode
if (require.main === module) {
    const file = process.argv[2];
    const outDir = process.argv[3] || null;

    if (!file) {
        console.error("❌ No input file provided.");
        process.exit(1);
    }

    console.log("🔧 Microbit-Compiler CLI");
    console.log("📄 File:", file);
    if (outDir) console.log("📁 Output override:", outDir);

    build(file, msg => process.stdout.write(msg + "\n"))
        .then(res => {
            let finalHex = res.hex;
            if (outDir) {
                if (!fs.existsSync(outDir)) {
                    fs.mkdirSync(outDir, { recursive: true });
                }
                const dest = path.join(outDir, path.basename(res.hex));
                fs.copyFileSync(res.hex, dest);
                finalHex = dest;
                console.log("📤 Copied HEX to:", dest);
            }
            console.log("\n✔ Build complete");
            console.log("📁 Build folder:", res.folder);
            console.log("🔹 HEX file:", finalHex);
        })
        .catch(err => {
            console.error("❌ Build failed:", err.message);
            process.exit(1);
        });
}
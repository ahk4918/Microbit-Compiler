# Microbit Compiler - Windows Branch

**Windows-Only Application**

A simple compiler for BBC Microbit supporting TypeScript (MakeCode), MicroPython, and C++ (CODAL). 


## Quick Start

### 1. First Time Setup
```bash
start.bat
```
This extracts the Windows node runtime

### 2. Use the GUI
```bash
start.bat
```

--Or--

```bash
.\runtime\node\npx.cmd electron .\gui
```

Starts the Electron GUI where you can compile your code.

### 3. Or the Command Line
```bash
node index.js input.ts      # TypeScript/MakeCode
node index.js input.py      # MicroPython
node index.js input.cpp     # C++/CODAL
```

## Supported Languages

| Language | File Type | Output |
|----------|-----------|--------|
| TypeScript | `.ts` | `filename-v2.hex` |
| MicroPython | `.py` | `filename.hex` |
| C++ | `.cpp` / `.c` | `filename.hex` |

## Output

Compiled files are saved to:
```
Builds/
└── TIMESTAMP_projectname/
    ├── projectname.hex     (your firmware)
    ├── source.ts/py/cpp    (your source copy)
    └── build.log           (compilation log)
```

## System Requirements

**Operating System:** Windows 7 SP1 or later (required)
- **Disk:** 1.2GB (after first run)
- **RAM:** 2GB minimum

> **Note:** This branch only supports Windows. macOS and Linux are not supported by this version.

## Troubleshooting

### "Runtime folder not found" error
**Solution:** Make sure `runtime.zip` exists in the repo root, then run `start.bat` again. The file will be extracted automatically on first run.

### "ARM-GCC not found"
**Solution:** The ARM GCC toolchain is required for C++ compilation. Ensure that `buildengine/C++/toolchain/arm-gcc/` exists with the necessary files. If missing:
- Re-clone the repository with full submodules
- Or download from: https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads (Windows version)

### Compilation fails with build errors
**Solution:** 
- Check the log file in the `Builds/` folder for detailed error messages
- Verify your source code syntax is correct for the target language
- For C++, ensure all required headers and libraries are properly included
- Clear the build cache: delete the problematic entry in the `Builds/` folder and try again

### "micro:bit not detected" (flashing fails)
**Solution:**
- Ensure your micro:bit is connected via USB and appears as a removable drive in Windows Explorer
- The micro:bit should show "DETAILS.TXT" in the drive root
- Try reconnecting the USB cable or using a different USB port
- Check Device Manager to ensure no driver issues

### Very slow first C++ compile
**Normal Behavior:** First C++ compile is 30-45 seconds due to toolchain initialization. Subsequent compiles are 3-5 seconds.
- This is expected; just wait for completion
- Subsequent compiles will be significantly faster

### "Cannot find npx.cmd" error
**Solution:** The Windows node runtime has not been extracted. Run `start.bat` first to extract `runtime.zip`.

### GUI fails to start
**Solution:**
- Ensure Node.js runtime is extracted: run `start.bat`
- Try launching manually: `.\runtime\node\npx.cmd electron .\gui`
- Check for port conflicts or firewall blocking Electron
- Clear cache: delete `node_modules` in the gui folder and reinstall dependencies

## File Structure

```
microbit-compiler/
├── launcher.bat            (start here)
├── index.js                (build engine)
├── runtime.zip             (Node.js, auto-extracted)
├── gui/                    (Electron app)
└── buildengine/
    ├── Makecode/           (TypeScript)
    ├── MPython/            (Python)
    └── C++/                (C++/CODAL)
```

## Performance

| Action | Time |
|--------|------|
| First run setup | 30 sec |
| TypeScript build | 15-20 sec |
| Python build | 1-5 sec |
| C++ build | 30-45 sec (first), 3-5 sec (after) |

## Version(Windows)
**Branch:** Windows

**Current:** 1.0.0  
**Toolchain:** ARM GNU Toolchain 15.2.rel1 win32 arm-none-eabi  
**Direct name:** gcc-arm-none-eabi-10.3-2021.10-win32

---

For more information, see the guides in the repository.
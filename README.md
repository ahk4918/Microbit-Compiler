# Microbit Compiler

A simple compiler for BBC Microbit supporting TypeScript (MakeCode), MicroPython, and C++ (CODAL).

## Quick Start

### 1. First Time Setup
```bash
launcher.bat
```
This extracts toolchains automatically (one-time, ~30 seconds).

### 2. Use the GUI
```bash
launcher.bat
```
Starts the Electron GUI where you can compile your code.

### 3. Command Line (Optional)
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

- **Windows:** 7 SP1 or later
- **Disk:** 1.2GB (after first run)
- **RAM:** 2GB minimum

## Troubleshooting

### "Runtime folder not found" error
**Solution:** Make sure `runtime.zip` exists in the repo root, then run `launcher.bat` again.

### "ARM-GCC not found"
**Solution:** Make sure `buildengine/C++/toolchain/arm-gcc/arm-gcc-libs.7z` exists, then run `launcher.bat` again.

### Compilation fails
**Solution:** Check the log file in the build folder for error details.

### Very slow first C++ compile
**Normal:** First compile is 60-90 seconds. Subsequent compiles are faster.

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
| C++ build | 30-60 sec (first), 3-5 sec (after) |

## Version

**Current:** 1.0.0  
**Toolchain:** ARM GNU Toolchain 15.2.rel1

---

For more information, see the guides in the repository.
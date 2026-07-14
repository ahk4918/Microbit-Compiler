# Micro:bit Compiler Studio v1.0.0

Welcome to the initial release of Micro:bit Compiler Studio! This application provides a unified, cross-platform environment for compiling and flashing Micro:bit code (TypeScript, Python, and C++) without needing complex local toolchain installations.

## What's New
* **Unified Build Pipeline**: Built-in support for compiling TypeScript (via PXT), MicroPython, and C++ (via CODAL).
* **Cross-Platform Compatibility**: Now supports Windows, Debian/Ubuntu, and Fedora distributions.
* **Smart Caching**: Build tools (ARM-GCC, CMake, Ninja) are now cached to significantly speed up repeated builds.
* **Mass Storage Flasher**: Robust USB detection for one-click flashing to your Micro:bit device.

## Supported Platforms
| Platform | Format |
| :--- | :--- |
| Windows | .exe (Installer) |
| Debian/Ubuntu | .deb |
| Fedora | .rpm |
| Linux (Generic) | .tar.gz |

## Installation & Prerequisites
* **Linux Users**: Ensure you have `util-linux` installed for USB device detection:
  * Debian/Ubuntu: `sudo apt-get install util-linux`
  * Fedora: `sudo dnf install util-linux`
* **Permissions**: Ensure your user has read/write permissions for removable media.

## Known Issues
* On some Linux distributions, the application may require specific udev rules if the Micro:bit drive is not automatically detected.
* Please ensure your Micro:bit is in "Main" mode (not currently in bootloader update mode) before attempting to flash.

## Built With
* [Electron](https://www.electronjs.org/) - The desktop framework.
* [PXT](https://makecode.com/) - Microsoft MakeCode engine for TypeScript.
* [CODAL](https://codal.org/) - C++ abstraction layer for Micro:bit.
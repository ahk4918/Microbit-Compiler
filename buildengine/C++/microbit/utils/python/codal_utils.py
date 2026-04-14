#!/usr/bin/env python3

import os
import sys
import platform
import json
import shutil
import re
import subprocess
from pathlib import Path

# ---------------------------------------------------------------------------
# Portable toolchain paths (added)
# ---------------------------------------------------------------------------

cmake_path = Path(os.environ.get("CODAL_CMAKE", "cmake"))
ninja_path = Path(os.environ.get("CODAL_NINJA", "ninja"))
arm_gcc_path = Path(os.environ.get("CODAL_ARM_GCC", ""))

# ---------------------------------------------------------------------------
# Utility wrappers
# ---------------------------------------------------------------------------

def system(cmd):
    print(f"[CMD] {cmd}")
    result = os.system(cmd)
    if result != 0:
        print(f"[ERROR] Command failed with exit code {result}")
        sys.exit(result)

def read_json(fn):
    with open(fn, "r", encoding="utf-8") as f:
        return json.load(f)

# ---------------------------------------------------------------------------
# Build logic (modified)
# ---------------------------------------------------------------------------

def build(clean, verbose=False, parallelism=10):
    # Add ARM GCC to PATH
    if arm_gcc_path and arm_gcc_path.exists():
        os.environ["PATH"] = str(arm_gcc_path) + os.pathsep + os.environ["PATH"]

    # Add Ninja to PATH
    if ninja_path.exists():
        os.environ["PATH"] = str(ninja_path.parent) + os.pathsep + os.environ["PATH"]

    # Detect Ninja
    use_ninja = ninja_path.exists() or shutil.which(str(ninja_path)) is not None

    # -----------------------------------------------------------------------
    # Configure
    # -----------------------------------------------------------------------
    if use_ninja:
        cmake_cmd = (
            f"\"{cmake_path}\" .. "
            f"-DCMAKE_BUILD_TYPE=RelWithDebInfo "
            f"-G Ninja "
            f"-DCMAKE_MAKE_PROGRAM={ninja_path.as_posix()}"
        )
        system(cmake_cmd)

        if clean:
            system(f"\"{ninja_path}\" clean")

        if verbose:
            system(f"\"{ninja_path}\" -j {parallelism} --verbose")
        else:
            system(f"\"{ninja_path}\" -j {parallelism}")

    else:
        cmake_cmd = (
            f"\"{cmake_path}\" .. "
            f"-DCMAKE_BUILD_TYPE=RelWithDebInfo "
            f"-G \"Unix Makefiles\""
        )
        system(cmake_cmd)

        if clean:
            system("make clean")

        if verbose:
            system(f"make -j {parallelism} VERBOSE=1")
        else:
            system(f"make -j {parallelism}")

# ---------------------------------------------------------------------------
# CODAL library + versioning logic (unchanged)
# ---------------------------------------------------------------------------

def checkgit():
    stat = os.popen('git status --porcelain').read().strip()
    if stat != "":
        print("Missing checkin in", os.getcwd(), "\n" + stat)
        exit(1)

def read_config():
    codal = read_json("codal.json")
    targetdir = codal['target']['name']
    target = read_json("libraries/" + targetdir + "/target.json")
    return (codal, targetdir, target)

def update(allow_detached=False, sync_dev=False):
    (codal, targetdir, target) = read_config()
    dirname = os.getcwd()
    for ln in target['libraries']:
        os.chdir(dirname + "/libraries/" + ln['name'])
        if sync_dev:
            default_branch = list(filter(
                lambda v: v.strip().startswith('HEAD'),
                str(subprocess.check_output(["git", "remote", "show", "origin"]), "utf8").splitlines()
            ))[0].split(":")[1].strip()
            system("git checkout " + default_branch)
        else:
            system("git checkout " + ln['branch'])
        system("git pull")

    os.chdir(dirname + "/libraries/" + targetdir)
    if ("HEAD detached" in os.popen('git branch').read().strip() and not allow_detached):
        system("git checkout master")

    system("git pull")
    os.chdir(dirname)

def revision(rev):
    (codal, targetdir, target) = read_config()
    dirname = os.getcwd()
    os.chdir("libraries/" + targetdir)
    system("git checkout " + rev)
    os.chdir(dirname)
    update(True)

def printstatus(logLines=3, detail=False):
    print("\n***%s" % os.getcwd())
    branch = str(subprocess.check_output(["git", "branch", "--show-current"]), "utf8").strip()
    hash = str(subprocess.check_output(["git", "rev-parse", "HEAD"]), "utf8").strip()
    try:
        tag = str(subprocess.check_output(["git", "describe", "--tags", "--abbrev=0"], stderr=subprocess.STDOUT), "utf8").strip()
    except subprocess.CalledProcessError:
        tag = "~none~"

    print(f"Branch: {branch}, Nearest Tag: {tag} ({hash})")

    if detail:
        system(
            "git --no-pager log -n {} --graph "
            "--pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s "
            "%Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit".format(logLines)
        )
        print("")

    system("git status -sb")
    print("")

def status(logLines=3, detail=True, libs=[]):
    (codal, targetdir, target) = read_config()
    dirname = os.getcwd()

    if len(libs) == 0:
        for ln in target['libraries']:
            os.chdir(dirname + "/libraries/" + ln['name'])
            printstatus(logLines, detail)
        os.chdir(dirname + "/libraries/" + targetdir)
        printstatus(logLines, detail)
        os.chdir(dirname)
        printstatus(logLines, detail)
    else:
        for lib in libs:
            os.chdir(dirname + "/libraries/" + lib)
            printstatus(logLines, detail)

def get_next_version(options):
    if options.version:
        return options.version

    log = os.popen('git log -n 100').read().strip()
    m = re.search(r'Snapshot v(\d+)\.(\d+)\.(\d+)(-([\w\-]+).(\d+))?', log)
    if m is None:
        print("Cannot determine next version from git log")
        exit(1)

    v0 = int(m.group(1))
    v1 = int(m.group(2))
    v2 = int(m.group(3))
    vB = -1

    branchName = os.popen('git rev-parse --abbrev-ref HEAD').read().strip()

    if not options.branch and branchName not in ["master", "main"]:
        print("On feature branch use -l -b")
        exit(1)

    suff = ""
    if options.branch:
        if m.group(4) and branchName == m.group(5):
            vB = int(m.group(6))
        suff = f"-{branchName}.{vB + 1}"
    elif options.update_major:
        v0 += 1
        v1 = 0
        v2 = 0
    elif options.update_minor:
        v1 += 1
        v2 = 0
    else:
        v2 += 1

    return f"v{v0}.{v1}.{v2}{suff}"

def lock(options):
    (codal, targetdir, target) = read_config()
    dirname = os.getcwd()

    for ln in target['libraries']:
        os.chdir(dirname + "/libraries/" + ln['name'])
        checkgit()
        stat = os.popen('git status --porcelain -b').read().strip()
        if "ahead" in stat:
            print("Missing push in", os.getcwd())
            exit(1)
        sha = os.popen('git rev-parse HEAD').read().strip()
        ln['branch'] = sha
        print(ln['name'], sha)

    os.chdir(dirname + "/libraries/" + targetdir)
    ver = get_next_version(options)
    print("Creating snapshot", ver)

    system("git checkout target-locked.json")
    checkgit()

    target["snapshot_version"] = ver
    with open("target-locked.json", "w") as f:
        f.write(json.dumps(target, indent=4, sort_keys=True))

    system(f"git commit -am \"Snapshot {ver}\"")
    sha = os.popen('git rev-parse HEAD').read().strip()

    system(f"git tag {ver}")
    system("git pull")
    system("git push")
    system("git push --tags")

    os.chdir(dirname)
    print(f"\nNew snapshot: {ver} [{sha}]")

def delete_build_folder(in_folder=True):
    if in_folder:
        os.chdir("..")

    shutil.rmtree('./build')
    os.mkdir("./build")

    if in_folder:
        os.chdir("./build")

def generate_docs():
    from utils.python.doc_gen.doxygen_extractor import DoxygenExtractor
    from utils.python.doc_gen.md_converter import MarkdownConverter
    from utils.python.doc_gen.system_utils import SystemUtils
    from utils.python.doc_gen.doc_gen import generate_mkdocs

    os.chdir("..")
    (codal, targetdir, target) = read_config()

    lib_dir = os.getcwd() + "/libraries/"
    libraries = [lib_dir + targetdir]

    for l in target["libraries"]:
        libraries.append(lib_dir + l["name"])

    os.chdir(lib_dir + targetdir)
    generate_mkdocs(libraries)

# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if not os.path.exists("build"):
        os.mkdir("build")

    os.chdir("build")
    build(clean=False, verbose=True)

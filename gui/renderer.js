// ===== DOM ELEMENTS =====
const selectBtn = document.getElementById("select");
const toolbarBuildBtn = document.getElementById("toolbar-build");
const toolbarFlashBtn = document.getElementById("toolbar-flash");

const statusBox = document.getElementById("status");
const fileDisplay = document.getElementById("file-name-display");
const fileSize = document.getElementById("file-size");
const progressBar = document.getElementById("progress-bar");
const buildMeta = document.getElementById("build-meta");

const buildHistory = document.getElementById("build-history");
const buildViewer = document.getElementById("build-viewer");

const consoleClearBtn = document.getElementById("console-clear");
const consoleToggleBtn = document.getElementById("console-toggle");

// ===== STATE =====
let selectedFile = null;
let currentBuildFolder = null;
let lastHexPath = null;
let consoleCollapsed = false;

// ===== UTILITIES =====
function log(msg) {
    const div = document.createElement("div");
    div.className = "status-line";
    div.innerHTML = msg;
    statusBox.appendChild(div);
    statusBox.scrollTop = statusBox.scrollHeight;
}

function setProgress(pct) {
    progressBar.style.width = pct + "%";
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function switchView(viewName) {
    document.querySelectorAll("[data-view]").forEach(btn => btn.classList.remove("active"));
    const btn = document.querySelector(`[data-view="${viewName}"]`);
    if (btn) btn.classList.add("active");

    document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
    const view = document.getElementById(viewName + "-view");
    if (view) view.classList.add("active");
}

// ===== SIDEBAR NAVIGATION =====
document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("[data-view]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".content-section").forEach(s => s.classList.remove("active"));
        const viewId = btn.dataset.view + "-view";
        document.getElementById(viewId).classList.add("active");
    });
});

// ===== FILE SELECTION =====
selectBtn.onclick = async () => {
    const file = await window.api.selectTS();
    if (!file) return;

    selectedFile = file;
    const fileName = file.split(/[\\/]/).pop();
    fileDisplay.textContent = fileName;

    try {
        const fs = require("fs");
        const stats = fs.statSync(file);
        fileSize.textContent = formatFileSize(stats.size);
    } catch {
        fileSize.textContent = "";
    }

    log(`<span class="ansi-green">✔ Loaded:</span> ${fileName}`);
    switchView("editor");
};

// ===== BUILD (TOOLBAR BUTTON) =====
toolbarBuildBtn.onclick = () => {
    if (!selectedFile) {
        log(`<span class="ansi-red">❌ No file selected.</span>`);
        return;
    }

    buildMeta.textContent = "Building...";
    setProgress(0);

    log("<span class='ansi-yellow'>🔨 Starting build...</span>");
    window.api.startBuild(selectedFile);
};

// ===== FLASH (TOOLBAR BUTTON) =====
toolbarFlashBtn.onclick = async () => {
    if (!lastHexPath && !currentBuildFolder) {
        log(`<span class="ansi-red">❌ No build available to flash.</span>`);
        return;
    }

    let hexPath = lastHexPath;

    if (!hexPath && currentBuildFolder) {
        const files = await window.api.listBuildFiles(currentBuildFolder);
        const hex = files.find(f => f.name.endsWith(".hex"));
        if (!hex) {
            log(`<span class="ansi-red">❌ No HEX file in this build.</span>`);
            return;
        }
        hexPath = hex.path;
    }

    log(`📤 Flashing: ${hexPath}`);
    const res = await window.api.flashHex(hexPath);

    if (res.ok) {
        log(`<span class="ansi-green">✔ ${res.message}</span>`);
    } else {
        log(`<span class="ansi-red">❌ ${res.error}</span>`);
    }
};

// ===== CONSOLE ACTIONS =====
consoleClearBtn.onclick = () => {
    statusBox.innerHTML = "";
    log("<span class='ansi-green'>✔ Console cleared</span>");
};

consoleToggleBtn.onclick = () => {
    consoleCollapsed = !consoleCollapsed;

    if (consoleCollapsed) {
        statusBox.style.height = "40px";
        statusBox.style.overflowY = "hidden";
        consoleToggleBtn.textContent = "▲ Expand";
    } else {
        statusBox.style.height = "";
        statusBox.style.overflowY = "auto";
        consoleToggleBtn.textContent = "▼ Collapse";
    }
};

// ===== IPC LISTENERS =====
window.api.onBuildLog((msg) => {
    log(msg);
});

window.api.onBuildProgress((pct) => {
    setProgress(pct);
    buildMeta.textContent = `Building ${pct}%`;
});

window.api.onBuildComplete((res) => {
    if (!res.success) {
        log(`<span class="ansi-red">❌ ${res.error}</span>`);
        setProgress(0);
        buildMeta.textContent = "Build failed";
        return;
    }

    currentBuildFolder = res.folder;
    lastHexPath = res.hex || null;

    const buildName = res.folder.split(/[\\/]/).pop();
    log(`<span class="ansi-green">✔ Build complete</span> (took ${res.duration}s)`);
    log(`<span class="ansi-green">✔ Output folder:</span> ${res.folder}`);

    buildMeta.textContent = `✔ ${buildName} • ${res.duration}s`;
    setProgress(100);

    switchView("editor");
    refreshBuildHistory();
    openBuild(res.folder);
});

// ===== BUILD HISTORY =====
async function refreshBuildHistory() {
    const builds = await window.api.listBuilds();
    buildHistory.innerHTML = "";

    if (builds.length === 0) {
        buildHistory.innerHTML = `
            <div class="empty-state" style="padding: 20px; height: auto;">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">No builds yet</div>
            </div>`;
        return;
    }

    builds.forEach(b => {
        const div = document.createElement("div");
        div.className = "build-item";

        const icon = document.createElement("div");
        icon.className = "build-item-icon";
        icon.textContent = "📦";

        const content = document.createElement("div");
        content.className = "build-item-content";

        const name = document.createElement("div");
        name.className = "build-item-name";
        name.textContent = b.name;

        const time = document.createElement("div");
        time.className = "build-item-time";
        time.textContent = new Date(parseInt(b.name) * 1000).toLocaleString();

        content.appendChild(name);
        content.appendChild(time);
        div.appendChild(icon);
        div.appendChild(content);

        div.onclick = () => openBuild(b.path);
        buildHistory.appendChild(div);
    });
}

// ===== OPEN BUILD VIEWER =====
async function openBuild(folder) {
    currentBuildFolder = folder;
    const files = await window.api.listBuildFiles(folder);

    buildViewer.innerHTML = "";

    // Header
    const header = document.createElement("div");
    header.className = "build-viewer-header";

    const title = document.createElement("div");
    title.className = "build-viewer-title";
    title.textContent = folder.split(/[\\/]/).pop();

    const actions = document.createElement("div");
    actions.className = "build-viewer-actions";

    // Flash button
    const flashBtn2 = document.createElement("button");
    flashBtn2.className = "toolbar-btn success";
    flashBtn2.innerHTML = '<span>⚡</span>Flash';
    flashBtn2.style.fontSize = "11px";
    flashBtn2.style.padding = "4px 8px";

    flashBtn2.onclick = async () => {
        const files = await window.api.listBuildFiles(folder);
        const hex = files.find(f => f.name.endsWith(".hex"));

        if (!hex) {
            log(`<span class="ansi-red">❌ No HEX file in this build.</span>`);
            return;
        }

        log(`📤 Flashing: ${hex.path}`);
        const res = await window.api.flashHex(hex.path);

        if (res.ok) {
            log(`<span class="ansi-green">✔ ${res.message}</span>`);
        } else {
            log(`<span class="ansi-red">❌ ${res.error}</span>`);
        }
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.className = "toolbar-btn danger";
    delBtn.innerHTML = '<span>🗑️</span>Delete';
    delBtn.style.fontSize = "11px";
    delBtn.style.padding = "4px 8px";

    delBtn.onclick = async () => {
        await window.api.deleteBuild(folder);

        if (currentBuildFolder === folder) {
            currentBuildFolder = null;
            buildViewer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <div class="empty-state-text">Select a build to view files</div>
                </div>`;
            buildMeta.textContent = "Ready";
        }

        refreshBuildHistory();
    };

    actions.appendChild(flashBtn2);
    actions.appendChild(delBtn);

    header.appendChild(title);
    header.appendChild(actions);
    buildViewer.appendChild(header);

    // File area
    const area = document.createElement("div");
    area.className = "build-file-area";

    const fileList = document.createElement("div");
    fileList.className = "build-file-list";

    const fileContent = document.createElement("div");
    fileContent.className = "build-file-content";
    fileContent.textContent = "Select a file to view its contents.";

    files.forEach(f => {
        const item = document.createElement("div");
        item.className = "build-file";
        item.textContent = f.name;

        item.onclick = async () => {
            if (/\.(log|ts|py|cpp|c|txt|hex|json)$/i.test(f.name)) {
                const content = await window.api.readFile(f.path);
                fileContent.textContent = content;
            } else {
                fileContent.textContent = `Binary file: ${f.name}`;
            }
        };

        fileList.appendChild(item);
    });

    area.appendChild(fileList);
    area.appendChild(fileContent);
    buildViewer.appendChild(area);
}

// ===== INITIALIZATION =====
(async () => {
    log("<span class='ansi-green'>✔ Micro:bit Compiler Studio ready</span>");
    await refreshBuildHistory();
})();

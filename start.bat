@echo off
setlocal

:: Check if the runtime folder exists
if not exist ".\runtime" (
    echo Runtime folder not found. Extracting...
    
    if exist "runtime.zip" (
        :: Extract zip using PowerShell
        powershell -Command "Expand-Archive -Path 'runtime.zip' -DestinationPath '.' -Force"
        
        if %ERRORLEVEL% EQU 0 (
            echo Extraction successful. Deleting zip...
            del "runtime.zip"
        ) else (
            echo Error: Extraction failed.
            pause
            exit /b
        )
    ) else (
        echo Error: runtime.zip is missing.
        pause
        exit /b
    )
)

echo Starting the application...
pushd gui
call npm install
call npx electron .
popd

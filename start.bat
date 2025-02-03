@echo off
chcp 65001 >nul
:loop
if not exist "node_modules" (
    echo ╦══════════════════════════════════════╦
    echo       ╦╔═ ╔═╗ ╔═╦ ╔═╗ ╦ ╦ ╔╗╔ ═╗ ╦
    echo       ╠╩╗ ╠═╣ ╔═╝ ║╣  ╚╦╝ ║║║ ╔╩╦╝
    echo       ╩ ╩ ╩ ╩ ╩═╝ ╚═╝  ╩  ╝╚╝ ╩ ╚═
    echo ╩══════════════════════════════════════╩
    echo.
    echo Dependencies not found. Installing...
    npm install
    if exist "start.bat" (
        start "" "start.bat"
    ) else (
        echo "start.bat not found. Please check the script."
        echo Press any key to exit...
        pause
        exit /b
    )
)
start /b node src/index.js
pause >nul
taskkill /f /im node.exe >nul 2>&1
cls
goto loop
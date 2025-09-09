@echo off
title CafeConnect - Starting...
cd /d "d:\desktop crap\cafeconnect-master\food-ordering-app"

echo Starting CafeConnect Application...
echo Please wait while the server starts...

start /min cmd /c "npm run dev"

timeout /t 5 /nobreak >nul

echo Opening CafeConnect in your browser...
start http://localhost:5173

echo CafeConnect is now running!
echo Close this window to stop the application.
pause

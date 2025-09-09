# CafeConnect Application Launcher
Write-Host "🚀 Starting CafeConnect Application..." -ForegroundColor Green

# Set location to app directory
Set-Location "d:\desktop crap\cafeconnect-master\food-ordering-app"

# Start the development server
Write-Host "📦 Starting development server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Minimized

# Wait for server to start
Write-Host "⏳ Waiting for server to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Open in browser
Write-Host "🌐 Opening CafeConnect in your browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "✅ CafeConnect is now running!" -ForegroundColor Green
Write-Host "📱 Access your app at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "❌ To stop the server, close the minimized PowerShell window" -ForegroundColor Red

Read-Host "Press Enter to close this launcher"

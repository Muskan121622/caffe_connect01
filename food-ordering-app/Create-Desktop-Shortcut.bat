@echo off
echo Creating CafeConnect Desktop Shortcut...

set "shortcutPath=%USERPROFILE%\Desktop\CafeConnect.lnk"
set "targetPath=%~dp0CafeConnect-App.vbs"
set "iconPath=%SystemRoot%\System32\shell32.dll,13"

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%shortcutPath%'); $Shortcut.TargetPath = '%targetPath%'; $Shortcut.IconLocation = '%iconPath%'; $Shortcut.Description = 'Launch CafeConnect Application'; $Shortcut.Save()"

echo Desktop shortcut created successfully!
echo You can now double-click "CafeConnect" on your desktop to run the app.
pause

Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Change to the app directory
appDir = "d:\desktop crap\cafeconnect-master\food-ordering-app"
objShell.CurrentDirectory = appDir

' Start the development server in a hidden window
objShell.Run "cmd /c npm run dev", 0, False

' Wait for server to start
WScript.Sleep 8000

' Open the application in default browser
objShell.Run "http://localhost:5173", 1, False

' Show success message
MsgBox "CafeConnect is now running in your browser!" & vbCrLf & vbCrLf & "The app will be available at: http://localhost:5173" & vbCrLf & vbCrLf & "To stop the server, close the browser and restart your computer or use Task Manager to end Node.js processes.", vbInformation, "CafeConnect Started"

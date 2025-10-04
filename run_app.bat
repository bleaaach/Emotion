@echo off
echo Stopping any existing Metro processes...
taskkill /F /IM node.exe >nul 2>&1

echo Cleaning Metro cache...
npx react-native start --reset-cache > metro.log 2>&1 &
timeout /t 10 >nul

echo Starting Android app...
npx react-native run-android

echo.
echo If you see port conflict messages, please select "Yes" to use a different port.
pause
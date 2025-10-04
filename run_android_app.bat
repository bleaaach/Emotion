@echo off
setlocal

echo Setting up Android environment variables...
set "ANDROID_HOME=D:\Android\SDK"
set "ANDROID_SDK_ROOT=D:\Android\SDK"

echo Adding Android tools to PATH...
set "PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools\bin"

echo Current PATH: %PATH%

echo Starting Metro server in background...
start "" cmd /c "npx react-native start"

timeout /t 10

echo Building and running Android app...
npx react-native run-android

pause
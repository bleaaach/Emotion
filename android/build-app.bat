@echo off
setlocal

:: 设置Android SDK路径
set ANDROID_SDK_ROOT=C:\Users\Public\Android\Sdk
set ANDROID_HOME=C:\Users\Public\Android\Sdk

:: 运行Gradle构建
.\gradlew.bat assembleDebug --init-script force-http.gradle

endlocal
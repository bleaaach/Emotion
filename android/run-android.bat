@echo off
REM 设置Android SDK路径到用户目录下的可写位置
set ANDROID_SDK_ROOT=C:\Users\Public\Android\Sdk
set ANDROID_HOME=C:\Users\Public\Android\Sdk

echo Running React Native Android build with custom SDK path...
echo SDK Path: %ANDROID_SDK_ROOT%

REM 运行React Native Android构建命令
cd /d D:\Code\Emotion\Emotion
npx react-native run-android

echo Build process completed.
@echo off
REM 设置Android SDK路径到用户目录下的可写位置
set ANDROID_SDK_ROOT=C:\Users\Public\Android\Sdk
set ANDROID_HOME=C:\Users\Public\Android\Sdk

echo Running React Native Android build with custom SDK path...
echo SDK Path: %ANDROID_SDK_ROOT%

REM 运行React Native Android构建命令
cd /d D:\Code\Emotion\Emotion
npx react-native run-android

echo Build process completed.
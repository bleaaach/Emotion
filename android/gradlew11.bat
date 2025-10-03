@echo off
setlocal

REM 设置Java 19路径
set "JAVA_HOME=D:\Program Files\Java\LibericaJDK-19X"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo Using Java from %JAVA_HOME%
java -version

REM 运行Gradle
call gradlew.bat %*
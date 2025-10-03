@echo off
del /Q fixssl.bat >nul 2>&1
echo 正在尝试解决Gradle SSL证书问题...

set JAVA_OPTS=-Djavax.net.ssl.trustStore=NUL -Djavax.net.ssl.trustStoreType=JKS -Djavax.net.ssl.ignore.certificate.errors=true
set GRADLE_OPTS=-Djavax.net.ssl.trustStore=NUL -Djavax.net.ssl.trustStoreType=JKS -Djavax.net.ssl.ignore.certificate.errors=true

echo 正在清理Gradle缓存...
call gradlew.bat --stop

echo 正在尝试下载依赖...
call gradlew.bat --refresh-dependencies clean

echo 完成。如果问题仍然存在，请尝试在可以正常访问网络的环境中运行此项目。
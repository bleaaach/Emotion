# React Native Android 环境搭建解决方案

> 本文档记录了在 Windows 环境下搭建 React Native Android 开发环境时遇到的各种问题及解决方案，适用于 React Native 0.81.4 版本。

## 问题概述

在搭建 React Native Android 开发环境时，我们遇到了以下主要问题：

1. **Java 版本不兼容** - 需要 Java 17 以上版本
2. **网络连接问题** - SSL 证书和 TLS 协议问题导致依赖下载失败
3. **Android SDK 权限问题** - SDK 安装在系统目录导致无法写入
4. **NDK 兼容性问题** - 使用了不兼容的 NDK 版本导致 C++ 链接错误

## 解决方案详解

### 1. Java 环境配置

React Native 0.81.4 需要 Java 17 或更高版本。请确保已安装并正确配置 Java 环境：

```properties
# 在 android/gradle.properties 中添加
org.gradle.java.home=C:\\Program Files\\Java\\jdk-17
```

> ⚠️ 注意：路径中的反斜杠需要进行转义

### 2. 网络和仓库配置

为解决网络连接问题，我们采用了阿里云镜像加速依赖下载：

#### 2.1 配置 Gradle Wrapper 镜像

在 [android/gradle/wrapper/gradle-wrapper.properties](file:///d:/Code/Emotion/Emotion/android/gradle/wrapper/gradle-wrapper.properties) 中修改：

```properties
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-8.14.3-bin.zip
```

#### 2.2 配置 Maven 仓库镜像

在 [android/build.gradle](file:///d:/Code/Emotion/Emotion/android/build.gradle) 中添加阿里云镜像：

```gradle
allprojects {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/central' }
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        google()
        mavenCentral()
    }
}
```

#### 2.3 配置插件仓库镜像

在 [android/settings.gradle](file:///d:/Code/Emotion/Emotion/android/settings.gradle) 中添加：

```gradle
pluginManagement {
    repositories {
        maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/central' }
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}
```

#### 2.4 创建强制使用 HTTP 的初始化脚本

创建 [android/force-http.gradle](file:///d:/Code/Emotion/Emotion/android/force-http.gradle) 文件：

```gradle
allprojects {
    repositories {
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository) {
                def url = repo.url.toString()
                if (url.startsWith("https://repo1.maven.org/maven2") || 
                    url.startsWith("https://jcenter.bintray.com/")) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by http://maven.aliyun.com/nexus/content/groups/public/"
                    repo.url = "http://maven.aliyun.com/nexus/content/groups/public/"
                }
            }
        }
    }
}
```

使用方式：
```bash
cd android
.\gradlew.bat assembleDebug --init-script force-http.gradle
```

### 3. Android SDK 权限问题

SDK 安装在系统目录（如 [D:\Android\SDK](file:///D:/Program%20Files/Android/SDK)）会导致权限问题，解决方法是将 SDK 路径更改为用户目录下可写的路径。

#### 3.1 配置 SDK 路径

在 [android/gradle.properties](file:///d:/Code/Emotion/Emotion/android/gradle.properties) 中添加：

```properties
android.sdk.path=C:\\Users\\Public\\Android\\Sdk
```

#### 3.2 设置环境变量

通过 PowerShell 设置环境变量：

```powershell
$env:ANDROID_SDK_ROOT="C:\Users\Public\Android\Sdk"
$env:ANDROID_HOME="C:\Users\Public\Android\Sdk"
```

#### 3.3 复制 SDK 组件

将原有 SDK 组件复制到新路径：

```powershell
Copy-Item -Path "D:\Android\SDK\build-tools\35.0.0" -Destination "C:\Users\Public\Android\Sdk\build-tools\35.0.0" -Recurse
Copy-Item -Path "D:\Android\SDK\platforms\android-35" -Destination "C:\Users\Public\Android\Sdk\platforms\android-35" -Recurse
Copy-Item -Path "D:\Android\SDK\ndk\25.1.8937393" -Destination "C:\Users\Public\Android\Sdk\ndk\25.1.8937393" -Recurse
```

### 4. NDK 兼容性问题

React Native 0.81.4 与最新的 NDK 版本存在兼容性问题，特别是与 C++ 标准库相关的链接错误。

#### 4.1 指定兼容的 NDK 版本

在 [android/gradle.properties](file:///d:/Code/Emotion/Emotion/android/gradle.properties) 中指定 NDK 版本：

```properties
android.ndk.version=25.1.8937393
```

#### 4.2 禁用 New Architecture

为避免 C++ 链接错误，可以禁用 New Architecture（Fabric）：

```properties
newArchEnabled=false
```

## 完整构建流程

### 使用 PowerShell 构建

```powershell
cd D:\Code\Emotion\Emotion
$env:ANDROID_SDK_ROOT="C:\Users\Public\Android\Sdk"
$env:ANDROID_HOME="C:\Users\Public\Android\Sdk"
npx react-native run-android
```

### 使用 Gradle 命令构建

```powershell
cd D:\Code\Emotion\Emotion\android
$env:ANDROID_SDK_ROOT="C:\Users\Public\Android\Sdk"
$env:ANDROID_HOME="C:\Users\Public\Android\Sdk"
.\gradlew.bat assembleDebug --init-script force-http.gradle
```

## 常见问题及解决方案

### 1. SSL 证书验证失败

如果仍然遇到 SSL 证书问题，可以在 [gradle.properties](file:///d:/Code/Emotion/Emotion/android/gradle.properties) 中添加：

```properties
org.gradle.jvmargs=-Dhttps.protocols=TLSv1.2,TLSv1.3
```

### 2. C++ 链接错误

如果遇到类似以下的错误：

```
ld.lld: error: undefined symbol: std::__ndk1::basic_string<...>
```

请确保已禁用 New Architecture：

```properties
newArchEnabled=false
```

### 3. SDK 目录无写权限

如果遇到以下错误：

```
The SDK directory is not writable (D:\Android\SDK)
```

请使用环境变量将 SDK 路径指向用户目录：

```powershell
$env:ANDROID_SDK_ROOT="D:\Android\SDK"
$env:ANDROID_HOME="D:\Android\SDK"
```

## 总结

通过以上配置，我们成功解决了 React Native Android 环境搭建过程中的主要问题。关键在于：

1. 使用合适的 Java 版本（Java 17）
2. 配置国内镜像加速依赖下载
3. 将 SDK 路径指向用户可写目录
4. 使用兼容的 NDK 版本并禁用 New Architecture

这些配置确保了项目的稳定构建和运行。
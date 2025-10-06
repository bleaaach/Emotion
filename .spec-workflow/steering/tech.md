# EchoMind 技术架构

#### 技术选型

- **UI 框架**：React Native - 用于构建跨平台原生 UI，提供更好的代码复用性和开发效率
- **架构模式**：Redux + Redux Toolkit - 实现全局状态管理，便于跨组件状态共享
- **状态管理**：使用 Redux Toolkit、useContext 和自定义 Hooks 管理应用状态
- **导航系统**：React Navigation - 处理页面导航和路由管理
- **网络请求**：Axios/Fetch - 处理 HTTP 请求，支持 RESTful API
- **数据存储**：AsyncStorage 用于轻量级数据持久化，SQLite 用于结构化数据存储
- **异步处理**：JavaScript Promises + async/await - 处理异步操作
- **图像加载**：React Native Fast Image - 高效加载和缓存图片资源
- **测试框架**：Jest、React Native Testing Library - 确保代码质量和功能正确性

## 技术栈概述
### 技术栈详情

- **React Native 0.81.4**：跨平台移动应用开发框架
- **React 19.1.0**：用于构建用户界面的 JavaScript 库
- **TypeScript 5.8.3**：JavaScript 的超集，提供类型安全
- **React Navigation 6.x**：React Native 应用的路由和导航解决方案
- **Redux Toolkit**：官方推荐的 Redux 开发工具集
- **AsyncStorage**：React Native 的简单、持久化键值存储系统

### 开发环境

- **Node.js 22.18.0**：JavaScript 运行时环境
- **npm 10.9.3**：包管理工具
- **React Native CLI 20.0.0**：命令行工具
- **Metro**：React Native 构建系统
- **Java 17.0.16**：Android构建所需的Java环境
- **Android SDK**：位于 `C:\Users\Public\Android\Sdk`

  - **Platform**：Android 35
  - **Build Tools**：35.0.0
  - **NDK**：25.1.8937393
- **Android Studio**：已安装在 `D:\Program Files\Android\Android Studio`
- **Xcode**：iOS 开发环境（仅 macOS 可用）

### 前端框架
- **React Native**：跨平台移动应用开发框架
- **TypeScript**：类型安全的JavaScript超集，提升代码质量和开发体验

### 状态管理
- **Redux Toolkit**：现代Redux最佳实践实现，简化状态管理
- **React Hooks**：处理组件内部状态和副作用

### 数据存储
- **AsyncStorage**：本地数据持久化存储
- **Future: SQLite**：未来考虑使用更强大的关系型数据库存储更复杂的数据关系

### 导航
- **React Navigation**：处理应用内屏幕导航和栈管理

### UI 和样式设计

- 使用现代 UI 框架进行样式设计（例如 React Native Components、React Navigation）；
- 遵循 Material Design 和 Human Interface Guidelines 设计语言，确保视觉层次清晰、交互反馈及时；
- 实现响应式设计，适配不同屏幕尺寸和密度；
- 支持深色模式（Dark Theme）和浅色模式（Light Theme）；
- 使用 React Native Animation 实现流畅的过渡动画和微交互效果。

### UI组件
- **自定义组件**：根据设计规范开发的专用组件
- **Future: UI库**：考虑集成成熟的React Native UI库提升开发效率


### 国际化
- **自定义本地化服务**：支持多语言切换

## 架构设计

### 分层架构
1. **展示层**：React组件和屏幕
2. **状态管理层**：Redux store和slices
3. **服务层**：处理业务逻辑和数据操作
4. **数据访问层**：与存储系统交互

### 核心模块

#### 1. 日记模块
- 日记创建、编辑、删除功能
- 情绪标记和分类
- 思维记录和扭曲识别

#### 2. 分析模块
- 情绪统计和趋势分析
- 思维模式识别
- 个人洞察生成

#### 3. 练习模块
- 练习库管理
- 练习进度跟踪
- 自定义练习功能

#### 4. 用户设置模块
- 个人资料管理
- 应用设置
- 数据导出/导入

## 数据流设计

### 单向数据流
1. 用户交互触发Action
2. Redux Reducer处理Action更新State
3. React组件订阅State变化并重新渲染
4. 数据持久化通过服务层异步完成

### 核心数据模型

#### 日记条目
- ID
- 日期时间
- 情绪标签
- 内容文本
- 思维记录
- 扭曲识别结果
- 应对策略

#### 情绪数据
- 情绪类型
- 强度
- 触发因素
- 时间戳

#### 思维数据
- 思维内容
- 识别的扭曲类型
- 替代思维
- 验证状态

## API设计（未来）

### 认证API
- 用户注册/登录
- 令牌管理

### 数据同步API
- 日记数据同步
- 设置同步
- 备份/恢复

### AI服务API
- 情绪分析
- 思维扭曲识别
- 个性化建议生成

## 安全性考虑

### 本地安全
- 数据加密存储
- 可选的应用内密码保护

### 数据隐私
- 优先本地存储
- 最小化数据收集
- 透明的数据使用政策

## 性能优化

### 渲染优化
- 组件懒加载
- 虚拟列表
- 状态管理优化

### 存储优化
- 数据压缩
- 缓存策略
- 定期数据清理

## 测试策略

### 单元测试
- React组件测试（Jest + React Testing Library）
- 业务逻辑测试

### 集成测试
- Redux store集成测试
- 服务层集成测试

### 端到端测试
- 关键用户流程测试

## 部署策略

### 开发环境
- Expo开发服务器
- 模拟数据

### 测试环境
- 持续集成/持续部署
- 自动化测试

### 生产环境
- App Store/Google Play发布
- 版本管理和更新策略
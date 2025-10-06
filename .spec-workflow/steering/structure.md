# EchoMind 项目结构

## 项目组织架构

EchoMind项目采用模块化、分层的组织结构，遵循React Native最佳实践，同时结合功能领域和关注点分离原则。整体架构分为核心功能模块、基础设施层和资源层三大部分。

```
├── src/
│   ├── assets/         # 静态资源（图片、图标等）
│   ├── components/     # 可复用UI组件
│   ├── hooks/          # 自定义React Hooks
│   ├── locales/        # 国际化语言文件
│   ├── navigation/     # 导航配置
│   ├── screens/        # 应用屏幕组件
│   ├── services/       # 服务层（业务逻辑）
│   ├── store/          # Redux状态管理
│   ├── themes/         # 主题和样式配置
│   ├── types/          # TypeScript类型定义
│   └── utils/          # 工具函数
├── components/         # 旧版组件（待迁移）
├── .spec-workflow/     # 规范工作流
├── android/            # Android原生代码
├── ios/                # iOS原生代码
└── doc/                # 项目文档
```

## 模块职责划分

### 1. 核心功能模块

#### src/screens/
- **日记功能**：`DiaryWizardScreen.tsx`（日记创建向导）、`DiaryDetailScreen.tsx`（日记详情）、`DiaryListScreen.tsx`（日记列表）
- **统计分析**：`StatsScreen.tsx`（统计视图）
- **练习系统**：`ExercisesScreen.tsx`（练习列表）、`QuestionAnswerScreen.tsx`（问答练习）、`QuestionLibraryScreen.tsx`（问题库）
- **用户配置**：`ProfileScreen.tsx`（个人资料）、`PersonalProfileScreen.tsx`（个人设置）
- **AI助手**：`ai/`目录（AI相关功能）

#### src/services/
- **数据服务**：`DiaryService.ts`（日记数据管理）、`StorageService.ts`（存储服务）
- **业务服务**：`UserPreferencesService.ts`（用户偏好设置）
- **国际化**：`LocalizationService.ts`（多语言支持）

### 2. 基础设施层

#### src/navigation/
- 应用导航结构配置
- 路由定义和参数传递

#### src/store/
- **Redux配置**：`index.ts`（store创建和中间件）
- **状态切片**：`slices/`目录（各功能模块状态管理）

#### src/components/
- 通用UI组件库
- 可复用的界面元素

#### src/hooks/
- 自定义Hooks用于业务逻辑复用

#### src/utils/
- 工具函数集合
- 辅助方法和格式化工具

### 3. 资源层

#### src/assets/
- **图标**：`icons/`目录（应用图标和界面图标）
- **图片**：`images/`目录（应用图片资源）

#### src/themes/
- 主题定义（颜色、字体、间距等）
- 样式系统配置

#### src/locales/
- 多语言文件（`en.ts`、`zh.ts`等）
- 翻译键值对

#### src/types/
- TypeScript类型定义
- 接口和类型别名

## 数据流设计

### 核心数据流
1. **用户交互** → **屏幕组件** → **Redux Actions** → **Redux Reducers** → **状态更新**
2. **状态更新** → **组件重新渲染** → **用户界面更新**
3. **数据持久化** → **服务层** → **本地存储**

### 服务层职责
- 封装数据访问逻辑
- 处理业务规则和验证
- 协调不同数据源
- 提供统一的API给上层组件

## 组件层次结构

### 屏幕层
- 包含完整的用户界面
- 管理屏幕级状态和导航
- 组合多个子组件

### 容器组件
- 连接Redux状态
- 处理业务逻辑
- 向展示组件传递数据和回调

### 展示组件
- 纯UI渲染
- 接收props并显示内容
- 触发回调通知父组件

### 原子组件
- 最基础的UI元素
- 高度可复用
- 无业务逻辑

## 文件命名规范

### 组件文件
- **屏幕组件**：`ScreenName.tsx`（例如：`HomeScreen.tsx`）
- **普通组件**：`ComponentName.tsx`（例如：`EmotionChip.tsx`）

### 服务文件
- `ServiceName.ts`（例如：`DiaryService.ts`）

### 工具文件
- `utilityName.ts`（例如：`dateFormatter.ts`）

### 类型文件
- `types.ts`（通用类型）或`featureTypes.ts`（特定功能类型）

## 目录演化计划

### 近期优化
- 将旧版`components/`目录迁移到`src/components/`
- 完善类型定义，提高代码安全性
- 增强服务层抽象，减少组件直接依赖

### 中期目标
- 实现更细粒度的功能模块划分
- 引入更完善的单元测试结构
- 建立组件库和设计系统

### 长期规划
- 支持插件化架构，方便功能扩展
- 实现模块化开发和按需加载
- 建立完整的CI/CD流程

## 跨平台考虑

### 平台特定代码
- 平台特定功能放在各自目录（`android/`, `ios/`）
- 使用React Native平台检测机制处理平台差异
- 共享业务逻辑和UI组件

### 原生模块集成
- 通过桥接机制集成原生功能
- 封装平台差异，提供统一API

## 与规范工作流集成

### 文档管理
- 需求和设计文档位于`.spec-workflow/specs/`
- 项目指导文档位于`.spec-workflow/steering/`
- 变更记录和审批流程通过工作流管理

### 开发流程
- 功能开发基于规范文档
- 任务分解和进度跟踪通过workflow系统
- 代码审查和质量控制集成到流程中
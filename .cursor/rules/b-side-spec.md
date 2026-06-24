# B 端后台管理系统组件开发规范

## 核心技术栈

- 框架: React 18+ (Hooks / Functional Components)
- 构建：Vite 6.2（ManualChunks 分包优化）
- UI 库: Ant Design 5.x
- 全局状态：React Context（仅限全局配置/页签状态，严禁滥用导致大面积重绘）
- HTTP ：Axios 拦截器封装，统一 GET/POST wrapper，Mock 模式支持
- 语言: TypeScript (严格类型，禁止使用 any)
- 代码质量：ESLint 9 + Prettier + Husky + lint-staged + Commitlint

## 编写原则

1. **代码风格**: 优先使用标准的、易读的 React Hooks。严禁使用过于花哨、晦涩的闭包或未稳定的实验性 API。
2. **性能与体积规约**:
   - 单文件长度严格控制在 ≤ 1000 行以内。
   - 所有页面级组件的 `export default` 必须使用 `React.memo()` 包裹。
   - 严禁在 JSX 中编写内联匿名函数。所有事件处理函数必须提取出来并使用 `useCallback` 包裹。
   - 所有表格列配置（columns）、表单选项（options）等常量数组和复杂计算结果，必须使用 `useMemo` 缓存。
3. **表格与表单 (Table & Form)**:
   - 所有的 Table 组件必须自带 loading 状态、防抖搜索（Debounce）、以及标准的分页逻辑（Pagination）。
   - Form 表单提交必须做前端字段校验，且提交按钮必须在请求期间处于 `loading` 禁用状态，防止用户重复点击。
4. **老旧代码兼容**: 重构旧代码时，必须保留原有的业务数据结构（Data Structure），不得在未沟通的情况下擅自修改 API 返回值的 Key。
5. **异常处理**: 统一使用 axios 拦截器。所有的异步接口返回异常，必须由拦截器通过 `message.error` 进行全局用户提示，组件层只负责捕获（catch）而不重复报错误弹窗。
6. **路由与缓存**: 路由配置必须使用 `React.lazy` 进行代码分割（Code Splitting），且必须支持页签缓存（CacheRouter）。

## 完整 CRUD 模块目录结构

当收到“创建/重构新模块”的指令时，必须使用 Cursor Compose 一次性在对应的目录下完整生成以下结构中的所有文件，严禁缺漏：

一个包含列表、详情、编辑/新增的完整业务模块应遵循以下目录结构：

```
module-name/
├── index.tsx                        # 列表页主组件（CRUD）
├── constant.ts                      # 常量（BASE_URL、PAGE_TITLE、REFRESH_LIST_EVENT 等）
├── utils.ts                         # 列表查询参数格式化等工具函数
├── hooks/
├── detail/                          # 详情页
│   ├── index.tsx                    # 详情页组件
│   └── hooks/
└── edit/                            # 编辑/新增页
    ├── index.tsx                    # 编辑页组件
    ├── utils.ts                     # 提交参数格式化、自定义校验
    └── hooks/
```

---

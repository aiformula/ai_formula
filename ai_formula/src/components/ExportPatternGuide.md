# 組件導出模式指南 / Component Export Pattern Guide

## 統一的導出模式 / Unified Export Patterns

為了保持代碼的一致性和性能最佳化，項目採用了以下統一的導出模式：

## 1. 頁面組件 / Page Components (`pages/`)

頁面組件**不使用** `React.memo`，因為它們通常：
- 不會頻繁重渲染
- 有複雜的狀態管理
- 作為路由入口點

```tsx
// ✅ 正確的頁面組件導出
const HomePage = () => {
  // 組件邏輯
  return <div>...</div>;
};

export default HomePage;
```

```tsx
// ❌ 錯誤的頁面組件導出
export default React.memo(HomePage);
```

## 2. 可重用UI組件 / Reusable UI Components (`components/`)

可重用UI組件**使用** `React.memo`，因為它們：
- 經常被重複使用
- 可能在父組件重渲染時不需要更新
- 有助於性能優化

```tsx
// ✅ 正確的UI組件導出
const Navigation = () => {
  // 組件邏輯
  return <nav>...</nav>;
};

export default React.memo(Navigation);
```

```tsx
// ❌ 錯誤的UI組件導出
export default Navigation;
```

## 3. 類組件 / Class Components

類組件**不能使用** `React.memo`，因為 `React.memo` 只適用於函數組件：

```tsx
// ✅ 正確的類組件導出
class ErrorBoundary extends Component {
  // 組件邏輯
  render() {
    return <div>...</div>;
  }
}

export default ErrorBoundary;
```

```tsx
// ❌ 錯誤的類組件導出
export default React.memo(ErrorBoundary); // 這會報錯
```

## 4. 特殊情況 / Special Cases

### 高階組件 (HOCs)
```tsx
const withAuth = (Component) => {
  return React.memo((props) => {
    // HOC邏輯
    return <Component {...props} />;
  });
};
```

### 上下文提供者 (Context Providers)
```tsx
const AuthProvider = ({ children }) => {
  // 提供者邏輯
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

// 上下文提供者通常不需要memo
export default AuthProvider;
```

### 非常複雜的組件
對於有複雜計算或昂貴操作的組件，可以考慮使用自定義比較函數：

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // 昂貴的計算
  return <div>...</div>;
}, (prevProps, nextProps) => {
  // 自定義比較邏輯
  return prevProps.data.id === nextProps.data.id;
});

export default ExpensiveComponent;
```

## 5. 導出語句格式 / Export Statement Format

所有導出語句都**必須**以分號結尾：

```tsx
// ✅ 正確
export default React.memo(ComponentName);

// ❌ 錯誤
export default React.memo(ComponentName)
```

## 6. 導入React.memo / Importing React.memo

確保在文件頂部正確導入 `React`：

```tsx
import React from 'react';
// 或者
import React, { memo } from 'react';

// 使用memo作為別名
export default memo(ComponentName);
```

## 7. 檢查清單 / Checklist

在創建或修改組件時，請檢查：

- [ ] 頁面組件不使用 `React.memo`
- [ ] 可重用UI組件使用 `React.memo`
- [ ] 類組件不使用 `React.memo`
- [ ] 所有導出語句以分號結尾
- [ ] 正確導入了 `React`

## 8. 性能考慮 / Performance Considerations

### 何時使用 React.memo：
- 組件經常重渲染但props不變
- 組件有昂貴的計算或渲染
- 組件在列表中重複使用

### 何時不使用 React.memo：
- 組件props經常變化
- 組件本身很簡單
- 頁面級組件

## 9. 實施策略 / Implementation Strategy

1. **新組件**: 從一開始就遵循這些模式
2. **現有組件**: 逐步更新，優先處理關鍵組件
3. **性能測試**: 在應用React.memo後進行性能測試
4. **團隊培訓**: 確保團隊成員了解這些模式

## 10. 工具和檢查 / Tools and Checks

### ESLint規則建議：
```json
{
  "rules": {
    "react/display-name": "error",
    "react/no-unstable-nested-components": "error"
  }
}
```

### 代碼審查要點：
- 檢查導出模式是否正確
- 確認React.memo的使用是否合理
- 驗證性能影響

這些模式將幫助保持代碼的一致性和性能最佳化。 
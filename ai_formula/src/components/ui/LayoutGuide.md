# 布局組件使用指南 / Layout Components Guide

## 概述 / Overview

為了減少項目中重複的flex布局模式（特別是`flex items-center justify-center`），我們創建了一套統一的布局組件。

## 可用組件 / Available Components

### 1. CenterLayout
**用途**: 替代基本的 `flex items-center justify-center`
```tsx
// 之前 / Before
<div className="flex items-center justify-center">
  <Content />
</div>

// 之後 / After
<CenterLayout>
  <Content />
</CenterLayout>
```

### 2. FullCenterLayout
**用途**: 替代 `min-h-screen flex items-center justify-center`
```tsx
// 之前 / Before
<div className="min-h-screen flex items-center justify-center">
  <Content />
</div>

// 之後 / After
<FullCenterLayout>
  <Content />
</FullCenterLayout>
```

### 3. ColumnCenterLayout
**用途**: 替代 `flex flex-col items-center justify-center`
```tsx
// 之前 / Before
<div className="flex flex-col items-center justify-center">
  <Content />
</div>

// 之後 / After
<ColumnCenterLayout>
  <Content />
</ColumnCenterLayout>
```

### 4. CircleIconLayout
**用途**: 替代圓形圖標容器
```tsx
// 之前 / Before
<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
  <Icon />
</div>

// 之後 / After
<CircleIconLayout size="md" variant="danger">
  <Icon />
</CircleIconLayout>
```

#### Props:
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

### 5. SpacedLayout
**用途**: 帶間距的居中布局
```tsx
<SpacedLayout spacing="md" direction="row">
  <Item1 />
  <Item2 />
</SpacedLayout>
```

#### Props:
- `spacing`: 'sm' | 'md' | 'lg'
- `direction`: 'row' | 'col'

### 6. CardCenterLayout
**用途**: 帶內邊距的居中布局（適用於卡片內容）
```tsx
<CardCenterLayout>
  <Content />
</CardCenterLayout>
```

### 7. ResponsiveLayout
**用途**: 響應式居中布局
```tsx
<ResponsiveLayout>
  <Content />
</ResponsiveLayout>
```

## 導入方式 / Import

```tsx
// 單個導入
import { CenterLayout, FullCenterLayout, CircleIconLayout } from '@/components/ui/layout'

// 或者通過barrel export
import { CenterLayout, FullCenterLayout, CircleIconLayout } from '@/components/ui'

// 或者導入所有
import LayoutComponents from '@/components/ui/layout'
```

## 實際使用例子 / Real Usage Examples

### 錯誤頁面
```tsx
// 之前 / Before
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
  <Card>
    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertTriangle />
    </div>
    <Content />
  </Card>
</div>

// 之後 / After
<FullCenterLayout className="bg-gray-50 p-4">
  <Card>
    <CircleIconLayout size="md" variant="danger" className="mb-4">
      <AlertTriangle />
    </CircleIconLayout>
    <Content />
  </Card>
</FullCenterLayout>
```

### 加載狀態
```tsx
// 之前 / Before
<div className="flex items-center justify-center py-8">
  <LoadingSpinner />
</div>

// 之後 / After
<CardCenterLayout>
  <LoadingSpinner />
</CardCenterLayout>
```

## 自定義樣式 / Custom Styling

所有布局組件都支持 `className` prop 來添加自定義樣式：

```tsx
<CenterLayout className="bg-blue-50 p-4 rounded-lg">
  <Content />
</CenterLayout>
```

## 遷移策略 / Migration Strategy

1. **逐步遷移**: 不需要一次性替換所有用法
2. **優先級**: 先處理最常用的模式（`flex items-center justify-center`）
3. **保持一致**: 新組件都應該使用統一的布局組件
4. **測試**: 確保布局在不同屏幕尺寸下正常工作

## 性能考慮 / Performance Considerations

- 所有布局組件都使用 `React.FC` 並進行了優化
- 使用 `cn` 工具函數來合併類名
- 避免不必要的重渲染

## 未來增強 / Future Enhancements

- 添加更多布局模式（如Grid布局）
- 支持動畫過渡
- 添加響應式斷點支持
- 擴展主題變體 
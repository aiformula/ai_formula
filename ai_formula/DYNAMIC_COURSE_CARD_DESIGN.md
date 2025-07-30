# 動態課程卡片 (Dynamic Course Card) 設計文檔

## 🎯 設計目標

這個動態課程卡片組件是一個高度可自定義的UI組件，能夠根據不同課程的品牌顏色自動調整視覺主題，為每個課程創造獨特的視覺體驗。

## 🎨 設計規範

### 基礎視覺風格
- **背景色**: `#212121` (深灰色，符合深色模式)
- **主要文字**: 白色 (`#FFFFFF`)
- **次要文字**: 淺灰色 (`#E5E7EB`)
- **卡片圓角**: `16px`
- **內邊距**: `24px`

### 動態顏色系統
動態課程卡片的核心特色是支援主題顏色 (`themeColor`) 自定義，以下元素會根據傳入的顏色自動調整：

1. **CTA 按鈕背景色** - 使用原始主題色
2. **課程標籤背景色** - 使用原始主題色
3. **卡片邊框** - 使用 30% 透明度的主題色
4. **懸浮光暈效果** - 使用 20% 透明度的主題色
5. **按鈕懸浮效果** - 使用稍微變暗的主題色

## 📋 組件屬性 (Props)

```typescript
interface CourseCardProps {
  courseName: string;        // 課程名稱
  duration: string;          // 課程時長
  level: string;            // 適合級別
  rating: number;           // 用戶評分 (1-5)
  price: string | number;   // 課程價格
  isFree?: boolean;         // 是否免費
  tags?: CourseTag[];       // 課程標籤
  themeColor?: string;      // 主題顏色 (Hex格式)
  onStartCourse?: () => void; // 點擊回調
  className?: string;       // 額外CSS類名
}

interface CourseTag {
  text: string;             // 標籤文字
  type: 'new' | 'bestseller' | 'featured' | 'hot'; // 標籤類型
}
```

## 🎯 使用範例

### 基本用法
```tsx
import { DynamicCourseCard } from '@/components/ui';

<DynamicCourseCard
  courseName="ChatGPT 完整教學實戰"
  duration="4.5 小時"
  level="適合所有級別"
  rating={4.9}
  price={0}
  isFree={true}
  themeColor="#10a37f"  // ChatGPT 品牌綠色
  tags={[
    { text: '新品', type: 'new' },
    { text: '熱門', type: 'hot' }
  ]}
  onStartCourse={() => console.log('開始課程')}
/>
```

### 不同主題色範例

#### ChatGPT 課程 - 綠色主題
```tsx
<DynamicCourseCard
  courseName="ChatGPT 完整教學實戰"
  themeColor="#10a37f"
  // ... 其他屬性
/>
```

#### Midjourney 課程 - 紫色主題
```tsx
<DynamicCourseCard
  courseName="Midjourney AI 繪圖大師"
  themeColor="#8A2BE2"
  // ... 其他屬性
/>
```

#### 預設主題 - 金色
```tsx
<DynamicCourseCard
  courseName="AI 基礎入門"
  // 不提供 themeColor，會使用預設的金色 #FBBF24
  // ... 其他屬性
/>
```

## 🎭 動畫效果

### 進入動畫
- **淡入效果**: `opacity: 0 → 1`
- **上升效果**: `y: 20px → 0`
- **持續時間**: `0.6秒`

### 懸浮效果
- **輕微縮放**: `scale: 1 → 1.02`
- **主題色光暈**: 動態生成基於主題色的陰影
- **邊框高亮**: 邊框透明度增加

### 標籤動畫
- **延遲進入**: 每個標籤延遲 `0.1秒`
- **懸浮上升**: `translateY: 0 → -1px`
- **縮放效果**: `scale: 1 → 1.05`

### 按鈕互動
- **懸浮**: 輕微上升 + 陰影加深
- **點擊**: 快速縮放回饋
- **圖標動畫**: 箭頭向右移動

## 🎨 視覺層次

### 1. 標籤區域
- 位置: 卡片頂部
- 顏色: 動態主題色背景
- 字體: 12px, 粗體
- 圓角: 20px (膠囊形狀)

### 2. 課程標題
- 字體大小: 20px (桌面) / 18px (手機)
- 字體權重: 700 (粗體)
- 顏色: 白色漸變效果
- 行高: 1.3

### 3. 課程資訊
- 圖標大小: 18px
- 文字大小: 14px
- 間距: 16px (垂直)
- 圖標顏色: 灰色 (特殊: 星星為金色)

### 4. CTA 按鈕
- 背景: 動態主題色
- 文字: 白色, 16px, 粗體
- 圓角: 12px
- 內邊距: 14px 24px
- 圖標: 18px 箭頭

## 📱 響應式設計

### 桌面版 (≥768px)
- 卡片最大寬度: 320px
- 內邊距: 24px
- 課程標題: 20px

### 手機版 (<768px)
- 內邊距: 20px
- 課程標題: 18px
- 資訊間距: 14px
- 底部間距: 20px

## 🔧 技術實現

### CSS Variables 動態注入
```css
:root {
  --theme-color: #FBBF24;                    /* 主題原色 */
  --theme-color-hover: #E6A700;              /* 懸浮時稍暗 */
  --theme-color-light: rgba(251, 191, 36, 0.1); /* 10% 透明 */
  --theme-color-border: rgba(251, 191, 36, 0.3); /* 30% 透明 */
  --theme-color-glow: rgba(251, 191, 36, 0.2);   /* 20% 透明 */
}
```

### 顏色工具函數
```typescript
// 調整亮度 (-100 到 100)
function adjustBrightness(hex: string, percent: number): string

// 調整透明度 (0 到 1)
function adjustOpacity(hex: string, opacity: number): string
```

## 🎨 主題色建議

### AI 工具品牌色
- **ChatGPT**: `#10a37f` (綠色)
- **Claude**: `#FF6B35` (橙色)
- **Midjourney**: `#8A2BE2` (紫色)
- **Stable Diffusion**: `#E91E63` (粉紅)
- **GitHub Copilot**: `#0066CC` (藍色)

### 通用主題色
- **預設金色**: `#FBBF24`
- **科技藍**: `#3B82F6`
- **創意紫**: `#8B5CF6`
- **成功綠**: `#10B981`
- **警告橙**: `#F59E0B`

## 📊 使用建議

1. **品牌一致性**: 為每個AI工具使用其官方品牌色
2. **對比度**: 確保主題色與白色文字有足夠對比度
3. **可訪問性**: 避免使用過於鮮豔或過於暗淡的顏色
4. **視覺層次**: 利用不同透明度營造層次感
5. **互動回饋**: 善用懸浮和點擊動畫提升使用體驗

## 🔄 版本更新

### v1.0.0 (當前版本)
- ✅ 基礎動態主題色系統
- ✅ 完整的動畫效果
- ✅ 響應式設計
- ✅ TypeScript 支援
- ✅ 可訪問性支援

### 未來規劃
- 🎯 支援更多標籤類型
- 🎯 自定義圖標支援
- 🎯 深色/淺色模式切換
- 🎯 更多動畫選項
- 🎯 主題色智能建議 